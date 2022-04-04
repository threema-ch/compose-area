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
/* harmony export */   "__wbg_addRange_ca0bf4e75ecb297e": () => (/* binding */ __wbg_addRange_ca0bf4e75ecb297e),
/* harmony export */   "__wbg_add_98ddddb278bdbdd1": () => (/* binding */ __wbg_add_98ddddb278bdbdd1),
/* harmony export */   "__wbg_alt_671f78f7f5fb3208": () => (/* binding */ __wbg_alt_671f78f7f5fb3208),
/* harmony export */   "__wbg_appendChild_3fe5090c665d3bb4": () => (/* binding */ __wbg_appendChild_3fe5090c665d3bb4),
/* harmony export */   "__wbg_call_89558c3e96703ca1": () => (/* binding */ __wbg_call_89558c3e96703ca1),
/* harmony export */   "__wbg_childNodes_2cc9324ea7605e96": () => (/* binding */ __wbg_childNodes_2cc9324ea7605e96),
/* harmony export */   "__wbg_classList_5086913f676eb3f3": () => (/* binding */ __wbg_classList_5086913f676eb3f3),
/* harmony export */   "__wbg_cloneRange_b0eaaa856a5fcda8": () => (/* binding */ __wbg_cloneRange_b0eaaa856a5fcda8),
/* harmony export */   "__wbg_collapse_5e2a9fa29b76f054": () => (/* binding */ __wbg_collapse_5e2a9fa29b76f054),
/* harmony export */   "__wbg_collapsed_e4582669d5ac61fc": () => (/* binding */ __wbg_collapsed_e4582669d5ac61fc),
/* harmony export */   "__wbg_commonAncestorContainer_402beaa46632d36f": () => (/* binding */ __wbg_commonAncestorContainer_402beaa46632d36f),
/* harmony export */   "__wbg_contains_c04852708d5a89fa": () => (/* binding */ __wbg_contains_c04852708d5a89fa),
/* harmony export */   "__wbg_createRange_c279e356750abef4": () => (/* binding */ __wbg_createRange_c279e356750abef4),
/* harmony export */   "__wbg_data_88cb4195a3450465": () => (/* binding */ __wbg_data_88cb4195a3450465),
/* harmony export */   "__wbg_debug_6e114a5b27d7915d": () => (/* binding */ __wbg_debug_6e114a5b27d7915d),
/* harmony export */   "__wbg_deleteContents_d9e072f898436895": () => (/* binding */ __wbg_deleteContents_d9e072f898436895),
/* harmony export */   "__wbg_document_5edd43643d1060d9": () => (/* binding */ __wbg_document_5edd43643d1060d9),
/* harmony export */   "__wbg_endContainer_e5b61589746300e1": () => (/* binding */ __wbg_endContainer_e5b61589746300e1),
/* harmony export */   "__wbg_endOffset_75e86c6acd73c82b": () => (/* binding */ __wbg_endOffset_75e86c6acd73c82b),
/* harmony export */   "__wbg_error_09919627ac0992f5": () => (/* binding */ __wbg_error_09919627ac0992f5),
/* harmony export */   "__wbg_error_ca520cb687b085a1": () => (/* binding */ __wbg_error_ca520cb687b085a1),
/* harmony export */   "__wbg_execCommand_378908f141ff4d29": () => (/* binding */ __wbg_execCommand_378908f141ff4d29),
/* harmony export */   "__wbg_focus_4434360545ac99cf": () => (/* binding */ __wbg_focus_4434360545ac99cf),
/* harmony export */   "__wbg_getElementById_b30e88aff96f66a1": () => (/* binding */ __wbg_getElementById_b30e88aff96f66a1),
/* harmony export */   "__wbg_getRangeAt_0afe5241b13fe940": () => (/* binding */ __wbg_getRangeAt_0afe5241b13fe940),
/* harmony export */   "__wbg_getSelection_5d8c74ecc3015c96": () => (/* binding */ __wbg_getSelection_5d8c74ecc3015c96),
/* harmony export */   "__wbg_get_a307c30b5f5df814": () => (/* binding */ __wbg_get_a307c30b5f5df814),
/* harmony export */   "__wbg_globalThis_d61b1f48a57191ae": () => (/* binding */ __wbg_globalThis_d61b1f48a57191ae),
/* harmony export */   "__wbg_global_e7669da72fd7f239": () => (/* binding */ __wbg_global_e7669da72fd7f239),
/* harmony export */   "__wbg_hasChildNodes_d0f9f48d4a80210c": () => (/* binding */ __wbg_hasChildNodes_d0f9f48d4a80210c),
/* harmony export */   "__wbg_id_79dca31d8297faf1": () => (/* binding */ __wbg_id_79dca31d8297faf1),
/* harmony export */   "__wbg_info_32ab782ec7072fac": () => (/* binding */ __wbg_info_32ab782ec7072fac),
/* harmony export */   "__wbg_insertBefore_4f09909023feac91": () => (/* binding */ __wbg_insertBefore_4f09909023feac91),
/* harmony export */   "__wbg_insertNode_663d8088daa11159": () => (/* binding */ __wbg_insertNode_663d8088daa11159),
/* harmony export */   "__wbg_instanceof_Element_c9423704dd5d9b1d": () => (/* binding */ __wbg_instanceof_Element_c9423704dd5d9b1d),
/* harmony export */   "__wbg_instanceof_HtmlDocument_395ec6365cabde6c": () => (/* binding */ __wbg_instanceof_HtmlDocument_395ec6365cabde6c),
/* harmony export */   "__wbg_instanceof_HtmlElement_d3e8f1c1d6788b24": () => (/* binding */ __wbg_instanceof_HtmlElement_d3e8f1c1d6788b24),
/* harmony export */   "__wbg_instanceof_Node_235c78aca8f70c08": () => (/* binding */ __wbg_instanceof_Node_235c78aca8f70c08),
/* harmony export */   "__wbg_instanceof_Text_2b91a768db957a84": () => (/* binding */ __wbg_instanceof_Text_2b91a768db957a84),
/* harmony export */   "__wbg_instanceof_Window_434ce1849eb4e0fc": () => (/* binding */ __wbg_instanceof_Window_434ce1849eb4e0fc),
/* harmony export */   "__wbg_item_c99f4edf5b060819": () => (/* binding */ __wbg_item_c99f4edf5b060819),
/* harmony export */   "__wbg_lastChild_e2b014abab089e08": () => (/* binding */ __wbg_lastChild_e2b014abab089e08),
/* harmony export */   "__wbg_length_5ced7bdab8b3e91f": () => (/* binding */ __wbg_length_5ced7bdab8b3e91f),
/* harmony export */   "__wbg_length_d4763a3367e3c89a": () => (/* binding */ __wbg_length_d4763a3367e3c89a),
/* harmony export */   "__wbg_log_fbd13631356d44e4": () => (/* binding */ __wbg_log_fbd13631356d44e4),
/* harmony export */   "__wbg_new_693216e109162396": () => (/* binding */ __wbg_new_693216e109162396),
/* harmony export */   "__wbg_newnoargs_f579424187aa1717": () => (/* binding */ __wbg_newnoargs_f579424187aa1717),
/* harmony export */   "__wbg_nodeName_af57dac2f0dea1c9": () => (/* binding */ __wbg_nodeName_af57dac2f0dea1c9),
/* harmony export */   "__wbg_nodeType_a59858b0311a7580": () => (/* binding */ __wbg_nodeType_a59858b0311a7580),
/* harmony export */   "__wbg_nodeValue_486a51e2b63cc20b": () => (/* binding */ __wbg_nodeValue_486a51e2b63cc20b),
/* harmony export */   "__wbg_normalize_36fe7c1bd29476fe": () => (/* binding */ __wbg_normalize_36fe7c1bd29476fe),
/* harmony export */   "__wbg_rangeCount_d1ca9912e2e78c5c": () => (/* binding */ __wbg_rangeCount_d1ca9912e2e78c5c),
/* harmony export */   "__wbg_removeAllRanges_6f07d9cffad4ffdd": () => (/* binding */ __wbg_removeAllRanges_6f07d9cffad4ffdd),
/* harmony export */   "__wbg_removeChild_f4a83c9698136bbb": () => (/* binding */ __wbg_removeChild_f4a83c9698136bbb),
/* harmony export */   "__wbg_self_e23d74ae45fb17d1": () => (/* binding */ __wbg_self_e23d74ae45fb17d1),
/* harmony export */   "__wbg_setAttribute_1776fcc9b98d464e": () => (/* binding */ __wbg_setAttribute_1776fcc9b98d464e),
/* harmony export */   "__wbg_setEndAfter_0ede76a01c529a7c": () => (/* binding */ __wbg_setEndAfter_0ede76a01c529a7c),
/* harmony export */   "__wbg_setEndBefore_6f676bd9a61d523c": () => (/* binding */ __wbg_setEndBefore_6f676bd9a61d523c),
/* harmony export */   "__wbg_setEnd_e7d54c502fe1d5fe": () => (/* binding */ __wbg_setEnd_e7d54c502fe1d5fe),
/* harmony export */   "__wbg_setStartAfter_f4c9fba3ef77b191": () => (/* binding */ __wbg_setStartAfter_f4c9fba3ef77b191),
/* harmony export */   "__wbg_setStartBefore_7630991b7c35a408": () => (/* binding */ __wbg_setStartBefore_7630991b7c35a408),
/* harmony export */   "__wbg_setStart_2d22768ea51fa0be": () => (/* binding */ __wbg_setStart_2d22768ea51fa0be),
/* harmony export */   "__wbg_stack_0ddaca5d1abfb52f": () => (/* binding */ __wbg_stack_0ddaca5d1abfb52f),
/* harmony export */   "__wbg_startContainer_2beef5b962dc3595": () => (/* binding */ __wbg_startContainer_2beef5b962dc3595),
/* harmony export */   "__wbg_startOffset_9d40d23b55798018": () => (/* binding */ __wbg_startOffset_9d40d23b55798018),
/* harmony export */   "__wbg_tagName_46df689351536098": () => (/* binding */ __wbg_tagName_46df689351536098),
/* harmony export */   "__wbg_warn_97f10a6b0dbb8c5c": () => (/* binding */ __wbg_warn_97f10a6b0dbb8c5c),
/* harmony export */   "__wbg_window_b4be7f48b24ac56e": () => (/* binding */ __wbg_window_b4be7f48b24ac56e),
/* harmony export */   "__wbindgen_debug_string": () => (/* binding */ __wbindgen_debug_string),
/* harmony export */   "__wbindgen_is_undefined": () => (/* binding */ __wbindgen_is_undefined),
/* harmony export */   "__wbindgen_object_clone_ref": () => (/* binding */ __wbindgen_object_clone_ref),
/* harmony export */   "__wbindgen_object_drop_ref": () => (/* binding */ __wbindgen_object_drop_ref),
/* harmony export */   "__wbindgen_string_new": () => (/* binding */ __wbindgen_string_new),
/* harmony export */   "__wbindgen_throw": () => (/* binding */ __wbindgen_throw)
/* harmony export */ });
/* unused harmony exports RangeResult, WordAtCaret */
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

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_exn_store(addHeapObject(e));
    }
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

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
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
            const retptr = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.composearea_get_text(retptr, this.ptr, isLikeNone(no_trim) ? 0xFFFFFF : no_trim ? 1 : 0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
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

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_rangeresult_free(ptr);
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string() {
        try {
            const retptr = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.rangeresult_to_string(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Used by JS code to show a string representation of the range.
    * @returns {string}
    */
    to_string_compact() {
        try {
            const retptr = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.rangeresult_to_string_compact(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
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

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
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
            const retptr = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_before(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    after() {
        try {
            const retptr = _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.wordatcaret_after(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
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

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbindgen_object_clone_ref(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

function __wbindgen_string_new(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

function __wbg_new_693216e109162396() {
    var ret = new Error();
    return addHeapObject(ret);
};

function __wbg_stack_0ddaca5d1abfb52f(arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_error_09919627ac0992f5(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(arg0, arg1);
    }
};

function __wbg_instanceof_Window_434ce1849eb4e0fc(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

function __wbg_document_5edd43643d1060d9(arg0) {
    var ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_getSelection_5d8c74ecc3015c96() { return handleError(function (arg0) {
    var ret = getObject(arg0).getSelection();
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

function __wbg_createRange_c279e356750abef4() { return handleError(function (arg0) {
    var ret = getObject(arg0).createRange();
    return addHeapObject(ret);
}, arguments) };

function __wbg_getElementById_b30e88aff96f66a1(arg0, arg1, arg2) {
    var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_add_98ddddb278bdbdd1() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).add(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

function __wbg_alt_671f78f7f5fb3208(arg0, arg1) {
    var ret = getObject(arg1).alt;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_length_5ced7bdab8b3e91f(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

function __wbg_item_c99f4edf5b060819(arg0, arg1) {
    var ret = getObject(arg0).item(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_get_a307c30b5f5df814(arg0, arg1) {
    var ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_startContainer_2beef5b962dc3595() { return handleError(function (arg0) {
    var ret = getObject(arg0).startContainer;
    return addHeapObject(ret);
}, arguments) };

function __wbg_startOffset_9d40d23b55798018() { return handleError(function (arg0) {
    var ret = getObject(arg0).startOffset;
    return ret;
}, arguments) };

function __wbg_endContainer_e5b61589746300e1() { return handleError(function (arg0) {
    var ret = getObject(arg0).endContainer;
    return addHeapObject(ret);
}, arguments) };

function __wbg_endOffset_75e86c6acd73c82b() { return handleError(function (arg0) {
    var ret = getObject(arg0).endOffset;
    return ret;
}, arguments) };

function __wbg_collapsed_e4582669d5ac61fc(arg0) {
    var ret = getObject(arg0).collapsed;
    return ret;
};

function __wbg_commonAncestorContainer_402beaa46632d36f() { return handleError(function (arg0) {
    var ret = getObject(arg0).commonAncestorContainer;
    return addHeapObject(ret);
}, arguments) };

function __wbg_cloneRange_b0eaaa856a5fcda8(arg0) {
    var ret = getObject(arg0).cloneRange();
    return addHeapObject(ret);
};

function __wbg_collapse_5e2a9fa29b76f054(arg0, arg1) {
    getObject(arg0).collapse(arg1 !== 0);
};

function __wbg_deleteContents_d9e072f898436895() { return handleError(function (arg0) {
    getObject(arg0).deleteContents();
}, arguments) };

function __wbg_insertNode_663d8088daa11159() { return handleError(function (arg0, arg1) {
    getObject(arg0).insertNode(getObject(arg1));
}, arguments) };

function __wbg_setEnd_e7d54c502fe1d5fe() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).setEnd(getObject(arg1), arg2 >>> 0);
}, arguments) };

function __wbg_setEndAfter_0ede76a01c529a7c() { return handleError(function (arg0, arg1) {
    getObject(arg0).setEndAfter(getObject(arg1));
}, arguments) };

function __wbg_setEndBefore_6f676bd9a61d523c() { return handleError(function (arg0, arg1) {
    getObject(arg0).setEndBefore(getObject(arg1));
}, arguments) };

function __wbg_setStart_2d22768ea51fa0be() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).setStart(getObject(arg1), arg2 >>> 0);
}, arguments) };

function __wbg_setStartAfter_f4c9fba3ef77b191() { return handleError(function (arg0, arg1) {
    getObject(arg0).setStartAfter(getObject(arg1));
}, arguments) };

function __wbg_setStartBefore_7630991b7c35a408() { return handleError(function (arg0, arg1) {
    getObject(arg0).setStartBefore(getObject(arg1));
}, arguments) };

function __wbg_rangeCount_d1ca9912e2e78c5c(arg0) {
    var ret = getObject(arg0).rangeCount;
    return ret;
};

function __wbg_addRange_ca0bf4e75ecb297e() { return handleError(function (arg0, arg1) {
    getObject(arg0).addRange(getObject(arg1));
}, arguments) };

function __wbg_getRangeAt_0afe5241b13fe940() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).getRangeAt(arg1 >>> 0);
    return addHeapObject(ret);
}, arguments) };

function __wbg_removeAllRanges_6f07d9cffad4ffdd() { return handleError(function (arg0) {
    getObject(arg0).removeAllRanges();
}, arguments) };

function __wbg_instanceof_Element_c9423704dd5d9b1d(arg0) {
    var ret = getObject(arg0) instanceof Element;
    return ret;
};

function __wbg_tagName_46df689351536098(arg0, arg1) {
    var ret = getObject(arg1).tagName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_id_79dca31d8297faf1(arg0, arg1) {
    var ret = getObject(arg1).id;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_classList_5086913f676eb3f3(arg0) {
    var ret = getObject(arg0).classList;
    return addHeapObject(ret);
};

function __wbg_setAttribute_1776fcc9b98d464e() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

function __wbg_debug_6e114a5b27d7915d(arg0) {
    console.debug(getObject(arg0));
};

function __wbg_error_ca520cb687b085a1(arg0) {
    console.error(getObject(arg0));
};

function __wbg_info_32ab782ec7072fac(arg0) {
    console.info(getObject(arg0));
};

function __wbg_log_fbd13631356d44e4(arg0) {
    console.log(getObject(arg0));
};

function __wbg_warn_97f10a6b0dbb8c5c(arg0) {
    console.warn(getObject(arg0));
};

function __wbg_instanceof_HtmlElement_d3e8f1c1d6788b24(arg0) {
    var ret = getObject(arg0) instanceof HTMLElement;
    return ret;
};

function __wbg_focus_4434360545ac99cf() { return handleError(function (arg0) {
    getObject(arg0).focus();
}, arguments) };

function __wbg_data_88cb4195a3450465(arg0, arg1) {
    var ret = getObject(arg1).data;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_length_d4763a3367e3c89a(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

function __wbg_instanceof_HtmlDocument_395ec6365cabde6c(arg0) {
    var ret = getObject(arg0) instanceof HTMLDocument;
    return ret;
};

function __wbg_execCommand_378908f141ff4d29() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    var ret = getObject(arg0).execCommand(getStringFromWasm0(arg1, arg2), arg3 !== 0, getStringFromWasm0(arg4, arg5));
    return ret;
}, arguments) };

function __wbg_instanceof_Node_235c78aca8f70c08(arg0) {
    var ret = getObject(arg0) instanceof Node;
    return ret;
};

function __wbg_nodeType_a59858b0311a7580(arg0) {
    var ret = getObject(arg0).nodeType;
    return ret;
};

function __wbg_nodeName_af57dac2f0dea1c9(arg0, arg1) {
    var ret = getObject(arg1).nodeName;
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_childNodes_2cc9324ea7605e96(arg0) {
    var ret = getObject(arg0).childNodes;
    return addHeapObject(ret);
};

function __wbg_lastChild_e2b014abab089e08(arg0) {
    var ret = getObject(arg0).lastChild;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_nodeValue_486a51e2b63cc20b(arg0, arg1) {
    var ret = getObject(arg1).nodeValue;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbg_appendChild_3fe5090c665d3bb4() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).appendChild(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbg_contains_c04852708d5a89fa(arg0, arg1) {
    var ret = getObject(arg0).contains(getObject(arg1));
    return ret;
};

function __wbg_hasChildNodes_d0f9f48d4a80210c(arg0) {
    var ret = getObject(arg0).hasChildNodes();
    return ret;
};

function __wbg_insertBefore_4f09909023feac91() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

function __wbg_normalize_36fe7c1bd29476fe(arg0) {
    getObject(arg0).normalize();
};

function __wbg_removeChild_f4a83c9698136bbb() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).removeChild(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbg_instanceof_Text_2b91a768db957a84(arg0) {
    var ret = getObject(arg0) instanceof Text;
    return ret;
};

function __wbg_newnoargs_f579424187aa1717(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

function __wbg_call_89558c3e96703ca1() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbg_self_e23d74ae45fb17d1() { return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
}, arguments) };

function __wbg_window_b4be7f48b24ac56e() { return handleError(function () {
    var ret = window.window;
    return addHeapObject(ret);
}, arguments) };

function __wbg_globalThis_d61b1f48a57191ae() { return handleError(function () {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

function __wbg_global_e7669da72fd7f239() { return handleError(function () {
    var ret = __webpack_require__.g.global;
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_is_undefined(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

function __wbindgen_debug_string(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _compose_area_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

function __wbindgen_throw(arg0, arg1) {
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