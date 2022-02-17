use wasm_bindgen::JsCast;
use web_sys::{Element, HtmlImageElement, Node};

/// Process a DOM node recursively and extract text.
///
/// Convert elements like images to alt text.
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
    let mut prev_node_type = "".to_string();
    let children = parent_node.child_nodes();
    for i in 0..children.length() {
        let node = match children.item(i) {
            Some(n) => n,
            None => {
                warn!("visit_child_nodes: Index out of bounds");
                return;
            }
        };
        match node.node_type() {
            Node::TEXT_NODE => {
                if prev_node_type == "div" {
                    // A text node following a div should go on a new line
                    text.push('\n');
                }
                prev_node_type = "text".to_string();
                // Append text, but strip leading and trailing newlines
                if let Some(ref val) = node.node_value() {
                    text.push_str(val);
                }
            }
            Node::ELEMENT_NODE => {
                let element: &Element = node.unchecked_ref();
                let tag = element.tag_name().to_lowercase();
                let parent_tag = parent_node.tag_name().to_lowercase();
                let prev_node_type_clone = prev_node_type.clone();
                prev_node_type = tag.clone();
                // Please note: Browser rendering of a contenteditable div is the worst thing ever.
                match &*tag {
                    "span" => {
                        visit_child_nodes(element, text);
                    }
                    "div" => {
                        if parent_tag == "div" && i == 0 {
                            // No newline, in order to handle things like <div><div>hello</div></div>
                        } else {
                            text.push('\n');
                        }
                        visit_child_nodes(element, text);
                    }
                    "img" => {
                        if prev_node_type_clone == "div" {
                            // An image following a div should go on a new line
                            text.push('\n');
                        }
                        text.push_str(&node.unchecked_ref::<HtmlImageElement>().alt());
                    }
                    "br" => {
                        if parent_tag == "div" && i == 0 {
                            // A <br> as the first child of a <div> should not result in an
                            // *additional* newline (a newline is already added when the div
                            // started).
                            //
                            // Example markup:
                            //
                            //     hello
                            //     <div><br></div>
                            //     <div>world</div>
                            //
                            // Another example:
                            //
                            //     hello
                            //     <div><br><div>world</div></div>
                            //
                            // See https://github.com/threema-ch/compose-area/issues/72
                            // for details.
                        } else {
                            text.push('\n');
                        }
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

    use wasm_bindgen_test::{wasm_bindgen_test, wasm_bindgen_test_configure};

    wasm_bindgen_test_configure!(run_in_browser);

    mod extract_text {
        use super::*;

        use percy_dom::{
            event::EventsByNodeIdx,
            prelude::{html, IterableNodes, VirtualNode},
        };

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
                let test_wrapper = document
                    .create_element("div")
                    .expect("Could not create test wrapper");

                // Write HTML to DOM
                let node: Node = self.html.create_dom_node(0, &mut EventsByNodeIdx::new());
                test_wrapper
                    .append_child(&node)
                    .expect("Could not append node to test wrapper");

                // Extract and validate text
                let text: String = extract_text(&test_wrapper, false);
                assert_eq!(&text, self.expected);
            }
        }

        #[wasm_bindgen_test]
        fn simple() {
            ExtractTextTest {
                html: html! { { "Hello World" } },
                expected: "Hello World",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn single_div() {
            ExtractTextTest {
                html: html! { <div>{ "Hello World" }</div> },
                expected: "Hello World",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn single_span() {
            ExtractTextTest {
                html: html! { <span>{ "Hello World" }</span> },
                expected: "Hello World",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn image() {
            ExtractTextTest {
                html: html! { <div>{ "Hello " }<img src="#" alt="Big">World</div> },
                expected: "Hello BigWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn newline_br() {
            ExtractTextTest {
                html: html! { <div>Hello<br>World</div> },
                expected: "Hello\nWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn newline_single_div_first() {
            ExtractTextTest {
                html: html! { <div><div>Hello</div>World</div> },
                expected: "Hello\nWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn newline_single_div_second() {
            ExtractTextTest {
                html: html! { <div>Hello<div>World</div></div> },
                expected: "Hello\nWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn newline_double_div() {
            ExtractTextTest {
                html: html! { <div><div>Hello</div><div>World</div></div> },
                expected: "Hello\nWorld",
            }
            .test();
        }

        /// Regression test for https://github.com/threema-ch/compose-area/issues/72.
        #[wasm_bindgen_test]
        fn br_in_div() {
            ExtractTextTest {
                html: html! { <div>Hello<div><br></div><div>World</div></div> },
                expected: "Hello\n\nWorld",
            }
            .test();
        }

        /// Regression test for https://github.com/threema-ch/compose-area/issues/72.
        #[wasm_bindgen_test]
        fn br_in_nested_div() {
            ExtractTextTest {
                html: html! { <div>Hello<div><br><div>World</div></div> },
                expected: "Hello\n\nWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn two_nested_divs() {
            ExtractTextTest {
                html: html! { <div>Hello<div><div>World</div></div> },
                expected: "Hello\nWorld",
            }
            .test();
        }

        #[wasm_bindgen_test]
        fn double_text_node() {
            let mut node = VirtualNode::element("span");
            node.as_velement_mut()
                .unwrap()
                .children
                .push(VirtualNode::text("Hello\n"));
            node.as_velement_mut()
                .unwrap()
                .children
                .push(VirtualNode::text("World"));
            ExtractTextTest {
                html: node,
                expected: "Hello\nWorld",
            }
            .test();
        }
    }
}
