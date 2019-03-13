use std::fmt;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Element, Node, HtmlImageElement};

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

cfg_if! {
    // When the `console_log` feature is enabled, forward log calls to the
    // JS console.
    if #[cfg(feature = "console_log")] {
        pub fn init_log() {
            use log::Level;
            // Best effort, ignore error if initialization fails.
            // (This could be the ase if the logger is initialized multiple
            // times.)
            let _ = console_log::init_with_level(Level::Trace);
        }
    } else {
        pub fn init_log() {}
    }
}

#[inline]
fn is_text_node(node: &Node) -> bool {
    node.node_type() == Node::TEXT_NODE
}

/// For a HTML element, return the length of the opening tag.
///
/// E.g. when passing in a div element, the length will be 5 (`<div>`).
#[allow(clippy::cast_possible_truncation)]
fn get_opening_tag_len(node: &Element) -> u32 {
    let name = node.node_name(); // e.g. "div"
    let len = name.encode_utf16().count() + 2; // e.g. "<div>"
    assert!(len <= u32::max_value() as usize, "Tag length does not fit in u32");
    len as u32
}

/// Return the node offset from the start of the root element.
///
/// Implementation note: It's important that byte lengths are always measured
/// in UTF-16 encoding!
fn get_offset_from_start(root: &Element, node: &Node, offset: u32) -> u32 {
    let text_offset = if is_text_node(node) { offset } else { 0 };
    let node_offset = if !is_text_node(node) { offset } else { 0 };
    let mut pos = 0;
    let mut node_count = 0;
    let child_nodes = root.child_nodes();
    for i in 0..child_nodes.length() {
        let child_node = child_nodes.get(i)
            .unwrap_or_else(|| panic!("Child node at index {} not found", i));

        if node.is_same_node(Some(root)) && node_count >= node_offset {
            // We have reached the node offset.
            return pos;
        } else if child_node.is_same_node(Some(node)) {
            // We reached our target node, simply add the offset to the position
            // Note: The offset means something different depending on whether the
            // node is a text node or an element node! If it's a text node, it's the
            // char (code unit) offset from the start. If it's an element node,
            // it is the number of elements from the start.
            match child_node.node_type() {
                Node::TEXT_NODE => return pos + text_offset,
                Node::ELEMENT_NODE => {
                    let element_ref: &Element = child_node.unchecked_ref();
                    return pos + get_opening_tag_len(element_ref);
                }
                other => panic!(format!("Unsupported node type: {}", other)),
            }
        } else if child_node.contains(Some(node)) {
            // We're at a parent node. Recurse.

            // Since this is a parent node, it must be an element.
            let element_ref: &Element = child_node.unchecked_ref();

            let recursed = get_offset_from_start(element_ref, node, offset);
            return pos + recursed + get_opening_tag_len(element_ref);
        }

        // We're at a node previous to the target node. Increase pos.
        match child_node.node_type() {
            Node::TEXT_NODE => {
                pos += make_u32!(
                    child_node.text_content().expect("Text node without text content")
                        .encode_utf16().count()
                );
            }
            Node::ELEMENT_NODE => {
                let element_ref: &Element = child_node.unchecked_ref();
                pos += make_u32!(element_ref.outer_html().encode_utf16().count());
            }
            other => panic!(format!("Unsupported node type: {}", other)),
        }
        node_count += 1;
    }
    pos
}

/// A caret position specifies the offset in the HTML source code relative to
/// the start of the wrapper element.
///
/// Example: If the caret is at the end of this wrapper element:
///
/// ```html
/// <div id="wrapper">hi<br></div>
/// ```
///
/// ...then the offset will be 6.
#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub struct CaretPosition {
    pub start: u32,
    pub end: u32,
    pub success: bool,
}

impl CaretPosition {
    pub fn new(start: u32, end: u32) -> Self {
        Self { start, end, success: true }
    }

    pub fn unknown() -> Self {
        Self { start: 0, end: 0, success: false }
    }
}

impl fmt::Display for CaretPosition {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        if self.success {
            write!(f, "(start={}, end={})", self.start, self.end)
        } else {
            write!(f, "(unknown)")
        }
    }
}

macro_rules! unknown_caret_position {
    ($errmsg:expr) => {{
        warn!("Could not determine caret position: {}", $errmsg);
        return CaretPosition::unknown();
    }}
}

/// Find the current caret position. If it cannot be determined, the position
/// (0, 0) will be returned.
///
/// Note: When getting the window selection, it will be relative to an anchor
///       node. If the anchor node is an element node, then the offset is
///       referring to the number of child elements. If the anchor node is a
///       text node, then the offset is referring to the codepoints.
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
    if root_element.inner_html().is_empty() {
        return CaretPosition::new(0, 0);
    }

    // Get the current selection
    let selection = match window.get_selection() {
        Ok(Some(selection)) => selection,
        Ok(None) => unknown_caret_position!("No selection found"),
        Err(_) => unknown_caret_position!("Error during get_selection"),
    };

    // Get the range of the current selection
    let range = match selection.get_range_at(0) {
        Ok(range) => range,
        Err(_) => unknown_caret_position!("Error during get_range_at(0)"),
    };

    // Find the start/end container/offset
    let start_container = match range.start_container() {
        Ok(container) => container,
        Err(_) => unknown_caret_position!("Error during start_container()"),
    };
    let start_offset = match range.start_offset() {
        Ok(offset) => offset,
        Err(_) => unknown_caret_position!("Error during start_offset()"),
    };
    let end_container = match range.end_container() {
        Ok(container) => container,
        Err(_) => unknown_caret_position!("Error during end_container()"),
    };
    let end_offset = match range.end_offset() {
        Ok(offset) => offset,
        Err(_) => unknown_caret_position!("Error during end_offset()"),
    };

    // Ensure that the start container is within the root element
    if !root_element.contains(Some(&start_container)) {
        unknown_caret_position!("Selection is not inside root element");
    }

    let start = get_offset_from_start(&root_element, &start_container, start_offset);
    let end = get_offset_from_start(&root_element, &end_container, end_offset);
    CaretPosition::new(start, end)
}


/// Process a DOM node recursively and extract text.
///
/// Convert elements like images to alt text.
#[wasm_bindgen]
pub fn extract_text(root_element: &Element, no_trim: bool) -> String {
    let mut text = String::new();
    visit_child_nodes(root_element, &mut text);
    if no_trim {
        text
    } else {
        text.trim().to_string()
    }
}

/// Used by `extract_text`.
///
/// TODO: This could be optimized by avoiding copies and re-allocations.
fn visit_child_nodes(parent_node: &Element, text: &mut String) {
    let mut last_node_type = "".to_string();
    let children = parent_node.child_nodes();
    for i in 0..children.length() {
        let node = match children.item(i) {
            Some(n) => n,
            None => {
                warn!("visit_child_nodes: Index out of bounds");
                return;
            },
        };
        match node.node_type() {
            Node::TEXT_NODE => {
                if last_node_type == "div" {
                    // An image following a div should go on a new line
                    text.push('\n');
                }
                last_node_type = "text".to_string();
                text.push_str(
                    // Append text, but strip leading and trailing newlines
                    node.node_value()
                        .unwrap_or_else(|| "".into())
                        .trim_matches(|c| c == '\n' || c == '\r')
                );
            }
            Node::ELEMENT_NODE => {
                let element: &Element = node.unchecked_ref();
                let tag = element.tag_name().to_lowercase();
                let last_node_type_clone = last_node_type.clone();
                last_node_type = tag.clone();
                match &*tag {
                    "span" => {
                        visit_child_nodes(element, text);
                    }
                    "div" => {
                        text.push('\n');
                        visit_child_nodes(element, text);
                    }
                    "img" => {
                        if last_node_type_clone == "div" {
                            // An image following a div should go on a new line
                            text.push('\n');
                        }
                        text.push_str(&node.unchecked_ref::<HtmlImageElement>().alt());
                    }
                    "br" => {
                        text.push('\n');
                    }
                    _other => {}
                }
            }
            other => warn!("visit_child_nodes: Unhandled node type: {}", other),
        }
    }
}
