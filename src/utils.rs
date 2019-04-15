use cfg_if::cfg_if;
use wasm_bindgen::JsCast;
use web_sys::{CharacterData, Node, Element};

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        pub use self::console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        pub fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `console_log` feature is enabled, forward log calls to the
    // JS console.
    if #[cfg(feature = "console_log")] {
        pub fn init_log() {
            use log::Level;
            // Best effort, ignore error if initialization fails.
            // (This could be the ase if the logger is initialized multiple
            // times.)
            let _ = console_log::init_with_level(Level::Trace);
        }
    } else {
        pub fn init_log() {}
    }
}

/// Return whether the node is a character data node.
#[inline]
pub(crate) fn is_character_data_node(node: &Node) -> bool {
    node.is_instance_of::<CharacterData>()
}

/// Return the last child node of the specified parent element (or `None`).
pub(crate) fn get_last_child(parent: &Element) -> Option<Node> {
    let child_nodes = parent.child_nodes();
    let child_count = child_nodes.length();
    if child_count == 0 {
        return None;
    }
    Some(child_nodes.get(child_count - 1).expect("Could not access last child node"))
}
