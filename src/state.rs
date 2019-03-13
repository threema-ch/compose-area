use std::cmp::min;

use virtual_dom_rs::{VirtualNode, VElement};

use crate::keys::Key;

#[derive(Debug, PartialEq, Clone)]
pub enum Node {
    /// A text node.
    ///
    /// This is a vec of u16 because JavaScript uses UTF-16 strings.
    Text(Vec<u16>),

    /// An image node.
    Image { src: String, alt: String, cls: String },

    /// A newline node.
    Newline,
}

impl Node {
    /// Calculate the byte length of the node when converted to HTML.
    ///
    /// Important: JavaScript uses UTF-16 as string encoding, all strings must
    /// be encoded that way.
    fn html_size(&self) -> usize {
        match self {
            // Just the text length
            Node::Text(val) => val.len(),

            // <img src=".." alt=".." class="..">
            Node::Image { src, alt, cls } => 28
                + src.encode_utf16().count()
                + alt.encode_utf16().count()
                + cls.encode_utf16().count(),

            // <br>
            Node::Newline => 4,
        }
    }

    #[cfg(test)]
    fn text_from_str(text: &str) -> Self {
        Node::Text(text.encode_utf16().collect())
    }
}

/// The node at the current caret position.
#[derive(Debug, PartialEq)]
pub struct NodeIndexOffset {
    /// Node index.
    pub index: usize,
    /// Byte offset from the node start.
    pub offset: usize,
}

/// This enum is relevant when determining the current node while the caret is
/// exactly between two nodes.
///
/// Depending on this enum value, the node before or after the cursor is returned.
#[derive(Debug, PartialEq)]
pub enum Direction {
    Before,
    After,
}

/// The full application state of the compose area.
///
/// TODO: Evaluate whether we could store the caret position as (DomNode/Offset pair)
#[derive(Debug)]
pub struct State {
    nodes: Vec<Node>,
    caret_start: usize,
    caret_end: usize,
}

impl State {
    pub fn new() -> Self {
        Default::default()
    }

    /// Reset / clear internal state.
    pub fn reset(&mut self) {
        self.nodes.clear();
        self.caret_start = 0;
        self.caret_end = 0;
    }

    /// Return the number of nodes.
    pub fn node_count(&self) -> usize {
        self.nodes.len()
    }

    /// Return the total length of the nodes.
    pub fn html_size(&self) -> usize {
        self.nodes.iter().map(|node| node.html_size()).sum()
    }

    /// Return the start and end caret position.
    pub fn caret_position(&self) -> (usize, usize) {
        (self.caret_start, self.caret_end)
    }

    /// Update the start and end caret position.
    ///
    /// The end position will be clamped to the HTML size.
    pub fn set_caret_position(&mut self, start: usize, end: usize) {
        self.caret_start = start;
        self.caret_end = min(end, self.html_size());
    }

    /// Return the node at the current caret start position and the offset from
    /// the beginning of that node.
    ///
    /// If the cursor is exactly between two nodes, then either the following
    /// or the preceding node is returned, depending on the `direction` chosen.
    ///
    /// If the current caret position is after the end of the last node and the
    /// direction is `Before`, then the last node will be returned, with
    /// corrected offset.
    pub fn find_start_node(&self, direction: Direction) -> Option<NodeIndexOffset> {
        let mut offset = self.caret_start;
        let mut html_size = 0;

        // If there are no nodes, we can return immediately
        if self.nodes.is_empty() {
            return None;
        }

        // Iterate through the nodes
        for (index, node) in self.nodes.iter().enumerate() {
            // If we're exactly at the start of the node, we can stop looking further.
            if offset == 0 {
                return match direction {
                    Direction::Before if index == 0 => None,
                    Direction::Before => Some(NodeIndexOffset { offset: html_size, index: index - 1 }),
                    Direction::After => Some(NodeIndexOffset { offset, index }),
                };
            }

            // Calculate node size
            html_size = node.html_size();

            // Update offset
            match offset.checked_sub(html_size) {
                Some(new_offset) => {
                    // If we're at the end and the caller wanted the node before
                    // the current caret position, return the current node.
                    if new_offset == 0 && direction == Direction::Before {
                        return Some(NodeIndexOffset { offset, index });
                    }
                    offset = new_offset;
                },
                None => {
                    // Underflow. Once we're below 0, we found the node.
                    return Some(NodeIndexOffset { offset, index });
                },
            }
        }

        // We reached the end of the node list.
        match direction {
            Direction::Before => {
                assert!(offset > 0);
                // Fall back to the last node, but fix the offset.
                Some(NodeIndexOffset {
                    offset: self.nodes.last().unwrap().html_size(),
                    index: self.nodes.len() - 1,
                })
            }
            Direction::After => None,
        }
    }

    /// If some elements are selected (caret_start != caret_end),
    /// remove those elements and return `true`. Otherwise, return `false`.
    pub fn remove_selection(&mut self) -> bool {
        if self.caret_start >= self.caret_end {
            return false;
        }

        // General approach: We get the node at the current start position. We
        // then start removing nodes after the start position until nodes with
        // length (end - start) have been removed.
        let mut removed = false;
        while self.caret_end > self.caret_start {
            let mut remove_node = None;
            let difference = self.caret_end - self.caret_start;

            // Find the node right of the start pos.
            if let Some(start_node) = self.find_start_node(Direction::After) {
                match self.nodes.get_mut(start_node.index).expect("No node at the specified index!") {
                    // Text node
                    Node::Text(ref mut val) => {
                        if start_node.offset == 0 && val.len() <= difference {
                            // In case we're at the start of the text and if the length
                            // of the text is less than the amount of characters we have
                            // to remove, remove the entire node.
                            remove_node = Some(start_node.index);
                        } else {
                            // Otherwise, remove characters from the text.
                            let chars_available = val.len() - start_node.offset;
                            let chars_to_remove = min(chars_available, difference);
                            for _ in 0..chars_to_remove {
                                val.remove(start_node.offset);
                                self.caret_end -= 1;
                            }
                            if self.caret_end < self.caret_start {
                                warn!("caret_start > caret_end after shortening text");
                                self.caret_start = self.caret_end;
                            }
                        }
                    },

                    // Block nodes, remove them entirely
                    Node::Newline |
                    Node::Image { .. } => remove_node = Some(start_node.index),
                }
            } else {
                error!("remove_selection: Start node not found");
                return removed;
            }

            // Remove node, deduce its length from the end pos.
            // If necessary, adjust the start pos (although that shouldn't happen).
            if let Some(index) = remove_node {
                let removed_node = self.nodes.remove(index);
                self.caret_end -= min(removed_node.html_size(), difference);
                if self.caret_end < self.caret_start {
                    warn!("caret_start > caret_end after removing node");
                    self.caret_start = self.caret_end;
                }
            }

            removed = true;
        }

        // The nodes have been modified, some might have been removed.
        // Re-normalize the state.
        self.normalize();

        removed
    }

    /// Normalize the nodes.
    ///
    /// For example, if two text nodes follow each other, merge them.
    fn normalize(&mut self) {
        // First, use a pairwise iterator to find the text nodes that are
        // followed by another text node. Store the indexes of those nodes.
        let mut nodes_to_merge: Vec<usize> = vec![];
        for (i, pair) in (&self.nodes).windows(2).enumerate() {
            if let [Node::Text(_), Node::Text(_)] = pair {
                nodes_to_merge.push(i);
            }
        }

        // Now iterate backwards through the list of indices. Remove the
        // following node and merge it into the node at `index`.
        for index in nodes_to_merge.into_iter().rev() {
            let right = self.nodes.remove(index + 1);
            let left = self.nodes.get_mut(index).expect("Left node not found");
            if let (Node::Text(ref mut lval), Node::Text(ref rval)) = (left, right) {
                lval.extend_from_slice(&rval);
            } else {
                unreachable!("Left or right node is not a text node");
            }
        }
    }

    pub fn handle_key(&mut self, key: Key) {
        match key {
            Key::Enter => self.insert_block_element(Node::Newline),
            Key::Backspace => self.handle_backspace(),
            Key::Delete => self.handle_delete(),
            Key::Character(c) => self.handle_text(c.encode_utf16().collect()),
        }
    }

    fn handle_backspace(&mut self) {
        // If there's a selection, remove it and return
        if self.remove_selection() {
            return;
        }

        // Handle start-of-input case, nothing to do
        if self.caret_start == 0 {
            return;
        }

        // Set if the entire node should be removed
        // (e.g. because it became empty after the deletion).
        let mut remove_node: Option<usize> = None;

        if let Some(current_node) = self.find_start_node(Direction::Before) {
            match self.nodes.get_mut(current_node.index).expect("No node at the specified index!") {
                // Text node
                Node::Text(ref mut val) => {
                    if val.len() <= 1 {
                        // In case there's only a single character in it, remove the
                        // entire node.
                        remove_node = Some(current_node.index);
                    } else {
                        // Otherwise, remove last character before the current position
                        val.remove(current_node.offset - 1);
                        self.caret_start -= 1;
                        self.caret_end = self.caret_start;
                    }
                },

                // Block nodes, remove it entirely
                Node::Newline |
                Node::Image { .. } => remove_node = Some(current_node.index),
            }
        }
        if let Some(index) = remove_node {
            let removed_node = self.nodes.remove(index);
            self.caret_start -= removed_node.html_size();
            self.caret_end = self.caret_start;

            // A node has been removed. Re-normalize the state.
            self.normalize();
        }
    }

    fn handle_delete(&mut self) {
        // If there's a selection, remove it and return
        if self.remove_selection() {
            return;
        }

        // Set if the entire node should be removed
        // (e.g. because it became empty after the deletion).
        let mut remove_node: Option<usize> = None;

        if let Some(current_node) = self.find_start_node(Direction::After) {
            match self.nodes.get_mut(current_node.index).expect("No node at the specified index!") {
                // Text node
                Node::Text(ref mut val) => {
                    if val.len() <= 1 {
                        // In case there's only a single character in it, remove the
                        // entire node.
                        remove_node = Some(current_node.index);
                    } else {
                        // Otherwise, remove last character after the current position
                        val.remove(current_node.offset);
                    }
                },

                // Block nodes, remove it entirely
                Node::Newline |
                Node::Image { .. } => remove_node = Some(current_node.index),
            }
        }
        if let Some(index) = remove_node {
            self.nodes.remove(index);

            // A node has been removed. Re-normalize the state.
            self.normalize();
        }
    }

    /// Insert UTF-16 encoded text at the current caret position.
    fn handle_text(&mut self, text: Vec<u16>) {
        self.remove_selection();

        // Find the current node we're at
        if let Some(current_node) = self.find_start_node(Direction::After) {
            // If we're already at or in a text node, update existing text.
            if let Node::Text(ref mut val)
                    = self.nodes.get_mut(current_node.index).expect("No node at the specified index!") {
                self.caret_start += text.len();
                self.caret_end = self.caret_start;
                for (i, unit) in text.into_iter().enumerate() {
                    val.insert(current_node.offset + i, unit);
                }
                return;
            }

            // Otherwise, create new text node.
            self.caret_start += text.len();
            self.caret_end = self.caret_start;
            self.nodes.insert(current_node.index, Node::Text(text));
            return;
        };

        // If none was found, insert at end
        self.caret_start += text.len();
        self.caret_end = self.caret_start;
        if let Some(Node::Text(val)) = self.nodes.last_mut() {
            val.extend_from_slice(&text);
            return;
        }
        self.nodes.push(Node::Text(text));
    }

    /// Insert an image node at the current caret position.
    pub fn insert_image<S, A, C>(&mut self, src: S, alt: A, cls: C)
        where S: Into<String>,
              A: Into<String>,
              C: Into<String>,
    {
        self.insert_block_element(Node::Image {
            src: src.into(),
            alt: alt.into(),
            cls: cls.into(),
        });
    }

    /// Insert text at the current caret position.
    pub fn insert_text(&mut self, text: &str) {
        self.handle_text(text.encode_utf16().collect());
    }

    fn insert_block_element(&mut self, new_node: Node) {
        self.remove_selection();

        // Find the current node we're at
        if let Some(current_node) = self.find_start_node(Direction::After) {
            // If we're between two nodes, insert node
            if current_node.offset == 0 {
                self.caret_start += new_node.html_size();
                self.caret_end = self.caret_start;
                self.nodes.insert(current_node.index, new_node);
                return;
            }

            // Otherwise, if we're at a text node, split it and insert newline between.
            let split_node = {
                match self.nodes.get_mut(current_node.index).expect("No node at the specified index") {
                    Node::Text(ref mut val) => {
                        Some(Node::Text(val.split_off(current_node.offset)))
                    }
                    _ => None
                }
            };
            if let Some(split_node) = split_node {
                self.caret_start += new_node.html_size();
                self.caret_end = self.caret_start;
                self.nodes.insert(current_node.index + 1, new_node);
                self.nodes.insert(current_node.index + 2, split_node);
                return;
            }
        }

        // If none was found, insert at end
        self.caret_start += new_node.html_size();
        self.caret_end = self.caret_start;
        self.nodes.push(new_node);
    }

    pub fn to_virtual_nodes(&self) -> Vec<VirtualNode> {
        let mut virtual_nodes = Vec::with_capacity(self.node_count() + 1);

        for node in self.nodes.iter() {
            match node {
                Node::Text(ref text) => {
                    let string = String::from_utf16(text).expect("Invalid UTF16 bytes");
                    virtual_nodes.push(VirtualNode::text(string))
                },
                Node::Newline => virtual_nodes.push(VirtualNode::element("br")),
                Node::Image { src, alt, cls } => {
                    let mut element = VElement::new("img");
                    element.props.insert("src".into(), src.clone());
                    element.props.insert("alt".into(), alt.clone());
                    element.props.insert("class".into(), cls.clone());
                    virtual_nodes.push(element.into())
                },
            }
        }

        // Due to contenteditable quirks, always add a trailing newline.
        virtual_nodes.push(VirtualNode::element("br"));

        virtual_nodes
    }
}

impl Default for State {
    fn default() -> Self {
        State {
            nodes: vec![],
            caret_start: 0,
            caret_end: 0,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn image_node() -> Node {
        Node::Image {
            src: "img.jpg".to_string(),
            alt: "😀".to_string(),
            cls: "em".to_string(),
        }
    }

    mod handle_char_key {
        use super::*;

        #[test]
        fn handle_key_simple() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());
            assert_eq!(state.caret_start, 0);
            assert_eq!(state.caret_end, 0);

            state.handle_key(Key::Character("a"));
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_start, 1);
            assert_eq!(state.caret_end, 1);

            state.handle_key(Key::Character("b"));
            assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
            assert_eq!(state.caret_start, 2);
            assert_eq!(state.caret_end, 2);

            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_start, 1);
            assert_eq!(state.caret_end, 1);

            state.handle_key(Key::Enter);
            assert_eq!(state.nodes, vec![Node::text_from_str("a"), Node::Newline]);
            assert_eq!(state.caret_start, 5);
            assert_eq!(state.caret_end, 5);

            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_start, 1);
            assert_eq!(state.caret_end, 1);
        }

        #[test]
        fn handle_key_at_caret_pos_text() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());

            state.handle_key(Key::Character("a"));
            state.handle_key(Key::Character("b"));
            state.handle_key(Key::Character("c"));
            assert_eq!(state.nodes, vec![Node::text_from_str("abc")]);

            state.set_caret_position(2, 2);
            state.handle_key(Key::Character("d"));
            assert_eq!(state.nodes, vec![Node::text_from_str("abdc")]);
        }

        #[test]
        fn replace_text() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());

            state.handle_key(Key::Character("a"));
            state.handle_key(Key::Character("b"));
            state.handle_key(Key::Character("c"));
            state.handle_key(Key::Character("d"));
            assert_eq!(state.nodes, vec![Node::text_from_str("abcd")]);

            state.set_caret_position(1, 3);
            state.handle_key(Key::Character("X"));
            assert_eq!(state.nodes, vec![Node::text_from_str("aXd")]);
        }
    }

    mod handle_backspace {
        use super::*;

        #[test]
        fn in_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abc")];
            state.set_caret_position(2, 2);
            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("ac")]);
            assert_eq!(state.caret_start, 1);
            assert_eq!(state.caret_end, 1);
        }

        #[test]
        fn after_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abc"), Node::Newline];
            state.set_caret_position(3, 3);
            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("ab"), Node::Newline]);
            assert_eq!(state.caret_start, 2);
            assert_eq!(state.caret_end, 2);
        }

        #[test]
        fn after_newline() {
            let mut state = State::new();
            state.nodes = vec![
                Node::text_from_str("abc"),
                Node::Newline,
                Node::Newline,
                Node::text_from_str("d"),
            ];
            let pos = 3 + Node::Newline.html_size();
            state.set_caret_position(pos, pos);
            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![
                   Node::text_from_str("abc"),
                   Node::Newline,
                   Node::text_from_str("d"),
            ]);
            assert_eq!(state.caret_start, 3);
            assert_eq!(state.caret_end, 3);
        }

        #[test]
        fn before_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(0, 0);
            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
            assert_eq!(state.caret_start, 0);
            assert_eq!(state.caret_end, 0);
        }

        /// Remove a character that has 1 byte in UTF-16 but two bytes in UTF-8.
        #[test]
        fn remove_multibyte() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());

            state.handle_key(Key::Character("a"));
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            state.set_caret_position(1, 1);

            state.handle_key(Key::Character("ü"));
            assert_eq!(state.nodes, vec![Node::text_from_str("aü")]);
            state.set_caret_position(2, 2);

            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
        }

        /// Re-normalize after deleting nodes.
        #[test]
        fn normalize() {
            let mut state = State::new();
            state.nodes = vec![
                Node::text_from_str("a"),
                image_node(),
                Node::text_from_str("b"),
            ];
            let pos = 1 + image_node().html_size();
            state.set_caret_position(pos, pos);

            assert_eq!(state.node_count(), 3);
            state.handle_key(Key::Backspace);
            assert_eq!(state.node_count(), 1);
            assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
        }
    }

    mod handle_delete {
        use super::*;

        #[test]
        fn in_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abc")];
            state.set_caret_position(1, 1);
            state.handle_key(Key::Delete);
            assert_eq!(state.nodes, vec![Node::text_from_str("ac")]);
            assert_eq!(state.caret_start, 1);
            assert_eq!(state.caret_end, 1);
        }

        #[test]
        fn after_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abc")];
            state.set_caret_position(3, 3);
            state.handle_key(Key::Delete);
            assert_eq!(state.nodes, vec![Node::text_from_str("abc")]);
            assert_eq!(state.caret_start, 3);
            assert_eq!(state.caret_end, 3);
        }

        #[test]
        fn after_newline() {
            let mut state = State::new();
            state.nodes = vec![
                Node::text_from_str("abc"),
                Node::Newline,
                Node::Newline,
                Node::text_from_str("d"),
            ];
            let pos = 3 + Node::Newline.html_size();
            state.set_caret_position(pos, pos);
            state.handle_key(Key::Delete);
            assert_eq!(state.nodes, vec![
                   Node::text_from_str("abc"),
                   Node::Newline,
                   Node::text_from_str("d"),
            ]);
            assert_eq!(state.caret_start, pos);
            assert_eq!(state.caret_end, pos);
        }

        #[test]
        fn before_newline() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab"), Node::Newline];
            state.set_caret_position(2, 2);
            state.handle_key(Key::Delete);
            assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
            assert_eq!(state.caret_start, 2);
            assert_eq!(state.caret_end, 2);
        }
    }

    mod handle_enter {
        use super::*;

        #[test]
        fn start() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(0, 0);
            state.handle_key(Key::Enter);
            assert_eq!(state.nodes, vec![Node::Newline, Node::text_from_str("ab")]);
            assert_eq!(state.caret_start, Node::Newline.html_size());
            assert_eq!(state.caret_end, Node::Newline.html_size());
        }

        #[test]
        fn end() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(2, 2);
            state.handle_key(Key::Enter);
            assert_eq!(state.nodes, vec![Node::text_from_str("ab"), Node::Newline]);
            assert_eq!(state.caret_start, 2 + Node::Newline.html_size());
            assert_eq!(state.caret_end, 2 + Node::Newline.html_size());
        }

        #[test]
        fn between_nodes() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("a"), Node::text_from_str("b")];
            state.set_caret_position(1, 1);
            state.handle_key(Key::Enter);
            assert_eq!(state.nodes, vec![
                Node::text_from_str("a"),
                Node::Newline,
                Node::text_from_str("b"),
            ]);
            assert_eq!(state.caret_start, 1 + Node::Newline.html_size());
            assert_eq!(state.caret_end, 1 + Node::Newline.html_size());
        }

        #[test]
        fn split_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(1, 1);
            state.handle_key(Key::Enter);
            assert_eq!(state.nodes, vec![
                Node::text_from_str("a"),
                Node::Newline,
                Node::text_from_str("b"),
            ]);
            assert_eq!(state.caret_start, 1 + Node::Newline.html_size());
            assert_eq!(state.caret_end, 1 + Node::Newline.html_size());
        }
    }

    mod find_start_node {
        use super::*;

        /// Empty node list
        #[test]
        fn empty() {
            let state = State::new();
            assert!(state.find_start_node(Direction::Before).is_none());
            assert!(state.find_start_node(Direction::After).is_none());
        }

        /// Before the first node
        #[test]
        fn before_first() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            assert_eq!(state.find_start_node(Direction::Before), None);
            assert_eq!(state.find_start_node(Direction::After),
                       Some(NodeIndexOffset { offset: 0, index: 0 }));
        }

        /// In the middle of a text node
        #[test]
        fn in_text() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(1, 1);
            assert_eq!(state.find_start_node(Direction::Before),
                       Some(NodeIndexOffset { offset: 1, index: 0 }));
            assert_eq!(state.find_start_node(Direction::After),
                       Some(NodeIndexOffset { offset: 1, index: 0 }));
        }

        /// At the end
        #[test]
        fn at_end() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(2, 2);
            assert_eq!(state.find_start_node(Direction::Before),
                       Some(NodeIndexOffset { offset: 2, index: 0 }));
            assert_eq!(state.find_start_node(Direction::After), None);
        }

        /// Between two nodes
        #[test]
        fn between_two() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab"), Node::Newline];
            state.set_caret_position(2, 2);
            assert_eq!(state.find_start_node(Direction::Before),
                       Some(NodeIndexOffset { offset: 2, index: 0 }));
            assert_eq!(state.find_start_node(Direction::After),
                       Some(NodeIndexOffset { offset: 0, index: 1 }));
        }

        #[test]
        fn outofbounds() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab"), Node::text_from_str("cde")];

            // Caret position cannot be negative, but it can be larger than the
            // total length. Set it to 1 position *after* the end.
            state.set_caret_position(6, 6);

            // There is nothing after the caret position
            assert_eq!(state.find_start_node(Direction::After), None);

            // Use the last element but fix the offset
            assert_eq!(state.find_start_node(Direction::Before),
                       Some(NodeIndexOffset { offset: 3, index: 1 }));
        }
    }

    mod insert_text {
        use super::*;

        #[test]
        fn at_end() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("hello ")];
            state.set_caret_position(6, 6);
            state.insert_text("world");
            assert_eq!(state.nodes, vec![Node::text_from_str("hello world")]);
        }

        #[test]
        fn in_the_middle() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(1, 1);
            state.insert_text("XY");
            assert_eq!(state.nodes, vec![Node::text_from_str("aXYb")]);
        }

        #[test]
        fn replace_nodes() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab"), image_node()];
            state.set_caret_position(1, 1 + image_node().html_size());
            state.insert_text("z");
            assert_eq!(state.nodes, vec![Node::text_from_str("az")]);
        }
    }

    mod insert_image {
        use super::*;

        #[test]
        fn at_end() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());
            assert_eq!(state.caret_position(), (0, 0));

            state.handle_key(Key::Character("a"));
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_position(), (1, 1));

            let src = "heart.png";
            let alt = "♥";
            let cls = "emoji hääärz";
            state.insert_image(src, alt, cls);
            assert_eq!(state.nodes, vec![Node::text_from_str("a"), Node::Image {
                src: src.into(),
                alt: alt.into(),
                cls: cls.into(),
            }]);
            let len = format!("<img src=\"{}\" alt=\"{}\" class=\"{}\">", src, alt, cls).encode_utf16().count();
            assert_eq!(state.caret_position(), (1 + len, 1 + len));

            state.handle_key(Key::Backspace);
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_position(), (1, 1));
        }

        #[test]
        fn between_text() {
            let mut state = State::new();
            assert!(state.nodes.is_empty());
            assert_eq!(state.caret_position(), (0, 0));

            let src = "heart.png";
            let alt = "♥";
            let cls = "emoji hääärz";

            // Insert 4 characters
            state.handle_key(Key::Character("a"));
            state.handle_key(Key::Character("ä"));
            state.handle_key(Key::Character("ö"));
            state.handle_key(Key::Character("o"));

            // Ensure there's a single text node
            assert_eq!(state.nodes, vec![Node::text_from_str("aäöo")]);

            // Move back two characters
            state.set_caret_position(2, 2);

            // Insert image
            state.insert_image(src, alt, cls);
            assert_eq!(state.nodes, vec![
                Node::text_from_str("aä"),
                Node::Image {
                    src: src.into(),
                    alt: alt.into(),
                    cls: cls.into(),
                },
                Node::text_from_str("öo"),
            ]);
            let len = format!("<img src=\"{}\" alt=\"{}\" class=\"{}\">", src, alt, cls).encode_utf16().count();
            assert_eq!(state.caret_position(), (2 + len, 2 + len));
        }
    }

    mod html_size {
        use super::*;

        #[test]
        fn html_size_with_emoji() {
            let node = Node::Image {
                src: "test.jpg".to_string(),
                alt: "🍻".to_string(),
                cls: "umläöüt".to_string(),
            };
            assert_eq!(node.html_size(), 45);
        }
    }

    mod remove_selection {
        use super::*;

        #[test]
        fn remove_nothing() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(1, 1);
            assert_eq!(state.caret_position(), (1, 1));
            assert!(!state.remove_selection());
            assert_eq!(state.caret_position(), (1, 1));
        }

        #[test]
        fn remove_entire_text_node() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("ab")];
            state.set_caret_position(0, 2);
            assert!(state.remove_selection());
            assert_eq!(state.nodes.len(), 0);
        }

        #[test]
        fn remove_partial_text_node_middle() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abcde")];
            state.set_caret_position(1, 3);
            assert!(state.remove_selection());
            assert_eq!(state.nodes, vec![Node::text_from_str("ade")]);
        }

        #[test]
        fn remove_partial_text_node_to_end() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abcde"), Node::text_from_str("f")];
            state.set_caret_position(1, 5);
            assert!(state.remove_selection());
            assert_eq!(state.nodes, vec![Node::text_from_str("af")]);
        }

        #[test]
        fn remove_partial_text_node_past_end() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("abcde"), Node::text_from_str("fg")];
            state.set_caret_position(1, 6);
            assert!(state.remove_selection());
            assert_eq!(state.nodes, vec![Node::text_from_str("ag")]);
        }

        #[test]
        fn remove_entire_image_node() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("a"), image_node(), Node::text_from_str("b")];
            state.set_caret_position(1, 1 + image_node().html_size());
            assert!(state.remove_selection());
            assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
        }

        #[test]
        fn remove_partial_image_node() {
            // If the caret end is shorter than the node, remove the entire
            // node and adjust the caret end.
            let mut state = State::new();
            state.nodes = vec![image_node(), Node::text_from_str("a")];
            state.set_caret_position(0, image_node().html_size() - 5);
            assert!(state.remove_selection());
            assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
            assert_eq!(state.caret_position(), (0, 0));
        }
    }

    mod normalize {
        use super::*;

        #[test]
        fn merge_two() {
            let mut state = State::new();
            state.nodes = vec![Node::text_from_str("a"), Node::text_from_str("bc")];
            state.normalize();
            assert_eq!(state.nodes, vec![Node::text_from_str("abc")]);
        }

        #[test]
        fn merge_three() {
            let mut state = State::new();
            state.nodes = vec![
                Node::text_from_str("a"),
                Node::text_from_str("b"),
                Node::text_from_str("c"),
            ];
            state.normalize();
            assert_eq!(state.nodes, vec![Node::text_from_str("abc")]);
        }

        #[test]
        fn no_merge() {
            let mut state = State::new();
            state.nodes = vec![
                Node::text_from_str("a"),
                image_node(),
                Node::text_from_str("b"),
            ];
            state.normalize();
            assert_eq!(state.nodes.len(), 3);
        }
    }
}
