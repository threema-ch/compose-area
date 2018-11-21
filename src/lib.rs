extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

mod state;
mod utils;

use std::cell::RefCell;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

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

    wrapper.set_inner_html("<p><strong>Hello from Rust</strong></p>");
}

#[wasm_bindgen]
pub fn process_key(key: &str) -> String {
    let mut out = "-".to_string();
    STATE.with(|state_cell| {
        let mut state = state_cell.borrow_mut();
        state.add_text(key.to_string());
        out = format!("State: {:?}", state);
    });
    out
}
