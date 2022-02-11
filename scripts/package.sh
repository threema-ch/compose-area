#!/usr/bin/env bash
#
# Package library for npm.
#
# This will combine both a bundler target and a web target into a single
# package.
set -euo pipefail

# Clean up directories
rm -rf pkg pkg-web

# Build targets
wasm-pack build --release --scope threema --target bundler -d pkg
wasm-pack build --release --scope threema --target web -d pkg-web

# Combine targets
mkdir pkg/web/
mv pkg-web/compose_area* pkg-web/package.json pkg/web/
rm -r pkg-web/

# Ensure that package.json includes web files
sed -i 's/"LICENSE-MIT"$/\0,\n    "web\/*"/' pkg/package.json

echo 'Done. Find your package in the pkg/ directory.'
