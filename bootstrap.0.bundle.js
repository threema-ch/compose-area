(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind_to", function() { return bind_to; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_caret_position", function() { return get_caret_position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extract_text", function() { return extract_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_error_cc95a3d302735ca3", function() { return __wbg_error_cc95a3d302735ca3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_debug_1_", function() { return __widl_f_debug_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_error_1_", function() { return __widl_f_error_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_info_1_", function() { return __widl_f_info_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_log_1_", function() { return __widl_f_log_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_warn_1_", function() { return __widl_f_warn_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_replace_with_with_node_1_CharacterData", function() { return __widl_f_replace_with_with_node_1_CharacterData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_create_comment_Document", function() { return __widl_f_create_comment_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_create_element_Document", function() { return __widl_f_create_element_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_create_range_Document", function() { return __widl_f_create_range_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_create_text_node_Document", function() { return __widl_f_create_text_node_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_get_element_by_id_Document", function() { return __widl_f_get_element_by_id_Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_remove_attribute_Element", function() { return __widl_f_remove_attribute_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_attribute_Element", function() { return __widl_f_set_attribute_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_tag_name_Element", function() { return __widl_f_tag_name_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_inner_html_Element", function() { return __widl_f_inner_html_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_inner_html_Element", function() { return __widl_f_set_inner_html_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_outer_html_Element", function() { return __widl_f_outer_html_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_replace_with_with_node_1_Element", function() { return __widl_f_replace_with_with_node_1_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_instanceof_EventTarget", function() { return __widl_instanceof_EventTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_add_event_listener_with_callback_EventTarget", function() { return __widl_f_add_event_listener_with_callback_EventTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_alt_HTMLImageElement", function() { return __widl_f_alt_HTMLImageElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_append_child_Node", function() { return __widl_f_append_child_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_contains_Node", function() { return __widl_f_contains_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_is_same_node_Node", function() { return __widl_f_is_same_node_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_remove_child_Node", function() { return __widl_f_remove_child_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_node_type_Node", function() { return __widl_f_node_type_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_node_name_Node", function() { return __widl_f_node_name_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_child_nodes_Node", function() { return __widl_f_child_nodes_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_node_value_Node", function() { return __widl_f_node_value_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_node_value_Node", function() { return __widl_f_set_node_value_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_text_content_Node", function() { return __widl_f_text_content_Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_item_NodeList", function() { return __widl_f_item_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_get_NodeList", function() { return __widl_f_get_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_length_NodeList", function() { return __widl_f_length_NodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_collapse_Range", function() { return __widl_f_collapse_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_start_Range", function() { return __widl_f_set_start_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_start_after_Range", function() { return __widl_f_set_start_after_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_set_start_before_Range", function() { return __widl_f_set_start_before_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_start_container_Range", function() { return __widl_f_start_container_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_start_offset_Range", function() { return __widl_f_start_offset_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_end_container_Range", function() { return __widl_f_end_container_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_end_offset_Range", function() { return __widl_f_end_offset_Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_add_range_Selection", function() { return __widl_f_add_range_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_get_range_at_Selection", function() { return __widl_f_get_range_at_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_range_count_Selection", function() { return __widl_f_range_count_Selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_instanceof_Window", function() { return __widl_instanceof_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_get_selection_Window", function() { return __widl_f_get_selection_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_document_Window", function() { return __widl_f_document_Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_newnoargs_862ffd91d0c97e88", function() { return __wbg_newnoargs_862ffd91d0c97e88; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_call_8d65200c7bc9d2d9", function() { return __wbg_call_8d65200c7bc9d2d9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_clone_ref", function() { return __wbindgen_object_clone_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return __wbindgen_string_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_debug_string", function() { return __wbindgen_debug_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComposeArea", function() { return ComposeArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaretPosition", function() { return CaretPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return __wbindgen_throw; });
/* harmony import */ var _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* tslint:disable */


let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer) {
        cachegetUint8Memory = new Uint8Array(_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "k"](buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}
/**
* Initialize a new compose area wrapper with the specified `id`.
* @param {string} arg0
* @returns {ComposeArea}
*/
function bind_to(arg0) {
    const ptr0 = passStringToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return ComposeArea.__wrap(_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* bind_to */ "l"](ptr0, len0));

    } finally {
        _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "i"](ptr0, len0 * 1);

    }

}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_global_argument_ptr */ "j"]();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer) {
        cachegetUint32Memory = new Uint32Array(_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "v"].buffer);
    }
    return cachegetUint32Memory;
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* Find the current caret position. If it cannot be determined, the position
* (0, 0) will be returned.
*
* Note: When getting the window selection, it will be relative to an anchor
*       node. If the anchor node is an element node, then the offset is
*       referring to the number of child elements. If the anchor node is a
*       text node, then the offset is referring to the codepoints.
*
* TODO: Return a tuple once
* https://github.com/rustwasm/wasm-bindgen/issues/122 is resolved!
*
* TODO: Make this nullable once
* https://github.com/rustwasm/wasm-bindgen/issues/1252 is resolved!
* @param {any} arg0
* @returns {CaretPosition}
*/
function get_caret_position(arg0) {
    try {
        return CaretPosition.__wrap(_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* get_caret_position */ "u"](addBorrowedObject(arg0)));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* Process a DOM node recursively and extract text.
*
* Convert elements like images to alt text.
* @param {any} arg0
* @param {boolean} arg1
* @returns {string}
*/
function extract_text(arg0, arg1) {
    const retptr = globalArgumentPtr();
    try {
        _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* extract_text */ "t"](retptr, addBorrowedObject(arg0), arg1);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "i"](rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

function __wbg_error_cc95a3d302735ca3(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "i"](arg0, arg1 * 1);

    console.error(varg0);
}

function getObject(idx) { return heap[idx]; }

function __widl_f_debug_1_(arg0) {
    console.debug(getObject(arg0));
}

function __widl_f_error_1_(arg0) {
    console.error(getObject(arg0));
}

function __widl_f_info_1_(arg0) {
    console.info(getObject(arg0));
}

function __widl_f_log_1_(arg0) {
    console.log(getObject(arg0));
}

function __widl_f_warn_1_(arg0) {
    console.warn(getObject(arg0));
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

function __widl_f_replace_with_with_node_1_CharacterData(arg0, arg1, exnptr) {
    try {
        getObject(arg0).replaceWith(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_create_comment_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(getObject(arg0).createComment(varg1));
}

function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).createElement(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_create_range_Document(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).createRange());
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_create_text_node_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(getObject(arg0).createTextNode(varg1));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = getObject(arg0).getElementById(varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

function __widl_f_remove_attribute_Element(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        getObject(arg0).removeAttribute(varg1);
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_set_attribute_Element(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        getObject(arg0).setAttribute(varg1, varg3);
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_tag_name_Element(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).tagName);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_inner_html_Element(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).innerHTML);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_set_inner_html_Element(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    getObject(arg0).innerHTML = varg1;
}

function __widl_f_outer_html_Element(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).outerHTML);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_replace_with_with_node_1_Element(arg0, arg1, exnptr) {
    try {
        getObject(arg0).replaceWith(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_instanceof_EventTarget(idx) {
    return getObject(idx) instanceof EventTarget ? 1 : 0;
}

function __widl_f_add_event_listener_with_callback_EventTarget(arg0, arg1, arg2, arg3, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        getObject(arg0).addEventListener(varg1, getObject(arg3));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_alt_HTMLImageElement(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).alt);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_append_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_contains_Node(arg0, arg1) {
    return getObject(arg0).contains(getObject(arg1));
}

function __widl_f_is_same_node_Node(arg0, arg1) {
    return getObject(arg0).isSameNode(getObject(arg1));
}

function __widl_f_remove_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).removeChild(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_node_type_Node(arg0) {
    return getObject(arg0).nodeType;
}

function __widl_f_node_name_Node(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).nodeName);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_child_nodes_Node(arg0) {
    return addHeapObject(getObject(arg0).childNodes);
}

function __widl_f_node_value_Node(ret, arg0) {
    const val = getObject(arg0).nodeValue;
    const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_set_node_value_Node(arg0, arg1, arg2) {
    let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
    getObject(arg0).nodeValue = varg1;
}

function __widl_f_text_content_Node(ret, arg0) {
    const val = getObject(arg0).textContent;
    const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_item_NodeList(arg0, arg1) {

    const val = getObject(arg0).item(arg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

function __widl_f_get_NodeList(arg0, arg1) {

    const val = getObject(arg0)[arg1];
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

function __widl_f_length_NodeList(arg0) {
    return getObject(arg0).length;
}

function __widl_f_collapse_Range(arg0) {
    getObject(arg0).collapse();
}

function __widl_f_set_start_Range(arg0, arg1, arg2, exnptr) {
    try {
        getObject(arg0).setStart(getObject(arg1), arg2);
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_set_start_after_Range(arg0, arg1, exnptr) {
    try {
        getObject(arg0).setStartAfter(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_set_start_before_Range(arg0, arg1, exnptr) {
    try {
        getObject(arg0).setStartBefore(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_start_container_Range(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).startContainer);
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_start_offset_Range(arg0, exnptr) {
    try {
        return getObject(arg0).startOffset;
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_end_container_Range(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).endContainer);
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_end_offset_Range(arg0, exnptr) {
    try {
        return getObject(arg0).endOffset;
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_add_range_Selection(arg0, arg1, exnptr) {
    try {
        getObject(arg0).addRange(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_get_range_at_Selection(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).getRangeAt(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_range_count_Selection(arg0) {
    return getObject(arg0).rangeCount;
}

function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

function __widl_f_get_selection_Window(arg0, exnptr) {
    try {

        const val = getObject(arg0).getSelection();
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}

function __widl_f_document_Window(arg0) {

    const val = getObject(arg0).document;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

function __wbg_newnoargs_862ffd91d0c97e88(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

function __wbg_call_8d65200c7bc9d2d9(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function __wbindgen_object_drop_ref(i) { dropObject(i); }

function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

function __wbindgen_debug_string(i, len_ptr) {
    const toString = Object.prototype.toString;
    const debug_str = val => {
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
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
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
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
};
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

function freeComposeArea(ptr) {

    _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_composearea_free */ "b"](ptr);
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
        freeComposeArea(ptr);
    }

    /**
    * Handle the specified key.
    *
    * Return whether the default keyup event handler should be prevented from running.
    * @param {string} arg0
    * @returns {boolean}
    */
    process_key(arg0) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        try {
            return (_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_process_key */ "p"](this.ptr, ptr0, len0)) !== 0;

        } finally {
            _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "i"](ptr0, len0 * 1);

        }

    }
    /**
    * Insert an image.
    * @param {string} arg0
    * @param {string} arg1
    * @param {string} arg2
    * @returns {void}
    */
    insert_image(arg0, arg1, arg2) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm(arg1);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm(arg2);
        const len2 = WASM_VECTOR_LEN;
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_image */ "n"](this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
    * Insert plain text.
    * @param {string} arg0
    * @returns {void}
    */
    insert_text(arg0) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_insert_text */ "o"](this.ptr, ptr0, len0);
    }
    /**
    * Remove the current selection from the state.
    *
    * If the `patch_dom` parameter is set to `true`, then the DOM is also
    * updated (followed by a caret position refresh), otherwise it\'s not modified.
    * @param {boolean} arg0
    * @returns {void}
    */
    remove_selection(arg0) {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_remove_selection */ "q"](this.ptr, arg0);
    }
    /**
    * Update the caret position.
    *
    * Read the actual position from the DOM using the selection API and then
    * overwrite the caret position in the state object.
    *
    * Call this after every action that might have modified the DOM.
    * @returns {void}
    */
    update_caret_position() {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_update_caret_position */ "s"](this.ptr);
    }
    /**
    * Extract the text in the compose area.
    *
    * Convert elements like images to alt text.
    * @param {boolean} arg0
    * @returns {string}
    */
    get_text(arg0) {
        const retptr = globalArgumentPtr();
        _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_get_text */ "m"](retptr, this.ptr, arg0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "i"](rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * Reset the internal state and clear the wrapper element.
    * @returns {void}
    */
    reset() {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* composearea_reset */ "r"](this.ptr);
    }
}

function freeCaretPosition(ptr) {

    _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_caretposition_free */ "a"](ptr);
}
/**
* A caret position specifies the offset in the HTML source code relative to
* the start of the wrapper element.
*
* Example: If the caret is at the end of this wrapper element:
*
* ```html
* <div id=\"wrapper\">hi<br></div>
* ```
*
* ...then the offset will be 6.
*/
class CaretPosition {

    static __wrap(ptr) {
        const obj = Object.create(CaretPosition.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCaretPosition(ptr);
    }

    /**
    * @returns {number}
    */
    get start() {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_get_caretposition_start */ "d"](this.ptr);
    }
    set start(arg0) {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_set_caretposition_start */ "g"](this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get end() {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_get_caretposition_end */ "c"](this.ptr);
    }
    set end(arg0) {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_set_caretposition_end */ "f"](this.ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get success() {
        return (_compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_get_caretposition_success */ "e"](this.ptr)) !== 0;
    }
    set success(arg0) {
        return _compose_area_bg__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_set_caretposition_success */ "h"](this.ptr, arg0);
    }
}

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}



/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(4);


// exec wasm module
wasmExports["w"]()

/***/ })

}]);
//# sourceMappingURL=bootstrap.0.bundle.js.map