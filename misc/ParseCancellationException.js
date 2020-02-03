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
}); // ConvertTo-TS run at 2016-10-04T11:26:42.5447085-07:00

/**
 * This exception is thrown to cancel a parsing operation. This exception does
 * not extend {@link RecognitionException}, allowing it to bypass the standard
 * error recovery mechanisms. {@link BailErrorStrategy} throws this exception in
 * response to a parse error.
 *
 * @author Sam Harwell
 */

var ParseCancellationException =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ParseCancellationException, _Error);

  function ParseCancellationException(cause) {
    var _this;

    (0, _classCallCheck2["default"])(this, ParseCancellationException);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ParseCancellationException).call(this, cause.message));
    _this.cause = cause;
    _this.stack = cause.stack;
    return _this;
  }

  (0, _createClass2["default"])(ParseCancellationException, [{
    key: "getCause",
    value: function getCause() {
      return this.cause;
    }
  }]);
  return ParseCancellationException;
}((0, _wrapNativeSuper2["default"])(Error));

exports.ParseCancellationException = ParseCancellationException;
//# sourceMappingURL=ParseCancellationException.js.map
