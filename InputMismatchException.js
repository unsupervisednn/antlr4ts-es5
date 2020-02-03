"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:51.5187682-07:00

var RecognitionException_1 = require("./RecognitionException");

var Decorators_1 = require("./Decorators");
/** This signifies any kind of mismatched input exceptions such as
 *  when the current input does not match the expected token.
 */


var InputMismatchException =
/*#__PURE__*/
function (_RecognitionException) {
  (0, _inherits2["default"])(InputMismatchException, _RecognitionException);

  function InputMismatchException(recognizer, state, context) {
    var _this;

    (0, _classCallCheck2["default"])(this, InputMismatchException);

    if (context === undefined) {
      context = recognizer.context;
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InputMismatchException).call(this, recognizer, recognizer.inputStream, context));

    if (state !== undefined) {
      _this.setOffendingState(state);
    }

    _this.setOffendingToken(recognizer, recognizer.currentToken);

    return _this;
  }

  return InputMismatchException;
}(RecognitionException_1.RecognitionException);

InputMismatchException = __decorate([__param(0, Decorators_1.NotNull)], InputMismatchException);
exports.InputMismatchException = InputMismatchException;
//# sourceMappingURL=InputMismatchException.js.map
