# Changelog

This project follows semantic versioning.

Possible log types:

- `[added]` for new features.
- `[changed]` for changes in existing functionality.
- `[deprecated]` for once-stable features removed in upcoming releases.
- `[removed]` for deprecated features removed in this release.
- `[fixed]` for any bug fixes.
- `[security]` to invite users to upgrade in case of vulnerabilities.


### v0.3.0 (2019-05-22)

- [added] Add `ComposeArea::get_word_at_caret`
- [added] Add `ComposeArea::select_word_at_caret`
- [changed] Upgrade wasm-bindgen to 0.2.45
- [fixed] Thanks to a fix in wasm-bindgen, optional parameters in the
  TypeScript declaration files should now be marked as omittable

### v0.2.2 (2019-05-13)

- [added] More logging, especially on trace level

### v0.2.1 (2019-05-13)

- [added] Configurable log level
- [changed] Upgrade wasm-bindgen to 0.2.42

### v0.2.0 (2019-04-25)

- [added] Add `ComposeArea::focus`
- [added] Add `ComposeArea::clear`
- [added] Expose `ComposeArea::insert_node`
- [changed] `ComposeArea::insert_image` now returns reference to the img element
- [changed] `ComposeArea::get_text`: Make `no_trim` parameter optional
- [changed] `ComposeArea::bind_to`: Stop inserting `<br>` element
- [changed] Upgrade wasm-bindgen to 0.2.42

### v0.1.1 (2019-04-23)

- [changed] The standalone `bind_to` function was moved to `ComposeArea.bind_to`
- [changed] The `bind_to` method now accepts an element reference instead of an
  ID string

### v0.1.0 (2019-04-17)

Initial release. Might still be a bit buggy.
