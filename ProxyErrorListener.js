"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2["default"])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Decorators_1 = require("./Decorators");
/**
 * This implementation of {@link ANTLRErrorListener} dispatches all calls to a
 * collection of delegate listeners. This reduces the effort required to support multiple
 * listeners.
 *
 * @author Sam Harwell
 */


var ProxyErrorListener =
/*#__PURE__*/
function () {
  function ProxyErrorListener(delegates) {
    (0, _classCallCheck2["default"])(this, ProxyErrorListener);
    this.delegates = delegates;

    if (!delegates) {
      throw new Error("Invalid delegates");
    }
  }

  (0, _createClass2["default"])(ProxyErrorListener, [{
    key: "getDelegates",
    value: function getDelegates() {
      return this.delegates;
    }
  }, {
    key: "syntaxError",
    value: function syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
      this.delegates.forEach(function (listener) {
        if (listener.syntaxError) {
          listener.syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e);
        }
      });
    }
  }]);
  return ProxyErrorListener;
}();

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull), __param(4, Decorators_1.NotNull)], ProxyErrorListener.prototype, "syntaxError", null);

exports.ProxyErrorListener = ProxyErrorListener;
//# sourceMappingURL=ProxyErrorListener.js.map
