use virtual_dom_rs::VirtualNode;

use ::keys::Key;

#[derive(Debug, PartialEq, Clone)]
pub(crate) enum Node {
    Text(String),
    Newline,
}

impl Node {
    fn html_size(&self) -> usize {
        match self {
            Node::Text(val) => val.len(),
            Node::Newline => 4, // <br>
        }
    }
}

/// The node at the current caret position.
#[derive(Debug, PartialEq)]
struct CurrentNode {
    /// Node index.
    index: usize,
    /// Offset from the node start.
    offset: usize,
}

/// This enum is relevant when determining the current node while the caret is
/// exactly between two nodes.
///
/// Depending on this enum value, the node before or after the cursor is returned.
#[derive(Debug, PartialEq)]
enum Direction {
    Before,
    After,
}

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

    /// Return the node at the current caret start position and the offset from
    /// the beginning of that node.
    ///
    /// If the cursor is exactly between two nodes, then either the following
    /// or the preceding node is returned, depending on the `direction` chosen.
    ///
    /// If the current caret position is after the end of the last node and the
    /// direction is `Before`, then the last node will be returned, with
    /// corrected offset.
    fn find_start_node_mut(&mut self, direction: Direction) -> Option<CurrentNode> {
        let mut offset = self.caret_start;
        let mut html_size = 0;

        // If there are no nodes, we can return immediately
        if self.nodes.is_empty() {
            return None;
        }

        // Iterate through the nodes
        for (index, node) in self.nodes.iter_mut().enumerate() {
            // If we're exactly at the start of the node, we can stop looking further.
            if offset == 0 {
                return match direction {
                    Direction::Before if index == 0 => None,
                    Direction::Before => Some(CurrentNode { offset: html_size, index: index - 1 }),
                    Direction::After => Some(CurrentNode { offset, index }),
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
                        return Some(CurrentNode { offset, index });
                    }
                    offset = new_offset;
                },
                None => {
                    // Underflow. Once we're below 0, we found the node.
                    return Some(CurrentNode { offset, index });
                },
            }
        }

        // We reached the end of the node list.
        match direction {
            Direction::Before => {
                assert!(offset > 0);
                // Fall back to the last node, but fix the offset.
                Some(CurrentNode {
                    offset: self.nodes.last().unwrap().html_size(),
                    index: self.nodes.len() - 1,
                })
            }
            Direction::After => None,
        }
    }

    pub fn handle_key(&mut self, key: Key) {
        match key {
            Key::Enter => self.add_newline(),
            Key::Backspace => self.handle_backspace(),
            Key::Character(c) => self.add_text(c.to_string()),
        }
    }

    fn handle_backspace(&mut self) {
        let mut remove_node = false;
        match self.nodes.last_mut() {
            Some(Node::Text(val)) => {
                self.caret_start -= 1;
                self.caret_end = self.caret_start;
                remove_node = val.pop().is_none();
            },
            Some(Node::Newline) => remove_node = true,
            None => {},
        };
        if remove_node {
            if let Some(removed) = self.nodes.pop() {
                self.caret_start -= removed.html_size();
                self.caret_end = self.caret_start;
            }
        }
    }

    pub fn add_text(&mut self, text: String) {
        // Find the current node we're at
        if let Some(current_node) = self.find_start_node_mut(Direction::After) {
            // If we're already at or in a text node, update existing text.
            match self.nodes.get_mut(current_node.index).expect("No node at the specified index!") {
                &mut Node::Text(ref mut val) => {
                    self.caret_start += text.len();
                    self.caret_end = self.caret_start;
                    val.insert_str(current_node.offset, &text);
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
            val.push_str(&text);
            return;
        }
        self.nodes.push(Node::Text(text));
    }

    pub fn add_newline(&mut self) {
        let nl = Node::Newline;
        self.caret_start += nl.html_size();
        self.caret_end = self.caret_start;
        self.nodes.push(nl);
    }

    pub fn set_caret_position(&mut self, start: usize, end: usize) {
        self.caret_start = start;
        self.caret_end = end;
    }

    pub fn to_virtual_node(&self) -> VirtualNode {
        let mut root = VirtualNode::new("span");
        if root.children.is_none() {
            root.children = Some(vec![]);
        };
        for node in self.nodes.iter() {
            match node {
                Node::Text(text) => root.children.as_mut().unwrap().push(VirtualNode::text(text)),
                Node::Newline => root.children.as_mut().unwrap().push(VirtualNode::new("br")),
            }
        }
        root
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_handle_key_simple() {
        let mut state = State::new();
        assert!(state.nodes.is_empty());
        assert_eq!(state.caret_start, 0);
        assert_eq!(state.caret_end, 0);

        state.handle_key(Key::Character("a"));
        assert_eq!(state.nodes, vec![Node::Text("a".into())]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);

        state.handle_key(Key::Character("b"));
        assert_eq!(state.nodes, vec![Node::Text("ab".into())]);
        assert_eq!(state.caret_start, 2);
        assert_eq!(state.caret_end, 2);

        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::Text("a".into())]);
        assert_eq!(state.caret_start, 1);
        assert_eq!(state.caret_end, 1);

        state.handle_key(Key::Enter);
        assert_eq!(state.nodes, vec![Node::Text("a".into()), Node::Newline]);
        assert_eq!(state.caret_start, 5);
        assert_eq!(state.caret_end, 5);

        state.handle_key(Key::Backspace);
        assert_eq!(state.nodes, vec![Node::Text("a".into())]);
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
        assert_eq!(state.nodes, vec![Node::Text("abc".into())]);

        state.set_caret_position(2, 2);
        state.handle_key(Key::Character("d"));
        assert_eq!(state.nodes, vec![Node::Text("abdc".into())]);
    }

    /// Empty node list
    #[test]
    fn test_find_start_node_empty() {
        let mut state = State::new();
        assert!(state.find_start_node_mut(Direction::Before).is_none());
        assert!(state.find_start_node_mut(Direction::After).is_none());
    }

    /// Before the first node
    #[test]
    fn test_find_start_node_before_first() {
        let mut state = State::new();
        state.nodes = vec![Node::Text("ab".into())];
        assert_eq!(state.find_start_node_mut(Direction::Before), None);
        assert_eq!(state.find_start_node_mut(Direction::After),
                   Some(CurrentNode { offset: 0, index: 0 }));
    }

    /// In the middle of a text node
    #[test]
    fn test_find_start_node_in_text() {
        let mut state = State::new();
        state.nodes = vec![Node::Text("ab".into())];
        state.set_caret_position(1, 1);
        assert_eq!(state.find_start_node_mut(Direction::Before),
                   Some(CurrentNode { offset: 1, index: 0 }));
        assert_eq!(state.find_start_node_mut(Direction::After),
                   Some(CurrentNode { offset: 1, index: 0 }));
    }

    /// At the end
    #[test]
    fn test_find_start_node_at_end() {
        let mut state = State::new();
        state.nodes = vec![Node::Text("ab".into())];
        state.set_caret_position(2, 2);
        assert_eq!(state.find_start_node_mut(Direction::Before),
                   Some(CurrentNode { offset: 2, index: 0 }));
        assert_eq!(state.find_start_node_mut(Direction::After), None);
    }

    /// Between two nodes
    #[test]
    fn test_find_start_node_between_two() {
        let mut state = State::new();
        state.nodes = vec![Node::Text("ab".into()), Node::Newline];
        state.set_caret_position(2, 2);
        assert_eq!(state.find_start_node_mut(Direction::Before),
                   Some(CurrentNode { offset: 2, index: 0 }));
        assert_eq!(state.find_start_node_mut(Direction::After),
                   Some(CurrentNode { offset: 0, index: 1 }));
    }

    #[test]
    fn test_find_start_node_outofbounds() {
        let mut state = State::new();
        state.nodes = vec![Node::Text("ab".into()), Node::Text("cde".into())];

        // Caret position cannot be negative, but it can be larger than the
        // total length. Set it to 1 position *after* the end.
        state.set_caret_position(6, 6);

        // There is nothing after the caret position
        assert_eq!(state.find_start_node_mut(Direction::After), None);

        // Use the last element but fix the offset
        assert_eq!(state.find_start_node_mut(Direction::Before),
                   Some(CurrentNode { offset: 3, index: 1 }));
    }
}
