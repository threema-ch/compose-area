# Changelog

This project follows semantic versioning.

Possible log types:

- `[added]` for new features.
- `[changed]` for changes in existing functionality.
- `[deprecated]` for once-stable features removed in upcoming releases.
- `[removed]` for deprecated features removed in this release.
- `[fixed]` for any bug fixes.
- `[security]` to invite users to upgrade in case of vulnerabilities.
- `[maintenance]` for maintenance work like dependency updates.


### v0.4.6 (2022-04-04)

- [fixed] Fix another double-newline issue (#96)
- [maintenance] Update dependencies

### v0.4.5 (2022-02-14)

- [added] Add web target to package in addition to bundler target (#91)
- [added] Add `is_empty` method (#93)
- [maintenance] Update dependencies

### v0.4.4 (2020-12-24)

- [fixed] Fix packaging bug caused by wasm-pack (https://github.com/rustwasm/wasm-pack/issues/837)

### v0.4.3 (2020-12-24)

- [fixed] Avoid duplicated newlines when pressing enter (#72, #74)
- [maintenance] Update dependencies (#73)

### v0.4.2 (2020-06-09)

- [fixed] Fix packaging bug caused by wasm-pack (https://github.com/rustwasm/wasm-pack/issues/837)

### v0.4.1 (2020-06-09)

- [added] ComposeArea.insert_image: Downcast Element to HtmlElement (#63)

### v0.4.0 (2020-06-09)

- [maintenance] Upgrade wasm-pack. This upgrade generates more strict
  TypeScript declaration files.

### v0.3.7 (2020-06-09)

- [fixed] Downgrade wasm-pack again, because the newer version generated
  potentially semver-incommpatible type declarations (#62)

### v0.3.6 (2020-06-02)

- [maintenance] Update dependencies (#58, #59, #60)

### v0.3.5 (2020-01-21)

- [maintenance] Update dependencies (#56)

### v0.3.4 (2019-10-28)

- [maintenance] Upgrade wasm-bindgen to 0.2.50

### v0.3.3 (2019-06-27)

- [fixed] Never trim text nodes (#47) 

### v0.3.2 (2019-06-27)

- [fixed] Handle newlines in Chromium with `white-space: pre` (#44)
- [fixed] Fix undo stack (#45)
- [maintenance] Upgrade wasm-bindgen to 0.2.47 (#46)

### v0.3.1 (2019-05-22)

- [fixed] Fix offset bug in "word at caret" methods (#41)

### v0.3.0 (2019-05-22)

- [added] Add `ComposeArea::get_word_at_caret` (#39)
- [added] Add `ComposeArea::select_word_at_caret` (#39)
- [fixed] Thanks to a fix in wasm-bindgen, optional parameters in the
  TypeScript declaration files should now be marked as omittable
- [maintenance] Upgrade wasm-bindgen to 0.2.45 (#40)

### v0.2.2 (2019-05-13)

- [added] More logging, especially on trace level

### v0.2.1 (2019-05-13)

- [added] Configurable log level (#37)
- [maintenance] Upgrade wasm-bindgen to 0.2.42 (#33)

### v0.2.0 (2019-04-25)

- [added] Add `ComposeArea::focus` (#29)
- [added] Add `ComposeArea::clear` (#30)
- [added] Expose `ComposeArea::insert_node` (#31)
- [changed] `ComposeArea::insert_image` now returns reference to the img element
- [changed] `ComposeArea::get_text`: Make `no_trim` parameter optional
- [changed] `ComposeArea::bind_to`: Stop inserting `<br>` element
- [maintenance] Upgrade wasm-bindgen to 0.2.42

### v0.1.1 (2019-04-23)

- [changed] The standalone `bind_to` function was moved to `ComposeArea.bind_to`
- [changed] The `bind_to` method now accepts an element reference instead of an
  ID string

### v0.1.0 (2019-04-17)

Initial release. Might still be a bit buggy.
