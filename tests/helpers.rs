use std::cell::RefCell;

use virtual_dom_rs::VirtualNode;
use web_sys::Node;

thread_local! {
    pub static COUNTER: RefCell<u32> = RefCell::new(0);
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

pub(crate) struct KeyHtmlTest {
    pub(crate) keys: Vec<&'static str>,
    pub(crate) expected: &'static str,
}

impl KeyHtmlTest {
    pub(crate) fn test(&self, wrapper_id: &str) {
        // Initialize
        let document = setup_compose_area_test(wrapper_id);
        let mut area = compose_area::bind_to(wrapper_id);

        // Send keys
        for key in self.keys.iter() {
            area.process_key(&key);
        }

        // Ensure correct inner HTML
        let wrapper = get_wrapper(&document, wrapper_id);
        assert_eq!(wrapper.inner_html(), self.expected);
    }
}

pub(crate) struct ExtractTextTest {
    pub(crate) html: VirtualNode,
    pub(crate) expected: &'static str,
}

impl ExtractTextTest {
    pub(crate) fn test(&self) {
        // Get references to DOM objects
        let window = web_sys::window().expect("No global `window` exists");
        let document = window.document().expect("Should have a document on window");

        // Create wrapper element
        let id = COUNTER.with(|c| {
            let mut c_val = c.borrow_mut();
            *c_val += 1;
            format!("extract-text-test-{}", c_val)
        });
        let test_wrapper = document.create_element(&id).expect("Could not create test wrapper");

        // Write HTML to DOM
        let node: Node = self.html.create_dom_node().node;
        test_wrapper.append_child(&node).expect("Could not append node to test wrapper");

        // Extract and validate text
        let text: String = compose_area::extract_text(&test_wrapper, false);
        assert_eq!(&text, self.expected);
    }
}
