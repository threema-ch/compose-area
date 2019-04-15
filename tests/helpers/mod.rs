use log::Level;
use virtual_dom_rs::VirtualNode;

/// Setup function that should be called by all tests.
pub(crate) fn setup_test() {
    // Initialize console logger, ignore errors. (Errors occur if the logger is
    // initialized multiple times, we can ignore that.)
    let _ = console_log::init_with_level(Level::Trace);
}

/// Set up the compose area test. Return reference to document.
pub(crate) fn setup_compose_area_test(wrapper_id: &str) -> web_sys::Document {
    // Get references to DOM objects
    let window = web_sys::window().expect("No global `window` exists");
    let document = window.document().expect("Should have a document on window");
    let body = document.body().expect("Could not find body");

    // Make sure to remove any existing wrapper elements
    if let Some(old_wrapper_element) = document.get_element_by_id(wrapper_id) {
        old_wrapper_element.remove();
    }

    // Clear any selections
    unset_caret_position();

    // Insert wrapper element into DOM
    let wrapper = {
        let mut div = VirtualNode::element("div");
        div.as_velement_mut().unwrap().attrs.insert("id".to_string(), wrapper_id.to_string());
        div
    };
    body.append_child(&wrapper.create_dom_node()).expect("Could not append node to body");

    // Ensure that wrapper was created
    let wrapper_element = document.get_element_by_id(wrapper_id).unwrap();
    assert_eq!(wrapper_element.outer_html(), format!("<div id=\"{}\"></div>", wrapper_id));

    document
}

/// Return the wrapper DOM element.
pub(crate) fn get_wrapper(document: &web_sys::Document, wrapper_id: &str) -> web_sys::Element {
    document.get_element_by_id(wrapper_id).expect("Could not find wrapper element")
}

/// Remove all selection ranges from the DOM.
pub(crate) fn unset_caret_position() {
    let window = web_sys::window().expect("No global `window` exists");
    let sel = window.get_selection().unwrap().unwrap();
    sel.remove_all_ranges().unwrap();
}
