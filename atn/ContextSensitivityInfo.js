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
}); // ConvertTo-TS run at 2016-10-04T11:26:28.1575933-07:00

var DecisionEventInfo_1 = require("./DecisionEventInfo");

var Decorators_1 = require("../Decorators");
/**
 * This class represents profiling event information for a context sensitivity.
 * Context sensitivities are decisions where a particular input resulted in an
 * SLL conflict, but LL prediction produced a single unique alternative.
 *
 * In some cases, the unique alternative identified by LL prediction is not
 * equal to the minimum represented alternative in the conflicting SLL
 * configuration set. Grammars and inputs which result in this scenario are
 * unable to use {@link PredictionMode#SLL}, which in turn means they cannot use
 * the two-stage parsing strategy to improve parsing performance for that
 * input.
 *
 * @see ParserATNSimulator#reportContextSensitivity
 * @see ParserErrorListener#reportContextSensitivity
 *
 * @since 4.3
 */


var ContextSensitivityInfo =
/*#__PURE__*/
function (_DecisionEventInfo_1$) {
  (0, _inherits2["default"])(ContextSensitivityInfo, _DecisionEventInfo_1$);

  /**
   * Constructs a new instance of the {@link ContextSensitivityInfo} class
   * with the specified detailed context sensitivity information.
   *
   * @param decision The decision number
   * @param state The final simulator state containing the unique
   * alternative identified by full-context prediction
   * @param input The input token stream
   * @param startIndex The start index for the current prediction
   * @param stopIndex The index at which the context sensitivity was
   * identified during full-context prediction
   */
  function ContextSensitivityInfo(decision, state, input, startIndex, stopIndex) {
    (0, _classCallCheck2["default"])(this, ContextSensitivityInfo);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ContextSensitivityInfo).call(this, decision, state, input, startIndex, stopIndex, true));
  }

  return ContextSensitivityInfo;
}(DecisionEventInfo_1.DecisionEventInfo);

ContextSensitivityInfo = __decorate([__param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ContextSensitivityInfo);
exports.ContextSensitivityInfo = ContextSensitivityInfo;
//# sourceMappingURL=ContextSensitivityInfo.js.map
