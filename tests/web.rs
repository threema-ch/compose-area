//! Test suite for the Web and headless browsers.
#![cfg(target_arch = "wasm32")]

use wasm_bindgen_test::*;

mod helpers;

const WRAPPER_ID: &str = "testwrapper";

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn testing_works() {
    assert_eq!(1 + 1, 2);
}

#[wasm_bindgen_test]
fn test_bind_to() {
    let document = helpers::setup_compose_area_test(WRAPPER_ID);

    // Initial empty wrapper
    let wrapper_before = helpers::get_wrapper(&document, WRAPPER_ID);
    assert_eq!(wrapper_before.outer_html(), format!("<div id=\"{}\"></div>", WRAPPER_ID));

    let _area = compose_area::bind_to(WRAPPER_ID);

    // Initialized wrapper
    let wrapper_after = helpers::get_wrapper(&document, WRAPPER_ID);
    assert_eq!(wrapper_after.class_name(), "cawrapper initialized");
    assert_eq!(wrapper_after.get_attribute("contenteditable").unwrap(), "true");
}

struct KeyHtmlTest {
    keys: Vec<&'static str>,
    expected: &'static str,
}

impl KeyHtmlTest {
    fn test(&self) {
        // Initialize
        let document = helpers::setup_compose_area_test(WRAPPER_ID);
        let mut area = compose_area::bind_to(WRAPPER_ID);

        // Send keys
        for key in self.keys.iter() {
            area.process_key(&key);
        }

        // Ensure correct inner HTML
        let wrapper = helpers::get_wrapper(&document, WRAPPER_ID);
        assert_eq!(wrapper.inner_html(), self.expected);
    }
}

#[wasm_bindgen_test]
fn test_insert_text() {
    KeyHtmlTest {
        keys: vec!["a", "b", "c"],
        expected: "abc<br>",
    }.test();
}

#[wasm_bindgen_test]
fn test_insert_newline() {
    KeyHtmlTest {
        keys: vec!["a", "b", "Enter"],
        expected: "ab<br><br>",
    }.test();
}

#[wasm_bindgen_test]
fn test_remove_character() {
    KeyHtmlTest {
        keys: vec!["a", "b", "c", "Backspace"],
        expected: "ab<br>",
    }.test();
}

#[wasm_bindgen_test]
fn test_remove_newline() {
    KeyHtmlTest {
        keys: vec!["a", "b", "Enter", "Backspace"],
        expected: "ab<br>",
    }.test();
}
