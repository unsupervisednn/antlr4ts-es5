"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ProxyErrorListener_1 = require("./ProxyErrorListener");

var Decorators_1 = require("./Decorators");
/**
 * @author Sam Harwell
 */


var ProxyParserErrorListener =
/*#__PURE__*/
function (_ProxyErrorListener_) {
  (0, _inherits2["default"])(ProxyParserErrorListener, _ProxyErrorListener_);

  function ProxyParserErrorListener(delegates) {
    (0, _classCallCheck2["default"])(this, ProxyParserErrorListener);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ProxyParserErrorListener).call(this, delegates));
  }

  (0, _createClass2["default"])(ProxyParserErrorListener, [{
    key: "reportAmbiguity",
    value: function reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
      this.getDelegates().forEach(function (listener) {
        if (listener.reportAmbiguity) {
          listener.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
        }
      });
    }
  }, {
    key: "reportAttemptingFullContext",
    value: function reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, conflictState) {
      this.getDelegates().forEach(function (listener) {
        if (listener.reportAttemptingFullContext) {
          listener.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, conflictState);
        }
      });
    }
  }, {
    key: "reportContextSensitivity",
    value: function reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, acceptState) {
      this.getDelegates().forEach(function (listener) {
        if (listener.reportContextSensitivity) {
          listener.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, acceptState);
        }
      });
    }
  }]);
  return ProxyParserErrorListener;
}(ProxyErrorListener_1.ProxyErrorListener);

__decorate([Decorators_1.Override], ProxyParserErrorListener.prototype, "reportAmbiguity", null);

__decorate([Decorators_1.Override], ProxyParserErrorListener.prototype, "reportAttemptingFullContext", null);

__decorate([Decorators_1.Override], ProxyParserErrorListener.prototype, "reportContextSensitivity", null);

exports.ProxyParserErrorListener = ProxyParserErrorListener;
//# sourceMappingURL=ProxyParserErrorListener.js.map
