use cfg_if::cfg_if;
use web_sys::Node;

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

/// Setup function that should be called by all tests.
#[test]
pub(crate) fn setup_test() {
    // Initialize console logger, ignore errors. (Errors occur if the logger is
    // initialized multiple times, we can ignore that.)
    use log::Level;
    let _ = console_log::init_with_level(Level::Trace);
}

#[inline]
pub(crate) fn is_text_node(node: &Node) -> bool {
    node.node_type() == Node::TEXT_NODE
}
