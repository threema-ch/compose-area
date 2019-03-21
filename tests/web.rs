//! Test suite for the Web and headless browsers.
#![cfg(target_arch = "wasm32")]
#![feature(proc_macro_hygiene)]

use wasm_bindgen_test::*;

use virtual_dom_rs::prelude::*;

mod helpers;

use helpers::{
    ExtractTextTest,
    KeyHtmlTest,
    setup_compose_area_test,
    setup_test,
    unset_caret_position,
};

const WRAPPER_ID: &str = "testwrapper";

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn testing_works() {
    assert_eq!(1 + 1, 2);
}

#[wasm_bindgen_test]
fn test_bind_to() {
    let document = setup_compose_area_test(WRAPPER_ID);

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
fn set_caret_position_from_state_when_empty() {
    // Initialize
    let document = setup_compose_area_test(WRAPPER_ID);
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
        html: html! { <div>Hello World</div> },
        expected: "Hello World",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_single_span() {
    ExtractTextTest {
        html: html! { <span>Hello World</span> },
        expected: "Hello World",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_image() {
    ExtractTextTest {
        html: html! { <div>Hello <img src="#" alt="Big">World</div> },
        expected: "Hello BigWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_br() {
    ExtractTextTest {
        html: html! { <div>Hello<br>World</div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_single_div_first() {
    ExtractTextTest {
        html: html! { <div><div>Hello</div>World</div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_single_div_second() {
    ExtractTextTest {
        html: html! { <div>Hello<div>World</div></div> },
        expected: "Hello\nWorld",
    }.test();
}

#[wasm_bindgen_test]
fn extract_text_newline_double_div() {
    ExtractTextTest {
        html: html! { <div><div>Hello</div><div>World</div></div> },
        expected: "Hello\nWorld",
    }.test();
}

fn _setup_get_caret_pos_test() -> (web_sys::Document, web_sys::Element, web_sys::Text, web_sys::Element) {
    // Get references to DOM objects
    let window = web_sys::window().expect("No global `window` exists");
    let document = window.document().expect("Should have a document on window");
    let body = document.body().expect("Could not find body");

    // Create <div>hello<img class="emöji" alt="😜"></div>
    let div = document.create_element("div").unwrap();
    div.set_attribute("contenteditable", "true").unwrap();
    let txt = document.create_text_node("hello");
    let img = document.create_element("img").unwrap();
    img.set_attribute("class", "emöji").unwrap();
    img.set_attribute("alt", "😜").unwrap();
    div.append_child(&txt).unwrap();
    div.append_child(&img).unwrap();
    body.append_child(&div).unwrap();

    (document, div, txt, img)
}

fn _add_range(range: &web_sys::Range) {
    let window = web_sys::window().expect("No global `window` exists");
    let sel = window.get_selection().unwrap().unwrap();
    sel.remove_all_ranges().unwrap();
    sel.add_range(range).unwrap();
}


#[wasm_bindgen_test]
fn get_caret_position_none() {
    setup_test();

    let (_document, div, _txt, _img) = _setup_get_caret_pos_test();

    unset_caret_position();

    let pos = compose_area::get_caret_position(&div);
    assert_eq!(pos.start, 0);
    assert_eq!(pos.end, 0);
}

#[wasm_bindgen_test]
fn get_caret_position_outside_wrapper() {
    setup_test();

    let (_document, div, _txt, _img) = _setup_get_caret_pos_test();

    // Set caret position relative to body, outside our wrapper
    let window = web_sys::window().expect("No global `window` exists");
    let document = window.document().expect("Should have a document on window");
    let body = document.body().expect("Could not find body");
    let range = document.create_range().unwrap();
    range.set_start(&body, 0).unwrap();
    range.collapse();
    _add_range(&range);

    let pos = compose_area::get_caret_position(&div);
    assert_eq!(pos.start, 0);
    assert_eq!(pos.end, 0);
}

#[wasm_bindgen_test]
fn get_caret_position_in_text() {
    setup_test();

    let (document, div, txt, _img) = _setup_get_caret_pos_test();

    // Set caret position between "e" and "l"
    let range = document.create_range().unwrap();
    range.set_start(&txt, 2).unwrap();
    range.collapse();
    _add_range(&range);

    // Verify caret pos
    let pos = compose_area::get_caret_position(&div);
    assert_eq!(pos.start, 2);
    assert_eq!(pos.end, 2);
}

#[wasm_bindgen_test]
fn get_caret_position_before_img() {
    setup_test();

    let (document, div, _txt, img) = _setup_get_caret_pos_test();

    // Set caret position after the image
    let range = document.create_range().unwrap();
    range.set_start_before(&img).unwrap();
    range.collapse();
    _add_range(&range);

    // Verify caret pos
    let pos = compose_area::get_caret_position(&div);
    assert_eq!(pos.start, 5);
    assert_eq!(pos.end, 5);
}

#[wasm_bindgen_test]
fn get_caret_position_after_img() {
    setup_test();

    let (document, div, _txt, img) = _setup_get_caret_pos_test();

    // Set caret position after the image
    let range = document.create_range().unwrap();
    range.set_start_after(&img).unwrap();
    range.collapse();
    _add_range(&range);

    // Verify caret pos
    let pos = compose_area::get_caret_position(&div);
    assert_eq!(pos.start, 33);
    assert_eq!(pos.end, 33);
}
