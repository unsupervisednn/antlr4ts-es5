"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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

var Decorators_1 = require("../../Decorators");

var Token_1 = require("../../Token");
/**
 * A {@link Token} object representing an entire subtree matched by a parser
 * rule; e.g., `<expr>`. These tokens are created for {@link TagChunk}
 * chunks where the tag corresponds to a parser rule.
 */


var RuleTagToken =
/*#__PURE__*/
function () {
  /**
   * Constructs a new instance of {@link RuleTagToken} with the specified rule
   * name, bypass token type, and label.
   *
   * @param ruleName The name of the parser rule this rule tag matches.
   * @param bypassTokenType The bypass token type assigned to the parser rule.
   * @param label The label associated with the rule tag, or `undefined` if
   * the rule tag is unlabeled.
   *
   * @exception IllegalArgumentException if `ruleName` is not defined
   * or empty.
   */
  function RuleTagToken(ruleName, bypassTokenType, label) {
    (0, _classCallCheck2["default"])(this, RuleTagToken);

    if (ruleName == null || ruleName.length === 0) {
      throw new Error("ruleName cannot be null or empty.");
    }

    this._ruleName = ruleName;
    this.bypassTokenType = bypassTokenType;
    this._label = label;
  }
  /**
   * Gets the name of the rule associated with this rule tag.
   *
   * @returns The name of the parser rule associated with this rule tag.
   */


  (0, _createClass2["default"])(RuleTagToken, [{
    key: "toString",

    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} returns a string of the form
     * `ruleName:bypassTokenType`.
     */
    value: function toString() {
      return this._ruleName + ":" + this.bypassTokenType;
    }
  }, {
    key: "ruleName",
    get: function get() {
      return this._ruleName;
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
     * Rule tag tokens are always placed on the {@link #DEFAULT_CHANNEL}.
     */

  }, {
    key: "channel",
    get: function get() {
      return Token_1.Token.DEFAULT_CHANNEL;
    }
    /**
     * {@inheritDoc}
     *
     * This method returns the rule tag formatted with `<` and `>`
     * delimiters.
     */

  }, {
    key: "text",
    get: function get() {
      if (this._label != null) {
        return "<" + this._label + ":" + this._ruleName + ">";
      }

      return "<" + this._ruleName + ">";
    }
    /**
     * {@inheritDoc}
     *
     * Rule tag tokens have types assigned according to the rule bypass
     * transitions created during ATN deserialization.
     */

  }, {
    key: "type",
    get: function get() {
      return this.bypassTokenType;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns 0.
     */

  }, {
    key: "line",
    get: function get() {
      return 0;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns -1.
     */

  }, {
    key: "charPositionInLine",
    get: function get() {
      return -1;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns -1.
     */

  }, {
    key: "tokenIndex",
    get: function get() {
      return -1;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns -1.
     */

  }, {
    key: "startIndex",
    get: function get() {
      return -1;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns -1.
     */

  }, {
    key: "stopIndex",
    get: function get() {
      return -1;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns `undefined`.
     */

  }, {
    key: "tokenSource",
    get: function get() {
      return undefined;
    }
    /**
     * {@inheritDoc}
     *
     * The implementation for {@link RuleTagToken} always returns `undefined`.
     */

  }, {
    key: "inputStream",
    get: function get() {
      return undefined;
    }
  }]);
  return RuleTagToken;
}();

__decorate([Decorators_1.NotNull], RuleTagToken.prototype, "ruleName", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "channel", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "text", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "type", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "line", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "charPositionInLine", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "tokenIndex", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "startIndex", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "stopIndex", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "tokenSource", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "inputStream", null);

__decorate([Decorators_1.Override], RuleTagToken.prototype, "toString", null);

RuleTagToken = __decorate([__param(0, Decorators_1.NotNull)], RuleTagToken);
exports.RuleTagToken = RuleTagToken;
//# sourceMappingURL=RuleTagToken.js.map
