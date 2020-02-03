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

var Parser_1 = require("./Parser");

var RecognitionException_1 = require("./RecognitionException");

var Decorators_1 = require("./Decorators");
/** Indicates that the parser could not decide which of two or more paths
 *  to take based upon the remaining input. It tracks the starting token
 *  of the offending input and also knows where the parser was
 *  in the various paths when the error. Reported by reportNoViableAlternative()
 */


var NoViableAltException =
/*#__PURE__*/
function (_RecognitionException) {
  (0, _inherits2["default"])(NoViableAltException, _RecognitionException);

  function NoViableAltException(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
    var _this;

    (0, _classCallCheck2["default"])(this, NoViableAltException);

    if (recognizer instanceof Parser_1.Parser) {
      if (input === undefined) {
        input = recognizer.inputStream;
      }

      if (startToken === undefined) {
        startToken = recognizer.currentToken;
      }

      if (offendingToken === undefined) {
        offendingToken = recognizer.currentToken;
      }

      if (ctx === undefined) {
        ctx = recognizer.context;
      }
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NoViableAltException).call(this, recognizer, input, ctx));
    _this._deadEndConfigs = deadEndConfigs;
    _this._startToken = startToken;

    _this.setOffendingToken(recognizer, offendingToken);

    return _this;
  }

  (0, _createClass2["default"])(NoViableAltException, [{
    key: "startToken",
    get: function get() {
      return this._startToken;
    }
  }, {
    key: "deadEndConfigs",
    get: function get() {
      return this._deadEndConfigs;
    }
  }]);
  return NoViableAltException;
}(RecognitionException_1.RecognitionException);

__decorate([Decorators_1.NotNull], NoViableAltException.prototype, "_startToken", void 0);

exports.NoViableAltException = NoViableAltException;
//# sourceMappingURL=NoViableAltException.js.map
