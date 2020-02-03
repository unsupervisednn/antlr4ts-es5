"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Stores information about a {@link DFAState} which is an accept state under
 * some condition. Certain settings, such as
 * {@link ParserATNSimulator#getPredictionMode()}, may be used in addition to
 * this information to determine whether or not a particular state is an accept
 * state.
 *
 * @author Sam Harwell
 */

var AcceptStateInfo =
/*#__PURE__*/
function () {
  function AcceptStateInfo(prediction, lexerActionExecutor) {
    (0, _classCallCheck2["default"])(this, AcceptStateInfo);
    this._prediction = prediction;
    this._lexerActionExecutor = lexerActionExecutor;
  }
  /**
   * Gets the prediction made by this accept state. Note that this value
   * assumes the predicates, if any, in the {@link DFAState} evaluate to
   * `true`. If predicate evaluation is enabled, the final prediction of
   * the accept state will be determined by the result of predicate
   * evaluation.
   */


  (0, _createClass2["default"])(AcceptStateInfo, [{
    key: "prediction",
    get: function get() {
      return this._prediction;
    }
    /**
     * Gets the {@link LexerActionExecutor} which can be used to execute actions
     * and/or commands after the lexer matches a token.
     */

  }, {
    key: "lexerActionExecutor",
    get: function get() {
      return this._lexerActionExecutor;
    }
  }]);
  return AcceptStateInfo;
}();

exports.AcceptStateInfo = AcceptStateInfo;
//# sourceMappingURL=AcceptStateInfo.js.map
