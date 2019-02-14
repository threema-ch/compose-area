use std::fmt;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Element, Node};

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        pub use self::console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        pub fn set_panic_hook() {}
    }
}

#[inline]
fn is_text_node(node: &Node) -> bool {
    node.node_type() == Node::TEXT_NODE
}

/// For a HTML element, return the length of the opening tag.
///
/// E.g. when passing in a div element, the length will be 5 (`<div>`).
fn get_opening_tag_len(node: &Element) -> usize {
    let name = node.node_name(); // e.g. "div"
    name.len() + 2 // e.g. "<div>"
}

/// Return the node offset from the start of the root element.
fn get_offset_from_start(root: &Element, node: &Node, offset: u32) -> u32 {
    let text_offset = if is_text_node(node) { offset } else { 0 };
    let node_offset = if !is_text_node(node) { offset } else { 0 };
    let mut pos = 0;
    let mut node_count = 0;
    let child_nodes = root.child_nodes();
    for i in 0..child_nodes.length() {
        let child_node = child_nodes.get(i)
            .expect(&format!("Child node at index {} not found", i));

        if node.is_same_node(Some(root)) && node_count >= node_offset {
            // We have reached the node offset.
            return pos;
        } else if child_node.is_same_node(Some(node)) {
            // We reached our target node, simply add the offset to the position
            // Note: The offset means something different depending on whether the
            // node is a text node or an element node! If it's a text node, it's the
            // character offset from the start. If it's an element node, it is the
            // number of elements from the start.
            match child_node.node_type() {
                Node::TEXT_NODE => return pos + text_offset,
                Node::ELEMENT_NODE => {
                    let element_ref: &Element = child_node.unchecked_ref();
                    return pos + get_opening_tag_len(element_ref) as u32;
                }
                other => panic!(format!("Unsupported node type: {}", other)),
            }
        } else if child_node.contains(Some(node)) {
            // We're at a parent node. Recurse.

            // Since this is a parent node, it must be an element.
            let element_ref: &Element = child_node.unchecked_ref();

            let recursed = get_offset_from_start(element_ref, node, offset);
            return pos + recursed + get_opening_tag_len(element_ref) as u32;
        }

        // We're at a node previous to the target node. Increase pos.
        match child_node.node_type() {
            Node::TEXT_NODE => {
                pos += child_node.text_content().expect("Text node without text content").len() as u32;
            }
            Node::ELEMENT_NODE => {
                let element_ref: &Element = child_node.unchecked_ref();
                pos += element_ref.outer_html().len() as u32;
            }
            other => panic!(format!("Unsupported node type: {}", other)),
        }
        node_count += 1;
    }
    pos
}

fn get_position(root_element: &Element, node: &Node, offset: u32) -> Option<u32> {
    if root_element.contains(Some(node)) {
        Some(get_offset_from_start(root_element, node, offset))
    } else {
        None
    }
}

#[wasm_bindgen]
pub struct CaretPosition {
    pub start: u32,
    pub end: u32,
}

impl CaretPosition {
    pub fn new(start: u32, end: u32) -> Self {
        CaretPosition { start, end }
    }
}

impl fmt::Display for CaretPosition {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "(start={}, end={})", self.start, self.end)
    }
}

macro_rules! unknown_caret_position {
    ($errmsg:expr) => {{
        web_sys::console::warn_1(
            &format!("Could not determine caret position: {}", $errmsg).into()
        );
        return CaretPosition::new(0, 0);
    }}
}

/// Find the current caret position. If it cannot be determined, the position
/// (0, 0) will be returned.
///
/// TODO: Return a tuple once
/// https://github.com/rustwasm/wasm-bindgen/issues/122 is resolved!
///
/// TODO: Make this nullable once
/// https://github.com/rustwasm/wasm-bindgen/issues/1252 is resolved!
#[wasm_bindgen]
pub fn get_caret_position(root_element: &Element) -> CaretPosition {
    let window = web_sys::window().expect("No global `window` exists");

    // If the HTML is empty, we're at the start
    if root_element.inner_html().len() < 1 {
        return CaretPosition::new(0, 0);
    }

    // Get the current selection
    let selection = match window.get_selection() {
        Ok(Some(selection)) => selection,
        Ok(None) => unknown_caret_position!("No selection found"),
        Err(_) => unknown_caret_position!("Error during get_selection"),
    };

    // Get selection anchor node
    let anchor_node = match selection.anchor_node() {
        Some(node) => node,
        None => unknown_caret_position!("No anchor node in selection"),
    };

    // If the anchor node is the root element, we're at the start.
    if anchor_node.is_same_node(Some(root_element.unchecked_ref::<Node>())) {
        return CaretPosition::new(0, 0);
    }

    // Ensure that the selection is within the root element
    if !root_element.contains(Some(&anchor_node)) {
        unknown_caret_position!("Selection is not inside root element");
    }

    // Get the range of the current selection
    let range = match selection.get_range_at(0) {
        Ok(range) => range,
        Err(_) => unknown_caret_position!("Error during get_range_at(0)"),
    };

    // Find the start position
    let start_container = match range.start_container() {
        Ok(container) => container,
        Err(_) => unknown_caret_position!("Error during start_container()"),
    };
    let start_offset = match range.start_offset() {
        Ok(offset) => offset,
        Err(_) => unknown_caret_position!("Error during start_offset()"),
    };
    let start = match get_position(&root_element, &start_container, start_offset) {
        Some(start) => start,
        None => unknown_caret_position!("get_caret_position: Could not find start"),
    };

    // Find the end position
    let end_container = match range.end_container() {
        Ok(container) => container,
        Err(_) => unknown_caret_position!("Error during end_container()"),
    };
    let end_offset = match range.end_offset() {
        Ok(offset) => offset,
        Err(_) => unknown_caret_position!("Error during end_offset()"),
    };
    let end = match get_position(&root_element, &end_container, end_offset) {
        Some(end) => end,
        None => unknown_caret_position!("get_caret_position: Could not find end"),
    };

    CaretPosition::new(start, end)
}
