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


## Setup

Note: A dependency graph that contains any wasm must all be imported
asynchronously. This can be done using
[dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports).

### Bootstrapping JS

The simplest way is to use a bootstrapping js as the entry point to your entire application:

```js
// bootstrap.js
import('./index.js')
  .catch(e => console.error('Error importing `index.js`:', e));
```

```js
// index.js
import * as ca from '@threema/compose-area';
```

### Dynamic Import (Promise)

Alternatively, import the library asynchronously:

```js
import('@threema/compose-area')
    .then((ca) => {
        // Use the library
    });
```

If you're in an asynchronous context, you can also use the `await` keyword.

```js
const ca = await import('@threema/compose-area');
```


## Usage

Next, bind to the wrapper element:

```js
const area = ca.ComposeArea.bind_to(document.getElementById('wrapper'));
```

Because the insertion should work even when there is no selection / focus
inside the compose area, the library needs to know about all selection change
events. Register them using an event listener:

```js
document.addEventListener('selectionchange', (e) => {
    area.store_selection_range();
});
```

Now you can start typing inside the compose area. It behaves like a regular
content editable div.

To insert text or images through code, use the following two functions:

```js
//                src          alt   class
area.insert_image("emoji.jpg", "😀", "emoji");

//               text
area.insert_text("hello");
```

To extract the text from the area, there's also a method:

```js
area.get_text();
```

If you want to properly handle pasting of formatted text, intercept the `paste`
event:

```js
wrapper.addEventListener('paste', (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain');
    if (clipboardData) {
        area.insert_text(clipboardData);
    }
});
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
