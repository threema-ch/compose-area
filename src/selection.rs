/// Everything related to the caret position and DOM selection ranges.

use web_sys::{Node, Range};

use crate::utils::is_character_data_node;

/// A position relative to a node.
#[derive(Debug)]
pub enum Position<'a> {
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

    Some(range)
}
