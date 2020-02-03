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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:59.5829654-07:00

var Decorators_1 = require("./Decorators");

var Token_1 = require("./Token");
/**
 * This class provides a default implementation of the {@link Vocabulary}
 * interface.
 *
 * @author Sam Harwell
 */


var VocabularyImpl =
/*#__PURE__*/
function () {
  /**
   * Constructs a new instance of {@link VocabularyImpl} from the specified
   * literal, symbolic, and display token names.
   *
   * @param literalNames The literal names assigned to tokens, or an empty array
   * if no literal names are assigned.
   * @param symbolicNames The symbolic names assigned to tokens, or
   * an empty array if no symbolic names are assigned.
   * @param displayNames The display names assigned to tokens, or an empty array
   * to use the values in `literalNames` and `symbolicNames` as
   * the source of display names, as described in
   * {@link #getDisplayName(int)}.
   *
   * @see #getLiteralName(int)
   * @see #getSymbolicName(int)
   * @see #getDisplayName(int)
   */
  function VocabularyImpl(literalNames, symbolicNames, displayNames) {
    (0, _classCallCheck2["default"])(this, VocabularyImpl);
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    this.displayNames = displayNames; // See note here on -1 part: https://github.com/antlr/antlr4/pull/1146

    this._maxTokenType = Math.max(this.displayNames.length, Math.max(this.literalNames.length, this.symbolicNames.length)) - 1;
  }

  (0, _createClass2["default"])(VocabularyImpl, [{
    key: "getLiteralName",
    value: function getLiteralName(tokenType) {
      if (tokenType >= 0 && tokenType < this.literalNames.length) {
        return this.literalNames[tokenType];
      }

      return undefined;
    }
  }, {
    key: "getSymbolicName",
    value: function getSymbolicName(tokenType) {
      if (tokenType >= 0 && tokenType < this.symbolicNames.length) {
        return this.symbolicNames[tokenType];
      }

      if (tokenType === Token_1.Token.EOF) {
        return "EOF";
      }

      return undefined;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName(tokenType) {
      if (tokenType >= 0 && tokenType < this.displayNames.length) {
        var displayName = this.displayNames[tokenType];

        if (displayName) {
          return displayName;
        }
      }

      var literalName = this.getLiteralName(tokenType);

      if (literalName) {
        return literalName;
      }

      var symbolicName = this.getSymbolicName(tokenType);

      if (symbolicName) {
        return symbolicName;
      }

      return String(tokenType);
    }
  }, {
    key: "maxTokenType",
    get: function get() {
      return this._maxTokenType;
    }
  }]);
  return VocabularyImpl;
}();
/**
 * Gets an empty {@link Vocabulary} instance.
 *
 * No literal or symbol names are assigned to token types, so
 * {@link #getDisplayName(int)} returns the numeric value for all tokens
 * except {@link Token#EOF}.
 */


VocabularyImpl.EMPTY_VOCABULARY = new VocabularyImpl([], [], []);

__decorate([Decorators_1.NotNull], VocabularyImpl.prototype, "literalNames", void 0);

__decorate([Decorators_1.NotNull], VocabularyImpl.prototype, "symbolicNames", void 0);

__decorate([Decorators_1.NotNull], VocabularyImpl.prototype, "displayNames", void 0);

__decorate([Decorators_1.Override], VocabularyImpl.prototype, "maxTokenType", null);

__decorate([Decorators_1.Override], VocabularyImpl.prototype, "getLiteralName", null);

__decorate([Decorators_1.Override], VocabularyImpl.prototype, "getSymbolicName", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], VocabularyImpl.prototype, "getDisplayName", null);

__decorate([Decorators_1.NotNull], VocabularyImpl, "EMPTY_VOCABULARY", void 0);

exports.VocabularyImpl = VocabularyImpl;
//# sourceMappingURL=VocabularyImpl.js.map
