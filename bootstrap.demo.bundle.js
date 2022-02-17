/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
__webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(__webpack_require__, 2))
  .catch(e => console.error("Error importing `index.js`:", e));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "bootstrap." + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "compose-area-demo:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			1: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcompose_area_demo"] = self["webpackChunkcompose_area_demo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded and loading wasm modules
/******/ 		var installedWasmModules = {};
/******/ 		
/******/ 		function promiseResolve() { return Promise.resolve(); }
/******/ 		
/******/ 		var wasmImportedFuncCache0;
/******/ 		var wasmImportedFuncCache1;
/******/ 		var wasmImportedFuncCache2;
/******/ 		var wasmImportedFuncCache3;
/******/ 		var wasmImportedFuncCache4;
/******/ 		var wasmImportedFuncCache5;
/******/ 		var wasmImportedFuncCache6;
/******/ 		var wasmImportedFuncCache7;
/******/ 		var wasmImportedFuncCache8;
/******/ 		var wasmImportedFuncCache9;
/******/ 		var wasmImportedFuncCache10;
/******/ 		var wasmImportedFuncCache11;
/******/ 		var wasmImportedFuncCache12;
/******/ 		var wasmImportedFuncCache13;
/******/ 		var wasmImportedFuncCache14;
/******/ 		var wasmImportedFuncCache15;
/******/ 		var wasmImportedFuncCache16;
/******/ 		var wasmImportedFuncCache17;
/******/ 		var wasmImportedFuncCache18;
/******/ 		var wasmImportedFuncCache19;
/******/ 		var wasmImportedFuncCache20;
/******/ 		var wasmImportedFuncCache21;
/******/ 		var wasmImportedFuncCache22;
/******/ 		var wasmImportedFuncCache23;
/******/ 		var wasmImportedFuncCache24;
/******/ 		var wasmImportedFuncCache25;
/******/ 		var wasmImportedFuncCache26;
/******/ 		var wasmImportedFuncCache27;
/******/ 		var wasmImportedFuncCache28;
/******/ 		var wasmImportedFuncCache29;
/******/ 		var wasmImportedFuncCache30;
/******/ 		var wasmImportedFuncCache31;
/******/ 		var wasmImportedFuncCache32;
/******/ 		var wasmImportedFuncCache33;
/******/ 		var wasmImportedFuncCache34;
/******/ 		var wasmImportedFuncCache35;
/******/ 		var wasmImportedFuncCache36;
/******/ 		var wasmImportedFuncCache37;
/******/ 		var wasmImportedFuncCache38;
/******/ 		var wasmImportedFuncCache39;
/******/ 		var wasmImportedFuncCache40;
/******/ 		var wasmImportedFuncCache41;
/******/ 		var wasmImportedFuncCache42;
/******/ 		var wasmImportedFuncCache43;
/******/ 		var wasmImportedFuncCache44;
/******/ 		var wasmImportedFuncCache45;
/******/ 		var wasmImportedFuncCache46;
/******/ 		var wasmImportedFuncCache47;
/******/ 		var wasmImportedFuncCache48;
/******/ 		var wasmImportedFuncCache49;
/******/ 		var wasmImportedFuncCache50;
/******/ 		var wasmImportedFuncCache51;
/******/ 		var wasmImportedFuncCache52;
/******/ 		var wasmImportedFuncCache53;
/******/ 		var wasmImportedFuncCache54;
/******/ 		var wasmImportedFuncCache55;
/******/ 		var wasmImportedFuncCache56;
/******/ 		var wasmImportedFuncCache57;
/******/ 		var wasmImportedFuncCache58;
/******/ 		var wasmImportedFuncCache59;
/******/ 		var wasmImportedFuncCache60;
/******/ 		var wasmImportedFuncCache61;
/******/ 		var wasmImportedFuncCache62;
/******/ 		var wasmImportedFuncCache63;
/******/ 		var wasmImportedFuncCache64;
/******/ 		var wasmImportedFuncCache65;
/******/ 		var wasmImportedFuncCache66;
/******/ 		var wasmImportedFuncCache67;
/******/ 		var wasmImportedFuncCache68;
/******/ 		var wasmImportedFuncCache69;
/******/ 		var wasmImportedFuncCache70;
/******/ 		var wasmImportedFuncCache71;
/******/ 		var wasmImportedFuncCache72;
/******/ 		var wasmImportedFuncCache73;
/******/ 		var wasmImportObjects = {
/******/ 			6: function() {
/******/ 				return {
/******/ 					"./compose_area_bg.js": {
/******/ 						"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache0 === undefined) wasmImportedFuncCache0 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache0["__wbindgen_object_drop_ref"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache1 === undefined) wasmImportedFuncCache1 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache1["__wbindgen_object_clone_ref"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache2 === undefined) wasmImportedFuncCache2 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache2["__wbindgen_string_new"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_new_693216e109162396": function() {
/******/ 							if(wasmImportedFuncCache3 === undefined) wasmImportedFuncCache3 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache3["__wbg_new_693216e109162396"]();
/******/ 						},
/******/ 						"__wbg_stack_0ddaca5d1abfb52f": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache4 === undefined) wasmImportedFuncCache4 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache4["__wbg_stack_0ddaca5d1abfb52f"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_error_09919627ac0992f5": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache5 === undefined) wasmImportedFuncCache5 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache5["__wbg_error_09919627ac0992f5"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Window_434ce1849eb4e0fc": function(p0i32) {
/******/ 							if(wasmImportedFuncCache6 === undefined) wasmImportedFuncCache6 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache6["__wbg_instanceof_Window_434ce1849eb4e0fc"](p0i32);
/******/ 						},
/******/ 						"__wbg_document_5edd43643d1060d9": function(p0i32) {
/******/ 							if(wasmImportedFuncCache7 === undefined) wasmImportedFuncCache7 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache7["__wbg_document_5edd43643d1060d9"](p0i32);
/******/ 						},
/******/ 						"__wbg_getSelection_5d8c74ecc3015c96": function(p0i32) {
/******/ 							if(wasmImportedFuncCache8 === undefined) wasmImportedFuncCache8 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache8["__wbg_getSelection_5d8c74ecc3015c96"](p0i32);
/******/ 						},
/******/ 						"__wbg_createRange_c279e356750abef4": function(p0i32) {
/******/ 							if(wasmImportedFuncCache9 === undefined) wasmImportedFuncCache9 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache9["__wbg_createRange_c279e356750abef4"](p0i32);
/******/ 						},
/******/ 						"__wbg_getElementById_b30e88aff96f66a1": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache10 === undefined) wasmImportedFuncCache10 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache10["__wbg_getElementById_b30e88aff96f66a1"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_add_98ddddb278bdbdd1": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 							if(wasmImportedFuncCache11 === undefined) wasmImportedFuncCache11 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache11["__wbg_add_98ddddb278bdbdd1"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 						},
/******/ 						"__wbg_alt_671f78f7f5fb3208": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache12 === undefined) wasmImportedFuncCache12 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache12["__wbg_alt_671f78f7f5fb3208"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_length_5ced7bdab8b3e91f": function(p0i32) {
/******/ 							if(wasmImportedFuncCache13 === undefined) wasmImportedFuncCache13 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache13["__wbg_length_5ced7bdab8b3e91f"](p0i32);
/******/ 						},
/******/ 						"__wbg_item_c99f4edf5b060819": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache14 === undefined) wasmImportedFuncCache14 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache14["__wbg_item_c99f4edf5b060819"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_get_a307c30b5f5df814": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache15 === undefined) wasmImportedFuncCache15 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache15["__wbg_get_a307c30b5f5df814"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_startContainer_2beef5b962dc3595": function(p0i32) {
/******/ 							if(wasmImportedFuncCache16 === undefined) wasmImportedFuncCache16 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache16["__wbg_startContainer_2beef5b962dc3595"](p0i32);
/******/ 						},
/******/ 						"__wbg_startOffset_9d40d23b55798018": function(p0i32) {
/******/ 							if(wasmImportedFuncCache17 === undefined) wasmImportedFuncCache17 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache17["__wbg_startOffset_9d40d23b55798018"](p0i32);
/******/ 						},
/******/ 						"__wbg_endContainer_e5b61589746300e1": function(p0i32) {
/******/ 							if(wasmImportedFuncCache18 === undefined) wasmImportedFuncCache18 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache18["__wbg_endContainer_e5b61589746300e1"](p0i32);
/******/ 						},
/******/ 						"__wbg_endOffset_75e86c6acd73c82b": function(p0i32) {
/******/ 							if(wasmImportedFuncCache19 === undefined) wasmImportedFuncCache19 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache19["__wbg_endOffset_75e86c6acd73c82b"](p0i32);
/******/ 						},
/******/ 						"__wbg_collapsed_e4582669d5ac61fc": function(p0i32) {
/******/ 							if(wasmImportedFuncCache20 === undefined) wasmImportedFuncCache20 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache20["__wbg_collapsed_e4582669d5ac61fc"](p0i32);
/******/ 						},
/******/ 						"__wbg_commonAncestorContainer_402beaa46632d36f": function(p0i32) {
/******/ 							if(wasmImportedFuncCache21 === undefined) wasmImportedFuncCache21 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache21["__wbg_commonAncestorContainer_402beaa46632d36f"](p0i32);
/******/ 						},
/******/ 						"__wbg_cloneRange_b0eaaa856a5fcda8": function(p0i32) {
/******/ 							if(wasmImportedFuncCache22 === undefined) wasmImportedFuncCache22 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache22["__wbg_cloneRange_b0eaaa856a5fcda8"](p0i32);
/******/ 						},
/******/ 						"__wbg_collapse_5e2a9fa29b76f054": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache23 === undefined) wasmImportedFuncCache23 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache23["__wbg_collapse_5e2a9fa29b76f054"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_deleteContents_d9e072f898436895": function(p0i32) {
/******/ 							if(wasmImportedFuncCache24 === undefined) wasmImportedFuncCache24 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache24["__wbg_deleteContents_d9e072f898436895"](p0i32);
/******/ 						},
/******/ 						"__wbg_insertNode_663d8088daa11159": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache25 === undefined) wasmImportedFuncCache25 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache25["__wbg_insertNode_663d8088daa11159"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setEnd_e7d54c502fe1d5fe": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache26 === undefined) wasmImportedFuncCache26 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache26["__wbg_setEnd_e7d54c502fe1d5fe"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_setEndAfter_0ede76a01c529a7c": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache27 === undefined) wasmImportedFuncCache27 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache27["__wbg_setEndAfter_0ede76a01c529a7c"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setEndBefore_6f676bd9a61d523c": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache28 === undefined) wasmImportedFuncCache28 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache28["__wbg_setEndBefore_6f676bd9a61d523c"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setStart_2d22768ea51fa0be": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache29 === undefined) wasmImportedFuncCache29 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache29["__wbg_setStart_2d22768ea51fa0be"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_setStartAfter_f4c9fba3ef77b191": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache30 === undefined) wasmImportedFuncCache30 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache30["__wbg_setStartAfter_f4c9fba3ef77b191"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setStartBefore_7630991b7c35a408": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache31 === undefined) wasmImportedFuncCache31 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache31["__wbg_setStartBefore_7630991b7c35a408"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_rangeCount_d1ca9912e2e78c5c": function(p0i32) {
/******/ 							if(wasmImportedFuncCache32 === undefined) wasmImportedFuncCache32 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache32["__wbg_rangeCount_d1ca9912e2e78c5c"](p0i32);
/******/ 						},
/******/ 						"__wbg_addRange_ca0bf4e75ecb297e": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache33 === undefined) wasmImportedFuncCache33 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache33["__wbg_addRange_ca0bf4e75ecb297e"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_getRangeAt_0afe5241b13fe940": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache34 === undefined) wasmImportedFuncCache34 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache34["__wbg_getRangeAt_0afe5241b13fe940"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_removeAllRanges_6f07d9cffad4ffdd": function(p0i32) {
/******/ 							if(wasmImportedFuncCache35 === undefined) wasmImportedFuncCache35 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache35["__wbg_removeAllRanges_6f07d9cffad4ffdd"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Element_c9423704dd5d9b1d": function(p0i32) {
/******/ 							if(wasmImportedFuncCache36 === undefined) wasmImportedFuncCache36 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache36["__wbg_instanceof_Element_c9423704dd5d9b1d"](p0i32);
/******/ 						},
/******/ 						"__wbg_tagName_46df689351536098": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache37 === undefined) wasmImportedFuncCache37 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache37["__wbg_tagName_46df689351536098"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_id_79dca31d8297faf1": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache38 === undefined) wasmImportedFuncCache38 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache38["__wbg_id_79dca31d8297faf1"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_classList_5086913f676eb3f3": function(p0i32) {
/******/ 							if(wasmImportedFuncCache39 === undefined) wasmImportedFuncCache39 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache39["__wbg_classList_5086913f676eb3f3"](p0i32);
/******/ 						},
/******/ 						"__wbg_setAttribute_1776fcc9b98d464e": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 							if(wasmImportedFuncCache40 === undefined) wasmImportedFuncCache40 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache40["__wbg_setAttribute_1776fcc9b98d464e"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 						},
/******/ 						"__wbg_debug_6e114a5b27d7915d": function(p0i32) {
/******/ 							if(wasmImportedFuncCache41 === undefined) wasmImportedFuncCache41 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache41["__wbg_debug_6e114a5b27d7915d"](p0i32);
/******/ 						},
/******/ 						"__wbg_error_ca520cb687b085a1": function(p0i32) {
/******/ 							if(wasmImportedFuncCache42 === undefined) wasmImportedFuncCache42 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache42["__wbg_error_ca520cb687b085a1"](p0i32);
/******/ 						},
/******/ 						"__wbg_info_32ab782ec7072fac": function(p0i32) {
/******/ 							if(wasmImportedFuncCache43 === undefined) wasmImportedFuncCache43 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache43["__wbg_info_32ab782ec7072fac"](p0i32);
/******/ 						},
/******/ 						"__wbg_log_fbd13631356d44e4": function(p0i32) {
/******/ 							if(wasmImportedFuncCache44 === undefined) wasmImportedFuncCache44 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache44["__wbg_log_fbd13631356d44e4"](p0i32);
/******/ 						},
/******/ 						"__wbg_warn_97f10a6b0dbb8c5c": function(p0i32) {
/******/ 							if(wasmImportedFuncCache45 === undefined) wasmImportedFuncCache45 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache45["__wbg_warn_97f10a6b0dbb8c5c"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_HtmlElement_d3e8f1c1d6788b24": function(p0i32) {
/******/ 							if(wasmImportedFuncCache46 === undefined) wasmImportedFuncCache46 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache46["__wbg_instanceof_HtmlElement_d3e8f1c1d6788b24"](p0i32);
/******/ 						},
/******/ 						"__wbg_focus_4434360545ac99cf": function(p0i32) {
/******/ 							if(wasmImportedFuncCache47 === undefined) wasmImportedFuncCache47 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache47["__wbg_focus_4434360545ac99cf"](p0i32);
/******/ 						},
/******/ 						"__wbg_data_88cb4195a3450465": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache48 === undefined) wasmImportedFuncCache48 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache48["__wbg_data_88cb4195a3450465"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_length_d4763a3367e3c89a": function(p0i32) {
/******/ 							if(wasmImportedFuncCache49 === undefined) wasmImportedFuncCache49 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache49["__wbg_length_d4763a3367e3c89a"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_HtmlDocument_395ec6365cabde6c": function(p0i32) {
/******/ 							if(wasmImportedFuncCache50 === undefined) wasmImportedFuncCache50 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache50["__wbg_instanceof_HtmlDocument_395ec6365cabde6c"](p0i32);
/******/ 						},
/******/ 						"__wbg_execCommand_378908f141ff4d29": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 							if(wasmImportedFuncCache51 === undefined) wasmImportedFuncCache51 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache51["__wbg_execCommand_378908f141ff4d29"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Node_235c78aca8f70c08": function(p0i32) {
/******/ 							if(wasmImportedFuncCache52 === undefined) wasmImportedFuncCache52 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache52["__wbg_instanceof_Node_235c78aca8f70c08"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeType_a59858b0311a7580": function(p0i32) {
/******/ 							if(wasmImportedFuncCache53 === undefined) wasmImportedFuncCache53 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache53["__wbg_nodeType_a59858b0311a7580"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeName_af57dac2f0dea1c9": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache54 === undefined) wasmImportedFuncCache54 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache54["__wbg_nodeName_af57dac2f0dea1c9"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_childNodes_2cc9324ea7605e96": function(p0i32) {
/******/ 							if(wasmImportedFuncCache55 === undefined) wasmImportedFuncCache55 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache55["__wbg_childNodes_2cc9324ea7605e96"](p0i32);
/******/ 						},
/******/ 						"__wbg_lastChild_e2b014abab089e08": function(p0i32) {
/******/ 							if(wasmImportedFuncCache56 === undefined) wasmImportedFuncCache56 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache56["__wbg_lastChild_e2b014abab089e08"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeValue_486a51e2b63cc20b": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache57 === undefined) wasmImportedFuncCache57 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache57["__wbg_nodeValue_486a51e2b63cc20b"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_appendChild_3fe5090c665d3bb4": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache58 === undefined) wasmImportedFuncCache58 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache58["__wbg_appendChild_3fe5090c665d3bb4"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_contains_c04852708d5a89fa": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache59 === undefined) wasmImportedFuncCache59 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache59["__wbg_contains_c04852708d5a89fa"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_hasChildNodes_d0f9f48d4a80210c": function(p0i32) {
/******/ 							if(wasmImportedFuncCache60 === undefined) wasmImportedFuncCache60 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache60["__wbg_hasChildNodes_d0f9f48d4a80210c"](p0i32);
/******/ 						},
/******/ 						"__wbg_insertBefore_4f09909023feac91": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache61 === undefined) wasmImportedFuncCache61 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache61["__wbg_insertBefore_4f09909023feac91"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_normalize_36fe7c1bd29476fe": function(p0i32) {
/******/ 							if(wasmImportedFuncCache62 === undefined) wasmImportedFuncCache62 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache62["__wbg_normalize_36fe7c1bd29476fe"](p0i32);
/******/ 						},
/******/ 						"__wbg_removeChild_f4a83c9698136bbb": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache63 === undefined) wasmImportedFuncCache63 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache63["__wbg_removeChild_f4a83c9698136bbb"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Text_2b91a768db957a84": function(p0i32) {
/******/ 							if(wasmImportedFuncCache64 === undefined) wasmImportedFuncCache64 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache64["__wbg_instanceof_Text_2b91a768db957a84"](p0i32);
/******/ 						},
/******/ 						"__wbg_newnoargs_f579424187aa1717": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache65 === undefined) wasmImportedFuncCache65 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache65["__wbg_newnoargs_f579424187aa1717"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_call_89558c3e96703ca1": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache66 === undefined) wasmImportedFuncCache66 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache66["__wbg_call_89558c3e96703ca1"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_self_e23d74ae45fb17d1": function() {
/******/ 							if(wasmImportedFuncCache67 === undefined) wasmImportedFuncCache67 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache67["__wbg_self_e23d74ae45fb17d1"]();
/******/ 						},
/******/ 						"__wbg_window_b4be7f48b24ac56e": function() {
/******/ 							if(wasmImportedFuncCache68 === undefined) wasmImportedFuncCache68 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache68["__wbg_window_b4be7f48b24ac56e"]();
/******/ 						},
/******/ 						"__wbg_globalThis_d61b1f48a57191ae": function() {
/******/ 							if(wasmImportedFuncCache69 === undefined) wasmImportedFuncCache69 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache69["__wbg_globalThis_d61b1f48a57191ae"]();
/******/ 						},
/******/ 						"__wbg_global_e7669da72fd7f239": function() {
/******/ 							if(wasmImportedFuncCache70 === undefined) wasmImportedFuncCache70 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache70["__wbg_global_e7669da72fd7f239"]();
/******/ 						},
/******/ 						"__wbindgen_is_undefined": function(p0i32) {
/******/ 							if(wasmImportedFuncCache71 === undefined) wasmImportedFuncCache71 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache71["__wbindgen_is_undefined"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache72 === undefined) wasmImportedFuncCache72 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache72["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache73 === undefined) wasmImportedFuncCache73 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache73["__wbindgen_throw"](p0i32,p1i32);
/******/ 						}
/******/ 					}
/******/ 				};
/******/ 			},
/******/ 		};
/******/ 		
/******/ 		var wasmModuleMap = {
/******/ 			"4": [
/******/ 				6
/******/ 			]
/******/ 		};
/******/ 		
/******/ 		// object with all WebAssembly.instance exports
/******/ 		__webpack_require__.w = {};
/******/ 		
/******/ 		// Fetch + compile chunk loading for webassembly
/******/ 		__webpack_require__.f.wasm = function(chunkId, promises) {
/******/ 		
/******/ 			var wasmModules = wasmModuleMap[chunkId] || [];
/******/ 		
/******/ 			wasmModules.forEach(function(wasmModuleId, idx) {
/******/ 				var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/ 		
/******/ 				// a Promise means "currently loading" or "already loaded".
/******/ 				if(installedWasmModuleData)
/******/ 					promises.push(installedWasmModuleData);
/******/ 				else {
/******/ 					var importObject = wasmImportObjects[wasmModuleId]();
/******/ 					var req = fetch(__webpack_require__.p + "" + {"4":{"6":"b35649b825597b97c4ea"}}[chunkId][wasmModuleId] + ".module.wasm");
/******/ 					var promise;
/******/ 					if(importObject && typeof importObject.then === 'function' && typeof WebAssembly.compileStreaming === 'function') {
/******/ 						promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 							return WebAssembly.instantiate(items[0], items[1]);
/******/ 						});
/******/ 					} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 						promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 					} else {
/******/ 						var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 						promise = bytesPromise.then(function(bytes) {
/******/ 							return WebAssembly.instantiate(bytes, importObject);
/******/ 						});
/******/ 					}
/******/ 					promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 						return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 					}));
/******/ 				}
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bootstrap.demo.bundle.js.map