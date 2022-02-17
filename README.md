# compose-area

[![CircleCI][circle-ci-badge]][circle-ci]
[![License][license-badge]][license]

A compose area with support for Emoji, written with Rust + Webassembly.

Demo: https://threema-ch.github.io/compose-area/


## Concepts

This project provides a simple text editor with support for media content (e.g.
emoji), implemented on top of a content editable div.

The input handling is done entirely by the browser. The library should be
notified every time the caret position is changed, so it can update its
internal state. It provides methods to insert text, images or other block
elements. Selection and caret position are handled automatically.


## Package on npmjs.com

This project is published to npmjs.com:

<https://www.npmjs.com/package/@threema/compose-area>

The published package contains files for two different [wasm-pack build
targets](https://rustwasm.github.io/wasm-pack/book/commands/build.html#target):

- The root directory contains files for the wasm-pack `bundler` target. You
  will need a bundler like webpack in order to use the library this way.
- In the `web` subdirectory (i.e. `node_modules/@threema/compose-area/web/`)
  you will find files built for the wasm-pack `web` target.


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

### Initialization

This library requires a wrapper element with `white-space` set to `pre` or
`pre-wrap` in order to work properly.

```html
<div id="wrapper" style="white-space: pre-wrap;"></div>
```

First, bind to the wrapper element:

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

### Inserting

Now you can start typing inside the compose area. It behaves like a regular
content editable div.

To insert text or images through code, use the following two functions:

```js
//                src          alt   class
area.insert_image("emoji.jpg", "😀", "emoji");

//               text
area.insert_text("hello");
```

You can also insert HTML or a DOM node directly:

```js
area.insert_html("<div></div>");
area.insert_node(document.createElement("span"));
```

*(Note: Due to browser limitations, inserting a node directly will not result
in a new entry in the browser's internal undo stack. This means that the node
insertion cannot be undone using Ctrl+Z. If you need that, use `insert_html`
instead.)*

The `insert_image` method returns a reference to the inserted element, so that
you can set custom attributes on it.

```js
const img = area.insert_image(...);
img.draggable = false;
img.ondragstart = (e) => e.preventDefault();
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

### Extracting Text

To extract the text from the area, there's also a method:

```js
area.get_text();
```

By default, leading and trailing white-space is trimmed from the text. To
disable this, pass `true` to the `get_text` method.

```js
area.get_text(true /* no_trim */);
```

### Other helpers

To test whether the compose area is empty:

```js
area.is_empty();
```

By default, if the compose area contains purely white-space, this method still
considers the compose area to be empty. If you want a compose area containing
white-space to be treated as non-empty, pass `true` to the `is_empty` method.

```js
area.is_empty(true /* no_trim */);
```

To focus the compose area programmatically:

```js
area.focus();
```

To clear the contents of the compose area:

```js
area.clear();
```


## Dev Setup

    cargo install wasm-pack


## Building

    # Debug build
    wasm-pack build

    # Release build
    wasm-pack build --release -- --no-default-features


## Running the testproject

    # Setup npm
    cd www
    npm install

    # Run server
    npm run start


## Testing

    # Unit tests
    cargo test

    # Browser tests (headless)
    wasm-pack test --headless --firefox
    # ...or if you want to filter tests by name
    wasm-pack test --headless --firefox . -- <filter>

    # Selenium tests (test server must be started)
    cd selenium
    npm test firefox


## Linting

    # Setup
    rustup component add clippy

    # Run linting checks
    cargo clean && cargo clippy --all-targets --all-features


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
