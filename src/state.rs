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
struct CurrentNode {
    /// Node index.
    index: usize,
    /// Offset from the node start.
    offset: usize,
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

    /// Return the node at the current caret position and the offset from the
    /// node start.
    ///
    /// If the node list is empty, or if the position is at or after the end of
    /// the node list, `None` is returned.
    fn find_start_node_mut(&mut self) -> Option<CurrentNode> {
        let mut offset = self.caret_start;
        for (index, node) in self.nodes.iter_mut().enumerate() {
            // Iterate through the nodes and subtract the node size from the
            // offset.
            match offset.checked_sub(node.html_size()) {
                Some(new_offset) => offset = new_offset,
                None => {
                    // Underflow. Once we're below 0, we found the node.
                    return Some(CurrentNode { offset, index });
                },
            }
        }
        None
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
        if let Some(current_node) = self.find_start_node_mut() {
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

    pub fn to_html(&self) -> String {
        let mut out = String::new();
        for node in self.nodes.iter() {
            match node {
                Node::Text(text) => out.push_str(&text),
                Node::Newline => out.push_str("<br>"),
            }
        }
        out
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

    #[test]
    fn test_find_start_node() {
        let mut state = State::new();

        // Initially, no reference node
        assert!(state.find_start_node_mut().is_none());

        // First node is reference
        state.nodes = vec![Node::Text("ab".into())];
        let info = state.find_start_node_mut().expect("1");
        assert_eq!(info.offset, 0);
        assert_eq!(info.index, 0);

        // In the middle of the text node
        state.set_caret_position(1, 1);
        let info = state.find_start_node_mut().expect("2");
        assert_eq!(info.offset, 1);
        assert_eq!(info.index, 0);

        // At the end
        state.set_caret_position(2, 2);
        assert!(state.find_start_node_mut().is_none());

        // Between two nodes
        state.nodes = vec![Node::Text("ab".into()), Node::Newline];
        let info = state.find_start_node_mut().expect("3");
        assert_eq!(info.offset, 0);
        assert_eq!(info.index, 1);
    }
}
