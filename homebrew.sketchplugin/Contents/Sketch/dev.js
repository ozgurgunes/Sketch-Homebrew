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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dev.js":
/*!********************!*\
  !*** ./src/dev.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_2__);



var PLUGIN = context.plugin.name();
var COMMAND = context.command.name(); // console.log("")
// console.log("########################################")
// console.log("#####  SKETCH  #####")
// console.log("########################################")
// console.log("%o", sketch)
// var alert = NSAlert.alloc().init()
// var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
// accessory.addItemsWithObjectValues(["Item"])
// accessory.setEditable(true)
// accessory.setCompletes(true)
// var accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
// accessory.addItemsWithTitles(["Item"])
// accessory.selectItemAtIndex(0)
// var buttons = ['Save', 'Cancel']
// buttons.map(data => alert.addButtonWithTitle(data))
// alert.setAccessoryView(accessory)
// alert.window().setInitialFirstResponder(accessory)
// alert.runModal()

var doc = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var libraries = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries();
var selection = doc.selectedLayers;
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var c = [];

  for (var o in context) {
    console.log('%o', o);
  }

  console.log('%o', context.plugin);
});

function systemLog(context) {
  if (symbol) {
    libImportableSymbols(symbol.master.getLibrary());
    console.log('%s', '');
    symbolOverrides(symbol);
    console.log('%s', '');
  } else {
    // docSymbols(doc)
    // console.log("%s", "")
    docTextStyles(doc);
    console.log('%s', '');
    docLayerStyles(doc);
    console.log('%s', '');
  }
}

function uncheckOverrides(symbol) {
  symbol.overrides.forEach(function (override) {
    console.log('########################################');
    console.log("'NAME': %o", override.affectedLayer.name);
    console.log('%o', override.affectedLayer);
    override.editable = !override.affectedLayer.locked;
  });
}

function symbolOverrides(symbol) {
  console.log('########################################');
  console.log('#####  SYMBOL OVERRIDES  #####');
  console.log('########################################');
  console.log("'SYMBOL': %o", symbol.name);
  symbol.overrides.forEach(function (override) {
    console.log('########################################');
    console.log("'NAME': %o", override.affectedLayer.name);
    console.log("'PROPERTY': %o", override.property.toUpperCase());
    console.log("'VALUE': %o", override.value);
    console.log('%o', override);
  });
}

function libImportableSymbols(library) {
  console.log('########################################');
  console.log('#####  IMPORTABLE SYMBOLS  #####');
  console.log('########################################');

  if (library) {
    console.log("'LIBRARY': %o", library.name);
    library.getImportableSymbolReferencesForDocument(doc).forEach(function (importable) {
      console.log('########################################');
      console.log("'NAME': %o", importable.name);
      console.log("'TYPE': %o", importable.objectType);
      console.log("'ID': %o", importable.id); // console.log("%o", override)
    });
  }
}

function libImportableTextStyles(library) {
  console.log('########################################');
  console.log('#####  IMPORTABLE TEXT STYLES  #####');
  console.log('########################################');

  if (library) {
    console.log("'LIBRARY': %o", library.name);
    library.getImportableTextStyleReferencesForDocument(doc).forEach(function (importable) {
      console.log('%s', '');
      console.log('########################################');
      console.log("'NAME': %o", importable.name);
      console.log("'TYPE': %o", importable.objectType);
      console.log("'ID': %o", importable.id); // console.log("%o", override)
    });
  }
}

function libImportableLayerStyles(library) {
  console.log('########################################');
  console.log('#####  IMPORTABLE LAYER STYLES  #####');
  console.log('########################################');

  if (library) {
    console.log("'LIBRARY': %o", library.name);
    library.getImportableLayerStyleReferencesForDocument(doc).forEach(function (importable) {
      console.log('%s', '');
      console.log('########################################');
      console.log("'NAME': %o", importable.name);
      console.log("'TYPE': %o", importable.objectType);
      console.log("'ID': %o", importable.id); // console.log("%o", override)
    });
  }
}

function docSymbols(document) {
  console.log('########################################');
  console.log('#####  SYMBOLS  #####');
  console.log('########################################');
  document.getSymbols().forEach(function (symbol) {
    console.log('%s', '');
    console.log('%o', symbol.name.toUpperCase());
    console.log('########################################');
    console.log("'ID': %o", symbol.id);
    console.log("'SYMBOL ID': %o", symbol.symbolId); // console.log("%o", symbol)
  });
}

function docTextStyles(document) {
  console.log('########################################');
  console.log('#####  TEXT STYLES  #####');
  console.log('########################################');
  document.sharedTextStyles.forEach(function (style) {
    console.log('%s', '');
    console.log('%o', style.name.toUpperCase());
    console.log('########################################');
    console.log("'ID': %o", style.id); // console.log("%o", style)
  });
}

function docLayerStyles(document) {
  console.log('########################################');
  console.log('#####  LAYER STYLES  #####');
  console.log('########################################');
  document.sharedLayerStyles.forEach(function (style) {
    console.log('%s', '');
    console.log('%o', style.name.toUpperCase());
    console.log('########################################');
    console.log("'ID': %o", style.id); // console.log("%o", style)
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

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

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

//# sourceMappingURL=dev.js.map