use virtual_dom_rs::VirtualNode;


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

    // Insert wrapper element into DOM
    let wrapper = {
        let mut div = VirtualNode::element("div");
        div.as_velement_mut().unwrap().props.insert("id".to_string(), wrapper_id.to_string());
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
