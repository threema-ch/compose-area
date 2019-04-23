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
/******/ 		2: 0
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
/******/ 				"./compose_area": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules[4].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules[4].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules[4].exports["__wbg_new_59cb74e423758ede"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbg_stack_558ba5917b466edd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbg_error_4bb6c2a97407129a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_instanceof_Window": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_instanceof_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_instanceof_CharacterData": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_instanceof_CharacterData"](p0i32);
/******/ 					},
/******/ 					"__widl_f_create_element_Document": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules[4].exports["__widl_f_create_element_Document"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_create_range_Document": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_create_range_Document"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_create_text_node_Document": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_create_text_node_Document"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_get_element_by_id_Document": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_get_element_by_id_Document"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_instanceof_Element": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_instanceof_Element"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_attribute_Element": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_attribute_Element"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__widl_f_tag_name_Element": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_tag_name_Element"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_id_Element": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_id_Element"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_replace_with_with_node_1_Element": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_replace_with_with_node_1_Element"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_alt_HTMLImageElement": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_alt_HTMLImageElement"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_append_child_Node": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_append_child_Node"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_contains_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_contains_Node"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_insert_before_Node": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules[4].exports["__widl_f_insert_before_Node"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_normalize_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_normalize_Node"](p0i32);
/******/ 					},
/******/ 					"__widl_f_node_type_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_node_type_Node"](p0i32);
/******/ 					},
/******/ 					"__widl_f_node_name_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_node_name_Node"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_child_nodes_Node": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_child_nodes_Node"](p0i32);
/******/ 					},
/******/ 					"__widl_f_node_value_Node": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_node_value_Node"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_item_NodeList": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_item_NodeList"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_get_NodeList": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_get_NodeList"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_length_NodeList": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_length_NodeList"](p0i32);
/******/ 					},
/******/ 					"__widl_f_clone_range_Range": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_clone_range_Range"](p0i32);
/******/ 					},
/******/ 					"__widl_f_collapse_with_to_start_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_collapse_with_to_start_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_delete_contents_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_delete_contents_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_insert_node_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_insert_node_Range"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_end_Range": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_end_Range"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_set_end_after_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_end_after_Range"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_end_before_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_end_before_Range"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_start_Range": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_start_Range"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_set_start_after_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_start_after_Range"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_start_before_Range": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_set_start_before_Range"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_start_container_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_start_container_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_start_offset_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_start_offset_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_end_container_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_end_container_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_end_offset_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_end_offset_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_common_ancestor_container_Range": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_common_ancestor_container_Range"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_add_range_Selection": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_add_range_Selection"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_get_range_at_Selection": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__widl_f_get_range_at_Selection"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_remove_all_ranges_Selection": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_remove_all_ranges_Selection"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_range_count_Selection": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_range_count_Selection"](p0i32);
/******/ 					},
/******/ 					"__widl_f_get_selection_Window": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__widl_f_get_selection_Window"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_document_Window": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_document_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_debug_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_debug_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_error_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_error_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_info_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_info_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_log_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_log_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_warn_1_": function(p0i32) {
/******/ 						return installedModules[4].exports["__widl_f_warn_1_"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_b4526aa2a6db81de": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbg_newnoargs_b4526aa2a6db81de"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_a7a8823c404228ab": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[4].exports["__wbg_call_a7a8823c404228ab"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules[4].exports["__wbindgen_throw"](p0i32,p1i32);
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
/******/ 				var req = fetch(__webpack_require__.p + "" + {"5":"92b597d6447ad5f037f9"}[wasmModuleId] + ".module.wasm");
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, 2))
  .catch(e => console.error("Error importing `index.js`:", e));


/***/ })
/******/ ]);
//# sourceMappingURL=bootstrap.demo.bundle.js.map