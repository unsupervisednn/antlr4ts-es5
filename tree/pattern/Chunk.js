"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:45.2799060-07:00

/**
 * A chunk is either a token tag, a rule tag, or a span of literal text within a
 * tree pattern.
 *
 * The method {@link ParseTreePatternMatcher#split(String)} returns a list of
 * chunks in preparation for creating a token stream by
 * {@link ParseTreePatternMatcher#tokenize(String)}. From there, we get a parse
 * tree from with {@link ParseTreePatternMatcher#compile(String, int)}. These
 * chunks are converted to {@link RuleTagToken}, {@link TokenTagToken}, or the
 * regular tokens of the text surrounding the tags.
 */

var Chunk = function Chunk() {
  (0, _classCallCheck2["default"])(this, Chunk);
};

exports.Chunk = Chunk;
//# sourceMappingURL=Chunk.js.map
