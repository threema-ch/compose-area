/// Everything related to the caret position and DOM selection ranges.

use wasm_bindgen::JsCast;
use web_sys::{Node, Range, Text};

/// A position relative to a node.
#[derive(Debug)]
pub enum Position<'a> {
    /// Caret position is before the selected node.
    #[allow(dead_code)]  // Needed in tests
    Before(&'a Node),

    /// Caret position is after the selected node.
    After(&'a Node),

    /// Caret position is at the specified offset from the start of the node.
    #[allow(dead_code)]
    Offset(&'a Node, u32),
}

/// Update the current selection range to match the specified `Position`.
///
/// If the `end` parameter is `None`, then the selection range is collapsed.
///
/// Return a reference to the created / updated range.
pub fn set_selection_range(start: &Position, end: Option<&Position>) -> Option<Range> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    // Get selection
    let selection = match window.get_selection().expect("Could not get selection from window") {
        Some(sel) => sel,
        None => {
            error!("Could not get window selection");
            return None;
        },
    };

    // Get the current selection range. Create a new range if necessary.
    let range = if selection.range_count() == 0 {
        document.create_range().expect("Could not create range")
    } else {
        selection.get_range_at(0).expect("Could not get range at index 0")
    };

    // Set range start
    match start {
        Position::After(node) => {
            range.set_start_after(node).expect("Could not set_start_after");
        }
        Position::Before(node) => {
            range.set_start_before(node).expect("Could not set_start_before");
        }
        Position::Offset(node, offset) => {
            range.set_start(node, *offset).expect("Could not set_start");
        }
    }

    // Set range end
    match end {
        Some(Position::After(node)) => {
            range.set_end_after(node).expect("Could not set_end_after");
        }
        Some(Position::Before(node)) => {
            range.set_end_before(node).expect("Could not set_end_before");
        }
        Some(Position::Offset(node, offset)) => {
            range.set_end(node, *offset).expect("Could not set_start");
        }
        None => range.collapse_with_to_start(true),
    }

    // Note: In theory we don't need to re-add the range to the document if
    //       it's already there. Unfortunately, Safari is not spec-compliant
    //       and returns a copy of the range instead of a reference when using
    //       selection.getRangeAt(). Thus, we need to remove the existing
    //       ranges and (re-)add our range to the DOM.
    //
    //       See https://bugs.webkit.org/show_bug.cgi?id=145212
    selection.remove_all_ranges().unwrap();
    selection.add_range(&range).expect("Could not add range");

    Some(range)
}

#[cfg(test)]
pub fn unset_selection_range() {
    let window = web_sys::window().expect("No global `window` exists");
    let sel = window.get_selection().unwrap().unwrap();
    sel.remove_all_ranges().unwrap();
}

/// This function will check whether the current selection range is adjacent to
/// a text node. It will then modify the range so that the `startContainer` is
/// that text node.
///
/// If the selection is not directly preceding a text node or within a text
/// node with offset 0, `false` will be returned and the range will not be
/// modified.
///
/// Non-collapsed ranges will be immediately rejected.
///
/// Examples of ranges (denoted with the `|`) that are successfully modified:
///
/// - `"|abc"` -> `"|abc"`
/// - `"ab|c"` -> `"ab|c"`
/// - `"abc|"` -> `"abc|"`
/// - `"abc"|` -> `"abc|"`
/// - `<span>"abc"|<span>` -> `<span>"abc|"</span>`
///
/// Examples of ranges where `false` will be returned:
///
/// - `<span>|"abc"</span>`
/// - `<span>"abc"</span>|`
/// - `<span>"abc"<img>|</span>
/// - `<span>"abc"<span></span>|</span>
///
pub fn glue_range_to_text(range: &mut Range) -> bool {
    // Reject non-collapsed ranges
    if !range.collapsed() {
        return false;
    }

    // Determine node type of container
    let container = range.start_container().expect("Could not get start container");
    match container.node_type() {
        Node::TEXT_NODE => true,
        Node::ELEMENT_NODE => {
            let offset: u32 = range.start_offset().expect("Could not get start offset");
            if offset == 0 {
                false
            } else if let Some(prev_sibling) = container.child_nodes().get(offset - 1) {
                if prev_sibling.node_type() == Node::TEXT_NODE {
                    let length = prev_sibling.dyn_ref::<Text>().unwrap().length();
                    range.set_start(&prev_sibling, length).expect("Could not set_start");
                    range.collapse_with_to_start(true);
                    true
                } else {
                    false
                }
            } else {
                true
            }
        }
        _ => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use wasm_bindgen_test::*;
    use web_sys::Document;

    fn document() -> Document {
        // Get references
        let window = web_sys::window().expect("No global `window` exists");
        window.document().expect("Should have a document on window")
    }

    mod glue_range_to_text {
        use super::*;

        /// "hell|o"
        #[wasm_bindgen_test]
        fn in_text_node() {
            let node = document().create_text_node("hello");
            let mut range = document().create_range().unwrap();
            range.set_start(&node, 4).unwrap();
            range.collapse_with_to_start(true);

            assert!(glue_range_to_text(&mut range));
            assert_eq!(range.start_offset().unwrap(), 4);
        }

        /// "|hello"
        #[wasm_bindgen_test]
        fn at_start_of_text_node() {
            let node = document().create_text_node("hello");
            let mut range = document().create_range().unwrap();
            range.set_start(&node, 0).unwrap();
            range.collapse_with_to_start(true);

            assert!(glue_range_to_text(&mut range));
            assert_eq!(range.start_offset().unwrap(), 0);
        }

        /// <div>"hello"|</div>
        #[wasm_bindgen_test]
        fn after_text_node() {
            let div = document().create_element("div").unwrap();
            let node = document().create_text_node("hello");
            div.append_child(&node).unwrap();
            let mut range = document().create_range().unwrap();
            range.set_start_after(&node).unwrap();
            range.collapse_with_to_start(true);
            assert_eq!(range.start_offset().unwrap(), 1);
            assert_eq!(range.end_offset().unwrap(), 1);

            assert!(glue_range_to_text(&mut range));
            assert_eq!(range.start_offset().unwrap(), 5);
            assert_eq!(range.end_offset().unwrap(), 5);
        }

        #[wasm_bindgen_test]
        fn not_collapsed() {
            let node = document().create_text_node("hello");
            let mut range = document().create_range().unwrap();
            range.set_start(&node, 2).unwrap();
            range.set_end(&node, 3).unwrap();

            // Fails
            assert!(!glue_range_to_text(&mut range));

            // Unmodified
            assert_eq!(range.start_offset().unwrap(), 2);
            assert_eq!(range.end_offset().unwrap(), 3);
        }

        /// <div>|"hello"</div>
        #[wasm_bindgen_test]
        fn before_text() {
            let div = document().create_element("div").unwrap();
            let text = document().create_text_node("hello");
            div.append_child(&text).unwrap();

            let mut range = document().create_range().unwrap();
            range.set_start_before(&text).unwrap();
            range.collapse_with_to_start(true);

            // Fails
            assert!(!glue_range_to_text(&mut range));
        }

        /// <div>"hello"<img/>|</div>
        #[wasm_bindgen_test]
        fn after_inner_element() {
            let div = document().create_element("div").unwrap();
            let img = document().create_element("img").unwrap();
            let text = document().create_text_node("hello");
            div.append_child(&text).unwrap();
            div.append_child(&img).unwrap();

            let mut range = document().create_range().unwrap();
            range.set_start_after(&img).unwrap();
            range.collapse_with_to_start(true);

            // Fails
            assert!(!glue_range_to_text(&mut range));
        }

        /// <div><span>"hello"</span>|</div>
        #[wasm_bindgen_test]
        fn after_outer_element() {
            let div = document().create_element("div").unwrap();
            let span = document().create_element("span").unwrap();
            let text = document().create_text_node("hello");
            span.append_child(&text).unwrap();
            div.append_child(&span).unwrap();

            let mut range = document().create_range().unwrap();
            range.set_start_after(&span).unwrap();
            range.collapse_with_to_start(true);

            // Fails
            assert!(!glue_range_to_text(&mut range));
        }
    }
}
