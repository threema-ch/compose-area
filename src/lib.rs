//! Note: This library is not thread safe!

#[macro_use] extern crate log;

mod keys;
mod state;
mod utils;

use std::mem;

use cfg_if::cfg_if;
use virtual_dom_rs::{self, VirtualNode, VElement};
use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{self, Element, Node, NodeList};

use crate::keys::Key;
use crate::state::{State, Direction};
pub use crate::utils::{CaretPosition, get_caret_position, extract_text};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

/// The context object containing the state.
#[wasm_bindgen]
pub struct ComposeArea {
    state: State,
    wrapper_id: String,
}

impl ComposeArea {
    pub fn state_ref(&self) -> &State {
        &self.state
    }

    pub fn state_mut(&mut self) -> &mut State {
        &mut self.state
    }
}

/// Helper function: Wrap the list of virtual nodes in a content editable
/// wrapper element.
fn wrap(virtual_nodes: Vec<VirtualNode>, wrapper_id: &str) -> VirtualNode {
    let mut wrapper = VElement::new("div");
    wrapper.props.insert("id".into(), wrapper_id.to_string());
    wrapper.props.insert("class".into(), "cawrapper initialized".into());
    wrapper.props.insert("contenteditable".into(), "true".into());
    wrapper.children = virtual_nodes;
    wrapper.into()
}

/// Initialize a new compose area wrapper with the specified `id`.
#[wasm_bindgen]
pub fn bind_to(id: &str) -> ComposeArea {
    utils::set_panic_hook();
    utils::init_log();

    info!("Bind to #{}", id);

    let window = web_sys::window().expect("No global `window` exists");
    let document = window.document().expect("Should have a document on window");
    let wrapper: Element = document.get_element_by_id(id).expect("Did not find element");

    // Initialize the wrapper element with the initial empty DOM.
    // This prevents the case where the wrapper element is not initialized as
    // it should be, which can lead to funny errors when patching.
    let state = State::new();
    let initial_vdom: VirtualNode = wrap(state.to_virtual_nodes(), id);
    let initial_dom: Node = initial_vdom.create_dom_node().node;
    wrapper.replace_with_with_node_1(&initial_dom).expect("Could not initialize wrapper");
    mem::forget(wrapper); // Has been replaced, dead DOM reference

    // Initialize caret position
    _set_caret_position_from_state(
        initial_dom.unchecked_ref::<Element>(),
        &state,
    );

    info!("Initialized #{}", id);

    ComposeArea {
        state,
        wrapper_id: id.to_owned(),
    }
}

/// A position relative to a node.
#[derive(Debug)]
enum Position<'a> {
    After(&'a Node),
    Offset(&'a Node, u32),
}

/// Update the current selection range to match the specified `Position`.
fn add_range_at(pos: Position) {
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

    match pos {
        Position::After(node) => {
            range.set_start_after(node).expect("Could not set_start_after");
            range.collapse();
        }
        Position::Offset(node, 0) => {
            range.set_start_before(node).expect("Could not set_range_before");
            range.collapse();
        }
        Position::Offset(node, offset) => {
            range.set_start(node, offset).expect("Could not set_start");
            range.collapse();
        }
    }

    if created {
        // Note: This is only true if the current selection contains no ranges.
        //       Otherwise, `add_range` would raise a JS exception.
        selection.add_range(&range).expect("Could not add range");
    }
}

/// Set the caret position in the browser using the specified state.
///
/// This will only work if the wrapper element has been properly initialized,
/// matches the state and contains the trailing newline element.
///
/// Note: This function is only public for testing purposes.
pub fn _set_caret_position_from_state(wrapper: &Element, state: &State) {
    let nodes: NodeList = wrapper.child_nodes();
    let dom_node_count = nodes.length();

    // Note: We need to be careful here, because the node list will contain 1
    //       more entry than the nodes in the state object, because a trailing
    //       <br> will always be appended to the DOM nodes.
    let state_node_count = state.node_count();
    assert_eq!(dom_node_count, state_node_count as u32 + 1, "Unexpected node count");

    if state_node_count == 0 {
        // No state nodes. Only one DOM node.
        match nodes.get(0) {
            Some(ref node) => add_range_at(Position::Offset(&node, 0)),
            None => unreachable!("Trailing <br> node not found"),
        }
    } else if let Some(pos) = state.find_start_node(Direction::After) {
        match nodes.get(pos.index as u32) {
            Some(ref node) => add_range_at(Position::Offset(&node, pos.offset as u32)),
            None => unreachable!(format!("Node at index {} not found", pos.index)),
        }
    } else {
        // We're at the end of the state node list.
        // Use the second-to-last node (since the last node is the <br> element.
        let index = dom_node_count - 1 /* 0 based indexing */ - 1 /* <br> element */;
        match nodes.get(index) {
            Some(ref node) => add_range_at(Position::After(&node)),
            None => unreachable!(format!("Node at index {} not found", index)),
        }
    }
}

#[wasm_bindgen]
impl ComposeArea {

    /// Return a reference to the wrapper element.
    fn get_wrapper(&self) -> Element {
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");
        document.get_element_by_id(&self.wrapper_id).expect("did not find element")
    }

    /// Update the internal state and patch the DOM with the changes.
    fn update_state<F>(&mut self, mutate_state: F) where F: FnOnce(&mut State) {
        // Get old virtual DOM
        let old_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        mutate_state(&mut self.state);

        // Get new virtual DOM
        let new_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        // Do the DOM diffing
        let patches = virtual_dom_rs::diff(&old_vdom, &new_vdom);

        // Patch the current DOM
        let wrapper = self.get_wrapper();
        virtual_dom_rs::patch(wrapper.clone(), &patches)
            .expect("Patching the DOM failed!");

        // Update the caret position in the browser
        _set_caret_position_from_state(&wrapper, &self.state);
    }

    /// Handle the specified key.
    ///
    /// Return whether the default keyup event handler should be prevented from running.
    pub fn process_key(&mut self, key_val: &str) -> bool {
        debug!("WASM: process_key ({})", key_val);

        // Validate and parse key value
        if key_val.len() == 0 {
            warn!("process_key: No key value provided");
            return false;
        }
        let key = match Key::from_str(key_val) {
            Some(key) => key,
            None => return false,
        };

        self.update_state(|state| {
            state.handle_key(key);
        });

        // We handled the event, so prevent the default event from being handled.
        true
    }

    /// Insert an image.
    pub fn insert_image(&mut self, src: String, alt: String, cls: String) {
        debug!("WASM: insert_image ({})", &alt);
        self.update_state(|state| {
            state.insert_image(src, alt, cls);
        });
    }

    /// Insert plain text.
    pub fn insert_text(&mut self, text: String) {
        debug!("WASM: insert_text ({})", &text);
        self.update_state(|state| {
            state.insert_text(&text);
        });
    }

    /// Remove the current selection from the state.
    ///
    /// If the `patch_dom` parameter is set to `true`, then the DOM is also
    /// updated (followed by a caret position refresh), otherwise it's not modified.
    pub fn remove_selection(&mut self, patch_dom: bool) {
        debug!("WASM: remove_selection");

        // Make sure that we really know the current selection.
        self.update_caret_position();

        // Update state and - depending on the arguments - the DOM.
        if patch_dom {
            self.update_state(|state| {
                state.remove_selection();
            });
        } else {
            self.state.remove_selection();
        }
    }

    /// Update the caret position.
    ///
    /// Read the actual position from the DOM using the selection API and then
    /// overwrite the caret position in the state object.
    ///
    /// Call this after every action that might have modified the DOM.
    pub fn update_caret_position(&mut self) {
        debug!("WASM: update_caret_position");

        // Refresh caret pos
        let wrapper = self.get_wrapper();
        let pos = get_caret_position(&wrapper);
        if pos.success {
            assert!(pos.start <= pos.end);
            self.state.set_caret_position(pos.start as usize, pos.end as usize);
        }
    }
}
