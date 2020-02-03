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

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
 *  3 kinds of errors: prediction errors, failed predicate errors, and
 *  mismatched input errors. In each case, the parser knows where it is
 *  in the input, where it is in the ATN, the rule invocation stack,
 *  and what kind of problem occurred.
 */

var RecognitionException =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(RecognitionException, _Error);

  function RecognitionException(recognizer, input, ctx, message) {
    var _this;

    (0, _classCallCheck2["default"])(this, RecognitionException);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RecognitionException).call(this, message));
    _this._offendingState = -1;
    _this._recognizer = recognizer;
    _this.input = input;
    _this.ctx = ctx;

    if (recognizer) {
      _this._offendingState = recognizer.state;
    }

    return _this;
  }
  /**
   * Get the ATN state number the parser was in at the time the error
   * occurred. For {@link NoViableAltException} and
   * {@link LexerNoViableAltException} exceptions, this is the
   * {@link DecisionState} number. For others, it is the state whose outgoing
   * edge we couldn't match.
   *
   * If the state number is not known, this method returns -1.
   */


  (0, _createClass2["default"])(RecognitionException, [{
    key: "setOffendingState",
    value: function setOffendingState(offendingState) {
      this._offendingState = offendingState;
    }
    /**
     * Gets the set of input symbols which could potentially follow the
     * previously matched symbol at the time this exception was thrown.
     *
     * If the set of expected tokens is not known and could not be computed,
     * this method returns `undefined`.
     *
     * @returns The set of token types that could potentially follow the current
     * state in the ATN, or `undefined` if the information is not available.
     */

  }, {
    key: "getOffendingToken",
    value: function getOffendingToken(recognizer) {
      if (recognizer && recognizer !== this._recognizer) {
        return undefined;
      }

      return this.offendingToken;
    }
  }, {
    key: "setOffendingToken",
    value: function setOffendingToken(recognizer, offendingToken) {
      if (recognizer === this._recognizer) {
        this.offendingToken = offendingToken;
      }
    }
    /**
     * Gets the {@link Recognizer} where this exception occurred.
     *
     * If the recognizer is not available, this method returns `undefined`.
     *
     * @returns The recognizer where this exception occurred, or `undefined` if
     * the recognizer is not available.
     */

  }, {
    key: "offendingState",
    get: function get() {
      return this._offendingState;
    }
  }, {
    key: "expectedTokens",
    get: function get() {
      if (this._recognizer) {
        return this._recognizer.atn.getExpectedTokens(this._offendingState, this.ctx);
      }

      return undefined;
    }
    /**
     * Gets the {@link RuleContext} at the time this exception was thrown.
     *
     * If the context is not available, this method returns `undefined`.
     *
     * @returns The {@link RuleContext} at the time this exception was thrown.
     * If the context is not available, this method returns `undefined`.
     */

  }, {
    key: "context",
    get: function get() {
      return this.ctx;
    }
    /**
     * Gets the input stream which is the symbol source for the recognizer where
     * this exception was thrown.
     *
     * If the input stream is not available, this method returns `undefined`.
     *
     * @returns The input stream which is the symbol source for the recognizer
     * where this exception was thrown, or `undefined` if the stream is not
     * available.
     */

  }, {
    key: "inputStream",
    get: function get() {
      return this.input;
    }
  }, {
    key: "recognizer",
    get: function get() {
      return this._recognizer;
    }
  }]);
  return RecognitionException;
}((0, _wrapNativeSuper2["default"])(Error));

exports.RecognitionException = RecognitionException;
//# sourceMappingURL=RecognitionException.js.map
