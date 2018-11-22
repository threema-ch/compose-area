use unicode_normalization::char::{is_combining_mark, canonical_combining_class};

#[derive(PartialEq, Debug)]
pub enum Key<'a> {
    Character(&'a str),
    Enter,
    Backspace,
}

impl<'a> Key<'a> {
    pub fn from_str(val: &str) -> Option<Key> {
        Some(match val {
            "Enter" => Key::Enter,
            "Backspace" => Key::Backspace,
            val if is_key_string(val) => Key::Character(val),
            _ => return None,
        })
    }
}

/// Determine whether a key value is a valid key string.
///
/// A key string is a string containing a 0 or 1 non-control characters ("base"
/// characters) followed by 0 or more combining characters.
///
/// A non-control character is any valid Unicode character except those that
/// are part of the "Other, Control" ("Cc") General Category.
///
/// A combining character is any valid Unicode character in the "Mark, Spacing
/// Combining" ("Mc") General Category or with a non-zero Combining Class.
///
/// https://www.w3.org/TR/uievents-key/#keys-unicode
fn is_key_string(key_val: &str) -> bool {
    let mut chars = key_val.chars();
    match chars.next() {
        Some(c) if c.is_control() => return false,
        Some(_) => { /* Non control character */ },
        None => return false,
    };
    for c in chars {
        if !(is_combining_mark(c) || canonical_combining_class(c) != 0) {
            return false;
        }
    }
    return true;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_key_string() {
        assert!(!is_key_string("Enter"));
        assert!(!is_key_string("Shift"));
        assert!(!is_key_string("F1"));

        assert!(is_key_string("a"));
        assert!(is_key_string("Ö"));
        assert!(is_key_string("ø"));
        assert!(is_key_string("😀"));
    }

    #[test]
    fn test_key_from_str() {
        assert_eq!(Key::from_str("Enter"), Some(Key::Enter));
        assert_eq!(Key::from_str("Backspace"), Some(Key::Backspace));
        assert_eq!(Key::from_str("Q"), Some(Key::Character("Q".into())));
        assert_eq!(Key::from_str("Alt"), None);
        assert_eq!(Key::from_str("Shift"), None);
        assert_eq!(Key::from_str("Asdf"), None);
    }
}
