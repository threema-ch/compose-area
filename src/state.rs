use virtual_dom_rs::VirtualNode;

use ::keys::Key;

#[derive(Debug)]
pub(crate) enum Node {
    Text(String),
    Newline,
}

impl Node {
    fn to_html_size(&self) -> usize {
        match self {
            Node::Text(val) => val.len(),
            Node::Newline => 4, // <br>
        }
    }
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

    pub fn handle_key(&mut self, key: Key) {
        match key {
            Key::Enter => self.add_newline(),
            Key::Backspace => self.handle_backspace(),
            Key::Character(c) => self.add_text(c.to_string()),
        }
    }

    fn handle_backspace(&mut self) {
        let mut remove = false;
        match self.nodes.last_mut() {
            Some(Node::Text(val)) => remove = val.pop().is_none(),
            Some(Node::Newline) => remove = true,
            None => {},
        };
        if remove {
            let _ = self.nodes.pop();
        }
    }


    pub fn add_text(&mut self, text: String) {
        if let Some(Node::Text(val)) = self.nodes.last_mut() {
            // If the previous node is already text, append the new text.
            val.push_str(&text);
            return;
        }
        self.nodes.push(Node::Text(text));
    }

    pub fn add_newline(&mut self) {
        self.nodes.push(Node::Newline);
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
