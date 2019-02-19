//! Test suite for the Web and headless browsers.
#![cfg(target_arch = "wasm32")]
#![feature(proc_macro_hygiene)]

use wasm_bindgen_test::*;

use virtual_dom_rs::{html, text, VirtualNode};

mod helpers;

use helpers::{KeyHtmlTest, ExtractTextTest};

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

#[wasm_bindgen_test]
fn test_insert_text() {
    KeyHtmlTest {
        keys: vec!["a", "b", "c"],
        expected: "abc<br>",
    }.test(WRAPPER_ID);
}

#[wasm_bindgen_test]
fn test_insert_newline() {
    KeyHtmlTest {
        keys: vec!["a", "b", "Enter"],
        expected: "ab<br><br>",
    }.test(WRAPPER_ID);
}

#[wasm_bindgen_test]
fn test_remove_character() {
    KeyHtmlTest {
        keys: vec!["a", "b", "c", "Backspace"],
        expected: "ab<br>",
    }.test(WRAPPER_ID);
}

#[wasm_bindgen_test]
fn test_remove_newline() {
    KeyHtmlTest {
        keys: vec!["a", "b", "Enter", "Backspace"],
        expected: "ab<br>",
    }.test(WRAPPER_ID);
}

#[wasm_bindgen_test]
fn test_remove_last_char() {
    KeyHtmlTest {
        keys: vec!["a", "Backspace"],
        expected: "<br>",
    }.test(WRAPPER_ID);
}

#[wasm_bindgen_test]
fn test_delete_nothing() {
    KeyHtmlTest {
        keys: vec!["Backspace"],
        expected: "<br>",
    }.test(WRAPPER_ID);
}

/// Remove a character that has 1 byte in UTF-16 but two bytes in UTF-8.
///
/// This fails if UTF-16 is not handled properly.
#[wasm_bindgen_test]
fn test_remove_multibyte() {
    KeyHtmlTest {
        keys: vec!["ü", "Backspace"],
        expected: "<br>",
    }.test(WRAPPER_ID);
}

/// Ensure that nothing panics when setting the caret position with empty state.
#[wasm_bindgen_test]
fn test_set_caret_position_from_state_when_empty() {
    // Initialize
    let document = helpers::setup_compose_area_test(WRAPPER_ID);
    let mut area = compose_area::bind_to(WRAPPER_ID);
    let wrapper = helpers::get_wrapper(&document, WRAPPER_ID);

    // Check initial position
    let pos1 = compose_area::get_caret_position(&wrapper);
    assert_eq!(pos1.start, 0, "Wrong intial start");
    assert_eq!(pos1.end, 0, "Wrong intial end");

    // Create state
    let state = area.state_mut();

    // Update position
    state.set_caret_position(0, 0);
    compose_area::_set_caret_position_from_state(&wrapper, state);

    // Check new position
    let pos2 = compose_area::get_caret_position(&wrapper);
    assert_eq!(pos2.start, 0, "Wrong start 2");
    assert_eq!(pos2.end, 0, "Wrong end 2");

    // Set position that's too large
    state.set_caret_position(99, 99);
    compose_area::_set_caret_position_from_state(&wrapper, state);

    // Check final position
    let pos3 = compose_area::get_caret_position(&wrapper);
    assert_eq!(pos3.start, 0, "Wrong start 3");
    assert_eq!(pos3.end, 0, "Wrong end 3");
}

#[wasm_bindgen_test]
fn extract_text_simple() {
    ExtractTextTest {
        html: html! { Hello World },
        expected: "Hello World",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_single_div() {
    ExtractTextTest {
        html: html! { <div> Hello World </div> },
        expected: "Hello World",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_single_span() {
    ExtractTextTest {
        html: html! { <span> Hello World </span> },
        expected: "Hello World",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_image() {
    let hello = text!("Hello ");
    ExtractTextTest {
        html: html! { <div> {hello} <img src="#" alt="Big"> World </div> },
        expected: "Hello BigWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_br() {
    ExtractTextTest {
        html: html! { <div> Hello <br> World </div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_single_div_first() {
    ExtractTextTest {
        html: html! { <div> <div>Hello</div> World </div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_single_div_second() {
    ExtractTextTest {
        html: html! { <div> Hello <div>World</div> </div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_double_div() {
    ExtractTextTest {
        html: html! { <div> <div>Hello</div> <div>World</div> </div> },
        expected: "Hello\nWorld",
    }.test();
}
