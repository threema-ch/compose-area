(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export extract_text */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComposeArea; });
/* unused harmony export RangeResult */
/* unused harmony export WordAtCaret */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __wbindgen_object_clone_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __wbindgen_string_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __wbg_new_59cb74e423758ede; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __wbg_stack_558ba5917b466edd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __wbg_error_4bb6c2a97407129a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wb", function() { return __widl_instanceof_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __widl_f_debug_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __widl_f_error_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return __widl_f_info_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return __widl_f_log_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qb", function() { return __widl_f_warn_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __widl_f_data_CharacterData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return __widl_f_length_CharacterData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __widl_f_add_2_DOMTokenList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __widl_f_create_range_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __widl_f_get_element_by_id_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rb", function() { return __widl_instanceof_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return __widl_f_set_attribute_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pb", function() { return __widl_f_tag_name_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return __widl_f_id_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __widl_f_class_list_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sb", function() { return __widl_instanceof_HTMLDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __widl_f_exec_command_with_show_ui_and_value_HTMLDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tb", function() { return __widl_instanceof_HTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __widl_f_focus_HTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __widl_f_alt_HTMLImageElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ub", function() { return __widl_instanceof_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __widl_f_append_child_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __widl_f_contains_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __widl_f_has_child_nodes_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return __widl_f_insert_before_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return __widl_f_normalize_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return __widl_f_remove_child_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return __widl_f_node_type_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return __widl_f_node_name_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __widl_f_child_nodes_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return __widl_f_last_child_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return __widl_f_node_value_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return __widl_f_item_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __widl_f_get_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return __widl_f_length_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __widl_f_clone_range_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __widl_f_collapse_with_to_start_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __widl_f_delete_contents_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __widl_f_insert_node_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return __widl_f_set_end_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return __widl_f_set_end_after_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return __widl_f_set_end_before_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return __widl_f_set_start_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return __widl_f_set_start_after_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return __widl_f_set_start_before_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nb", function() { return __widl_f_start_container_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return __widl_f_start_offset_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __widl_f_end_container_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __widl_f_end_offset_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __widl_f_collapsed_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __widl_f_common_ancestor_container_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __widl_f_add_range_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __widl_f_get_range_at_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return __widl_f_remove_all_ranges_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return __widl_f_range_count_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vb", function() { return __widl_instanceof_Text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return __widl_f_get_selection_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __widl_f_document_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __wbg_newnoargs_c4b2cbbd30e2d057; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __wbg_call_12b949cfc461d154; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __wbg_globalThis_22e06d4bea0084e3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __wbg_self_00b0599bca667294; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __wbg_window_aa795c5aad79b8ac; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __wbg_global_cc239dc2303f417c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __wbindgen_is_undefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __wbindgen_debug_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __wbindgen_throw; });
/* harmony import */ var _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer) {
        cachegetUint8Memory0 = new Uint8Array(_compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer) {
        cachegetInt32Memory0 = new Int32Array(_compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer);
    }
    return cachegetInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* Process a DOM node recursively and extract text.
*
* Convert elements like images to alt text.
* @param {any} root_element
* @param {boolean} no_trim
* @returns {string}
*/
function extract_text(root_element, no_trim) {
    try {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* extract_text */ "u"](8, addBorrowedObject(root_element), no_trim);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        heap[stack_pointer++] = undefined;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
    }
}

function handleError(e) {
    _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_exn_store */ "d"](addHeapObject(e));
}
/**
* The context object containing the state.
*/
class ComposeArea {

    static __wrap(ptr) {
        const obj = Object.create(ComposeArea.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_composearea_free */ "a"](ptr);
    }
    /**
    * Initialize a new compose area wrapper.
    *
    * If the `log_level` argument is supplied, the console logger is
    * initialized. Valid log levels: `trace`, `debug`, `info`, `warn` or
    * `error`.
    * @param {any} wrapper
    * @param {string | undefined} log_level
    * @returns {ComposeArea}
    */
    static bind_to(wrapper, log_level) {
        var ptr0 = isLikeNone(log_level) ? 0 : passStringToWasm0(log_level, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len0 = WASM_VECTOR_LEN;
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_bind_to */ "h"](addHeapObject(wrapper), ptr0, len0);
        return ComposeArea.__wrap(ret);
    }
    /**
    * Store the current selection range.
    * Return the stored range.
    * @returns {RangeResult}
    */
    store_selection_range() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_store_selection_range */ "t"](this.ptr);
        return RangeResult.__wrap(ret);
    }
    /**
    * Restore the stored selection range.
    *
    * Return a boolean indicating whether a selection range was stored (and
    * thus restored).
    * @returns {boolean}
    */
    restore_selection_range() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_restore_selection_range */ "r"](this.ptr);
        return ret !== 0;
    }
    /**
    * Insert an image at the current caret position.
    *
    * Return a reference to the inserted image element.
    * @param {string} src
    * @param {string} alt
    * @param {string} cls
    * @returns {any}
    */
    insert_image(src, alt, cls) {
        var ptr0 = passStringToWasm0(src, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(alt, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(cls, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len2 = WASM_VECTOR_LEN;
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_image */ "o"](this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * Insert plain text at the current caret position.
    * @param {string} text
    */
    insert_text(text) {
        var ptr0 = passStringToWasm0(text, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len0 = WASM_VECTOR_LEN;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_text */ "q"](this.ptr, ptr0, len0);
    }
    /**
    * Insert HTML at the current caret position.
    *
    * Note: This is potentially dangerous, make sure that you only insert
    * HTML from trusted sources!
    * @param {string} html
    */
    insert_html(html) {
        var ptr0 = passStringToWasm0(html, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
        var len0 = WASM_VECTOR_LEN;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_html */ "n"](this.ptr, ptr0, len0);
    }
    /**
    * Insert the specified node at the previously stored selection range.
    * Set the caret position to right after the newly inserted node.
    *
    * **NOTE:** Due to browser limitations, this will not result in a new
    * entry in the browser\'s internal undo stack. This means that the node
    * insertion cannot be undone using Ctrl+Z.
    * @param {any} node_ref
    */
    insert_node(node_ref) {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_node */ "p"](this.ptr, addBorrowedObject(node_ref));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * Return the last range of the selection that is within the wrapper
    * element.
    * @returns {RangeResult}
    */
    fetch_range() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_fetch_range */ "j"](this.ptr);
        return RangeResult.__wrap(ret);
    }
    /**
    * Extract the text in the compose area.
    *
    * Convert elements like images to alt text.
    *
    * Args:
    * - `no_trim`: If set to `true`, don\'t trim leading / trailing whitespace
    *   from returned text. Default: `false`.
    * @param {boolean | undefined} no_trim
    * @returns {string}
    */
    get_text(no_trim) {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_get_text */ "l"](8, this.ptr, isLikeNone(no_trim) ? 0xFFFFFF : no_trim ? 1 : 0);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
        }
    }
    /**
    * Focus the compose area.
    */
    focus() {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_focus */ "k"](this.ptr);
    }
    /**
    * Clear the contents of the compose area.
    */
    clear() {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_clear */ "i"](this.ptr);
    }
    /**
    * Return the word (whitespace delimited) at the current caret position.
    *
    * Note: This methods uses the range that was last set with
    * `store_selection_range`.
    * @returns {WordAtCaret | undefined}
    */
    get_word_at_caret() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_get_word_at_caret */ "m"](this.ptr);
        return ret === 0 ? undefined : WordAtCaret.__wrap(ret);
    }
    /**
    * Select the word (whitespace delimited) at the current caret position.
    *
    * Note: This methods uses the range that was last set with
    * `store_selection_range`.
    * @returns {boolean}
    */
    select_word_at_caret() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* composearea_select_word_at_caret */ "s"](this.ptr);
        return ret !== 0;
    }
}
/**
*/
class RangeResult {

    static __wrap(ptr) {
        const obj = Object.create(RangeResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_rangeresult_free */ "b"](ptr);
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* rangeresult_to_string */ "w"](8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
        }
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string_compact() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* rangeresult_to_string_compact */ "x"](8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
        }
    }
}
/**
*/
class WordAtCaret {

    static __wrap(ptr) {
        const obj = Object.create(WordAtCaret.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_wordatcaret_free */ "c"](ptr);
    }
    /**
    * @returns {any}
    */
    node() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* wordatcaret_node */ "B"](this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    before() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* wordatcaret_before */ "z"](8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    after() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* wordatcaret_after */ "y"](8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](r0, r1);
        }
    }
    /**
    * Return the UTF16 offset from the start node where the current word starts (inclusive).
    * @returns {number}
    */
    start_offset() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* wordatcaret_start_offset */ "C"](this.ptr);
        return ret >>> 0;
    }
    /**
    * Return the UTF16 offset from the start node where the current word ends (exclusive).
    * @returns {number}
    */
    end_offset() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* wordatcaret_end_offset */ "A"](this.ptr);
        return ret >>> 0;
    }
}

const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

const __wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

const __wbg_new_59cb74e423758ede = function() {
    var ret = new Error();
    return addHeapObject(ret);
};

const __wbg_stack_558ba5917b466edd = function(arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "e"](arg0, arg1);
    }
};

const __widl_instanceof_Window = function(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

const __widl_f_debug_1_ = function(arg0) {
    console.debug(getObject(arg0));
};

const __widl_f_error_1_ = function(arg0) {
    console.error(getObject(arg0));
};

const __widl_f_info_1_ = function(arg0) {
    console.info(getObject(arg0));
};

const __widl_f_log_1_ = function(arg0) {
    console.log(getObject(arg0));
};

const __widl_f_warn_1_ = function(arg0) {
    console.warn(getObject(arg0));
};

const __widl_f_data_CharacterData = function(arg0, arg1) {
    var ret = getObject(arg1).data;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_f_length_CharacterData = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

const __widl_f_add_2_DOMTokenList = function(arg0, arg1, arg2, arg3, arg4) {
    try {
        getObject(arg0).add(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_create_range_Document = function(arg0) {
    try {
        var ret = getObject(arg0).createRange();
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __widl_instanceof_Element = function(arg0) {
    var ret = getObject(arg0) instanceof Element;
    return ret;
};

const __widl_f_set_attribute_Element = function(arg0, arg1, arg2, arg3, arg4) {
    try {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_tag_name_Element = function(arg0, arg1) {
    var ret = getObject(arg1).tagName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_f_id_Element = function(arg0, arg1) {
    var ret = getObject(arg1).id;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_f_class_list_Element = function(arg0) {
    var ret = getObject(arg0).classList;
    return addHeapObject(ret);
};

const __widl_instanceof_HTMLDocument = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLDocument;
    return ret;
};

const __widl_f_exec_command_with_show_ui_and_value_HTMLDocument = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    try {
        var ret = getObject(arg0).execCommand(getStringFromWasm0(arg1, arg2), arg3 !== 0, getStringFromWasm0(arg4, arg5));
        return ret;
    } catch (e) {
        handleError(e)
    }
};

const __widl_instanceof_HTMLElement = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLElement;
    return ret;
};

const __widl_f_focus_HTMLElement = function(arg0) {
    try {
        getObject(arg0).focus();
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_alt_HTMLImageElement = function(arg0, arg1) {
    var ret = getObject(arg1).alt;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_instanceof_Node = function(arg0) {
    var ret = getObject(arg0) instanceof Node;
    return ret;
};

const __widl_f_append_child_Node = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).appendChild(getObject(arg1));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_contains_Node = function(arg0, arg1) {
    var ret = getObject(arg0).contains(getObject(arg1));
    return ret;
};

const __widl_f_has_child_nodes_Node = function(arg0) {
    var ret = getObject(arg0).hasChildNodes();
    return ret;
};

const __widl_f_insert_before_Node = function(arg0, arg1, arg2) {
    try {
        var ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_normalize_Node = function(arg0) {
    getObject(arg0).normalize();
};

const __widl_f_remove_child_Node = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).removeChild(getObject(arg1));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_node_type_Node = function(arg0) {
    var ret = getObject(arg0).nodeType;
    return ret;
};

const __widl_f_node_name_Node = function(arg0, arg1) {
    var ret = getObject(arg1).nodeName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_f_child_nodes_Node = function(arg0) {
    var ret = getObject(arg0).childNodes;
    return addHeapObject(ret);
};

const __widl_f_last_child_Node = function(arg0) {
    var ret = getObject(arg0).lastChild;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __widl_f_node_value_Node = function(arg0, arg1) {
    var ret = getObject(arg1).nodeValue;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __widl_f_item_NodeList = function(arg0, arg1) {
    var ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __widl_f_get_NodeList = function(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __widl_f_length_NodeList = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

const __widl_f_clone_range_Range = function(arg0) {
    var ret = getObject(arg0).cloneRange();
    return addHeapObject(ret);
};

const __widl_f_collapse_with_to_start_Range = function(arg0, arg1) {
    getObject(arg0).collapse(arg1 !== 0);
};

const __widl_f_delete_contents_Range = function(arg0) {
    try {
        getObject(arg0).deleteContents();
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_insert_node_Range = function(arg0, arg1) {
    try {
        getObject(arg0).insertNode(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_end_Range = function(arg0, arg1, arg2) {
    try {
        getObject(arg0).setEnd(getObject(arg1), arg2 >>> 0);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_end_after_Range = function(arg0, arg1) {
    try {
        getObject(arg0).setEndAfter(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_end_before_Range = function(arg0, arg1) {
    try {
        getObject(arg0).setEndBefore(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_start_Range = function(arg0, arg1, arg2) {
    try {
        getObject(arg0).setStart(getObject(arg1), arg2 >>> 0);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_start_after_Range = function(arg0, arg1) {
    try {
        getObject(arg0).setStartAfter(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_set_start_before_Range = function(arg0, arg1) {
    try {
        getObject(arg0).setStartBefore(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_start_container_Range = function(arg0) {
    try {
        var ret = getObject(arg0).startContainer;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_start_offset_Range = function(arg0) {
    try {
        var ret = getObject(arg0).startOffset;
        return ret;
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_end_container_Range = function(arg0) {
    try {
        var ret = getObject(arg0).endContainer;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_end_offset_Range = function(arg0) {
    try {
        var ret = getObject(arg0).endOffset;
        return ret;
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_collapsed_Range = function(arg0) {
    var ret = getObject(arg0).collapsed;
    return ret;
};

const __widl_f_common_ancestor_container_Range = function(arg0) {
    try {
        var ret = getObject(arg0).commonAncestorContainer;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_add_range_Selection = function(arg0, arg1) {
    try {
        getObject(arg0).addRange(getObject(arg1));
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_get_range_at_Selection = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).getRangeAt(arg1 >>> 0);
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_remove_all_ranges_Selection = function(arg0) {
    try {
        getObject(arg0).removeAllRanges();
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_range_count_Selection = function(arg0) {
    var ret = getObject(arg0).rangeCount;
    return ret;
};

const __widl_instanceof_Text = function(arg0) {
    var ret = getObject(arg0) instanceof Text;
    return ret;
};

const __widl_f_get_selection_Window = function(arg0) {
    try {
        var ret = getObject(arg0).getSelection();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __widl_f_document_Window = function(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_newnoargs_c4b2cbbd30e2d057 = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

const __wbg_call_12b949cfc461d154 = function(arg0, arg1) {
    try {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __wbg_globalThis_22e06d4bea0084e3 = function() {
    try {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __wbg_self_00b0599bca667294 = function() {
    try {
        var ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __wbg_window_aa795c5aad79b8ac = function() {
    try {
        var ret = window.window;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __wbg_global_cc239dc2303f417c = function() {
    try {
        var ret = global.global;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "f"], _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "g"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(4);


// exec wasm module
wasmExports["D"]()

/***/ })
]]);
//# sourceMappingURL=bootstrap.0.bundle.js.map