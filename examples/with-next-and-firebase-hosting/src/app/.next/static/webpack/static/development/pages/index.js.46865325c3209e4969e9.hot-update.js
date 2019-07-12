webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/App.tsx":
/*!****************************!*\
  !*** ./components/App.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ "./components/Header.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase */ "../../node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/firestore */ "../../node_modules/@firebase/firestore/dist/index.cjs.js");
/* harmony import */ var _firebase_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _1amageek_ballcap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @1amageek/ballcap */ "../../node_modules/@1amageek/ballcap/lib/index.js");
/* harmony import */ var _1amageek_ballcap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_1amageek_ballcap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../firebase-config */ "./firebase-config.ts");
var _jsxFileName = "/Users/1amageek/Desktop/ballcap.ts/examples/with-next-and-firebase-hosting/src/app/components/App.tsx";







if (firebase__WEBPACK_IMPORTED_MODULE_2___default.a.apps.length === 0) {
  _1amageek_ballcap__WEBPACK_IMPORTED_MODULE_4__["initialize"](firebase__WEBPACK_IMPORTED_MODULE_2___default.a.initializeApp(_firebase_config__WEBPACK_IMPORTED_MODULE_5__["default"]).firestore());
}

const App = (_ref) => {
  let {
    children
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./components/ItemList.tsx":
/*!*********************************!*\
  !*** ./components/ItemList.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "../../node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "../../node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/item */ "./models/item.ts");

var _jsxFileName = "/Users/1amageek/Desktop/ballcap.ts/examples/with-next-and-firebase-hosting/src/app/components/ItemList.tsx";



class Index extends react__WEBPACK_IMPORTED_MODULE_2___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    var _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const snapshot = yield _models_item__WEBPACK_IMPORTED_MODULE_3__["default"].collectionReference().limit(30).get();
      const items = snapshot.docs.map(value => _models_item__WEBPACK_IMPORTED_MODULE_3__["default"].fromSnapshot(value));

      _this.setState({
        items: items
      });
    })();
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, this.state.items.map(item => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: "/items/[id]",
      as: "/items/".concat(item.id),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, item.name || "")))));
  }

}

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/App */ "./components/App.tsx");
/* harmony import */ var _components_ItemList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ItemList */ "./components/ItemList.tsx");
var _jsxFileName = "/Users/1amageek/Desktop/ballcap.ts/examples/with-next-and-firebase-hosting/src/app/pages/index.tsx";



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
}, "Index Page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ItemList__WEBPACK_IMPORTED_MODULE_2__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
})));

/***/ })

})
//# sourceMappingURL=index.js.46865325c3209e4969e9.hot-update.js.map