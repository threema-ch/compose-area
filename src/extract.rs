use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{Element, HtmlImageElement, Node};

/// Process a DOM node recursively and extract text.
///
/// Convert elements like images to alt text.
#[wasm_bindgen]
pub fn extract_text(root_element: &Element, no_trim: bool) -> String {
    let mut text = String::new();
    visit_child_nodes(root_element, &mut text);
    if no_trim {
        text
    } else {
        text.trim().to_string()
    }
}

/// Used by `extract_text`.
///
/// TODO: This could be optimized by avoiding copies and re-allocations.
fn visit_child_nodes(parent_node: &Element, text: &mut String) {
    let mut last_node_type = "".to_string();
    let children = parent_node.child_nodes();
    for i in 0..children.length() {
        let node = match children.item(i) {
            Some(n) => n,
            None => {
                warn!("visit_child_nodes: Index out of bounds");
                return;
            },
        };
        match node.node_type() {
            Node::TEXT_NODE => {
                if last_node_type == "div" {
                    // A text node following a div should go on a new line
                    text.push('\n');
                }
                last_node_type = "text".to_string();
                let node_value = node.node_value().unwrap_or_else(|| "".into());
                if node_value == "\n" {
                    // Chromium inserts newline text nodes instead of <br>
                    // elements if `white-space: pre / pre-wrap` is used.
                    text.push('\n')
                } else {
                    // Append text, but strip leading and trailing newlines
                    text.push_str(node_value.trim_matches(|c| c == '\n' || c == '\r'));
                }
            }
            Node::ELEMENT_NODE => {
                let element: &Element = node.unchecked_ref();
                let tag = element.tag_name().to_lowercase();
                let last_node_type_clone = last_node_type.clone();
                last_node_type = tag.clone();
                match &*tag {
                    "span" => {
                        visit_child_nodes(element, text);
                    }
                    "div" => {
                        text.push('\n');
                        visit_child_nodes(element, text);
                    }
                    "img" => {
                        if last_node_type_clone == "div" {
                            // An image following a div should go on a new line
                            text.push('\n');
                        }
                        text.push_str(&node.unchecked_ref::<HtmlImageElement>().alt());
                    }
                    "br" => {
                        text.push('\n');
                    }
                    _other => {}
                }
            }
            other => warn!("visit_child_nodes: Unhandled node type: {}", other),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use wasm_bindgen_test::*;

    wasm_bindgen_test_configure!(run_in_browser);

    mod extract_text {
        use super::*;

        use virtual_dom_rs::prelude::*;

        struct ExtractTextTest {
            html: VirtualNode,
            expected: &'static str,
        }

        impl ExtractTextTest {
            fn test(&self) {
                // Get references to DOM objects
                let window = web_sys::window().expect("No global `window` exists");
                let document = window.document().expect("Should have a document on window");

                // Create wrapper element
                let test_wrapper = document.create_element("div").expect("Could not create test wrapper");

                // Write HTML to DOM
                let node: Node = self.html.create_dom_node().node;
                test_wrapper.append_child(&node).expect("Could not append node to test wrapper");

                // Extract and validate text
                let text: String = extract_text(&test_wrapper, false);
                assert_eq!(&text, self.expected);
            }
        }

        #[wasm_bindgen_test]
        fn simple() {
            ExtractTextTest {
                html: html! { Hello World },
                expected: "Hello World",
            }.test();
        }

        #[wasm_bindgen_test]
        fn single_div() {
            ExtractTextTest {
                html: html! { <div>Hello World</div> },
                expected: "Hello World",
            }.test();
        }

        #[wasm_bindgen_test]
        fn single_span() {
            ExtractTextTest {
                html: html! { <span>Hello World</span> },
                expected: "Hello World",
            }.test();
        }

        #[wasm_bindgen_test]
        fn image() {
            ExtractTextTest {
                html: html! { <div>Hello <img src="#" alt="Big">World</div> },
                expected: "Hello BigWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn newline_br() {
            ExtractTextTest {
                html: html! { <div>Hello<br>World</div> },
                expected: "Hello\nWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn newline_single_div_first() {
            ExtractTextTest {
                html: html! { <div><div>Hello</div>World</div> },
                expected: "Hello\nWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn newline_single_div_second() {
            ExtractTextTest {
                html: html! { <div>Hello<div>World</div></div> },
                expected: "Hello\nWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn newline_double_div() {
            ExtractTextTest {
                html: html! { <div><div>Hello</div><div>World</div></div> },
                expected: "Hello\nWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn double_text_node_concat() {
            let mut node = VirtualNode::element("span");
            node.as_velement_mut().unwrap().children.push(VirtualNode::text("Hello\n"));
            node.as_velement_mut().unwrap().children.push(VirtualNode::text("World"));
            ExtractTextTest {
                html: node,
                expected: "HelloWorld",
            }.test();
        }

        #[wasm_bindgen_test]
        fn double_text_node_newline() {
            // Chromium inserts newline text nodes instead of <br>
            // elements if `white-space: pre / pre-wrap` is used.
            let mut node = VirtualNode::element("span");
            node.as_velement_mut().unwrap().children.push(VirtualNode::text("Hello"));
            node.as_velement_mut().unwrap().children.push(VirtualNode::text("\n"));
            node.as_velement_mut().unwrap().children.push(VirtualNode::text("World"));
            ExtractTextTest {
                html: node,
                expected: "Hello\nWorld",
            }.test();
        }
    }
}
