# compose-area

[![CircleCI][circle-ci-badge]][circle-ci]
[![License][license-badge]][license]

A compose area with support for Emoji, written with Rust + Webassembly.

Demo: https://threema-ch.github.io/compose-area/

Project status: Alpha, still working out initial bugs.


## Concepts

This project provides a simple text editor with support for media content (e.g.
emoji), implemented on top of a content editable div.

The input handling is done entirely by the browser. The library should be
notified every time the caret position is changed, so it can update its
internal state. It provides methods to insert text, images or other block
elements. Selection and caret position are handled automatically.


## Usage

First, import the library.

```js
import * as wasm from 'compose-area';
```

Next, bind to the wrapper element (a div with the specified `id`):

```js
const composeArea = wasm.bind_to('wrapper');
```

Because the insertion should work even when there is no selection / focus
inside the compose area, the library needs to know about all selection change
events. Register them using an event listener:

```js
document.addEventListener('selectionchange', (e) => {
    composeArea.store_selection_range();
});
```

Now you can start typing inside the compose area. It behaves like a regular
content editable div.

To insert text or images through code, use the following two functions:

```js
//                       src          alt   class
composeArea.insert_image("emoji.jpg", "😀", "emoji");

//                      text
composeArea.insert_text("hello");
```

To extract the text from the area, there's also a method:

```js
composeArea.get_text();
```


## Dev Setup

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
