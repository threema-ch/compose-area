#[derive(Debug)]
pub(crate) enum Node {
    Text(String),
    Emoji(Vec<u8>),
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

    pub fn add_text(&mut self, text: String) {
        self.nodes.push(Node::Text(text));
    }
}
