# compose-area

A compose area with support for Emoji, written with Rust + Webassembly.

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

## Running the testproject

    # Setup npm
    cd pkg
    npm link
    cd ../www
    npm install
    npm link compose-area 

    # Run server
    npm run start
