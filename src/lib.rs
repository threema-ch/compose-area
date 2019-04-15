#![cfg_attr(test, feature(proc_macro_hygiene))]

#![deny(clippy::all)]
#![warn(clippy::pedantic)]
#![allow(clippy::non_ascii_literal, clippy::single_match_else, clippy::if_not_else,
         clippy::similar_names, clippy::module_name_repetitions)]

#[macro_use] extern crate log;

mod extract;
mod selection;
mod utils;

use std::mem;

use cfg_if::cfg_if;
use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{self, Element, Node, Selection, Range};

use crate::selection::{Position, set_selection_range};
use crate::extract::extract_text;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

/// The context object containing the state.
#[wasm_bindgen]
pub struct ComposeArea {
    window: web_sys::Window,
    document: web_sys::Document,
    wrapper_id: String,
    selection_range: Option<Range>,
}

/// This enum is relevant when determining the current node while the caret is
/// exactly between two nodes.
///
/// Depending on this enum value, the node before or after the cursor is returned.
#[derive(Debug, PartialEq, Copy, Clone)]
pub enum Direction {
    Before,
    After,
}

/// Initialize a new compose area wrapper with the specified `id`.
#[wasm_bindgen]
pub fn bind_to(id: &str) -> ComposeArea {
    utils::set_panic_hook();
    utils::init_log();

    info!("Bind to #{}", id);

    let window = web_sys::window().expect("No global `window` exists");
    let document = window.document().expect("Should have a document on window");
    let wrapper: Element = document.get_element_by_id(id).expect("Did not find wrapper element");

    // Initialize the wrapper element
    let div = document.create_element("div").expect("Could not create div");
    div.set_attribute("id", id).expect("Could not set wrapper id");
    div.set_attribute("class", "cawrapper initialized").expect("Could not set wrapper class");
    div.set_attribute("contenteditable", "true").expect("Could not set contenteditable attr");
    let br = document.create_element("br").expect("Could not create br");
    div.append_child(&br).expect("Could not append br");
    wrapper.replace_with_with_node_1(&div).expect("Could not initialize wrapper");
    mem::forget(wrapper); // Has been replaced, dead DOM reference

    info!("Initialized #{}", id);

    ComposeArea {
        window,
        document,
        wrapper_id: id.to_owned(),
        selection_range: None,
    }
}

#[wasm_bindgen]
impl ComposeArea {

    /// Return a reference to the wrapper element.
    fn get_wrapper(&self) -> Element {
        self.document.get_element_by_id(&self.wrapper_id).expect("Did not find wrapper element")
    }

    /// Store the current selection range.
    pub fn store_selection_range(&mut self) {
        // Note: We need to clone the range object. Otherwise, changes to the
        // range in the DOM will be reflected in our stored reference.
        self.selection_range = self
            .dom_get_range()
            .map(|range| range.clone_range());
    }

    /// Restore the stored selection range.
    ///
    /// Return a boolean indicating whether a selection range was stored (and
    /// thus restored).
    pub fn restore_selection_range(&self) -> bool {
        if let Some(ref range) = self.selection_range {
            // Get the current selection
            let selection = match self.dom_get_selection() {
                Some(selection) => selection,
                None => {
                    error!("No selection found");
                    return false;
                }
            };

            // Restore the range
            if selection.remove_all_ranges().is_err() {
                error!("Removing all ranges failed");
            }
            match selection.add_range(range) {
                Ok(_) => true,
                Err(_) => {
                    error!("Adding range failed");
                    false
                }
            }
        } else {
            false
        }
    }

    /// Insert an image at the current caret position.
    pub fn insert_image(&mut self, src: &str, alt: &str, cls: &str) {
        debug!("WASM: insert_image ({})", &alt);

        let img = self.document.create_element("img").expect("Could not create img element");
        img.set_attribute("src", &src).expect("Could not set attribute");
        img.set_attribute("alt", &alt).expect("Could not set attribute");
        img.set_attribute("class", &cls).expect("Could not set attribute");

        self.insert_node(img.unchecked_ref());
    }

    /// Insert plain text at the current caret position.
    pub fn insert_text(&mut self, text: &str) {
        debug!("WASM: insert_text ({})", &text);

        let text_node = self.document.create_text_node(text);

        self.insert_node(text_node.unchecked_ref());
    }

    /// Normalize the contents of the wrapper element.
    ///
    /// See https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
    fn normalize(&self) {
        self.get_wrapper().normalize();
    }

    /// Return the DOM selection.
    fn dom_get_selection(&self) -> Option<Selection> {
        self.window.get_selection().expect("Could not get selection from window")
    }

    /// Return the last range of the selection that is within the wrapper
    /// element.
    pub fn dom_get_range(&self) -> Option<Range> {
        let wrapper = self.get_wrapper();
        let selection = match self.dom_get_selection() {
            Some(sel) => sel,
            None => {
                error!("Could not find selection");
                return None;
            },
        };
        for i in 0..selection.range_count() {
            let range = selection.get_range_at(i)
                .expect("Could not get range from selection");
            let container = range.common_ancestor_container()
                .expect("Could not get common ancestor container for range");
            if wrapper.contains(Some(&container)) {
                return Some(range);
            }
        }
        None
    }

    /// Insert the specified node at the previously stored selection range.
    /// Set the caret position to right after the newly inserted node.
    fn insert_node(&mut self, node_ref: &Node) {
        debug!("WASM: insert_node");

        // Get wrapper
        let wrapper = self.get_wrapper();

        // Insert the node
        if let Some(ref range) = self.selection_range {
            range.delete_contents().expect("Could not remove selection contents");
            range.insert_node(node_ref).expect("Could not insert node");
        } else {
            // No current selection. Append at end, unless the last element in
            // the area is a `<br>` node. This is needed because Firefox always
            // adds a trailing newline that isn't rendered.
            let last_child_node = utils::get_last_child(&wrapper);
            match last_child_node.and_then(|n| n.dyn_into::<Element>().ok()) {
                Some(ref element) if element.tag_name() == "BR" => {
                    wrapper.insert_before(node_ref, Some(element))
                        .expect("Could not insert child");
                },
                Some(_) | None => {
                    wrapper.append_child(node_ref).expect("Could not append child");
                },
            };
        }

        // Update selection
        self.selection_range = set_selection_range(&Position::After(node_ref), None);

        // Normalize elements
        self.normalize();
    }

    /// Extract the text in the compose area.
    ///
    /// Convert elements like images to alt text.
    pub fn get_text(&self, no_trim: bool) -> String {
        let wrapper = self.get_wrapper();
        extract_text(&wrapper, no_trim)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use wasm_bindgen_test::*;
    use wbg_rand::{Rng, wasm_rng};

    wasm_bindgen_test_configure!(run_in_browser);

    fn init(empty: bool) -> ComposeArea {
        // Get references
        let window = web_sys::window().expect("No global `window` exists");
        let document = window.document().expect("Should have a document on window");

        // Create wrapper element
        let wrapper = document.create_element("div").expect("Could not create wrapper div");
        let id = format!(
            "wrapper-{}",
            wasm_rng()
                .gen_ascii_chars()
                .take(10)
                .collect::<String>()
        );
        wrapper.set_attribute("id", &id).unwrap();
        document.body().unwrap().append_child(&wrapper).unwrap();

        // Bind to wrapper
        let ca = bind_to(&id);

        // Make sure that no nodes are left
        if empty {
            let wrapper = ca.get_wrapper();
            while wrapper.has_child_nodes() {
                wrapper.remove_child(&wrapper.last_child().unwrap()).unwrap();
            }
        }

        ca
    }

    /// Create and return a text node.
    fn text_node(ca: &ComposeArea, text: &str) -> Node {
        ca.document.create_text_node(text).unchecked_into()
    }

    /// Create and return a newline node.
    fn element_node(ca: &ComposeArea, name: &str) -> Node {
        ca.document.create_element(name).unwrap().unchecked_into()
    }

    #[derive(Copy, Clone, Debug)]
    struct Img {
        src: &'static str,
        alt: &'static str,
        cls: &'static str,
    }

    impl Img {
        fn html(&self) -> String {
            format!(r#"<img src="{}" alt="{}" class="{}">"#, self.src, self.alt, self.cls)
        }

        fn as_node(&self, ca: &ComposeArea) -> Node {
            let img = ca.document.create_element("img").unwrap();
            img.set_attribute("src", self.src).unwrap();
            img.set_attribute("alt", self.alt).unwrap();
            img.set_attribute("class", self.cls).unwrap();
            img.unchecked_into()
        }
    }

    mod insert_node {
        use super::*;

        use std::convert::TryFrom;

        struct PositionByIndex {
            /// The index of the child nodes.
            ///
            /// For example, `[1]` means "the second child node". `[1, 0]`
            /// means the first child node of the first child node.
            node_index: Vec<usize>,
            offset: Option<u32>,
        }

        impl PositionByIndex {
            fn offset(node_index: usize, offset: u32) -> Self {
                Self {
                    node_index: vec![node_index],
                    offset: Some(offset),
                }
            }

            fn after(node_index: usize) -> Self {
                Self {
                    node_index: vec![node_index],
                    offset: None,
                }
            }

            fn after_nested(node_index: Vec<usize>) -> Self {
                Self {
                    node_index,
                    offset: None,
                }
            }
        }

        struct InsertNodeTest<N> {
            children: Vec<Node>,
            selection_start: PositionByIndex,
            selection_end: Option<PositionByIndex>,
            node: N,
            final_html: String,
        }

        impl<N> InsertNodeTest<N> {
            fn get_node(&self, indices: &[usize]) -> Node {
                assert!(!indices.is_empty());
                let mut node: Node = self
                    .children
                    .as_slice()
                    .get(indices[0])
                    .unwrap()
                    .clone();
                for i in indices.iter().skip(1) {
                    node = node
                        .unchecked_ref::<Element>()
                        .child_nodes()
                        .item(u32::try_from(*i).unwrap())
                        .expect("Child node not found");
                }
                node
            }

            fn do_test<F>(&self, mut ca: &mut ComposeArea, insert_func: F)
                where
                    F: FnOnce(&mut ComposeArea, &N)
            {
                // Add child nodes
                for child in &self.children {
                    ca.get_wrapper().append_child(child).unwrap();
                }

                // Add selection
                let node_start = self.get_node(&self.selection_start.node_index);
                let pos_start = {
                    match self.selection_start.offset {
                        Some(offset) => Position::Offset(&node_start, offset),
                        None => Position::After(&node_start),
                    }
                };
                match self.selection_end {
                    Some(ref sel) => {
                        let node_end = self.get_node(&sel.node_index);
                        set_selection_range(
                            &pos_start,
                            Some(&match sel.offset {
                                Some(offset) => Position::Offset(&node_end, offset),
                                None => Position::After(&node_end)
                            })
                        )
                    },
                    None => set_selection_range(&pos_start, None),
                };

                // Insert node and verify
                ca.store_selection_range();
                insert_func(&mut ca, &self.node);
                assert_eq!(ca.get_wrapper().inner_html(), self.final_html);
            }
        }

        impl InsertNodeTest<&'static str> {
            fn test(&self, ca: &mut ComposeArea) {
                self.do_test(ca, |ca, node| {
                    ca.insert_text(node);
                });
            }
        }

        impl InsertNodeTest<Img> {
            fn test(&self, ca: &mut ComposeArea) {
                self.do_test(ca, |ca, node| {
                    ca.insert_image(node.src, node.alt, node.cls);
                });
            }
        }

        mod text {
            use super::*;

            #[wasm_bindgen_test]
            fn at_end() {
                let mut ca = init(true);
                InsertNodeTest {
                    children: vec![text_node(&ca, "hello ")],
                    selection_start: PositionByIndex::after(0),
                    selection_end: None,
                    node: "world",
                    final_html: "hello world".into(),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn in_the_middle() {
                let mut ca = init(true);
                InsertNodeTest {
                    children: vec![text_node(&ca, "ab")],
                    selection_start: PositionByIndex::offset(0, 1),
                    selection_end: None,
                    node: "XY",
                    final_html: "aXYb".into(),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn replace_text() {
                let mut ca = init(true);
                InsertNodeTest {
                    children: vec![text_node(&ca, "abcd")],
                    selection_start: PositionByIndex::offset(0, 1),
                    selection_end: Some(PositionByIndex::offset(0, 3)),
                    node: "X",
                    final_html: "aXd".into(),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn replace_nodes() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![text_node(&ca, "ab"), img.as_node(&ca)],
                    selection_start: PositionByIndex::offset(0, 1),
                    selection_end: Some(PositionByIndex::after(1)),
                    node: "z",
                    final_html: "az".into(),
                }.test(&mut ca);
            }
        }

        mod image {
            use super::*;

            #[wasm_bindgen_test]
            fn at_end() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![text_node(&ca, "hi ")],
                    selection_start: PositionByIndex::after(0),
                    selection_end: None,
                    node: img,
                    final_html: format!("hi {}", img.html()),
                }.test(&mut ca);
            }

            /// If there is no selection but a trailing newline, insert element
            /// before that trailing newline.
            #[wasm_bindgen_test]
            fn at_end_after_br() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };

                // Prepare wrapper
                let wrapper = ca.get_wrapper();
                wrapper.set_inner_html("<br>");

                // Ensure that there's no selection left in the DOM
                selection::unset_selection_range();

                // Insert node and verify
                ca.insert_image(&img.src, &img.alt, &img.cls);
                assert_eq!(wrapper.inner_html(), format!("{}<br>", img.html()));
            }

            #[wasm_bindgen_test]
            fn split_text() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![text_node(&ca, "bonjour")],
                    selection_start: PositionByIndex::offset(0, 3),
                    selection_end: None,
                    node: img,
                    final_html: format!("bon{}jour", img.html()),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn between_nodes_br() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![
                        text_node(&ca, "a"),
                        element_node(&ca, "br"),
                        text_node(&ca, "b"),
                    ],
                    selection_start: PositionByIndex::after(0),
                    selection_end: None,
                    node: img,
                    final_html: format!("a{}<br>b", img.html()),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn between_nodes_div() {
                let mut ca = init(true);
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                let div_a = {
                    let div = element_node(&ca, "div");
                    div.append_child(&text_node(&ca, "a")).unwrap();
                    div
                };
                let div_b = {
                    let div = element_node(&ca, "div");
                    div.append_child(&text_node(&ca, "b")).unwrap();
                    div.append_child(&element_node(&ca, "br")).unwrap();
                    div
                };
                InsertNodeTest {
                    children: vec![div_a, div_b],
                    selection_start: PositionByIndex::after_nested(vec![0, 0]),
                    selection_end: None,
                    node: img,
                    final_html: format!("<div>a{}</div><div>b<br></div>", img.html()),
                }.test(&mut ca);
            }
        }
    }

    mod selection_range {
        use super::*;

        #[wasm_bindgen_test]
        fn restore_selection_range() {
            let mut ca = init(true);
            let node = text_node(&ca, "abc");
            ca.get_wrapper().append_child(&node).unwrap();

            // Highlight "b"
            set_selection_range(
                &Position::Offset(&node, 1),
                Some(&Position::Offset(&node, 2)),
            );
            let range = ca.dom_get_range().expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 1);
            assert_eq!(range.end_offset().unwrap(), 2);

            // Store range
            ca.store_selection_range();

            // Change range, highlight "a"
            set_selection_range(
                &Position::Offset(&node, 0),
                Some(&Position::Offset(&node, 1)),
            );
            let range = ca.dom_get_range().expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 0);
            assert_eq!(range.end_offset().unwrap(), 1);

            // Retore range
            ca.restore_selection_range();
            let range = ca.dom_get_range().expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 1);
            assert_eq!(range.end_offset().unwrap(), 2);
        }

        #[wasm_bindgen_test]
        fn get_range_only_inside_wrapper() {
            let ca = init(true);
            let inner_text_node = text_node(&ca, "abc");
            ca.get_wrapper().append_child(&inner_text_node).unwrap();

            // No retval if no range is set
            selection::unset_selection_range();
            let range = ca.dom_get_range();
            assert!(range.is_none());

            // No retval if no range is outside
            let outer_text_node = ca.document.create_text_node("hello");
            ca.document.body().unwrap().append_child(&outer_text_node).unwrap();
            set_selection_range(&Position::Offset(&outer_text_node, 0), None);
            let range = ca.dom_get_range();
            assert!(range.is_none());

            // Retval as soon as inside wrapper
            set_selection_range(&Position::Offset(&inner_text_node, 0), None);
            let range = ca.dom_get_range();
            assert!(range.is_some());
        }
    }

}
