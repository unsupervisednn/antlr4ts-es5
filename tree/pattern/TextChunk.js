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
}); // ConvertTo-TS run at 2016-10-04T11:26:46.2521448-07:00

var Chunk_1 = require("./Chunk");

var Decorators_1 = require("../../Decorators");
/**
 * Represents a span of raw text (concrete syntax) between tags in a tree
 * pattern string.
 */


var TextChunk =
/*#__PURE__*/
function (_Chunk_1$Chunk) {
  (0, _inherits2["default"])(TextChunk, _Chunk_1$Chunk);

  /**
   * Constructs a new instance of {@link TextChunk} with the specified text.
   *
   * @param text The text of this chunk.
   * @exception IllegalArgumentException if `text` is not defined.
   */
  function TextChunk(text) {
    var _this;

    (0, _classCallCheck2["default"])(this, TextChunk);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TextChunk).call(this));

    if (text == null) {
      throw new Error("text cannot be null");
    }

    _this._text = text;
    return _this;
  }
  /**
   * Gets the raw text of this chunk.
   *
   * @returns The text of the chunk.
   */


  (0, _createClass2["default"])(TextChunk, [{
    key: "toString",

    /**
     * {@inheritDoc}
     *
     * The implementation for {@link TextChunk} returns the result of
     * `text` in single quotes.
     */
    value: function toString() {
      return "'" + this._text + "'";
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    }
  }]);
  return TextChunk;
}(Chunk_1.Chunk);

__decorate([Decorators_1.NotNull], TextChunk.prototype, "_text", void 0);

__decorate([Decorators_1.NotNull], TextChunk.prototype, "text", null);

__decorate([Decorators_1.Override], TextChunk.prototype, "toString", null);

TextChunk = __decorate([__param(0, Decorators_1.NotNull)], TextChunk);
exports.TextChunk = TextChunk;
//# sourceMappingURL=TextChunk.js.map
