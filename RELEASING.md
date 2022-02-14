# Releasing

Set variables:

    export VERSION=X.Y.Z
    export GPG_KEY=E7ADD9914E260E8B35DFB50665FDE935573ACDA6

Update version numbers:

    vim -p Cargo.toml
    cargo update -p compose-area
    cd www && npm install && cd ..

Update changelog:

    vim CHANGELOG.md

Commit & tag:

    git commit -S${GPG_KEY} -m "Release v${VERSION}"
    git tag -s -u ${GPG_KEY} v${VERSION} -m "Version ${VERSION}"

Publish:

    # We need to build both bundler and web targets, and combine them
    bash scripts/package.sh

    # Ensure that *_bg.js file is included: https://github.com/rustwasm/wasm-pack/issues/837
    cd pkg && npm publish --access=public && cd ..

    git push && git push --tags
