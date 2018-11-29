# compose-area

A compose area with support for Emoji, written with Rust + Webassembly.

## Setup

    cargo install wasm-pack

## Building

    wasm-pack build

## Testing

    # Unit tests
    cargo test

    # Browser tests (headless)
    wasm-pack test --headless --firefox
