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
        State {
            nodes: vec![],
            caret_start: 0,
            caret_end: 0,
        }
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

    /// Return the start and end caret position.
    pub fn caret_position(&self) -> (usize, usize) {
        (self.caret_start, self.caret_end)
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

    pub fn handle_key(&mut self, key: Key) {
        match key {
            Key::Enter => self.handle_enter(),
            Key::Backspace => self.handle_backspace(),
            Key::Character(c) => self.handle_text(c.encode_utf16().collect()),
        }
    }

    fn handle_backspace(&mut self) {
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
                &mut Node::Text(ref mut val) => {
                    if val.len() <= 1 {
                        // In case there's only a single character in it, remove the
                        // entire node.
                        remove_node = Some(current_node.index);
                    } else {
                        // Otherwise, remove last character and the entire node in
                        val.remove(current_node.offset - 1);
                        self.caret_start -= 1;
                        self.caret_end = self.caret_start;
                    }
                },

                // Block nodes, remove it entirely
                &mut Node::Newline |
                &mut Node::Image { .. } => remove_node = Some(current_node.index),
            }
        }
        if let Some(index) = remove_node {
            let removed_node = self.nodes.remove(index);
            self.caret_start -= removed_node.html_size();
            self.caret_end = self.caret_start;
        }
    }

    fn handle_text(&mut self, text: Vec<u16>) {
        // Find the current node we're at
        if let Some(current_node) = self.find_start_node(Direction::After) {
            // If we're already at or in a text node, update existing text.
            match self.nodes.get_mut(current_node.index).expect("No node at the specified index!") {
                &mut Node::Text(ref mut val) => {
                    self.caret_start += text.len();
                    self.caret_end = self.caret_start;
                    for (i, unit) in text.into_iter().enumerate() {
                        val.insert(current_node.offset + i, unit);
                    }
                    return;
                },
                _ => {},
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

    fn handle_enter(&mut self) {
        self.insert_block_element(Node::Newline);
    }

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

    fn insert_block_element(&mut self, new_node: Node) {
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
                    &mut Node::Text(ref mut val) => {
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

    pub fn set_caret_position(&mut self, start: usize, end: usize) {
        self.caret_start = start;
        self.caret_end = end;
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_handle_key_simple() {
        eprint!("a");
        let mut state = State::new();
        assert!(state.nodes.is_empty());
        assert_eq!(state.caret_start, 0);
        assert_eq!(state.caret_end, 0);

        eprint!("b");
        state.handle_key(Key::Character("a"));
        assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);

        eprint!("c");
        state.handle_key(Key::Character("b"));
        assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
        assert_eq!(state.caret_start, 2);
        assert_eq!(state.caret_end, 2);

        eprint!("d");
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);

        eprint!("e");
        state.handle_key(Key::Enter);
        assert_eq!(state.nodes, vec![Node::text_from_str("a"), Node::Newline]);
        assert_eq!(state.caret_start, 5);
        assert_eq!(state.caret_end, 5);

        eprint!("f");
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("a")]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);
    }

    #[test]
    fn test_handle_key_at_caret_pos_text() {
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
    fn test_handle_backspace_in_text() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("abc")];
        state.set_caret_position(2, 2);
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("ac")]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);
    }

    #[test]
    fn test_handle_backspace_after_text() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("abc"), Node::Newline];
        state.set_caret_position(3, 3);
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("ab"), Node::Newline]);
        assert_eq!(state.caret_start, 2);
        assert_eq!(state.caret_end, 2);
    }

    #[test]
    fn test_handle_backspace_after_newline() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("abc"), Node::Newline, Node::text_from_str("d")];
        let pos = 3 + Node::Newline.html_size();
        state.set_caret_position(pos, pos);
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("abc"), Node::text_from_str("d")]);
        assert_eq!(state.caret_start, 3);
        assert_eq!(state.caret_end, 3);
    }

    #[test]
    fn test_handle_backspace_before_text() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab")];
        state.set_caret_position(0, 0);
        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::text_from_str("ab")]);
        assert_eq!(state.caret_start, 0);
        assert_eq!(state.caret_end, 0);
    }

    #[test]
    fn test_handle_enter_start() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab")];
        state.set_caret_position(0, 0);
        state.handle_key(Key::Enter);
        assert_eq!(state.nodes, vec![Node::Newline, Node::text_from_str("ab")]);
        assert_eq!(state.caret_start, Node::Newline.html_size());
        assert_eq!(state.caret_end, Node::Newline.html_size());
    }

    #[test]
    fn test_handle_enter_end() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab")];
        state.set_caret_position(2, 2);
        state.handle_key(Key::Enter);
        assert_eq!(state.nodes, vec![Node::text_from_str("ab"), Node::Newline]);
        assert_eq!(state.caret_start, 2 + Node::Newline.html_size());
        assert_eq!(state.caret_end, 2 + Node::Newline.html_size());
    }

    #[test]
    fn test_handle_enter_between_nodes() {
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
    fn test_handle_enter_split_text() {
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

    /// Empty node list
    #[test]
    fn test_find_start_node_empty() {
        let state = State::new();
        assert!(state.find_start_node(Direction::Before).is_none());
        assert!(state.find_start_node(Direction::After).is_none());
    }

    /// Before the first node
    #[test]
    fn test_find_start_node_before_first() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab")];
        assert_eq!(state.find_start_node(Direction::Before), None);
        assert_eq!(state.find_start_node(Direction::After),
                   Some(NodeIndexOffset { offset: 0, index: 0 }));
    }

    /// In the middle of a text node
    #[test]
    fn test_find_start_node_in_text() {
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
    fn test_find_start_node_at_end() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab")];
        state.set_caret_position(2, 2);
        assert_eq!(state.find_start_node(Direction::Before),
                   Some(NodeIndexOffset { offset: 2, index: 0 }));
        assert_eq!(state.find_start_node(Direction::After), None);
    }

    /// Between two nodes
    #[test]
    fn test_find_start_node_between_two() {
        let mut state = State::new();
        state.nodes = vec![Node::text_from_str("ab"), Node::Newline];
        state.set_caret_position(2, 2);
        assert_eq!(state.find_start_node(Direction::Before),
                   Some(NodeIndexOffset { offset: 2, index: 0 }));
        assert_eq!(state.find_start_node(Direction::After),
                   Some(NodeIndexOffset { offset: 0, index: 1 }));
    }

    #[test]
    fn test_find_start_node_outofbounds() {
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

    /// Remove a character that has 1 byte in UTF-16 but two bytes in UTF-8.
    #[test]
    fn test_handle_key_remove_multibyte() {
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

    #[test]
    fn insert_image_at_end() {
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
    fn insert_image_between_text() {
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

    #[test]
    fn test_html_size_with_emoji() {
        let node = Node::Image {
            src: "test.jpg".to_string(),
            alt: "🍻".to_string(),
            cls: "umläöüt".to_string(),
        };
        assert_eq!(node.html_size(), 45);
    }
}
