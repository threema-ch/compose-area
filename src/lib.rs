extern crate cfg_if;
extern crate unicode_normalization;
extern crate virtual_dom_rs;
extern crate wasm_bindgen;
extern crate web_sys;

mod keys;
mod state;
mod utils;

use std::cell::RefCell;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use keys::Key;
use state::State;

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

/// Return whether the default event handler should be prevented from running.
#[wasm_bindgen]
pub fn process_key(key_val: &str) -> bool {
    let key = match Key::from_str(key_val) {
        Some(key) => key,
        None => return false,
    };

    STATE.with(|state_cell| {
        let mut state = state_cell.borrow_mut();
        let old_vdom = state.to_virtual_node();
        state.handle_key(key);
        let new_vdom = state.to_virtual_node();
        let patches = virtual_dom_rs::diff(&old_vdom, &new_vdom);

        web_sys::console::log_1(&format!("RS: New state: {:?}", &state).into());
        web_sys::console::log_1(&format!("RS: Patches {:?}", &patches).into());

        set_inner_html("wrapper", &state.to_html());
    });

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
