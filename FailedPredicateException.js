"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

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

var RecognitionException_1 = require("./RecognitionException");

var Decorators_1 = require("./Decorators");

var PredicateTransition_1 = require("./atn/PredicateTransition");
/** A semantic predicate failed during validation.  Validation of predicates
 *  occurs when normally parsing the alternative just like matching a token.
 *  Disambiguating predicate evaluation occurs when we test a predicate during
 *  prediction.
 */


var FailedPredicateException =
/*#__PURE__*/
function (_RecognitionException) {
  (0, _inherits2["default"])(FailedPredicateException, _RecognitionException);

  function FailedPredicateException(recognizer, predicate, message) {
    var _this;

    (0, _classCallCheck2["default"])(this, FailedPredicateException);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FailedPredicateException).call(this, recognizer, recognizer.inputStream, recognizer.context, FailedPredicateException.formatMessage(predicate, message)));
    var s = recognizer.interpreter.atn.states[recognizer.state];
    var trans = s.transition(0);

    if (trans instanceof PredicateTransition_1.PredicateTransition) {
      _this._ruleIndex = trans.ruleIndex;
      _this._predicateIndex = trans.predIndex;
    } else {
      _this._ruleIndex = 0;
      _this._predicateIndex = 0;
    }

    _this._predicate = predicate;
    (0, _get2["default"])((0, _getPrototypeOf2["default"])(FailedPredicateException.prototype), "setOffendingToken", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), recognizer, recognizer.currentToken);
    return _this;
  }

  (0, _createClass2["default"])(FailedPredicateException, [{
    key: "ruleIndex",
    get: function get() {
      return this._ruleIndex;
    }
  }, {
    key: "predicateIndex",
    get: function get() {
      return this._predicateIndex;
    }
  }, {
    key: "predicate",
    get: function get() {
      return this._predicate;
    }
  }], [{
    key: "formatMessage",
    value: function formatMessage(predicate, message) {
      if (message) {
        return message;
      }

      return "failed predicate: {".concat(predicate, "}?");
    }
  }]);
  return FailedPredicateException;
}(RecognitionException_1.RecognitionException);

__decorate([Decorators_1.NotNull], FailedPredicateException, "formatMessage", null);

FailedPredicateException = __decorate([__param(0, Decorators_1.NotNull)], FailedPredicateException);
exports.FailedPredicateException = FailedPredicateException;
//# sourceMappingURL=FailedPredicateException.js.map
