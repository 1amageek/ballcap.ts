webpackHotUpdate("static/development/pages/items/[id].js",{

/***/ "./components/Item.tsx":
/*!*****************************!*\
  !*** ./components/Item.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "../../node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "../../node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/item */ "./models/item.ts");

var _jsxFileName = "/Users/1amageek/Desktop/ballcap.ts/examples/with-next-and-firebase-hosting/src/app/components/Item.tsx";




const Index = () => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const id = router.query.id;
  const [item, setItem] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(new _models_item__WEBPACK_IMPORTED_MODULE_3__["default"](id)); // useEffect(() => {
  // 	const item = await (new Item(id)).fetch()
  // })
  // (async () => {
  // 	const item = await (new Item(id)).fetch()
  // 	console.log(item)
  // })()

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, item.name || "aa");
};

Index.getInitialProps =
/*#__PURE__*/
Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const id = router.query.id;
});
/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./pages/items/[id].tsx":
/*!******************************!*\
  !*** ./pages/items/[id].tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/App */ "./components/App.tsx");
/* harmony import */ var _components_Item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Item */ "./components/Item.tsx");
var _jsxFileName = "/Users/1amageek/Desktop/ballcap.ts/examples/with-next-and-firebase-hosting/src/app/pages/items/[id].tsx";



/* harmony default export */ __webpack_exports__["default"] = (() => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 3
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 4
  },
  __self: undefined
}, "Item Page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Item__WEBPACK_IMPORTED_MODULE_2__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
})));

/***/ })

})
//# sourceMappingURL=[id].js.714202fbd063bd0a838c.hot-update.js.map