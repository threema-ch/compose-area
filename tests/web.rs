//! Test suite for the Web and headless browsers.
#![cfg(target_arch = "wasm32")]
#![feature(proc_macro_hygiene)]

use compose_area::ComposeArea;
use wasm_bindgen_test::*;

mod helpers;

use helpers::{setup_test, setup_compose_area_test};

const WRAPPER_ID: &str = "testwrapper";

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_bind_to() {
    setup_test();
    let document = setup_compose_area_test(WRAPPER_ID);

    // Initial empty wrapper
    let wrapper_before = helpers::get_wrapper(&document, WRAPPER_ID);
    assert_eq!(wrapper_before.outer_html(), format!("<div id=\"{}\"></div>", WRAPPER_ID));

    let wrapper = document.get_element_by_id(WRAPPER_ID).unwrap();
    ComposeArea::bind_to(wrapper);

    // Initialized wrapper
    let wrapper_after = helpers::get_wrapper(&document, WRAPPER_ID);
    assert_eq!(wrapper_after.class_name(), "cawrapper initialized");
    assert_eq!(wrapper_after.get_attribute("contenteditable").unwrap(), "true");
}
