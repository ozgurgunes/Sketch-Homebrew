var that=this;function __skpm_run(e,t){that.context=t;var r=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./src/space-vertically.js")}({"./src/space-vertically.js":
/*!*********************************!*\
  !*** ./src/space-vertically.js ***!
  \*********************************/
/*! exports provided: default */function(e,t,r){"use strict";r.r(t);var n=r(/*! sketch */"sketch"),a=r.n(n);t.default=function(){var e=a.a.getSelectedDocument().selectedLayers;e.length<=1?a.a.UI.message("Space Vertically: Please select at least 2 layers."):a.a.UI.getInputFromUser("Vertical Spacing (px):",{initialValue:0},function(t,r){t||(Number.isInteger(Number(r))?(!function(e,t){var r=[],n=0,a=0;e.forEach(function(e){r.push(e)}),r.sort(function(e,t){return e.frame.y-t.frame.y}),r.forEach(function(e){n=a>0?n:e.frame.y,e.frame.y=n,n+=e.frame.height+Number(t),a++})}(e,r),a.a.UI.message("Vertical Spacing: "+r+" px")):a.a.UI.message("Please enter numbers only."))})}},sketch:
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("sketch")}});"default"===e&&"function"==typeof r?r(t):r[e](t)}that.onRun=__skpm_run.bind(this,"default");