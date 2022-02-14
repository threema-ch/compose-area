/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
Promise.all(/* import() */[__webpack_require__.e(3), __webpack_require__.e(2)]).then(__webpack_require__.bind(__webpack_require__, 3))
  .catch(e => console.error("Error importing `benchmark.js`:", e));


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
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/******/ 			0: 0
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
/******/ 						"__wbg_new_59cb74e423758ede": function() {
/******/ 							if(wasmImportedFuncCache3 === undefined) wasmImportedFuncCache3 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache3["__wbg_new_59cb74e423758ede"]();
/******/ 						},
/******/ 						"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache4 === undefined) wasmImportedFuncCache4 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache4["__wbg_stack_558ba5917b466edd"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache5 === undefined) wasmImportedFuncCache5 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache5["__wbg_error_4bb6c2a97407129a"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Window_0e8decd0a6179699": function(p0i32) {
/******/ 							if(wasmImportedFuncCache6 === undefined) wasmImportedFuncCache6 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache6["__wbg_instanceof_Window_0e8decd0a6179699"](p0i32);
/******/ 						},
/******/ 						"__wbg_document_76c349f54c28c8fa": function(p0i32) {
/******/ 							if(wasmImportedFuncCache7 === undefined) wasmImportedFuncCache7 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache7["__wbg_document_76c349f54c28c8fa"](p0i32);
/******/ 						},
/******/ 						"__wbg_getSelection_a6200f7c3b066e96": function(p0i32) {
/******/ 							if(wasmImportedFuncCache8 === undefined) wasmImportedFuncCache8 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache8["__wbg_getSelection_a6200f7c3b066e96"](p0i32);
/******/ 						},
/******/ 						"__wbg_createRange_7417ae8c2e527350": function(p0i32) {
/******/ 							if(wasmImportedFuncCache9 === undefined) wasmImportedFuncCache9 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache9["__wbg_createRange_7417ae8c2e527350"](p0i32);
/******/ 						},
/******/ 						"__wbg_getElementById_35de356b82960e7f": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache10 === undefined) wasmImportedFuncCache10 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache10["__wbg_getElementById_35de356b82960e7f"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_alt_c8bbd91d34bbf4a4": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache11 === undefined) wasmImportedFuncCache11 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache11["__wbg_alt_c8bbd91d34bbf4a4"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_startContainer_6a277da441b04299": function(p0i32) {
/******/ 							if(wasmImportedFuncCache12 === undefined) wasmImportedFuncCache12 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache12["__wbg_startContainer_6a277da441b04299"](p0i32);
/******/ 						},
/******/ 						"__wbg_startOffset_10a5db36288ab8a9": function(p0i32) {
/******/ 							if(wasmImportedFuncCache13 === undefined) wasmImportedFuncCache13 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache13["__wbg_startOffset_10a5db36288ab8a9"](p0i32);
/******/ 						},
/******/ 						"__wbg_endContainer_75a43a2998c34fe0": function(p0i32) {
/******/ 							if(wasmImportedFuncCache14 === undefined) wasmImportedFuncCache14 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache14["__wbg_endContainer_75a43a2998c34fe0"](p0i32);
/******/ 						},
/******/ 						"__wbg_endOffset_63cef9ef59a82402": function(p0i32) {
/******/ 							if(wasmImportedFuncCache15 === undefined) wasmImportedFuncCache15 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache15["__wbg_endOffset_63cef9ef59a82402"](p0i32);
/******/ 						},
/******/ 						"__wbg_collapsed_59ac2df717b32dd2": function(p0i32) {
/******/ 							if(wasmImportedFuncCache16 === undefined) wasmImportedFuncCache16 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache16["__wbg_collapsed_59ac2df717b32dd2"](p0i32);
/******/ 						},
/******/ 						"__wbg_commonAncestorContainer_2f3f55bc613489fe": function(p0i32) {
/******/ 							if(wasmImportedFuncCache17 === undefined) wasmImportedFuncCache17 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache17["__wbg_commonAncestorContainer_2f3f55bc613489fe"](p0i32);
/******/ 						},
/******/ 						"__wbg_cloneRange_095edaadd47fd4f4": function(p0i32) {
/******/ 							if(wasmImportedFuncCache18 === undefined) wasmImportedFuncCache18 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache18["__wbg_cloneRange_095edaadd47fd4f4"](p0i32);
/******/ 						},
/******/ 						"__wbg_collapse_8aed7ef93ec94d6e": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache19 === undefined) wasmImportedFuncCache19 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache19["__wbg_collapse_8aed7ef93ec94d6e"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_deleteContents_e70a762de08f3104": function(p0i32) {
/******/ 							if(wasmImportedFuncCache20 === undefined) wasmImportedFuncCache20 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache20["__wbg_deleteContents_e70a762de08f3104"](p0i32);
/******/ 						},
/******/ 						"__wbg_insertNode_9f8bb90475329f67": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache21 === undefined) wasmImportedFuncCache21 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache21["__wbg_insertNode_9f8bb90475329f67"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setEnd_da02a3b4f5aa3925": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache22 === undefined) wasmImportedFuncCache22 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache22["__wbg_setEnd_da02a3b4f5aa3925"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_setEndAfter_e0b437572d9413e7": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache23 === undefined) wasmImportedFuncCache23 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache23["__wbg_setEndAfter_e0b437572d9413e7"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setEndBefore_cb49508018c70aa4": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache24 === undefined) wasmImportedFuncCache24 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache24["__wbg_setEndBefore_cb49508018c70aa4"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setStart_8e286af3a7fa93e1": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache25 === undefined) wasmImportedFuncCache25 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache25["__wbg_setStart_8e286af3a7fa93e1"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_setStartAfter_f3921b9eb3c59bb7": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache26 === undefined) wasmImportedFuncCache26 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache26["__wbg_setStartAfter_f3921b9eb3c59bb7"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_setStartBefore_785537795e6fb48c": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache27 === undefined) wasmImportedFuncCache27 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache27["__wbg_setStartBefore_785537795e6fb48c"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_length_8a6a2efe955a8b70": function(p0i32) {
/******/ 							if(wasmImportedFuncCache28 === undefined) wasmImportedFuncCache28 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache28["__wbg_length_8a6a2efe955a8b70"](p0i32);
/******/ 						},
/******/ 						"__wbg_item_102e71580fef0207": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache29 === undefined) wasmImportedFuncCache29 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache29["__wbg_item_102e71580fef0207"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_get_b98c84aa64400fbe": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache30 === undefined) wasmImportedFuncCache30 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache30["__wbg_get_b98c84aa64400fbe"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Text_cbaefa3d82bdddd8": function(p0i32) {
/******/ 							if(wasmImportedFuncCache31 === undefined) wasmImportedFuncCache31 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache31["__wbg_instanceof_Text_cbaefa3d82bdddd8"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Node_11254aed560b4c66": function(p0i32) {
/******/ 							if(wasmImportedFuncCache32 === undefined) wasmImportedFuncCache32 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache32["__wbg_instanceof_Node_11254aed560b4c66"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeType_f5e54979099baba1": function(p0i32) {
/******/ 							if(wasmImportedFuncCache33 === undefined) wasmImportedFuncCache33 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache33["__wbg_nodeType_f5e54979099baba1"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeName_7babcf625aec4083": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache34 === undefined) wasmImportedFuncCache34 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache34["__wbg_nodeName_7babcf625aec4083"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_childNodes_3ea42a8e103679b0": function(p0i32) {
/******/ 							if(wasmImportedFuncCache35 === undefined) wasmImportedFuncCache35 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache35["__wbg_childNodes_3ea42a8e103679b0"](p0i32);
/******/ 						},
/******/ 						"__wbg_lastChild_86e1c02df2b342d8": function(p0i32) {
/******/ 							if(wasmImportedFuncCache36 === undefined) wasmImportedFuncCache36 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache36["__wbg_lastChild_86e1c02df2b342d8"](p0i32);
/******/ 						},
/******/ 						"__wbg_nodeValue_2b31b791bfa62a8d": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache37 === undefined) wasmImportedFuncCache37 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache37["__wbg_nodeValue_2b31b791bfa62a8d"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_appendChild_5a186a381c8fff5b": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache38 === undefined) wasmImportedFuncCache38 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache38["__wbg_appendChild_5a186a381c8fff5b"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_contains_87699bbfe7e284cd": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache39 === undefined) wasmImportedFuncCache39 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache39["__wbg_contains_87699bbfe7e284cd"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_hasChildNodes_92f3eb57464fc1ac": function(p0i32) {
/******/ 							if(wasmImportedFuncCache40 === undefined) wasmImportedFuncCache40 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache40["__wbg_hasChildNodes_92f3eb57464fc1ac"](p0i32);
/******/ 						},
/******/ 						"__wbg_insertBefore_83c912a1a16c68d2": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache41 === undefined) wasmImportedFuncCache41 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache41["__wbg_insertBefore_83c912a1a16c68d2"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_normalize_b780513d171a31fd": function(p0i32) {
/******/ 							if(wasmImportedFuncCache42 === undefined) wasmImportedFuncCache42 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache42["__wbg_normalize_b780513d171a31fd"](p0i32);
/******/ 						},
/******/ 						"__wbg_removeChild_a5458e964695297f": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache43 === undefined) wasmImportedFuncCache43 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache43["__wbg_removeChild_a5458e964695297f"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Element_b2ea0d558fc7d331": function(p0i32) {
/******/ 							if(wasmImportedFuncCache44 === undefined) wasmImportedFuncCache44 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache44["__wbg_instanceof_Element_b2ea0d558fc7d331"](p0i32);
/******/ 						},
/******/ 						"__wbg_tagName_c547ea7972faad1b": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache45 === undefined) wasmImportedFuncCache45 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache45["__wbg_tagName_c547ea7972faad1b"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_id_1d70bdde705a2f65": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache46 === undefined) wasmImportedFuncCache46 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache46["__wbg_id_1d70bdde705a2f65"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_classList_262889e9fed65a4e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache47 === undefined) wasmImportedFuncCache47 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache47["__wbg_classList_262889e9fed65a4e"](p0i32);
/******/ 						},
/******/ 						"__wbg_setAttribute_65dde98f32b42a41": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 							if(wasmImportedFuncCache48 === undefined) wasmImportedFuncCache48 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache48["__wbg_setAttribute_65dde98f32b42a41"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 						},
/******/ 						"__wbg_debug_ad2e107500a5e66f": function(p0i32) {
/******/ 							if(wasmImportedFuncCache49 === undefined) wasmImportedFuncCache49 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache49["__wbg_debug_ad2e107500a5e66f"](p0i32);
/******/ 						},
/******/ 						"__wbg_error_899f34a74e6ae34f": function(p0i32) {
/******/ 							if(wasmImportedFuncCache50 === undefined) wasmImportedFuncCache50 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache50["__wbg_error_899f34a74e6ae34f"](p0i32);
/******/ 						},
/******/ 						"__wbg_info_9f243b6555ae61bc": function(p0i32) {
/******/ 							if(wasmImportedFuncCache51 === undefined) wasmImportedFuncCache51 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache51["__wbg_info_9f243b6555ae61bc"](p0i32);
/******/ 						},
/******/ 						"__wbg_log_8c015365353ccd49": function(p0i32) {
/******/ 							if(wasmImportedFuncCache52 === undefined) wasmImportedFuncCache52 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache52["__wbg_log_8c015365353ccd49"](p0i32);
/******/ 						},
/******/ 						"__wbg_warn_22c4a606fdfb0a53": function(p0i32) {
/******/ 							if(wasmImportedFuncCache53 === undefined) wasmImportedFuncCache53 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache53["__wbg_warn_22c4a606fdfb0a53"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_HtmlElement_67a9589b0f1c5c31": function(p0i32) {
/******/ 							if(wasmImportedFuncCache54 === undefined) wasmImportedFuncCache54 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache54["__wbg_instanceof_HtmlElement_67a9589b0f1c5c31"](p0i32);
/******/ 						},
/******/ 						"__wbg_focus_2617465192028e1c": function(p0i32) {
/******/ 							if(wasmImportedFuncCache55 === undefined) wasmImportedFuncCache55 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache55["__wbg_focus_2617465192028e1c"](p0i32);
/******/ 						},
/******/ 						"__wbg_data_e09ed4fd8944fe35": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache56 === undefined) wasmImportedFuncCache56 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache56["__wbg_data_e09ed4fd8944fe35"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_length_cca45aa2d6b01dfc": function(p0i32) {
/******/ 							if(wasmImportedFuncCache57 === undefined) wasmImportedFuncCache57 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache57["__wbg_length_cca45aa2d6b01dfc"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_HtmlDocument_4e420d706512e41e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache58 === undefined) wasmImportedFuncCache58 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache58["__wbg_instanceof_HtmlDocument_4e420d706512e41e"](p0i32);
/******/ 						},
/******/ 						"__wbg_execCommand_81e83cf93eb6abe3": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 							if(wasmImportedFuncCache59 === undefined) wasmImportedFuncCache59 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache59["__wbg_execCommand_81e83cf93eb6abe3"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 						},
/******/ 						"__wbg_add_0850d066114a0d43": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 							if(wasmImportedFuncCache60 === undefined) wasmImportedFuncCache60 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache60["__wbg_add_0850d066114a0d43"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 						},
/******/ 						"__wbg_rangeCount_d9e8306d3ad9a1c4": function(p0i32) {
/******/ 							if(wasmImportedFuncCache61 === undefined) wasmImportedFuncCache61 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache61["__wbg_rangeCount_d9e8306d3ad9a1c4"](p0i32);
/******/ 						},
/******/ 						"__wbg_addRange_fbef75e804365d45": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache62 === undefined) wasmImportedFuncCache62 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache62["__wbg_addRange_fbef75e804365d45"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_getRangeAt_778d713a86839a99": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache63 === undefined) wasmImportedFuncCache63 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache63["__wbg_getRangeAt_778d713a86839a99"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_removeAllRanges_54eda87c037227c5": function(p0i32) {
/******/ 							if(wasmImportedFuncCache64 === undefined) wasmImportedFuncCache64 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache64["__wbg_removeAllRanges_54eda87c037227c5"](p0i32);
/******/ 						},
/******/ 						"__wbg_newnoargs_db0587fa712f9acc": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache65 === undefined) wasmImportedFuncCache65 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache65["__wbg_newnoargs_db0587fa712f9acc"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_call_79ca0d435495a83a": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache66 === undefined) wasmImportedFuncCache66 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache66["__wbg_call_79ca0d435495a83a"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_self_d1b58dbab69d5bb1": function() {
/******/ 							if(wasmImportedFuncCache67 === undefined) wasmImportedFuncCache67 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache67["__wbg_self_d1b58dbab69d5bb1"]();
/******/ 						},
/******/ 						"__wbg_window_de445cb18819ad4b": function() {
/******/ 							if(wasmImportedFuncCache68 === undefined) wasmImportedFuncCache68 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache68["__wbg_window_de445cb18819ad4b"]();
/******/ 						},
/******/ 						"__wbg_globalThis_68afcb0d98f0112d": function() {
/******/ 							if(wasmImportedFuncCache69 === undefined) wasmImportedFuncCache69 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache69["__wbg_globalThis_68afcb0d98f0112d"]();
/******/ 						},
/******/ 						"__wbg_global_baed4e4fa850c0d0": function() {
/******/ 							if(wasmImportedFuncCache70 === undefined) wasmImportedFuncCache70 = __webpack_require__.c[4].exports;
/******/ 							return wasmImportedFuncCache70["__wbg_global_baed4e4fa850c0d0"]();
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
/******/ 			"3": [
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
/******/ 					var req = fetch(__webpack_require__.p + "" + {"3":{"6":"b63da5aac4440b5b72ef"}}[chunkId][wasmModuleId] + ".module.wasm");
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
/******/ 	var __webpack_exports__ = __webpack_require__(1);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bootstrap.benchmark.bundle.js.map