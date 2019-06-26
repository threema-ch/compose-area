#![cfg_attr(test, feature(proc_macro_hygiene))]

#![deny(clippy::all)]
#![warn(clippy::pedantic)]
#![allow(clippy::non_ascii_literal, clippy::single_match_else, clippy::if_not_else,
         clippy::similar_names, clippy::module_name_repetitions)]

#[macro_use] extern crate log;

mod extract;
mod selection;
mod utils;

use cfg_if::cfg_if;
use log::Level;
use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{self, Element, Node, HtmlElement, HtmlDocument, Selection, Range, Text};

use crate::selection::{Position, set_selection_range, activate_selection_range, glue_range_to_text};
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
    wrapper: Element,
    /// The selection range. This will always be a selection within the compose
    /// area wrapper, if set.
    ///
    /// NOTE: When setting this value to a range, make sure that the range was
    /// cloned, so that updates to the range in the browser aren't reflected in
    /// this instance.
    selection_range: Option<Range>,
    /// Counter used for creating unique element IDs.
    counter: u32,
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

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct RangeResult {
    /// The selection range, if any.
    range: Option<Range>,
    /// Whether the selection range is not fully contained in the wrapper.
    /// This is set to `false` if no range could be found.
    outside: bool,
}

impl RangeResult {
    fn contained(range: Range) -> Self {
        Self {
            range: Some(range),
            outside: false,
        }
    }

    fn outside(range: Range) -> Self {
        Self {
            range: Some(range),
            outside: true,
        }
    }

    fn none() -> Self {
        Self {
            range: None,
            outside: false,
        }
    }
}

#[wasm_bindgen]
impl RangeResult {
    fn format_node(node: &Node) -> String {
        let name = node.node_name();
        match node.dyn_ref::<Element>().map(Element::id) {
            Some(id) => format!("{}#{}", name.trim_matches('#'), id),
            None => name.trim_matches('#').to_string(),
        }
    }

    /// Used by JS code to show a string representation of the range.
    pub fn to_string(&self) -> String {
        match (&self.range, self.outside) {
            (_, true) => "Outside".to_string(),
            (None, _) => "None".to_string(),
            (Some(range), false) => format!(
                "Range {{\n  \
                  start: {} ~ {}\n  \
                  end: {} ~ {}\n\
                }}",
                Self::format_node(&range.start_container().unwrap()),
                &range.start_offset().unwrap(),
                Self::format_node(&range.end_container().unwrap()),
                &range.end_offset().unwrap(),
            ),
        }
    }

    /// Used by JS code to show a string representation of the range.
    pub fn to_string_compact(&self) -> String {
        match (&self.range, self.outside) {
            (_, true) => "Outside".to_string(),
            (None, _) => "None".to_string(),
            (Some(range), false) => format!(
                "Range({}~{}, {}~{})",
                Self::format_node(&range.start_container().unwrap()),
                &range.start_offset().unwrap(),
                Self::format_node(&range.end_container().unwrap()),
                &range.end_offset().unwrap(),
            ),
        }
    }
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct WordAtCaret {
    node: Node,
    before: String,
    after: String,
    offsets: (u32, u32),
}

#[wasm_bindgen]
impl WordAtCaret {
    pub fn node(&self) -> Node {
        self.node.clone()
    }

    pub fn before(&self) -> String {
        self.before.clone()
    }

    pub fn after(&self) -> String {
        self.after.clone()
    }

    /// Return the UTF16 offset from the start node where the current word starts (inclusive).
    pub fn start_offset(&self) -> u32 {
        self.offsets.0
    }

    /// Return the UTF16 offset from the start node where the current word ends (exclusive).
    pub fn end_offset(&self) -> u32 {
        self.offsets.1
    }
}

#[wasm_bindgen]
impl ComposeArea {

    /// Initialize a new compose area wrapper.
    ///
    /// If the `log_level` argument is supplied, the console logger is
    /// initialized. Valid log levels: `trace`, `debug`, `info`, `warn` or
    /// `error`.
    pub fn bind_to(wrapper: Element, log_level: Option<String>) -> Self {
        utils::set_panic_hook();

        // Set log level
        if let Some(level) = log_level {
            match &*level {
                "trace" => utils::init_log(Level::Trace),
                "debug" => utils::init_log(Level::Debug),
                "info" => utils::init_log(Level::Info),
                "warn" => utils::init_log(Level::Warn),
                "error" => utils::init_log(Level::Error),
                other => web_sys::console::warn_1(
                    &format!("bind_to: Invalid log level: {}", other).into()
                ),
            }
        }
        trace!("[compose_area] bind_to");

        let window = web_sys::window().expect("No global `window` exists");
        let document = window.document().expect("Should have a document on window");

        // Initialize the wrapper element
        wrapper.class_list().add_2("cawrapper", "initialized").expect("Could not add wrapper classes");
        wrapper.set_attribute("contenteditable", "true").expect("Could not set contenteditable attr");

        info!("[compose_area] Initialized");

        Self {
            window,
            document,
            wrapper,
            selection_range: None,
            counter: 0,
        }
    }

    /// Store the current selection range.
    /// Return the stored range.
    pub fn store_selection_range(&mut self) -> RangeResult {
        trace!("[compose_area] store_selection_range");
        let range_result = self.fetch_range();
        trace!("[compose_area]   Range: {}", range_result.to_string().replace('\n', ""));

        // Ignore selections outside the wrapper
        if !range_result.outside {
            // Note: We need to clone the range object. Otherwise, changes to the
            // range in the DOM will be reflected in our stored reference.
            self.selection_range = range_result
                .clone()
                .range
                .map(|range| range.clone_range());
        }

        range_result
    }

    /// Restore the stored selection range.
    ///
    /// Return a boolean indicating whether a selection range was stored (and
    /// thus restored).
    pub fn restore_selection_range(&self) -> bool {
        trace!("[compose_area] restore_selection_range");
        if let Some(ref range) = self.selection_range {
            // Get the current selection
            let selection = match self.fetch_selection() {
                Some(selection) => selection,
                None => {
                    error!("[compose_area] No selection found");
                    return false;
                }
            };

            // Restore the range
            if selection.remove_all_ranges().is_err() {
                error!("[compose_area] Removing all ranges failed");
            }
            match selection.add_range(range) {
                Ok(_) => true,
                Err(_) => {
                    error!("[compose_area] Adding range failed");
                    false
                }
            }
        } else {
            trace!("[compose_area]   No stored range");
            false
        }
    }

    /// Ensure that there's an active selection inside the compose are. Then
    /// exec the specified command, normalize the compose area and store the
    /// new selection range.
    fn exec_command(&mut self, command_id: &str, value: &str) {
        // Ensure that there's an active selection inside the compose area.
        let active_range = self.fetch_range();
        if active_range.range.is_none() || active_range.outside {
            // No active selection range inside the compose area.
            match self.selection_range {
                Some(ref range) => {
                    activate_selection_range(
                        &self.fetch_selection().expect("Could not get window selection"),
                        range
                    );
                },
                None => {
                    // No stored selection range. Create a new selection at the end end.
                    let last_child_node = utils::get_last_child(&self.wrapper);
                    self.selection_range = match last_child_node {
                        Some(ref node) => {
                            // Insert at the very end, unless the last element in the
                            // area is a `<br>` node. This is needed because Firefox
                            // always adds a trailing newline that isn't rendered
                            let mut insert_before = false;
                            if let Some(ref element) = node.dyn_ref::<Element>() {
                                if element.tag_name() == "BR" {
                                    insert_before = true;
                                }
                            }
                            if insert_before {
                                set_selection_range(&Position::Before(node), None)
                            } else {
                                set_selection_range(&Position::After(node), None)
                            }
                        },
                        None => {
                            set_selection_range(&Position::Offset(&self.wrapper, 0), None)
                        },
                    }.map(|range| range.clone_range());
                }
            }
        }

        // Execute command
        self.document
            .dyn_ref::<HtmlDocument>()
            .expect("Document is not a HtmlDocument")
            .exec_command_with_show_ui_and_value(command_id, false, value)
            .expect("Could not exec command");
        self.normalize();
        self.store_selection_range();
    }

    /// Return and increment the counter variable.
    fn get_counter(&mut self) -> u32 {
        let val = self.counter;
        self.counter += 1;
        val
    }

    /// Insert an image at the current caret position.
    ///
    /// Return a reference to the inserted image element.
    pub fn insert_image(&mut self, src: &str, alt: &str, cls: &str) -> Element {
        debug!("[compose_area] insert_image ({})", &alt);

        // NOTE: Ideally we'd create an image node here and would then use
        //       `insert_node`. But unfortunately that will not modify the undo
        //       stack of the browser (see https://stackoverflow.com/a/15895618).
        //       Thus, we need to resort to an ugly `execCommand` with a HTML
        //       string. Furthermore, we need to create a random ID in order
        //       to be able to find the image again in the DOM.

        let img_id = format!("__$$compose_area_img_{}", self.get_counter());
        let html = format!(
            "<img id=\"{}\" src=\"{}\" alt=\"{}\" class=\"{}\">",
            img_id,
            src.replace('"', ""),
            alt.replace('"', ""),
            cls.replace('"', ""),
        );
        self.insert_html(&html);

        self.document.get_element_by_id(&img_id).expect("Could not find inserted image node")
    }

    /// Insert plain text at the current caret position.
    pub fn insert_text(&mut self, text: &str) {
        debug!("[compose_area] insert_text ({})", text);
        self.exec_command("insertText", text);
    }

    /// Insert HTML at the current caret position.
    ///
    /// Note: This is potentially dangerous, make sure that you only insert
    /// HTML from trusted sources!
    pub fn insert_html(&mut self, html: &str) {
        debug!("[compose_area] insert_html ({})", html);
        self.exec_command("insertHTML", html);
    }

    /// Insert the specified node at the previously stored selection range.
    /// Set the caret position to right after the newly inserted node.
    ///
    /// **NOTE:** Due to browser limitations, this will not result in a new
    /// entry in the browser's internal undo stack. This means that the node
    /// insertion cannot be undone using Ctrl+Z.
    pub fn insert_node(&mut self, node_ref: &Node) {
        debug!("[compose_area] insert_node");

        // Insert the node
        if let Some(ref range) = self.selection_range {
            range.delete_contents().expect("Could not remove selection contents");
            range.insert_node(node_ref).expect("Could not insert node");
        } else {
            // No current selection. Append at end, unless the last element in
            // the area is a `<br>` node. This is needed because Firefox always
            // adds a trailing newline that isn't rendered.
            let last_child_node = utils::get_last_child(&self.wrapper);
            match last_child_node.and_then(|n| n.dyn_into::<Element>().ok()) {
                Some(ref element) if element.tag_name() == "BR" => {
                    self.wrapper.insert_before(node_ref, Some(element))
                        .expect("Could not insert child");
                },
                Some(_) | None => {
                    self.wrapper.append_child(node_ref).expect("Could not append child");
                },
            };
        }

        // Update selection
        self.selection_range = set_selection_range(&Position::After(node_ref), None)
            .map(|range| range.clone_range());

        // Normalize elements
        self.normalize();
    }


    /// Normalize the contents of the wrapper element.
    ///
    /// See https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
    fn normalize(&self) {
        trace!("[compose_area]   normalize");
        self.wrapper.normalize();
    }

    /// Return the DOM selection.
    fn fetch_selection(&self) -> Option<Selection> {
        trace!("[compose_area]   fetch_selection");
        self.window.get_selection().expect("Could not get selection from window")
    }

    /// Return the last range of the selection that is within the wrapper
    /// element.
    pub fn fetch_range(&self) -> RangeResult {
        trace!("[compose_area] fetch_range");
        let selection = match self.fetch_selection() {
            Some(sel) => sel,
            None => {
                error!("[compose_area] Could not find selection");
                return RangeResult::none();
            },
        };
        let mut candidate: Option<Range> = None;
        for i in 0..selection.range_count() {
            let range = selection.get_range_at(i)
                .expect("Could not get range from selection");
            candidate = Some(range.clone());
            let container = range.common_ancestor_container()
                .expect("Could not get common ancestor container for range");
            if self.wrapper.contains(Some(&container)) {
                return RangeResult::contained(range);
            }
        }
        match candidate {
            Some(range) => RangeResult::outside(range),
            None => RangeResult::none(),
        }
    }

    /// Extract the text in the compose area.
    ///
    /// Convert elements like images to alt text.
    ///
    /// Args:
    /// - `no_trim`: If set to `true`, don't trim leading / trailing whitespace
    ///   from returned text. Default: `false`.
    pub fn get_text(&self, no_trim: Option<bool>) -> String {
        debug!("[compose_area] get_text");
        extract_text(&self.wrapper, no_trim.unwrap_or(false))
    }

    /// Focus the compose area.
    pub fn focus(&self) {
        debug!("[compose_area] focus");
        self.restore_selection_range();
        if let Some(e) = self.wrapper.dyn_ref::<HtmlElement>() {
            e.focus().unwrap_or_else(|_| error!("[compose_area] Could not focus compose area"));
        }
    }

    /// Clear the contents of the compose area.
    pub fn clear(&mut self) {
        debug!("[compose_area] clear");
        while self.wrapper.has_child_nodes() {
            let last_child = self.wrapper.last_child().expect("Could not find last child");
            self.wrapper.remove_child(&last_child).expect("Could not remove last child");
        }
        self.selection_range = None;
    }

    /// Return the word (whitespace delimited) at the current caret position.
    ///
    /// Note: This methods uses the range that was last set with
    /// `store_selection_range`.
    pub fn get_word_at_caret(&mut self) -> Option<WordAtCaret> {
        debug!("[compose_area] get_word_at_caret");

        if let Some(ref range) = self.selection_range {
            // Clone the current range so we don't modify any existing selection
            let mut range = range.clone_range();

            // Ensure that range is relative to a text node
            if !glue_range_to_text(&mut range) {
                return None;
            }

            // Get the container element (which is the same for start and end
            // since the range is collapsed) and offset. After having called
            // the `glue_range_to_text` function, this will be a text node.
            let node: Text = range
                .start_container()
                .expect("Could not get start container")
                .dyn_into::<Text>()
                .expect("Node is not a text node");
            let offset: u32 = range
                .start_offset()
                .expect("Could not get start offset");

            // Note that the offset refers to JS characters, not bytes.
            let text: String = node.data();
            let mut before: Vec<u16> = vec![];
            let mut after: Vec<u16> = vec![];
            let mut start = 0;
            let mut end = 0;
            let is_word_boundary = |c: u16| c == 0x20 /* space */ || c == 0x09 /* tab */;
            #[allow(clippy::collapsible_if)]
            for (i, c) in text.encode_utf16().enumerate() {
                if i < offset as usize {
                    if is_word_boundary(c) {
                        before.clear();
                        start = i + 1;
                    } else {
                        before.push(c);
                    }
                } else {
                    if is_word_boundary(c) {
                        end = i;
                        break;
                    } else {
                        after.push(c);
                    }
                }
            }
            if end <= start {
                end = text.encode_utf16().count();
            }

            // Note: Decoding should not be able to fail since it was
            // previously encoded from a string.
            #[allow(clippy::cast_possible_truncation)]
            Some(WordAtCaret {
                node: node.dyn_into::<Node>().expect("Could not turn Text into Node"),
                before: String::from_utf16(&before).expect("Could not decode UTF16 value"),
                after: String::from_utf16(&after).expect("Could not decode UTF16 value"),
                offsets: (start as u32, end as u32),
            })
        } else {
            None
        }
    }

    /// Select the word (whitespace delimited) at the current caret position.
    ///
    /// Note: This methods uses the range that was last set with
    /// `store_selection_range`.
    pub fn select_word_at_caret(&mut self) -> bool {
        debug!("[compose_area] select_word_at_caret");

        if let Some(wac) = self.get_word_at_caret() {
            let node = wac.node();
            set_selection_range(
                &Position::Offset(&node, wac.start_offset()),
                Some(&Position::Offset(&node, wac.end_offset()))
            ).is_some()
        } else {
            false
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use wasm_bindgen_test::*;

    wasm_bindgen_test_configure!(run_in_browser);

    fn init() -> ComposeArea {
        // Get references
        let window = web_sys::window().expect("No global `window` exists");
        let document = window.document().expect("Should have a document on window");

        // Create wrapper element
        let wrapper = document.create_element("div")
            .expect("Could not create wrapper div");
        wrapper.set_attribute("style", "white-space: pre-wrap;")
            .expect("Could not set style on wrapper div");
        document.body().unwrap().append_child(&wrapper).unwrap();

        // Bind to wrapper
        ComposeArea::bind_to(wrapper.clone(), Some("trace".into()))
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
        fn html(&self, counter: u32) -> String {
            format!(
                r#"<img id="__$$compose_area_img_{}" src="{}" alt="{}" class="{}">"#,
                counter,
                self.src,
                self.alt,
                self.cls,
            )
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
                    ca.wrapper.append_child(child).unwrap();
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
                assert_eq!(ca.wrapper.inner_html(), self.final_html);
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
                let mut ca = init();
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
                let mut ca = init();
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
                let mut ca = init();
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
                let mut ca = init();
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
                let mut ca = init();
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![text_node(&ca, "hi ")],
                    selection_start: PositionByIndex::after(0),
                    selection_end: None,
                    node: img,
                    final_html: format!("hi {}", img.html(0)),
                }.test(&mut ca);
            }

            /// If there is no selection but a trailing newline, element
            /// will replace that trailing newline due to the way how the
            /// `insertHTML` command works.
            #[wasm_bindgen_test]
            fn at_end_with_br() {
                let mut ca = init();
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };

                // Prepare wrapper
                ca.wrapper.set_inner_html("<br>");

                // Ensure that there's no selection left in the DOM
                selection::unset_selection_range();

                // Insert node and verify
                ca.insert_image(&img.src, &img.alt, &img.cls);
                assert_eq!(ca.wrapper.inner_html(), img.html(0).to_string());
            }

            #[wasm_bindgen_test]
            fn split_text() {
                let mut ca = init();
                let img = Img { src: "img.jpg", alt: "😀", cls: "em" };
                InsertNodeTest {
                    children: vec![text_node(&ca, "bonjour")],
                    selection_start: PositionByIndex::offset(0, 3),
                    selection_end: None,
                    node: img,
                    final_html: format!("bon{}jour", img.html(0)),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn between_nodes_br() {
                let mut ca = init();
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
                    final_html: format!("a{}<br>b", img.html(0)),
                }.test(&mut ca);
            }

            #[wasm_bindgen_test]
            fn between_nodes_div() {
                let mut ca = init();
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
                    final_html: format!("<div>a{}</div><div>b<br></div>", img.html(0)),
                }.test(&mut ca);
            }
        }
    }

    mod selection_range {
        use super::*;

        #[wasm_bindgen_test]
        fn restore_selection_range() {
            let mut ca = init();
            let node = text_node(&ca, "abc");
            ca.wrapper.append_child(&node).unwrap();

            // Highlight "b"
            set_selection_range(
                &Position::Offset(&node, 1),
                Some(&Position::Offset(&node, 2)),
            );
            let range_result = ca.fetch_range();
            assert!(!range_result.outside);
            let range = range_result.range.expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 1);
            assert_eq!(range.end_offset().unwrap(), 2);

            // Store range
            ca.store_selection_range();

            // Change range, highlight "a"
            set_selection_range(
                &Position::Offset(&node, 0),
                Some(&Position::Offset(&node, 1)),
            );
            let range_result = ca.fetch_range();
            assert!(!range_result.outside);
            let range = range_result.range.expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 0);
            assert_eq!(range.end_offset().unwrap(), 1);

            // Retore range
            ca.restore_selection_range();
            let range_result = ca.fetch_range();
            assert!(!range_result.outside);
            let range = range_result.range.expect("Could not get range");
            assert_eq!(range.start_offset().unwrap(), 1);
            assert_eq!(range.end_offset().unwrap(), 2);
        }

        #[wasm_bindgen_test]
        fn get_range_result() {
            let ca = init();
            let inner_text_node = text_node(&ca, "abc");
            ca.wrapper.append_child(&inner_text_node).unwrap();

            // No range set
            selection::unset_selection_range();
            let range_result = ca.fetch_range();
            assert!(range_result.range.is_none());
            assert!(!range_result.outside);

            // Range is outside
            let outer_text_node = ca.document.create_text_node("hello");
            ca.document.body().unwrap().append_child(&outer_text_node).unwrap();
            set_selection_range(&Position::Offset(&outer_text_node, 0), None);
            let range_result = ca.fetch_range();
            assert!(range_result.range.is_some());
            assert!(range_result.outside);

            // Inside wrapper
            set_selection_range(&Position::Offset(&inner_text_node, 0), None);
            let range_result = ca.fetch_range();
            assert!(range_result.range.is_some());
            assert!(!range_result.outside);
        }
    }

    mod clear {
        use super::*;

        #[wasm_bindgen_test]
        fn clear_contents() {
            // Init, no child nodes
            let mut ca = init();
            assert_eq!(ca.wrapper.child_nodes().length(), 0);

            // Append some child nodes
            ca.wrapper.append_child(&text_node(&ca, "abc")).unwrap();
            ca.wrapper.append_child(&element_node(&ca, "br")).unwrap();
            assert_eq!(ca.wrapper.child_nodes().length(), 2);

            // Clear
            ca.clear();
            assert_eq!(ca.wrapper.child_nodes().length(), 0);
        }
    }

    mod word_at_caret {
        use super::*;

        #[wasm_bindgen_test]
        fn empty() {
            let mut ca = init();
            let wac = ca.get_word_at_caret();
            assert!(wac.is_none());
        }

        #[wasm_bindgen_test]
        fn in_text() {
            let mut ca = init();

            let text = ca.document.create_text_node("hello world!\tgoodbye.");
            ca.wrapper.append_child(&text).unwrap();
            set_selection_range(&Position::Offset(&text, 9), None);
            ca.store_selection_range();

            let wac = ca.get_word_at_caret().expect("get_word_at_caret returned None");
            assert_eq!(&wac.before(), "wor");
            assert_eq!(&wac.after(), "ld!");
            assert_eq!(wac.start_offset(), 6);
            assert_eq!(wac.end_offset(), 12);
        }

        #[wasm_bindgen_test]
        fn after_text() {
            let mut ca = init();

            let text = ca.document.create_text_node("hello world");
            ca.wrapper.append_child(&text).unwrap();
            set_selection_range(&Position::After(&text), None);
            ca.store_selection_range();

            let wac = ca.get_word_at_caret().expect("get_word_at_caret returned None");
            assert_eq!(&wac.before(), "world");
            assert_eq!(&wac.after(), "");
            assert_eq!(wac.start_offset(), 6);
            assert_eq!(wac.end_offset(), 11);
        }

        #[wasm_bindgen_test]
        fn before_word() {
            let mut ca = init();

            let text = ca.document.create_text_node("hello world");
            ca.wrapper.append_child(&text).unwrap();
            set_selection_range(&Position::Offset(&text, 0), None);
            ca.store_selection_range();

            let wac = ca.get_word_at_caret().expect("get_word_at_caret returned None");
            assert_eq!(&wac.before(), "");
            assert_eq!(&wac.after(), "hello");
            assert_eq!(wac.start_offset(), 0);
            assert_eq!(wac.end_offset(), 5);
        }

        #[wasm_bindgen_test]
        fn single_word() {
            let mut ca = init();

            let text = ca.document.create_text_node(":ok:");
            ca.wrapper.append_child(&text).unwrap();
            set_selection_range(&Position::Offset(&text, 4), None);
            ca.store_selection_range();

            let wac = ca.get_word_at_caret().expect("get_word_at_caret returned None");
            assert_eq!(&wac.before(), ":ok:");
            assert_eq!(&wac.after(), "");
            assert_eq!(wac.start_offset(), 0);
            assert_eq!(wac.end_offset(), 4);
        }
    }
}
