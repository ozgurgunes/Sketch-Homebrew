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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/reset-image-aspect-ratio.js");
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

/* harmony default export */ __webpack_exports__["default"] = (function (label, value) {
  var ID = 'UA-5738625-2';
  var payload = {};
  payload.ec = context.plugin.name();
  payload.ea = context.command.name();

  if (label) {
    payload.el = label;
  }

  if (value) {
    payload.ev = value;
  }

  return sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0___default()(context, ID, 'event', payload);
});

/***/ }),

/***/ "./src/reset-image-aspect-ratio.js":
/*!*****************************************!*\
  !*** ./src/reset-image-aspect-ratio.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _analytics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics.js */ "./src/analytics.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");



/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  try {
    var doc = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
    var selection = doc.selectedLayers;
    var images = selection.layers.filter(function (layer) {
      return layer.type == sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.Types.Image;
    });

    if (images.length === 0) {
      Object(_analytics_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Selection Error');
      throw _ui_js__WEBPACK_IMPORTED_MODULE_2__["error"]('Please select images!');
    }

    images.map(function (layer) {
      layer.sketchObject.setConstrainProportions(0);
      var originalSize = layer.image.nsimage.size();
      var currentAspectRatio = layer.frame.width / layer.frame.height;
      var originalAspectRatio = originalSize.width / originalSize.height;

      if (currentAspectRatio > originalAspectRatio) {
        layer.frame = layer.frame.scale(1, currentAspectRatio / originalAspectRatio);
      } else {
        layer.frame = layer.frame.scale(originalAspectRatio / currentAspectRatio, 1);
      }

      layer.sketchObject.setConstrainProportions(1);
    });
    Object(_analytics_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Done', images.length);
    _ui_js__WEBPACK_IMPORTED_MODULE_2__["success"](images.length + ' images reset to aspect ratio.');
  } catch (e) {
    console.log(e);
    return e;
  }
});

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! exports provided: message, error, success, dialog, comboBox, popUpButton, scrollView, optionList, errorList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "message", function() { return message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "success", function() { return success; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dialog", function() { return dialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comboBox", function() { return comboBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popUpButton", function() { return popUpButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollView", function() { return scrollView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionList", function() { return optionList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorList", function() { return errorList; });
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_0__);

var message = function message(msg, status) {
  var emoji = '';

  switch (status) {
    case 'error':
      emoji = '⚠️   ';
      break;

    case 'success':
      emoji = '✅   ';
      break;
  }

  sketch_ui__WEBPACK_IMPORTED_MODULE_0___default.a.message(emoji + context.command.name() + ': ' + msg);
};
var error = function error(msg) {
  return message(msg, 'error');
};
var success = function success(msg) {
  return message(msg, 'success');
};
var dialog = function dialog(info, accessory, buttons, message) {
  buttons = buttons || ['OK'];
  message = message || context.command.name();
  var alert = NSAlert.alloc().init();
  alert.setMessageText(message);
  alert.setInformativeText(info);
  buttons.map(function (button) {
    return alert.addButtonWithTitle(button);
  });

  if (context.plugin.alertIcon()) {
    alert.icon = context.plugin.alertIcon();
  }

  if (accessory) {
    alert.setAccessoryView(accessory);

    if (!accessory.isMemberOfClass(NSTextView)) {
      alert.window().setInitialFirstResponder(accessory);
    }
  }

  return alert.runModal();
};
var comboBox = function comboBox(items) {
  var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25));
  accessory.addItemsWithObjectValues(items);
  accessory.setEditable(true);
  accessory.setCompletes(true);
  return accessory;
};
var popUpButton = function popUpButton(items) {
  var accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25));
  accessory.addItemsWithTitles(items);
  return accessory;
};
var scrollView = function scrollView(view) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120));
  var scrollView = NSScrollView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120));
  scrollView.setHasVerticalScroller(true);
  scrollView.setHasHorizontalScroller(false);
  scrollView.setDocumentView(view);
  accessory.addSubview(scrollView);
  return accessory;
};
var optionList = function optionList(items) {
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, items.length * 24 + 10));
  var options = [];
  items.map(function (item, i) {
    options[i] = NSButton.alloc().initWithFrame(NSMakeRect(5, 5 + i * 24, 290, 20));
    options[i].setButtonType(NSSwitchButton);
    options[i].setTitle(item);
    options[i].setState(false);
    listView.addSubview(options[i]);
    listView.setFlipped(true);
  });
  return {
    options: options,
    view: listView,
    getSelection: function getSelection() {
      var selection = [];
      options.map(function (option, i) {
        if (option.state()) {
          selection.push(i);
        }
      });
      return selection;
    }
  };
};
var errorList = function errorList(items) {
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, items.length * 24 + 10));
  var font = NSFont.systemFontOfSize(NSFont.smallSystemFontSize());
  var errors = [];
  items.map(function (item, i) {
    errors[i] = NSTextView.alloc().initWithFrame(NSMakeRect(5, 10 + i * 24, 290, 20));
    errors[i].insertText(item);
    errors[i].setFont(font);
    errors[i].setEditable(false);
    listView.addSubview(errors[i]);
  });
  listView.setFlipped(true);
  return listView;
};

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

//# sourceMappingURL=reset-image-aspect-ratio.js.map