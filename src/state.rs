use virtual_dom_rs::VirtualNode;

use ::keys::Key;

#[derive(Debug)]
pub(crate) enum Node {
    Text(String),
    Newline,
}

#[derive(Debug)]
pub struct State {
    nodes: Vec<Node>,
}

impl State {
    pub fn new() -> Self {
        State {
            nodes: vec![],
        }
    }

    pub fn handle_key(&mut self, key: Key) {
        match key {
            Key::Enter => self.add_newline(),
            Key::Backspace => self.handle_backspace(),
            Key::Character(c) => self.add_text(c.to_string()),
            _ => {},
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
