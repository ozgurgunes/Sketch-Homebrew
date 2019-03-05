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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/set-layout.js");
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

/***/ "./src/set-layout.js":
/*!***************************!*\
  !*** ./src/set-layout.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _analytics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analytics.js */ "./src/analytics.js");



var scriptName = "Set Layout";
var app = NSApplication.sharedApplication; //const layout = MSLayoutGrid.alloc().init()

var types = ['Default', 'Sidebar', 'Banner', 'Combo'];
var defaults = {
  'menuWidth': 256,
  'bannerWidth': 304,
  'marginWidth': 24,
  'guttersOutside': false
};
var screens = {
  'large': 1120,
  'desktop': 936,
  'tablet': 700,
  'mobile': 288
};
var columns = {
  'large': 12,
  'desktop': 12,
  'tablet': 12,
  'mobile': 12
};
var gutter = {
  'large': 32,
  'desktop': 24,
  'tablet': 20,
  'mobile': 12 // Handler function for "makeGrid"

};
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = context.document;
  var artboard = doc.currentPage().currentArtboard();
  var layoutType = createSelect("Grid Type", "Please select a grid type.", types);

  if (layoutType) {
    var screenType;

    switch (true) {
      case artboard.frame().width() >= 1280:
        screenType = 'large';
        break;

      case artboard.frame().width() >= 1024 && artboard.frame().width() < 1280:
        screenType = 'desktop';
        break;

      case artboard.frame().width() >= 768 && artboard.frame().width() < 1024:
        screenType = 'tablet';
        break;

      case artboard.frame().width() <= 480:
        screenType = 'mobile';
        break;
    }

    var layout = calculateLayout(artboard, screenType, layoutType);
    artboard.setLayout(layout);
    var message = layoutType + " - " + screens;
    Object(_analytics_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context, scriptName, message);
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.message(scriptName + ": " + message);
  }
});

function calculateLayout(artboard, screenType, layoutType) {
  var layout = MSLayoutGrid.alloc().init();
  var ruler = artboard.horizontalRulerData();
  layout.setGutterWidth(gutter[screenType]);
  layout.setNumberOfColumns(columns[screenType]);
  layout.setGuttersOutside(defaults['guttersOutside']);
  var offset = (artboard.frame().width() - screens[screenType]) / 2;
  var totalWidth = screens[screenType];
  clearGuides(ruler);

  if (layoutType == 'Sidebar' || layoutType == 'Combo') {
    ruler.addGuideWithValue(offset);
    ruler.addGuideWithValue(offset + defaults['menuWidth']);
    offset += defaults['menuWidth'] + defaults['marginWidth'];
    totalWidth -= defaults['menuWidth'] + defaults['marginWidth'];
  }

  if (layoutType == 'Banner' || layoutType == 'Combo') {
    totalWidth -= defaults['bannerWidth'] + defaults['marginWidth'];
    ruler.addGuideWithValue(offset + totalWidth + defaults['marginWidth']);
    ruler.addGuideWithValue(offset + totalWidth + defaults['marginWidth'] + defaults['bannerWidth']);
  }

  var columnWidth = (totalWidth - (columns[screenType] - 1) * gutter[screenType]) / columns[screenType];
  layout.setTotalWidth(totalWidth);
  layout.setHorizontalOffset(offset);
  layout.setColumnWidth(columnWidth);
  return layout;
}

function clearGuides(ruler) {
  if (ruler.numberOfGuides()) {
    ruler.removeGuideAtIndex(0);
    clearGuides(ruler);
  }
}

function createDialog(message, info, accessory, buttons) {
  buttons = buttons || ['OK', 'Cancel'];
  var alert = NSAlert.alloc().init();
  alert.setMessageText(message);
  alert.setInformativeText(info);
  buttons.forEach(function (data) {
    alert.addButtonWithTitle(data);
  });

  if (accessory) {
    alert.setAccessoryView(accessory); //alert.window.setInitialFirstResponder(accessory);
  }

  return alert.runModal();
}

function createSelect(msg, info, items, selectedItemIndex) {
  if (items.length < 1) {
    return app.displayDialog("No type defined");
  }

  selectedItemIndex = selectedItemIndex || 0;
  var accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25));
  accessory.addItemsWithTitles(items);
  accessory.selectItemAtIndex(selectedItemIndex);
  var response = createDialog(msg, info, accessory);
  var result = accessory.titleOfSelectedItem();

  if (response === 1000) {
    return result;
  }
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

//# sourceMappingURL=set-layout.js.map