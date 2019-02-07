use virtual_dom_rs;
use web_sys;

mod keys;
mod state;
mod utils;

use std::cell::RefCell;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use web_sys::{Element, Node, NodeList, Range};

use crate::keys::Key;
use crate::state::{State, Direction};

const WRAPPER_ID: &str = "wrapper";

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::new());
}

#[wasm_bindgen]
pub fn bind_to(id: &str) {
    web_sys::console::log_1(&format!("bind_to {}", id).into());

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let wrapper = document.get_element_by_id(id).expect("did not find element");
    web_sys::console::log_1(&format!("bound to {:?}", wrapper).into());
}

pub fn set_inner_html(id: &str, html: &str) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let wrapper = document.get_element_by_id(id).expect("did not find element");
    wrapper.set_inner_html(html);
}

/// A position relative to a node.
enum Position<'a> {
    After(&'a Node),
    Offset(&'a Node, u32),
}

fn add_range_at(pos: Position) {
    web_sys::console::debug_1(&"add_range_at".into());

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let range: Range = document.create_range().expect("Could not create range");
    match pos {
        Position::After(node) => {
            range.set_start_after(node).expect("Could not set range start after");
            range.set_end_after(node).expect("Could not set range end after");
        }
        Position::Offset(node, 0) => {
            range.set_start_before(node).expect("Could not set range start before");
            range.set_end_before(node).expect("Could not set range end before");
        }
        Position::Offset(node, offset) => {
            range.set_start(node, offset).expect("Could not set range start");
            range.set_end(node, offset).expect("Could not set range end");
        }
    }

    if let Some(sel) = window.get_selection().expect("Could not get selection from window") {
        sel.remove_all_ranges().expect("Could not remove ranges");
        sel.add_range(&range).expect("Could not add range");
    } else {
        // TODO warn
    }
}

fn browser_set_caret_position(wrapper: &Element, state: &State) {
    web_sys::console::debug_1(&"browser_set_caret_position".into());

    let nodes: NodeList = wrapper.child_nodes();
    let node_count = nodes.length();
    assert_eq!(node_count, state.node_count() as u32);

    if let Some(pos) = state.find_start_node(Direction::After) {
        match nodes.get(pos.index as u32) {
            Some(ref node) => add_range_at(Position::Offset(&node, pos.offset as u32)),
            None => { /* TODO */ }
        }
    } else {
        // We're at the end of the node list. Use the latest node.
        match nodes.get(node_count - 1) {
            Some(ref node) => add_range_at(Position::After(&node)),
            None => { /* TODO */ },
        }
    }
}

/// Return whether the default event handler should be prevented from running.
#[wasm_bindgen]
pub fn process_key(key_val: &str) -> bool {
    // Set the panic hook
    utils::set_panic_hook();

    let key = match Key::from_str(key_val) {
        Some(key) => key,
        None => return false,
    };

    STATE.with(|state_cell| {
        // Access state mutably
        let mut state = state_cell.borrow_mut();

        // Get old virtual DOM
        let old_vdom = state.to_virtual_node();

        // Handle input
        state.handle_key(key);

        // Get new virtual DOM
        let new_vdom = state.to_virtual_node();

        // Do the DOM diffing
        let patches = virtual_dom_rs::diff(&old_vdom, &new_vdom);

        web_sys::console::log_1(&format!("RS: New state: {:?}", &state).into());
        web_sys::console::log_1(&format!("RS: Patches {:?}", &patches).into());

        // Patch the current DOM
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");
        let wrapper = document.get_element_by_id(WRAPPER_ID).expect("did not find element");
        virtual_dom_rs::patch(wrapper.clone(), &patches);

        // Update the caret position in the browser
        browser_set_caret_position(&wrapper, &state);
    });

    // We handled the event, so prevent the default event from being handled.
    true
}

/// Set the start and end of the caret position (relative to the HTML).
#[wasm_bindgen]
pub fn update_caret_position(start: usize, end: usize) {
    web_sys::console::log_1(&format!("RS: Update caret position ({}, {})", start, end).into());
    if end < start {
        return;
    }
    STATE.with(|state_cell| {
        let mut state = state_cell.borrow_mut();
        state.set_caret_position(start, end);
    });
}
