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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:46.3281988-07:00

var CommonToken_1 = require("../../CommonToken");

var Decorators_1 = require("../../Decorators");
/**
 * A {@link Token} object representing a token of a particular type; e.g.,
 * `<ID>`. These tokens are created for {@link TagChunk} chunks where the
 * tag corresponds to a lexer rule or token type.
 */


var TokenTagToken =
/*#__PURE__*/
function (_CommonToken_1$Common) {
  (0, _inherits2["default"])(TokenTagToken, _CommonToken_1$Common);

  /**
   * Constructs a new instance of {@link TokenTagToken} with the specified
   * token name, type, and label.
   *
   * @param tokenName The token name.
   * @param type The token type.
   * @param label The label associated with the token tag, or `undefined` if
   * the token tag is unlabeled.
   */
  function TokenTagToken(tokenName, type, label) {
    var _this;

    (0, _classCallCheck2["default"])(this, TokenTagToken);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TokenTagToken).call(this, type));
    _this._tokenName = tokenName;
    _this._label = label;
    return _this;
  }
  /**
   * Gets the token name.
   * @returns The token name.
   */


  (0, _createClass2["default"])(TokenTagToken, [{
    key: "toString",

    /**
     * {@inheritDoc}
     *
     * The implementation for {@link TokenTagToken} returns a string of the form
     * `tokenName:type`.
     */
    value: function toString() {
      return this._tokenName + ":" + this.type;
    }
  }, {
    key: "tokenName",
    get: function get() {
      return this._tokenName;
    }
    /**
     * Gets the label associated with the rule tag.
     *
     * @returns The name of the label associated with the rule tag, or
     * `undefined` if this is an unlabeled rule tag.
     */

  }, {
    key: "label",
    get: function get() {
      return this._label;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link TokenTagToken} returns the token tag
     * formatted with `<` and `>` delimiters.
     */

  }, {
    key: "text",
    get: function get() {
      if (this._label != null) {
        return "<" + this._label + ":" + this._tokenName + ">";
      }

      return "<" + this._tokenName + ">";
    }
  }]);
  return TokenTagToken;
}(CommonToken_1.CommonToken);

__decorate([Decorators_1.NotNull], TokenTagToken.prototype, "_tokenName", void 0);

__decorate([Decorators_1.NotNull], TokenTagToken.prototype, "tokenName", null);

__decorate([Decorators_1.Override], TokenTagToken.prototype, "text", null);

__decorate([Decorators_1.Override], TokenTagToken.prototype, "toString", null);

TokenTagToken = __decorate([__param(0, Decorators_1.NotNull)], TokenTagToken);
exports.TokenTagToken = TokenTagToken;
//# sourceMappingURL=TokenTagToken.js.map
