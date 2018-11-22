pub enum Key<'a> {
    Character(&'a str),
    Alt,
    Control,
    Shift,
    Enter,
    Backspace,
    OS,
}

impl<'a> Key<'a> {
    pub fn from_str(val: &str) -> Key {
        match val {
            "Alt" => Key::Alt,
            "Control" => Key::Control,
            "Shift" => Key::Shift,
            "Enter" => Key::Enter,
            "Backspace" => Key::Backspace,
            "OS" => Key::OS,
            other => Key::Character(other)
        }
    }
}

