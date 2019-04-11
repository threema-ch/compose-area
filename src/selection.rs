/// Everything related to the caret position and DOM selection ranges.

use std::fmt;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Element, Node};

use crate::utils::{is_text_node, is_character_data_node};

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

/// A position relative to a node.
#[derive(Debug)]
pub enum Position<'a> {
    After(&'a Node),
    Offset(&'a Node, u32),
}

/// Update the current selection range to match the specified `Position`.
///
/// If the `end` parameter is `None`, then the selection range is collapsed.
pub fn set_caret_position(start: &Position, end: Option<&Position>) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    // Get selection
    let selection = match window.get_selection().expect("Could not get selection from window") {
        Some(sel) => sel,
        None => {
            error!("Could not get window selection");
            return;
        },
    };

    // Get the current selection range. Create a new range if necessary.
    let (range, created) = if selection.range_count() == 0 {
        (document.create_range().expect("Could not create range"), true)
    } else {
        (selection.get_range_at(0).expect("Could not get range at index 0"), false)
    };

    // Set range start
    match start {
        Position::After(node) => {
            range.set_start_after(node).expect("Could not set_start_after");
        }
        Position::Offset(node, 0) => {
            range.set_start_before(node).expect("Could not set_start_before");
        }
        Position::Offset(node, offset) => {
            if is_character_data_node(&node) {
                range.set_start(node, *offset).expect("Could not set_start");
            } else {
                range.set_start_after(node).expect("Could not set_start_after");
            }
        }
    }

    // Set range end
    match end {
        Some(Position::After(node)) => {
            range.set_end_after(node).expect("Could not set_end_after");
        }
        Some(Position::Offset(node, 0)) => {
            range.set_end_before(node).expect("Could not set_end_before");
        }
        Some(Position::Offset(node, offset)) => {
            if is_character_data_node(&node) {
                range.set_end(node, *offset).expect("Could not set_start");
            } else {
                range.set_end_after(node).expect("Could not set_end_after");
            }
        }
        None => range.collapse_with_to_start(true),
    }

    if created {
        // Note: This is only true if the current selection contains no ranges.
        //       Otherwise, `add_range` would raise a JS exception.
        selection.add_range(&range).expect("Could not add range");
    }
}

/// Remove all selection ranges from the DOM.
pub fn unset_caret_position() {
    let window = web_sys::window().expect("No global `window` exists");
    let sel = window.get_selection().unwrap().unwrap();
    sel.remove_all_ranges().unwrap();
}

#[cfg(test)]
mod tests {
    use super::*;

    use wasm_bindgen_test::*;

    use crate::utils::setup_test;

    wasm_bindgen_test_configure!(run_in_browser);

    mod get_caret_position {
        use super::*;

        use web_sys::{Document, Element, Text, Range};

        fn _setup_get_caret_pos_test() -> (Document, Element, Text, Element) {
            // Get references to DOM objects
            let window = web_sys::window().expect("No global `window` exists");
            let document = window.document().expect("Should have a document on window");
            let body = document.body().expect("Could not find body");

            // Create <div>hello<img class="emöji" alt="😜"></div>
            let div = document.create_element("div").unwrap();
            div.set_attribute("contenteditable", "true").unwrap();
            let txt = document.create_text_node("hello");
            let img = document.create_element("img").unwrap();
            img.set_attribute("class", "emöji").unwrap();
            img.set_attribute("alt", "😜").unwrap();
            div.append_child(&txt).unwrap();
            div.append_child(&img).unwrap();
            body.append_child(&div).unwrap();

            (document, div, txt, img)
        }

        fn _add_range(range: &Range) {
            let window = web_sys::window().expect("No global `window` exists");
            let sel = window.get_selection().unwrap().unwrap();
            sel.remove_all_ranges().unwrap();
            sel.add_range(range).unwrap();
        }


        #[wasm_bindgen_test]
        fn none() {
            setup_test();

            let (_document, div, _txt, _img) = _setup_get_caret_pos_test();

            unset_caret_position();

            let pos = get_caret_position(&div);
            assert_eq!(pos.start, 0);
            assert_eq!(pos.end, 0);
        }

        #[wasm_bindgen_test]
        fn outside_wrapper() {
            setup_test();

            let (_document, div, _txt, _img) = _setup_get_caret_pos_test();

            // Set caret position relative to body, outside our wrapper
            let window = web_sys::window().expect("No global `window` exists");
            let document = window.document().expect("Should have a document on window");
            let body = document.body().expect("Could not find body");
            let range = document.create_range().unwrap();
            range.set_start(&body, 0).unwrap();
            range.collapse();
            _add_range(&range);

            let pos = get_caret_position(&div);
            assert_eq!(pos.start, 0);
            assert_eq!(pos.end, 0);
        }

        #[wasm_bindgen_test]
        fn in_text() {
            setup_test();

            let (document, div, txt, _img) = _setup_get_caret_pos_test();

            // Set caret position between "e" and "l"
            let range = document.create_range().unwrap();
            range.set_start(&txt, 2).unwrap();
            range.collapse();
            _add_range(&range);

            // Verify caret pos
            let pos = get_caret_position(&div);
            assert_eq!(pos.start, 2);
            assert_eq!(pos.end, 2);
        }

        #[wasm_bindgen_test]
        fn before_img() {
            setup_test();

            let (document, div, _txt, img) = _setup_get_caret_pos_test();

            // Set caret position after the image
            let range = document.create_range().unwrap();
            range.set_start_before(&img).unwrap();
            range.collapse();
            _add_range(&range);

            // Verify caret pos
            let pos = get_caret_position(&div);
            assert_eq!(pos.start, 5);
            assert_eq!(pos.end, 5);
        }

        #[wasm_bindgen_test]
        fn after_img() {
            setup_test();

            let (document, div, _txt, img) = _setup_get_caret_pos_test();

            // Set caret position after the image
            let range = document.create_range().unwrap();
            range.set_start_after(&img).unwrap();
            range.collapse();
            _add_range(&range);

            // Verify caret pos
            let pos = get_caret_position(&div);
            assert_eq!(pos.start, 33);
            assert_eq!(pos.end, 33);
        }
    }
}

