var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/space-vertically.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sketch-module-google-analytics/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-google-analytics/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var kUUIDKey = 'google.analytics.uuid'
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey)
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString()
  NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

function jsonToQueryString(json) {
  return '?' + Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&')
}

module.exports = function (context, trackingId, hitType, props) {
  var payload = {
    v: 1,
    tid: trackingId,
    ds: 'Sketch ' + NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString"),
    cid: uuid,
    t: hitType,
    an: context.plugin.name(),
    aid: context.plugin.identifier(),
    av: context.plugin.version()
  }
  if (props) {
    Object.keys(props).forEach(function (key) {
      payload[key] = props[key]
    })
  }

  var url = NSURL.URLWithString(
    NSString.stringWithFormat("https://www.google-analytics.com/collect%@", jsonToQueryString(payload))
  )

  if (url) {
    NSURLSession.sharedSession().dataTaskWithURL(url).resume()
  }
}


/***/ }),

/***/ "./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-google-analytics */ "./node_modules/sketch-module-google-analytics/index.js");
/* harmony import */ var sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults.js */ "./src/defaults.js");


/* harmony default export */ __webpack_exports__["default"] = (function (context, action, label, value) {
  var payload = {};
  payload.ec = _defaults_js__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"];

  if (action) {
    payload.ea = action;
  }

  if (label) {
    payload.el = label;
  }

  if (value) {
    payload.ev = value;
  }

  return sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0___default()(context, _defaults_js__WEBPACK_IMPORTED_MODULE_1__["GA_TRACKING_ID"], 'event', payload);
});

/***/ }),

/***/ "./src/defaults.js":
/*!*************************!*\
  !*** ./src/defaults.js ***!
  \*************************/
/*! exports provided: PLUGIN_NAME, PLUGIN_KEY, GA_TRACKING_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_NAME", function() { return PLUGIN_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_KEY", function() { return PLUGIN_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GA_TRACKING_ID", function() { return GA_TRACKING_ID; });
var PLUGIN_NAME = "Homebrew",
    PLUGIN_KEY = "com.gunesozgur.sketch.homebrew",
    GA_TRACKING_ID = "UA-5738625-2";

/***/ }),

/***/ "./src/space-vertically.js":
/*!*********************************!*\
  !*** ./src/space-vertically.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _analytics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analytics.js */ "./src/analytics.js");



var scriptName = "Space Vertically";
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selection = doc.selectedLayers;
  var message;

  if (selection.length <= 1) {
    message = "Please select at least 2 layers.";
    Object(_analytics_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context, scriptName, message);
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.message(scriptName + ": " + message);
  } else {
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.getInputFromUser("Vertical Spacing (px):", {
      initialValue: 0
    }, function (err, value) {
      if (err) {
        // most likely the user canceled the input
        return;
      } else if (!Number.isInteger(Number(value))) {
        // accept integer only
        message = "Please enter numbers only.";
        Object(_analytics_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context, scriptName, message);
        sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.message(scriptName + ": " + message);
      } else {
        setSpacing(selection, value);
        message = value + " px";
        Object(_analytics_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context, scriptName, message);
        sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.message(scriptName + ": " + message);
      }
    });
  }
});

function setSpacing(selection, value) {
  var elements = [];
  var top = 0;
  var count = 0; // convert selection to standard array

  selection.forEach(function (layer) {
    elements.push(layer);
  }); // sort layers by vertical positions

  elements.sort(function (a, b) {
    return a.frame.y - b.frame.y;
  });
  elements.forEach(function (layer) {
    top = count > 0 ? top : layer.frame.y;
    layer.frame.y = top;
    top += layer.frame.height + Number(value);
    count++;
  });
}

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=space-vertically.js.map