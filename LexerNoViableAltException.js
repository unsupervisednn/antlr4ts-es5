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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

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

var Interval_1 = require("./misc/Interval");

var Utils = require("./misc/Utils");

var LexerNoViableAltException =
/*#__PURE__*/
function (_RecognitionException) {
  (0, _inherits2["default"])(LexerNoViableAltException, _RecognitionException);

  function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
    var _this;

    (0, _classCallCheck2["default"])(this, LexerNoViableAltException);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LexerNoViableAltException).call(this, lexer, input));
    _this._startIndex = startIndex;
    _this._deadEndConfigs = deadEndConfigs;
    return _this;
  }

  (0, _createClass2["default"])(LexerNoViableAltException, [{
    key: "toString",
    value: function toString() {
      var symbol = "";

      if (this._startIndex >= 0 && this._startIndex < this.inputStream.size) {
        symbol = this.inputStream.getText(Interval_1.Interval.of(this._startIndex, this._startIndex));
        symbol = Utils.escapeWhitespace(symbol, false);
      } // return String.format(Locale.getDefault(), "%s('%s')", LexerNoViableAltException.class.getSimpleName(), symbol);


      return "LexerNoViableAltException('".concat(symbol, "')");
    }
  }, {
    key: "startIndex",
    get: function get() {
      return this._startIndex;
    }
  }, {
    key: "deadEndConfigs",
    get: function get() {
      return this._deadEndConfigs;
    }
  }, {
    key: "inputStream",
    get: function get() {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(LexerNoViableAltException.prototype), "inputStream", this);
    }
  }]);
  return LexerNoViableAltException;
}(RecognitionException_1.RecognitionException);

__decorate([Decorators_1.Override], LexerNoViableAltException.prototype, "inputStream", null);

__decorate([Decorators_1.Override], LexerNoViableAltException.prototype, "toString", null);

LexerNoViableAltException = __decorate([__param(1, Decorators_1.NotNull)], LexerNoViableAltException);
exports.LexerNoViableAltException = LexerNoViableAltException;
//# sourceMappingURL=LexerNoViableAltException.js.map
