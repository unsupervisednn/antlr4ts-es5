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
}); // ConvertTo-TS run at 2016-10-04T11:26:49.2855056-07:00

var DefaultErrorStrategy_1 = require("./DefaultErrorStrategy");

var InputMismatchException_1 = require("./InputMismatchException");

var Decorators_1 = require("./Decorators");

var ParseCancellationException_1 = require("./misc/ParseCancellationException");
/**
 * This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
 * by immediately canceling the parse operation with a
 * {@link ParseCancellationException}. The implementation ensures that the
 * {@link ParserRuleContext#exception} field is set for all parse tree nodes
 * that were not completed prior to encountering the error.
 *
 * This error strategy is useful in the following scenarios.
 *
 * * **Two-stage parsing:** This error strategy allows the first
 *   stage of two-stage parsing to immediately terminate if an error is
 *   encountered, and immediately fall back to the second stage. In addition to
 *   avoiding wasted work by attempting to recover from errors here, the empty
 *   implementation of {@link BailErrorStrategy#sync} improves the performance of
 *   the first stage.
 * * **Silent validation:** When syntax errors are not being
 *   reported or logged, and the parse result is simply ignored if errors occur,
 *   the {@link BailErrorStrategy} avoids wasting work on recovering from errors
 *   when the result will be ignored either way.
 *
 * ```
 * myparser.errorHandler = new BailErrorStrategy();
 * ```
 *
 * @see Parser.errorHandler
 */


var BailErrorStrategy =
/*#__PURE__*/
function (_DefaultErrorStrategy) {
  (0, _inherits2["default"])(BailErrorStrategy, _DefaultErrorStrategy);

  function BailErrorStrategy() {
    (0, _classCallCheck2["default"])(this, BailErrorStrategy);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BailErrorStrategy).apply(this, arguments));
  }

  (0, _createClass2["default"])(BailErrorStrategy, [{
    key: "recover",

    /** Instead of recovering from exception `e`, re-throw it wrapped
     *  in a {@link ParseCancellationException} so it is not caught by the
     *  rule function catches.  Use {@link Exception#getCause()} to get the
     *  original {@link RecognitionException}.
     */
    value: function recover(recognizer, e) {
      for (var context = recognizer.context; context; context = context.parent) {
        context.exception = e;
      }

      throw new ParseCancellationException_1.ParseCancellationException(e);
    }
    /** Make sure we don't attempt to recover inline; if the parser
     *  successfully recovers, it won't throw an exception.
     */

  }, {
    key: "recoverInline",
    value: function recoverInline(recognizer) {
      var e = new InputMismatchException_1.InputMismatchException(recognizer);

      for (var context = recognizer.context; context; context = context.parent) {
        context.exception = e;
      }

      throw new ParseCancellationException_1.ParseCancellationException(e);
    }
    /** Make sure we don't attempt to recover from problems in subrules. */

  }, {
    key: "sync",
    value: function sync(recognizer) {// intentionally empty
    }
  }]);
  return BailErrorStrategy;
}(DefaultErrorStrategy_1.DefaultErrorStrategy);

__decorate([Decorators_1.Override], BailErrorStrategy.prototype, "recover", null);

__decorate([Decorators_1.Override], BailErrorStrategy.prototype, "recoverInline", null);

__decorate([Decorators_1.Override], BailErrorStrategy.prototype, "sync", null);

exports.BailErrorStrategy = BailErrorStrategy;
//# sourceMappingURL=BailErrorStrategy.js.map
