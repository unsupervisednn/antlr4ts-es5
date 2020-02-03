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
 *
 * @author Sam Harwell
 */

var ConsoleErrorListener =
/*#__PURE__*/
function () {
  function ConsoleErrorListener() {
    (0, _classCallCheck2["default"])(this, ConsoleErrorListener);
  }

  (0, _createClass2["default"])(ConsoleErrorListener, [{
    key: "syntaxError",

    /**
     * {@inheritDoc}
     *
     * This implementation prints messages to {@link System#err} containing the
     * values of `line`, `charPositionInLine`, and `msg` using
     * the following format.
     *
     * <pre>
     * line *line*:*charPositionInLine* *msg*
     * </pre>
     */
    value: function syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
      console.error("line ".concat(line, ":").concat(charPositionInLine, " ").concat(msg));
    }
  }]);
  return ConsoleErrorListener;
}();
/**
 * Provides a default instance of {@link ConsoleErrorListener}.
 */


ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();
exports.ConsoleErrorListener = ConsoleErrorListener;
//# sourceMappingURL=ConsoleErrorListener.js.map
