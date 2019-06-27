/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "bootstrap." + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		5: function() {
/******/ 			return {
/******/ 				"./compose_area.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules[4].exports["i"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules[4].exports["h"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["j"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules[4].exports["d"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["f"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["c"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_instanceof_Window": function(p0i32) {
/******/ 						return installedModules[4].exports["rb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_data_CharacterData": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["x"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_length_CharacterData": function(p0i32) {
/******/ 						return installedModules[4].exports["R"](p0i32);
/******/ 					},
/******/ 					"__widl_f_add_2_DOMTokenList": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules[4].exports["l"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__widl_f_create_range_Document": function(p0i32) {
/******/ 						return installedModules[4].exports["w"](p0i32);
/******/ 					},
/******/ 					"__widl_f_get_element_by_id_Document": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["H"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_instanceof_Element": function(p0i32) {
/******/ 						return installedModules[4].exports["mb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_attribute_Element": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules[4].exports["bb"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__widl_f_tag_name_Element": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["kb"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_id_Element": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["L"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_class_list_Element": function(p0i32) {
/******/ 						return installedModules[4].exports["q"](p0i32);
/******/ 					},
/******/ 					"__widl_instanceof_HTMLDocument": function(p0i32) {
/******/ 						return installedModules[4].exports["nb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_exec_command_with_show_ui_and_value_HTMLDocument": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules[4].exports["E"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__widl_instanceof_HTMLElement": function(p0i32) {
/******/ 						return installedModules[4].exports["ob"](p0i32);
/******/ 					},
/******/ 					"__widl_f_focus_HTMLElement": function(p0i32) {
/******/ 						return installedModules[4].exports["F"](p0i32);
/******/ 					},
/******/ 					"__widl_f_alt_HTMLImageElement": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["n"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_instanceof_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["pb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_append_child_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["o"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_contains_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["v"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_has_child_nodes_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["K"](p0i32);
/******/ 					},
/******/ 					"__widl_f_insert_before_Node": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["N"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_normalize_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["X"](p0i32);
/******/ 					},
/******/ 					"__widl_f_remove_child_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["ab"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_node_type_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["V"](p0i32);
/******/ 					},
/******/ 					"__widl_f_node_name_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["U"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_child_nodes_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["p"](p0i32);
/******/ 					},
/******/ 					"__widl_f_last_child_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["Q"](p0i32);
/******/ 					},
/******/ 					"__widl_f_node_value_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["W"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_item_NodeList": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["P"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_get_NodeList": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["G"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_length_NodeList": function(p0i32) {
/******/ 						return installedModules[4].exports["S"](p0i32);
/******/ 					},
/******/ 					"__widl_f_clone_range_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["r"](p0i32);
/******/ 					},
/******/ 					"__widl_f_collapse_with_to_start_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["s"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_delete_contents_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["z"](p0i32);
/******/ 					},
/******/ 					"__widl_f_insert_node_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["O"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_end_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["cb"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_end_after_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["db"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_end_before_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["eb"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_start_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["fb"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_start_after_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["gb"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_start_before_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["hb"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_start_container_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["ib"](p0i32);
/******/ 					},
/******/ 					"__widl_f_start_offset_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["jb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_end_container_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["B"](p0i32);
/******/ 					},
/******/ 					"__widl_f_end_offset_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["C"](p0i32);
/******/ 					},
/******/ 					"__widl_f_collapsed_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["t"](p0i32);
/******/ 					},
/******/ 					"__widl_f_common_ancestor_container_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["u"](p0i32);
/******/ 					},
/******/ 					"__widl_f_add_range_Selection": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["m"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_get_range_at_Selection": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["I"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_remove_all_ranges_Selection": function(p0i32) {
/******/ 						return installedModules[4].exports["Z"](p0i32);
/******/ 					},
/******/ 					"__widl_f_range_count_Selection": function(p0i32) {
/******/ 						return installedModules[4].exports["Y"](p0i32);
/******/ 					},
/******/ 					"__widl_instanceof_Text": function(p0i32) {
/******/ 						return installedModules[4].exports["qb"](p0i32);
/******/ 					},
/******/ 					"__widl_f_get_selection_Window": function(p0i32) {
/******/ 						return installedModules[4].exports["J"](p0i32);
/******/ 					},
/******/ 					"__widl_f_document_Window": function(p0i32) {
/******/ 						return installedModules[4].exports["A"](p0i32);
/******/ 					},
/******/ 					"__widl_f_debug_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["y"](p0i32);
/******/ 					},
/******/ 					"__widl_f_error_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["D"](p0i32);
/******/ 					},
/******/ 					"__widl_f_info_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["M"](p0i32);
/******/ 					},
/******/ 					"__widl_f_log_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["T"](p0i32);
/******/ 					},
/******/ 					"__widl_f_warn_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["lb"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_8d1797b163dbc9fb": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["e"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_836fa928f74337e5": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["b"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["g"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["k"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":[5]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"5":"5102349bb9f43911486d"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 3))
  .catch(e => console.error("Error importing `benchmark.js`:", e));


/***/ })
/******/ ]);
//# sourceMappingURL=bootstrap.benchmark.bundle.js.map