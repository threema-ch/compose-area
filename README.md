# compose-area

[![CircleCI][circle-ci-badge]][circle-ci]
[![License][license-badge]][license]

A compose area with support for Emoji, written with Rust + Webassembly.

Demo: https://threema-ch.github.io/compose-area/

Project status: Alpha, still working out initial bugs.


## Concepts

This project provides a simple text editor with support for media content (e.g.
emoji), implemented on top of a content editable div.

If you've ever done any cross-browser editor implementation using
content-editable elements, then you know that content-editable elements are
terrible. They [behave differently](https://www.dhs.state.il.us/accessibility/tests/contenteditabletest.html)
in every browser and the transformations resulting from input events are not
well-defined. Please read [this blogpost by Medium
Engineering](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480)
for some more background information.

This project uses DOM event listeners, WebAssembly (through Rust) and a virtual
DOM to implement a text editor that reacts predictably to input events:

 1. We initialize and maintain an internal state on the WebAssembly side. It's
    a simple linear list of (non-DOM) nodes of different types, e.g. text
    nodes, newline nodes or image nodes.
 2. We bind to a wrapper element in the DOM. All relevant events that would
    change the state of that element (e.g. typing, selection changes, pasting,
    etc) are sent to WebAssembly and processed there. All events have
    well-defined effects on the internal state.
 3. Every time the state changes, the old and the new state are translated to a
    virtual DOM. The two versions of that virtual DOM are diffed, resulting in
    a set of patches that can translate the old DOM state to a version that
    matches the new state. By applying those patches to the DOM, we can sync
    the two states.

This gives us mostly reliable, well-defined and testable behavior for a simple
text editor.

Unfortunately there are situations where input events are not clearly defined
by web standards. For example when using an IME to input Japanese text, or when
using autocompletion on a touch device. In those cases, we simply re-parse the
DOM and convert it back into the internal state representation.


## Setup

    cargo install wasm-pack


## Building

    # Debug build
    wasm-pack build

    # Release build
    wasm-pack build --release -- --no-default-features


## Testing

    # Unit tests
    cargo test

    # Browser tests (headless)
    wasm-pack test --headless --firefox
    # ...or if you want to filter tests by name
    cargo test --target wasm32-unknown-unknown <filter>

    # Selenium tests (test server must be started)
    cd selenium
    npm test firefox


## Linting

    # Setup
    rustup component add clippy

    # Run linting checks
    cargo clean && cargo clippy --all-targets --all-features


## Running the testproject

    # Setup npm
    cd pkg
    npm link
    cd ../www
    npm install
    npm link compose-area 

    # Run server
    npm run start


## License

Licensed under either of

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

at your option.


<!-- Badges -->
[circle-ci]: https://circleci.com/gh/threema-ch/compose-area/tree/master
[circle-ci-badge]: https://circleci.com/gh/threema-ch/compose-area/tree/master.svg?style=shield
[license]: https://github.com/threema-ch/compose-area#license
[license-badge]: https://img.shields.io/badge/License-Apache%202.0%20%2f%20MIT-blue.svg
