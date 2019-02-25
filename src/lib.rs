//! Note: This library is not thread safe!

#[macro_use] extern crate log;

mod keys;
mod state;
mod utils;

use std::mem;

use cfg_if::cfg_if;
use virtual_dom_rs::{self, VirtualNode, VElement};
use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{self, Element, Node, NodeList, Range};

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

fn add_range_at(pos: Position) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let range: Range = document.create_range().expect("Could not create range");
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

    if let Some(sel) = window.get_selection().expect("Could not get selection from window") {
        sel.remove_all_ranges().expect("Could not remove ranges");
        sel.add_range(&range).expect("Could not add range");
    } else {
        warn!("Could not get window selection");
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

    /// Handle the specified key.
    ///
    /// Return whether the default keyup event handler should be prevented from running.
    pub fn process_key(&mut self, key_val: &str) -> bool {
        debug!("\n# Process key: {}", &key_val);

        // Validate and parse key value
        if key_val.len() == 0 {
            warn!("process_key: No key value provided");
            return false;
        }
        let key = match Key::from_str(key_val) {
            Some(key) => key,
            None => return false,
        };

        // Get access to wrapper element
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");
        let wrapper = document.get_element_by_id(&self.wrapper_id).expect("did not find element");

        // Get old virtual DOM
        let old_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        // Handle input
        self.state.handle_key(key);

        // Get new virtual DOM
        let new_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        // Do the DOM diffing
        let patches = virtual_dom_rs::diff(&old_vdom, &new_vdom);

        // Patch the current DOM
        virtual_dom_rs::patch(wrapper.clone(), &patches);

        // Update the caret position in the browser
        _set_caret_position_from_state(&wrapper, &self.state);

        // We handled the event, so prevent the default event from being handled.
        true
    }

    /// Insert an image.
    pub fn insert_image(&mut self, src: String, alt: String, cls: String) {
        debug!("\n# Insert image: {}", &alt);

        // Get access to wrapper element
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");
        let wrapper = document.get_element_by_id(&self.wrapper_id).expect("did not find element");

        // Get old virtual DOM
        let old_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        // Handle image
        self.state.insert_image(src, alt, cls);

        // Get new virtual DOM
        let new_vdom = wrap(self.state.to_virtual_nodes(), &self.wrapper_id);

        // Do the DOM diffing
        let patches = virtual_dom_rs::diff(&old_vdom, &new_vdom);

        // Patch the current DOM
        virtual_dom_rs::patch(wrapper.clone(), &patches);

        // Update the caret position in the browser
        _set_caret_position_from_state(&wrapper, &self.state);
    }

    /// Update the caret position.
    ///
    /// Call this after every action that might have modified the DOM.
    pub fn update_caret_position(&mut self) {
        // Get access to wrapper element
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");
        let wrapper = document.get_element_by_id(&self.wrapper_id).expect("did not find element");

        // Refresh caret pos
        let pos = get_caret_position(&wrapper);
        assert!(pos.start <= pos.end);
        self.state.set_caret_position(pos.start as usize, pos.end as usize);
    }
}
