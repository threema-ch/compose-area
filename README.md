# compose-area

[![CircleCI][circle-ci-badge]][circle-ci]
[![License][license-badge]][license]

A compose area with support for Emoji, written with Rust + Webassembly.

Demo: https://threema-ch.github.io/compose-area/


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
