"use strict";
(self["webpackChunkcompose_area_demo"] = self["webpackChunkcompose_area_demo"] || []).push([[4],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var compose_area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


// Elements
const wrapper = document.getElementById('wrapper');
const logDiv = document.querySelector('#log div');
const extractedDiv = document.querySelector('#extracted div');
const selectionDiv = document.querySelector('#selection div');
const wordcontextDiv = document.querySelector('#wordcontext div');
const rawDiv = document.querySelector('#raw div');

// Initialize compose area
const composeArea = compose_area__WEBPACK_IMPORTED_MODULE_0__.ComposeArea.bind_to(wrapper, "trace");
window.composeArea = composeArea;

// Helper functions

let startTime = null;

function log() {
    if (startTime === null) {
        startTime = new Date();
    }
    console.log(...arguments);
    const ms = (new Date() - startTime).toString();
    const pad = '      ';
    const timestamp = `${pad.substring(0, pad.length - ms.length) + ms}`;
    logDiv.innerHTML += `${timestamp} ${arguments[0]}<br>`;
}

function updateSelectionRange(e) {
    log('⚙️ store_selection_range');
    let range_result = composeArea.store_selection_range();
    log('⚙️ ⤷ ' + range_result.to_string_compact());
    showState();
}

function showState() {
    // Extract text
    const text = composeArea.get_text();
    extractedDiv.innerText = text.replace(/\n/g, '↵\n');

    // Get range
    const range_result = composeArea.fetch_range();
    selectionDiv.innerText = range_result.to_string();

    // Get word context
    const wac = composeArea.get_word_at_caret();
    if (wac) {
        wordcontextDiv.innerText = `${wac.before()}|${wac.after()}\nOffsets: (${wac.start_offset()}, ${wac.end_offset()})`;
    } else {
        wordcontextDiv.innerText = '';
    }

    // Get raw HTML
    rawDiv.innerText = wrapper.innerHTML;
}


// Add event listeners

wrapper.addEventListener('keydown', (e) => {
    log('⚡ keydown', e);
});
wrapper.addEventListener('keyup', (e) => {
    log('⚡ keyup', e);
});
wrapper.addEventListener('mouseup', (e) => {
    log('⚡ mouseup', e);
});
wrapper.addEventListener('paste', (e) => {
    log('⚡ paste', e);
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain');
    if (clipboardData) {
        log('⚙️ insert_text');
        composeArea.insert_text(clipboardData);
    }
});

// Note: Unfortunately the selectionchange listener can only be set on document
// level, not on the wrapper itself.
document.addEventListener('selectionchange', (e) => {
    log('⚡ selectionchange', e);
    updateSelectionRange();
});

// Emoji handling

function insertEmoji(e) {
    const img = e.target.nodeName === 'IMG' ? e.target : e.target.children[0];
    log(`⚙️ insert_image`);
    const elem = composeArea.insert_image(img.src, img.alt, 'emoji');

    // Ensure that emoji cannot be dragged
    elem.draggable = false;
    elem.ondragstart = (e) => e.preventDefault();

    showState();
}
document.getElementById('tongue').addEventListener('click', insertEmoji);
document.getElementById('beers').addEventListener('click', insertEmoji);
document.getElementById('facepalm').addEventListener('click', insertEmoji);

// Other buttons
document.getElementById('clearselection').addEventListener('click', (e) => {
    const sel = getSelection();
    sel.removeAllRanges();
    showState();
});
document.getElementById('focus').addEventListener('click', (e) => {
    composeArea.focus();
});
document.getElementById('selectword').addEventListener('click', (e) => {
    composeArea.select_word_at_caret();
});


/***/ }),
/* 3 */,
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComposeArea": () => (/* binding */ ComposeArea),
/* harmony export */   "__wbindgen_object_drop_ref": () => (/* binding */ __wbindgen_object_drop_ref),
/* harmony export */   "__wbindgen_object_clone_ref": () => (/* binding */ __wbindgen_object_clone_ref),
/* harmony export */   "__wbindgen_string_new": () => (/* binding */ __wbindgen_string_new),
/* harmony export */   "__wbg_new_59cb74e423758ede": () => (/* binding */ __wbg_new_59cb74e423758ede),
/* harmony export */   "__wbg_stack_558ba5917b466edd": () => (/* binding */ __wbg_stack_558ba5917b466edd),
/* harmony export */   "__wbg_error_4bb6c2a97407129a": () => (/* binding */ __wbg_error_4bb6c2a97407129a),
/* harmony export */   "__wbg_instanceof_Window_0e8decd0a6179699": () => (/* binding */ __wbg_instanceof_Window_0e8decd0a6179699),
/* harmony export */   "__wbg_document_76c349f54c28c8fa": () => (/* binding */ __wbg_document_76c349f54c28c8fa),
/* harmony export */   "__wbg_getSelection_a6200f7c3b066e96": () => (/* binding */ __wbg_getSelection_a6200f7c3b066e96),
/* harmony export */   "__wbg_createRange_7417ae8c2e527350": () => (/* binding */ __wbg_createRange_7417ae8c2e527350),
/* harmony export */   "__wbg_getElementById_35de356b82960e7f": () => (/* binding */ __wbg_getElementById_35de356b82960e7f),
/* harmony export */   "__wbg_alt_c8bbd91d34bbf4a4": () => (/* binding */ __wbg_alt_c8bbd91d34bbf4a4),
/* harmony export */   "__wbg_startContainer_6a277da441b04299": () => (/* binding */ __wbg_startContainer_6a277da441b04299),
/* harmony export */   "__wbg_startOffset_10a5db36288ab8a9": () => (/* binding */ __wbg_startOffset_10a5db36288ab8a9),
/* harmony export */   "__wbg_endContainer_75a43a2998c34fe0": () => (/* binding */ __wbg_endContainer_75a43a2998c34fe0),
/* harmony export */   "__wbg_endOffset_63cef9ef59a82402": () => (/* binding */ __wbg_endOffset_63cef9ef59a82402),
/* harmony export */   "__wbg_collapsed_59ac2df717b32dd2": () => (/* binding */ __wbg_collapsed_59ac2df717b32dd2),
/* harmony export */   "__wbg_commonAncestorContainer_2f3f55bc613489fe": () => (/* binding */ __wbg_commonAncestorContainer_2f3f55bc613489fe),
/* harmony export */   "__wbg_cloneRange_095edaadd47fd4f4": () => (/* binding */ __wbg_cloneRange_095edaadd47fd4f4),
/* harmony export */   "__wbg_collapse_8aed7ef93ec94d6e": () => (/* binding */ __wbg_collapse_8aed7ef93ec94d6e),
/* harmony export */   "__wbg_deleteContents_e70a762de08f3104": () => (/* binding */ __wbg_deleteContents_e70a762de08f3104),
/* harmony export */   "__wbg_insertNode_9f8bb90475329f67": () => (/* binding */ __wbg_insertNode_9f8bb90475329f67),
/* harmony export */   "__wbg_setEnd_da02a3b4f5aa3925": () => (/* binding */ __wbg_setEnd_da02a3b4f5aa3925),
/* harmony export */   "__wbg_setEndAfter_e0b437572d9413e7": () => (/* binding */ __wbg_setEndAfter_e0b437572d9413e7),
/* harmony export */   "__wbg_setEndBefore_cb49508018c70aa4": () => (/* binding */ __wbg_setEndBefore_cb49508018c70aa4),
/* harmony export */   "__wbg_setStart_8e286af3a7fa93e1": () => (/* binding */ __wbg_setStart_8e286af3a7fa93e1),
/* harmony export */   "__wbg_setStartAfter_f3921b9eb3c59bb7": () => (/* binding */ __wbg_setStartAfter_f3921b9eb3c59bb7),
/* harmony export */   "__wbg_setStartBefore_785537795e6fb48c": () => (/* binding */ __wbg_setStartBefore_785537795e6fb48c),
/* harmony export */   "__wbg_length_8a6a2efe955a8b70": () => (/* binding */ __wbg_length_8a6a2efe955a8b70),
/* harmony export */   "__wbg_item_102e71580fef0207": () => (/* binding */ __wbg_item_102e71580fef0207),
/* harmony export */   "__wbg_get_b98c84aa64400fbe": () => (/* binding */ __wbg_get_b98c84aa64400fbe),
/* harmony export */   "__wbg_instanceof_Text_cbaefa3d82bdddd8": () => (/* binding */ __wbg_instanceof_Text_cbaefa3d82bdddd8),
/* harmony export */   "__wbg_instanceof_Node_11254aed560b4c66": () => (/* binding */ __wbg_instanceof_Node_11254aed560b4c66),
/* harmony export */   "__wbg_nodeType_f5e54979099baba1": () => (/* binding */ __wbg_nodeType_f5e54979099baba1),
/* harmony export */   "__wbg_nodeName_7babcf625aec4083": () => (/* binding */ __wbg_nodeName_7babcf625aec4083),
/* harmony export */   "__wbg_childNodes_3ea42a8e103679b0": () => (/* binding */ __wbg_childNodes_3ea42a8e103679b0),
/* harmony export */   "__wbg_lastChild_86e1c02df2b342d8": () => (/* binding */ __wbg_lastChild_86e1c02df2b342d8),
/* harmony export */   "__wbg_nodeValue_2b31b791bfa62a8d": () => (/* binding */ __wbg_nodeValue_2b31b791bfa62a8d),
/* harmony export */   "__wbg_appendChild_5a186a381c8fff5b": () => (/* binding */ __wbg_appendChild_5a186a381c8fff5b),
/* harmony export */   "__wbg_contains_87699bbfe7e284cd": () => (/* binding */ __wbg_contains_87699bbfe7e284cd),
/* harmony export */   "__wbg_hasChildNodes_92f3eb57464fc1ac": () => (/* binding */ __wbg_hasChildNodes_92f3eb57464fc1ac),
/* harmony export */   "__wbg_insertBefore_83c912a1a16c68d2": () => (/* binding */ __wbg_insertBefore_83c912a1a16c68d2),
/* harmony export */   "__wbg_normalize_b780513d171a31fd": () => (/* binding */ __wbg_normalize_b780513d171a31fd),
/* harmony export */   "__wbg_removeChild_a5458e964695297f": () => (/* binding */ __wbg_removeChild_a5458e964695297f),
/* harmony export */   "__wbg_instanceof_Element_b2ea0d558fc7d331": () => (/* binding */ __wbg_instanceof_Element_b2ea0d558fc7d331),
/* harmony export */   "__wbg_tagName_c547ea7972faad1b": () => (/* binding */ __wbg_tagName_c547ea7972faad1b),
/* harmony export */   "__wbg_id_1d70bdde705a2f65": () => (/* binding */ __wbg_id_1d70bdde705a2f65),
/* harmony export */   "__wbg_classList_262889e9fed65a4e": () => (/* binding */ __wbg_classList_262889e9fed65a4e),
/* harmony export */   "__wbg_setAttribute_65dde98f32b42a41": () => (/* binding */ __wbg_setAttribute_65dde98f32b42a41),
/* harmony export */   "__wbg_debug_ad2e107500a5e66f": () => (/* binding */ __wbg_debug_ad2e107500a5e66f),
/* harmony export */   "__wbg_error_899f34a74e6ae34f": () => (/* binding */ __wbg_error_899f34a74e6ae34f),
/* harmony export */   "__wbg_info_9f243b6555ae61bc": () => (/* binding */ __wbg_info_9f243b6555ae61bc),
/* harmony export */   "__wbg_log_8c015365353ccd49": () => (/* binding */ __wbg_log_8c015365353ccd49),
/* harmony export */   "__wbg_warn_22c4a606fdfb0a53": () => (/* binding */ __wbg_warn_22c4a606fdfb0a53),
/* harmony export */   "__wbg_instanceof_HtmlElement_67a9589b0f1c5c31": () => (/* binding */ __wbg_instanceof_HtmlElement_67a9589b0f1c5c31),
/* harmony export */   "__wbg_focus_2617465192028e1c": () => (/* binding */ __wbg_focus_2617465192028e1c),
/* harmony export */   "__wbg_data_e09ed4fd8944fe35": () => (/* binding */ __wbg_data_e09ed4fd8944fe35),
/* harmony export */   "__wbg_length_cca45aa2d6b01dfc": () => (/* binding */ __wbg_length_cca45aa2d6b01dfc),
/* harmony export */   "__wbg_instanceof_HtmlDocument_4e420d706512e41e": () => (/* binding */ __wbg_instanceof_HtmlDocument_4e420d706512e41e),
/* harmony export */   "__wbg_execCommand_81e83cf93eb6abe3": () => (/* binding */ __wbg_execCommand_81e83cf93eb6abe3),
/* harmony export */   "__wbg_add_0850d066114a0d43": () => (/* binding */ __wbg_add_0850d066114a0d43),
/* harmony export */   "__wbg_rangeCount_d9e8306d3ad9a1c4": () => (/* binding */ __wbg_rangeCount_d9e8306d3ad9a1c4),
/* harmony export */   "__wbg_addRange_fbef75e804365d45": () => (/* binding */ __wbg_addRange_fbef75e804365d45),
/* harmony export */   "__wbg_getRangeAt_778d713a86839a99": () => (/* binding */ __wbg_getRangeAt_778d713a86839a99),
/* harmony export */   "__wbg_removeAllRanges_54eda87c037227c5": () => (/* binding */ __wbg_removeAllRanges_54eda87c037227c5),
/* harmony export */   "__wbg_newnoargs_db0587fa712f9acc": () => (/* binding */ __wbg_newnoargs_db0587fa712f9acc),
/* harmony export */   "__wbg_call_79ca0d435495a83a": () => (/* binding */ __wbg_call_79ca0d435495a83a),
/* harmony export */   "__wbg_self_d1b58dbab69d5bb1": () => (/* binding */ __wbg_self_d1b58dbab69d5bb1),
/* harmony export */   "__wbg_window_de445cb18819ad4b": () => (/* binding */ __wbg_window_de445cb18819ad4b),
/* harmony export */   "__wbg_globalThis_68afcb0d98f0112d": () => (/* binding */ __wbg_globalThis_68afcb0d98f0112d),
/* harmony export */   "__wbg_global_baed4e4fa850c0d0": () => (/* binding */ __wbg_global_baed4e4fa850c0d0),
/* harmony export */   "__wbindgen_is_undefined": () => (/* binding */ __wbindgen_is_undefined),
/* harmony export */   "__wbindgen_debug_string": () => (/* binding */ __wbindgen_debug_string),
/* harmony export */   "__wbindgen_throw": () => (/* binding */ __wbindgen_throw)
/* harmony export */ });
/* unused harmony exports extract_text, RangeResult, WordAtCaret */
/* harmony import */ var _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const heap = new Array(32).fill(undefined);

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
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(_compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
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
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(_compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
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
* @param {Element} root_element
* @param {boolean} no_trim
* @returns {string}
*/
function extract_text(root_element, no_trim) {
    try {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.extract_text(8, addBorrowedObject(root_element), no_trim);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        heap[stack_pointer++] = undefined;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_exn_store(addHeapObject(e));
        }
    };
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

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_composearea_free(ptr);
    }
    /**
    * Initialize a new compose area wrapper.
    *
    * If the `log_level` argument is supplied, the console logger is
    * initialized. Valid log levels: `trace`, `debug`, `info`, `warn` or
    * `error`.
    * @param {Element} wrapper
    * @param {string | undefined} log_level
    * @returns {ComposeArea}
    */
    static bind_to(wrapper, log_level) {
        var ptr0 = isLikeNone(log_level) ? 0 : passStringToWasm0(log_level, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_bind_to(addHeapObject(wrapper), ptr0, len0);
        return ComposeArea.__wrap(ret);
    }
    /**
    * Store the current selection range.
    * Return the stored range.
    * @returns {RangeResult}
    */
    store_selection_range() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_store_selection_range(this.ptr);
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
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_restore_selection_range(this.ptr);
        return ret !== 0;
    }
    /**
    * Insert an image at the current caret position.
    *
    * Return a reference to the inserted image element.
    * @param {string} src
    * @param {string} alt
    * @param {string} cls
    * @returns {HTMLElement}
    */
    insert_image(src, alt, cls) {
        var ptr0 = passStringToWasm0(src, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(alt, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(cls, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_insert_image(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * Insert plain text at the current caret position.
    * @param {string} text
    */
    insert_text(text) {
        var ptr0 = passStringToWasm0(text, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_insert_text(this.ptr, ptr0, len0);
    }
    /**
    * Insert HTML at the current caret position.
    *
    * Note: This is potentially dangerous, make sure that you only insert
    * HTML from trusted sources!
    * @param {string} html
    */
    insert_html(html) {
        var ptr0 = passStringToWasm0(html, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_insert_html(this.ptr, ptr0, len0);
    }
    /**
    * Insert the specified node at the previously stored selection range.
    * Set the caret position to right after the newly inserted node.
    *
    * **NOTE:** Due to browser limitations, this will not result in a new
    * entry in the browser's internal undo stack. This means that the node
    * insertion cannot be undone using Ctrl+Z.
    * @param {Node} node_ref
    */
    insert_node(node_ref) {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_insert_node(this.ptr, addBorrowedObject(node_ref));
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
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_fetch_range(this.ptr);
        return RangeResult.__wrap(ret);
    }
    /**
    * Extract the text in the compose area.
    *
    * Convert elements like images to alt text.
    *
    * Args:
    * - `no_trim`: If set to `true`, don't trim leading / trailing whitespace
    *   from returned text. Default: `false`.
    * @param {boolean | undefined} no_trim
    * @returns {string}
    */
    get_text(no_trim) {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_get_text(8, this.ptr, isLikeNone(no_trim) ? 0xFFFFFF : no_trim ? 1 : 0);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Return whether the compose area is empty.
    *
    * Note: Right now this is a convenience wrapper around
    * `get_text(no_trim).length === 0`, but it might get optimized in the
    * future.
    *
    * Args:
    * - `no_trim`: If set to `true`, don't trim leading / trailing whitespace
    *   from returned text. Default: `false`.
    * @param {boolean | undefined} no_trim
    * @returns {boolean}
    */
    is_empty(no_trim) {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_is_empty(this.ptr, isLikeNone(no_trim) ? 0xFFFFFF : no_trim ? 1 : 0);
        return ret !== 0;
    }
    /**
    * Focus the compose area.
    */
    focus() {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_focus(this.ptr);
    }
    /**
    * Clear the contents of the compose area.
    */
    clear() {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_clear(this.ptr);
    }
    /**
    * Return the word (whitespace delimited) at the current caret position.
    *
    * Note: This methods uses the range that was last set with
    * `store_selection_range`.
    * @returns {WordAtCaret | undefined}
    */
    get_word_at_caret() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_get_word_at_caret(this.ptr);
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
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_select_word_at_caret(this.ptr);
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

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_rangeresult_free(ptr);
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.rangeresult_to_string(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string_compact() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.rangeresult_to_string_compact(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
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

        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_wordatcaret_free(ptr);
    }
    /**
    * @returns {Node}
    */
    node() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_node(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    before() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_before(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    after() {
        try {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_after(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Return the UTF16 offset from the start node where the current word starts (inclusive).
    * @returns {number}
    */
    start_offset() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_start_offset(this.ptr);
        return ret >>> 0;
    }
    /**
    * Return the UTF16 offset from the start node where the current word ends (exclusive).
    * @returns {number}
    */
    end_offset() {
        var ret = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_end_offset(this.ptr);
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
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(arg0, arg1);
    }
};

const __wbg_instanceof_Window_0e8decd0a6179699 = function(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

const __wbg_document_76c349f54c28c8fa = function(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_getSelection_a6200f7c3b066e96 = handleError(function(arg0) {
    var ret = getObject(arg0).getSelection();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
});

const __wbg_createRange_7417ae8c2e527350 = handleError(function(arg0) {
    var ret = getObject(arg0).createRange();
    return addHeapObject(ret);
});

const __wbg_getElementById_35de356b82960e7f = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_alt_c8bbd91d34bbf4a4 = function(arg0, arg1) {
    var ret = getObject(arg1).alt;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_startContainer_6a277da441b04299 = handleError(function(arg0) {
    var ret = getObject(arg0).startContainer;
    return addHeapObject(ret);
});

const __wbg_startOffset_10a5db36288ab8a9 = handleError(function(arg0) {
    var ret = getObject(arg0).startOffset;
    return ret;
});

const __wbg_endContainer_75a43a2998c34fe0 = handleError(function(arg0) {
    var ret = getObject(arg0).endContainer;
    return addHeapObject(ret);
});

const __wbg_endOffset_63cef9ef59a82402 = handleError(function(arg0) {
    var ret = getObject(arg0).endOffset;
    return ret;
});

const __wbg_collapsed_59ac2df717b32dd2 = function(arg0) {
    var ret = getObject(arg0).collapsed;
    return ret;
};

const __wbg_commonAncestorContainer_2f3f55bc613489fe = handleError(function(arg0) {
    var ret = getObject(arg0).commonAncestorContainer;
    return addHeapObject(ret);
});

const __wbg_cloneRange_095edaadd47fd4f4 = function(arg0) {
    var ret = getObject(arg0).cloneRange();
    return addHeapObject(ret);
};

const __wbg_collapse_8aed7ef93ec94d6e = function(arg0, arg1) {
    getObject(arg0).collapse(arg1 !== 0);
};

const __wbg_deleteContents_e70a762de08f3104 = handleError(function(arg0) {
    getObject(arg0).deleteContents();
});

const __wbg_insertNode_9f8bb90475329f67 = handleError(function(arg0, arg1) {
    getObject(arg0).insertNode(getObject(arg1));
});

const __wbg_setEnd_da02a3b4f5aa3925 = handleError(function(arg0, arg1, arg2) {
    getObject(arg0).setEnd(getObject(arg1), arg2 >>> 0);
});

const __wbg_setEndAfter_e0b437572d9413e7 = handleError(function(arg0, arg1) {
    getObject(arg0).setEndAfter(getObject(arg1));
});

const __wbg_setEndBefore_cb49508018c70aa4 = handleError(function(arg0, arg1) {
    getObject(arg0).setEndBefore(getObject(arg1));
});

const __wbg_setStart_8e286af3a7fa93e1 = handleError(function(arg0, arg1, arg2) {
    getObject(arg0).setStart(getObject(arg1), arg2 >>> 0);
});

const __wbg_setStartAfter_f3921b9eb3c59bb7 = handleError(function(arg0, arg1) {
    getObject(arg0).setStartAfter(getObject(arg1));
});

const __wbg_setStartBefore_785537795e6fb48c = handleError(function(arg0, arg1) {
    getObject(arg0).setStartBefore(getObject(arg1));
});

const __wbg_length_8a6a2efe955a8b70 = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

const __wbg_item_102e71580fef0207 = function(arg0, arg1) {
    var ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_get_b98c84aa64400fbe = function(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_instanceof_Text_cbaefa3d82bdddd8 = function(arg0) {
    var ret = getObject(arg0) instanceof Text;
    return ret;
};

const __wbg_instanceof_Node_11254aed560b4c66 = function(arg0) {
    var ret = getObject(arg0) instanceof Node;
    return ret;
};

const __wbg_nodeType_f5e54979099baba1 = function(arg0) {
    var ret = getObject(arg0).nodeType;
    return ret;
};

const __wbg_nodeName_7babcf625aec4083 = function(arg0, arg1) {
    var ret = getObject(arg1).nodeName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_childNodes_3ea42a8e103679b0 = function(arg0) {
    var ret = getObject(arg0).childNodes;
    return addHeapObject(ret);
};

const __wbg_lastChild_86e1c02df2b342d8 = function(arg0) {
    var ret = getObject(arg0).lastChild;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

const __wbg_nodeValue_2b31b791bfa62a8d = function(arg0, arg1) {
    var ret = getObject(arg1).nodeValue;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_appendChild_5a186a381c8fff5b = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).appendChild(getObject(arg1));
    return addHeapObject(ret);
});

const __wbg_contains_87699bbfe7e284cd = function(arg0, arg1) {
    var ret = getObject(arg0).contains(getObject(arg1));
    return ret;
};

const __wbg_hasChildNodes_92f3eb57464fc1ac = function(arg0) {
    var ret = getObject(arg0).hasChildNodes();
    return ret;
};

const __wbg_insertBefore_83c912a1a16c68d2 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
});

const __wbg_normalize_b780513d171a31fd = function(arg0) {
    getObject(arg0).normalize();
};

const __wbg_removeChild_a5458e964695297f = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).removeChild(getObject(arg1));
    return addHeapObject(ret);
});

const __wbg_instanceof_Element_b2ea0d558fc7d331 = function(arg0) {
    var ret = getObject(arg0) instanceof Element;
    return ret;
};

const __wbg_tagName_c547ea7972faad1b = function(arg0, arg1) {
    var ret = getObject(arg1).tagName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_id_1d70bdde705a2f65 = function(arg0, arg1) {
    var ret = getObject(arg1).id;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_classList_262889e9fed65a4e = function(arg0) {
    var ret = getObject(arg0).classList;
    return addHeapObject(ret);
};

const __wbg_setAttribute_65dde98f32b42a41 = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
});

const __wbg_debug_ad2e107500a5e66f = function(arg0) {
    console.debug(getObject(arg0));
};

const __wbg_error_899f34a74e6ae34f = function(arg0) {
    console.error(getObject(arg0));
};

const __wbg_info_9f243b6555ae61bc = function(arg0) {
    console.info(getObject(arg0));
};

const __wbg_log_8c015365353ccd49 = function(arg0) {
    console.log(getObject(arg0));
};

const __wbg_warn_22c4a606fdfb0a53 = function(arg0) {
    console.warn(getObject(arg0));
};

const __wbg_instanceof_HtmlElement_67a9589b0f1c5c31 = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLElement;
    return ret;
};

const __wbg_focus_2617465192028e1c = handleError(function(arg0) {
    getObject(arg0).focus();
});

const __wbg_data_e09ed4fd8944fe35 = function(arg0, arg1) {
    var ret = getObject(arg1).data;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_length_cca45aa2d6b01dfc = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

const __wbg_instanceof_HtmlDocument_4e420d706512e41e = function(arg0) {
    var ret = getObject(arg0) instanceof HTMLDocument;
    return ret;
};

const __wbg_execCommand_81e83cf93eb6abe3 = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5) {
    var ret = getObject(arg0).execCommand(getStringFromWasm0(arg1, arg2), arg3 !== 0, getStringFromWasm0(arg4, arg5));
    return ret;
});

const __wbg_add_0850d066114a0d43 = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).add(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
});

const __wbg_rangeCount_d9e8306d3ad9a1c4 = function(arg0) {
    var ret = getObject(arg0).rangeCount;
    return ret;
};

const __wbg_addRange_fbef75e804365d45 = handleError(function(arg0, arg1) {
    getObject(arg0).addRange(getObject(arg1));
});

const __wbg_getRangeAt_778d713a86839a99 = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).getRangeAt(arg1 >>> 0);
    return addHeapObject(ret);
});

const __wbg_removeAllRanges_54eda87c037227c5 = handleError(function(arg0) {
    getObject(arg0).removeAllRanges();
});

const __wbg_newnoargs_db0587fa712f9acc = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

const __wbg_call_79ca0d435495a83a = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
});

const __wbg_self_d1b58dbab69d5bb1 = handleError(function() {
    var ret = self.self;
    return addHeapObject(ret);
});

const __wbg_window_de445cb18819ad4b = handleError(function() {
    var ret = window.window;
    return addHeapObject(ret);
});

const __wbg_globalThis_68afcb0d98f0112d = handleError(function() {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
});

const __wbg_global_baed4e4fa850c0d0 = handleError(function() {
    var ret = __webpack_require__.g.global;
    return addHeapObject(ret);
});

const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};



/***/ }),
/* 5 */,
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.id];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(4);


// exec wasm module
wasmExports[""]()

/***/ })
]]);
//# sourceMappingURL=bootstrap.4.bundle.js.map