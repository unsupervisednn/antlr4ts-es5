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
}); // ConvertTo-TS run at 2016-10-04T11:26:28.7213647-07:00

var DecisionEventInfo_1 = require("./DecisionEventInfo");

var Decorators_1 = require("../Decorators");
/**
 * This class represents profiling event information for a syntax error
 * identified during prediction. Syntax errors occur when the prediction
 * algorithm is unable to identify an alternative which would lead to a
 * successful parse.
 *
 * @see Parser#notifyErrorListeners(Token, String, RecognitionException)
 * @see ANTLRErrorListener#syntaxError
 *
 * @since 4.3
 */


var ErrorInfo =
/*#__PURE__*/
function (_DecisionEventInfo_1$) {
  (0, _inherits2["default"])(ErrorInfo, _DecisionEventInfo_1$);

  /**
   * Constructs a new instance of the {@link ErrorInfo} class with the
   * specified detailed syntax error information.
   *
   * @param decision The decision number
   * @param state The final simulator state reached during prediction
   * prior to reaching the {@link ATNSimulator#ERROR} state
   * @param input The input token stream
   * @param startIndex The start index for the current prediction
   * @param stopIndex The index at which the syntax error was identified
   */
  function ErrorInfo(decision, state, input, startIndex, stopIndex) {
    (0, _classCallCheck2["default"])(this, ErrorInfo);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ErrorInfo).call(this, decision, state, input, startIndex, stopIndex, state.useContext));
  }

  return ErrorInfo;
}(DecisionEventInfo_1.DecisionEventInfo);

ErrorInfo = __decorate([__param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ErrorInfo);
exports.ErrorInfo = ErrorInfo;
//# sourceMappingURL=ErrorInfo.js.map
