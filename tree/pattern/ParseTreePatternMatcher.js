"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

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
}); // CONVERSTION complete, Burt Harris 10/14/2016

var BailErrorStrategy_1 = require("../../BailErrorStrategy");

var CharStreams_1 = require("../../CharStreams");

var CommonTokenStream_1 = require("../../CommonTokenStream");

var ListTokenSource_1 = require("../../ListTokenSource");

var MultiMap_1 = require("../../misc/MultiMap");

var Decorators_1 = require("../../Decorators");

var ParseCancellationException_1 = require("../../misc/ParseCancellationException");

var ParserInterpreter_1 = require("../../ParserInterpreter");

var ParserRuleContext_1 = require("../../ParserRuleContext");

var ParseTreeMatch_1 = require("./ParseTreeMatch");

var ParseTreePattern_1 = require("./ParseTreePattern");

var RecognitionException_1 = require("../../RecognitionException");

var RuleNode_1 = require("../RuleNode");

var RuleTagToken_1 = require("./RuleTagToken");

var TagChunk_1 = require("./TagChunk");

var TerminalNode_1 = require("../TerminalNode");

var TextChunk_1 = require("./TextChunk");

var Token_1 = require("../../Token");

var TokenTagToken_1 = require("./TokenTagToken");
/**
 * A tree pattern matching mechanism for ANTLR {@link ParseTree}s.
 *
 * Patterns are strings of source input text with special tags representing
 * token or rule references such as:
 *
 * ```
 * <ID> = <expr>;
 * ```
 *
 * Given a pattern start rule such as `statement`, this object constructs
 * a {@link ParseTree} with placeholders for the `ID` and `expr`
 * subtree. Then the {@link #match} routines can compare an actual
 * {@link ParseTree} from a parse with this pattern. Tag `<ID>` matches
 * any `ID` token and tag `<expr>` references the result of the
 * `expr` rule (generally an instance of `ExprContext`.
 *
 * Pattern `x = 0;` is a similar pattern that matches the same pattern
 * except that it requires the identifier to be `x` and the expression to
 * be `0`.
 *
 * The {@link #matches} routines return `true` or `false` based
 * upon a match for the tree rooted at the parameter sent in. The
 * {@link #match} routines return a {@link ParseTreeMatch} object that
 * contains the parse tree, the parse tree pattern, and a map from tag name to
 * matched nodes (more below). A subtree that fails to match, returns with
 * {@link ParseTreeMatch#mismatchedNode} set to the first tree node that did not
 * match.
 *
 * For efficiency, you can compile a tree pattern in string form to a
 * {@link ParseTreePattern} object.
 *
 * See `TestParseTreeMatcher` for lots of examples.
 * {@link ParseTreePattern} has two static helper methods:
 * {@link ParseTreePattern#findAll} and {@link ParseTreePattern#match} that
 * are easy to use but not super efficient because they create new
 * {@link ParseTreePatternMatcher} objects each time and have to compile the
 * pattern in string form before using it.
 *
 * The lexer and parser that you pass into the {@link ParseTreePatternMatcher}
 * constructor are used to parse the pattern in string form. The lexer converts
 * the `<ID> = <expr>;` into a sequence of four tokens (assuming lexer
 * throws out whitespace or puts it on a hidden channel). Be aware that the
 * input stream is reset for the lexer (but not the parser; a
 * {@link ParserInterpreter} is created to parse the input.). Any user-defined
 * fields you have put into the lexer might get changed when this mechanism asks
 * it to scan the pattern string.
 *
 * Normally a parser does not accept token `<expr>` as a valid
 * `expr` but, from the parser passed in, we create a special version of
 * the underlying grammar representation (an {@link ATN}) that allows imaginary
 * tokens representing rules (`<expr>`) to match entire rules. We call
 * these *bypass alternatives*.
 *
 * Delimiters are `<`} and `>`}, with `\` as the escape string
 * by default, but you can set them to whatever you want using
 * {@link #setDelimiters}. You must escape both start and stop strings
 * `\<` and `\>`.
 */


var ParseTreePatternMatcher =
/*#__PURE__*/
function () {
  /**
   * Constructs a {@link ParseTreePatternMatcher} or from a {@link Lexer} and
   * {@link Parser} object. The lexer input stream is altered for tokenizing
   * the tree patterns. The parser is used as a convenient mechanism to get
   * the grammar name, plus token, rule names.
   */
  function ParseTreePatternMatcher(lexer, parser) {
    (0, _classCallCheck2["default"])(this, ParseTreePatternMatcher);
    this.start = "<";
    this.stop = ">";
    this.escape = "\\"; // e.g., \< and \> must escape BOTH!

    /**
     * Regular expression corresponding to escape, for global replace
     */

    this.escapeRE = /\\/g;
    this._lexer = lexer;
    this._parser = parser;
  }
  /**
   * Set the delimiters used for marking rule and token tags within concrete
   * syntax used by the tree pattern parser.
   *
   * @param start The start delimiter.
   * @param stop The stop delimiter.
   * @param escapeLeft The escape sequence to use for escaping a start or stop delimiter.
   *
   * @throws {@link Error} if `start` is not defined or empty.
   * @throws {@link Error} if `stop` is not defined or empty.
   */


  (0, _createClass2["default"])(ParseTreePatternMatcher, [{
    key: "setDelimiters",
    value: function setDelimiters(start, stop, escapeLeft) {
      if (!start) {
        throw new Error("start cannot be null or empty");
      }

      if (!stop) {
        throw new Error("stop cannot be null or empty");
      }

      this.start = start;
      this.stop = stop;
      this.escape = escapeLeft;
      this.escapeRE = new RegExp(escapeLeft.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    }
  }, {
    key: "matches",
    value: function matches(tree, pattern) {
      var patternRuleIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (typeof pattern === "string") {
        var p = this.compile(pattern, patternRuleIndex);
        return this.matches(tree, p);
      } else {
        var labels = new MultiMap_1.MultiMap();
        var mismatchedNode = this.matchImpl(tree, pattern.patternTree, labels);
        return !mismatchedNode;
      }
    } // Implementation of match

  }, {
    key: "match",
    value: function match(tree, pattern) {
      var patternRuleIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (typeof pattern === "string") {
        var p = this.compile(pattern, patternRuleIndex);
        return this.match(tree, p);
      } else {
        var labels = new MultiMap_1.MultiMap();
        var mismatchedNode = this.matchImpl(tree, pattern.patternTree, labels);
        return new ParseTreeMatch_1.ParseTreeMatch(tree, pattern, labels, mismatchedNode);
      }
    }
    /**
     * For repeated use of a tree pattern, compile it to a
     * {@link ParseTreePattern} using this method.
     */

  }, {
    key: "compile",
    value: function compile(pattern, patternRuleIndex) {
      var tokenList = this.tokenize(pattern);
      var tokenSrc = new ListTokenSource_1.ListTokenSource(tokenList);
      var tokens = new CommonTokenStream_1.CommonTokenStream(tokenSrc);
      var parser = this._parser;
      var parserInterp = new ParserInterpreter_1.ParserInterpreter(parser.grammarFileName, parser.vocabulary, parser.ruleNames, parser.getATNWithBypassAlts(), tokens);
      var tree;

      try {
        parserInterp.errorHandler = new BailErrorStrategy_1.BailErrorStrategy();
        tree = parserInterp.parse(patternRuleIndex); //			System.out.println("pattern tree = "+tree.toStringTree(parserInterp));
      } catch (e) {
        if (e instanceof ParseCancellationException_1.ParseCancellationException) {
          throw e.getCause();
        } else if (e instanceof RecognitionException_1.RecognitionException) {
          throw e;
        } else if (e instanceof Error) {
          throw new ParseTreePatternMatcher.CannotInvokeStartRule(e);
        } else {
          throw e;
        }
      } // Make sure tree pattern compilation checks for a complete parse


      if (tokens.LA(1) !== Token_1.Token.EOF) {
        throw new ParseTreePatternMatcher.StartRuleDoesNotConsumeFullPattern();
      }

      return new ParseTreePattern_1.ParseTreePattern(this, pattern, patternRuleIndex, tree);
    }
    /**
     * Used to convert the tree pattern string into a series of tokens. The
     * input stream is reset.
     */

  }, {
    key: "matchImpl",
    // ---- SUPPORT CODE ----

    /**
     * Recursively walk `tree` against `patternTree`, filling
     * `match.`{@link ParseTreeMatch#labels labels}.
     *
     * @returns the first node encountered in `tree` which does not match
     * a corresponding node in `patternTree`, or `undefined` if the match
     * was successful. The specific node returned depends on the matching
     * algorithm used by the implementation, and may be overridden.
     */
    value: function matchImpl(tree, patternTree, labels) {
      if (!tree) {
        throw new TypeError("tree cannot be null");
      }

      if (!patternTree) {
        throw new TypeError("patternTree cannot be null");
      } // x and <ID>, x and y, or x and x; or could be mismatched types


      if (tree instanceof TerminalNode_1.TerminalNode && patternTree instanceof TerminalNode_1.TerminalNode) {
        var mismatchedNode; // both are tokens and they have same type

        if (tree.symbol.type === patternTree.symbol.type) {
          if (patternTree.symbol instanceof TokenTagToken_1.TokenTagToken) {
            // x and <ID>
            var tokenTagToken = patternTree.symbol; // track label->list-of-nodes for both token name and label (if any)

            labels.map(tokenTagToken.tokenName, tree);
            var l = tokenTagToken.label;

            if (l) {
              labels.map(l, tree);
            }
          } else if (tree.text === patternTree.text) {// x and x
          } else {
            // x and y
            if (!mismatchedNode) {
              mismatchedNode = tree;
            }
          }
        } else {
          if (!mismatchedNode) {
            mismatchedNode = tree;
          }
        }

        return mismatchedNode;
      }

      if (tree instanceof ParserRuleContext_1.ParserRuleContext && patternTree instanceof ParserRuleContext_1.ParserRuleContext) {
        var _mismatchedNode; // (expr ...) and <expr>


        var ruleTagToken = this.getRuleTagToken(patternTree);

        if (ruleTagToken) {
          var m;

          if (tree.ruleContext.ruleIndex === patternTree.ruleContext.ruleIndex) {
            // track label->list-of-nodes for both rule name and label (if any)
            labels.map(ruleTagToken.ruleName, tree);
            var _l = ruleTagToken.label;

            if (_l) {
              labels.map(_l, tree);
            }
          } else {
            if (!_mismatchedNode) {
              _mismatchedNode = tree;
            }
          }

          return _mismatchedNode;
        } // (expr ...) and (expr ...)


        if (tree.childCount !== patternTree.childCount) {
          if (!_mismatchedNode) {
            _mismatchedNode = tree;
          }

          return _mismatchedNode;
        }

        var n = tree.childCount;

        for (var i = 0; i < n; i++) {
          var childMatch = this.matchImpl(tree.getChild(i), patternTree.getChild(i), labels);

          if (childMatch) {
            return childMatch;
          }
        }

        return _mismatchedNode;
      } // if nodes aren't both tokens or both rule nodes, can't match


      return tree;
    }
    /** Is `t` `(expr <expr>)` subtree? */

  }, {
    key: "getRuleTagToken",
    value: function getRuleTagToken(t) {
      if (t instanceof RuleNode_1.RuleNode) {
        if (t.childCount === 1 && t.getChild(0) instanceof TerminalNode_1.TerminalNode) {
          var c = t.getChild(0);

          if (c.symbol instanceof RuleTagToken_1.RuleTagToken) {
            //					System.out.println("rule tag subtree "+t.toStringTree(parser));
            return c.symbol;
          }
        }
      }

      return undefined;
    }
  }, {
    key: "tokenize",
    value: function tokenize(pattern) {
      // split pattern into chunks: sea (raw input) and islands (<ID>, <expr>)
      var chunks = this.split(pattern); // create token stream from text and tags

      var tokens = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = chunks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var chunk = _step.value;

          if (chunk instanceof TagChunk_1.TagChunk) {
            var tagChunk = chunk;
            var firstChar = tagChunk.tag.substr(0, 1); // add special rule token or conjure up new token from name

            if (firstChar === firstChar.toUpperCase()) {
              var ttype = this._parser.getTokenType(tagChunk.tag);

              if (ttype === Token_1.Token.INVALID_TYPE) {
                throw new Error("Unknown token " + tagChunk.tag + " in pattern: " + pattern);
              }

              var t = new TokenTagToken_1.TokenTagToken(tagChunk.tag, ttype, tagChunk.label);
              tokens.push(t);
            } else if (firstChar === firstChar.toLowerCase()) {
              var ruleIndex = this._parser.getRuleIndex(tagChunk.tag);

              if (ruleIndex === -1) {
                throw new Error("Unknown rule " + tagChunk.tag + " in pattern: " + pattern);
              }

              var ruleImaginaryTokenType = this._parser.getATNWithBypassAlts().ruleToTokenType[ruleIndex];

              tokens.push(new RuleTagToken_1.RuleTagToken(tagChunk.tag, ruleImaginaryTokenType, tagChunk.label));
            } else {
              throw new Error("invalid tag: " + tagChunk.tag + " in pattern: " + pattern);
            }
          } else {
            var textChunk = chunk;
            this._lexer.inputStream = CharStreams_1.CharStreams.fromString(textChunk.text);

            var _t = this._lexer.nextToken();

            while (_t.type !== Token_1.Token.EOF) {
              tokens.push(_t);
              _t = this._lexer.nextToken();
            }
          }
        } //		System.out.println("tokens="+tokens);

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return tokens;
    }
    /** Split `<ID> = <e:expr> ;` into 4 chunks for tokenizing by {@link #tokenize}. */

  }, {
    key: "split",
    value: function split(pattern) {
      var p = 0;
      var n = pattern.length;
      var chunks = [];
      var buf; // find all start and stop indexes first, then collect

      var starts = [];
      var stops = [];

      while (p < n) {
        if (p === pattern.indexOf(this.escape + this.start, p)) {
          p += this.escape.length + this.start.length;
        } else if (p === pattern.indexOf(this.escape + this.stop, p)) {
          p += this.escape.length + this.stop.length;
        } else if (p === pattern.indexOf(this.start, p)) {
          starts.push(p);
          p += this.start.length;
        } else if (p === pattern.indexOf(this.stop, p)) {
          stops.push(p);
          p += this.stop.length;
        } else {
          p++;
        }
      } //		System.out.println("");
      //		System.out.println(starts);
      //		System.out.println(stops);


      if (starts.length > stops.length) {
        throw new Error("unterminated tag in pattern: " + pattern);
      }

      if (starts.length < stops.length) {
        throw new Error("missing start tag in pattern: " + pattern);
      }

      var ntags = starts.length;

      for (var i = 0; i < ntags; i++) {
        if (starts[i] >= stops[i]) {
          throw new Error("tag delimiters out of order in pattern: " + pattern);
        }
      } // collect into chunks now


      if (ntags === 0) {
        var text = pattern.substring(0, n);
        chunks.push(new TextChunk_1.TextChunk(text));
      }

      if (ntags > 0 && starts[0] > 0) {
        // copy text up to first tag into chunks
        var _text = pattern.substring(0, starts[0]);

        chunks.push(new TextChunk_1.TextChunk(_text));
      }

      for (var _i = 0; _i < ntags; _i++) {
        // copy inside of <tag>
        var tag = pattern.substring(starts[_i] + this.start.length, stops[_i]);
        var ruleOrToken = tag;
        var label = void 0;
        var colon = tag.indexOf(":");

        if (colon >= 0) {
          label = tag.substring(0, colon);
          ruleOrToken = tag.substring(colon + 1, tag.length);
        }

        chunks.push(new TagChunk_1.TagChunk(ruleOrToken, label));

        if (_i + 1 < ntags) {
          // copy from end of <tag> to start of next
          var _text2 = pattern.substring(stops[_i] + this.stop.length, starts[_i + 1]);

          chunks.push(new TextChunk_1.TextChunk(_text2));
        }
      }

      if (ntags > 0) {
        var afterLastTag = stops[ntags - 1] + this.stop.length;

        if (afterLastTag < n) {
          // copy text from end of last tag to end
          var _text3 = pattern.substring(afterLastTag, n);

          chunks.push(new TextChunk_1.TextChunk(_text3));
        }
      } // strip out the escape sequences from text chunks but not tags


      for (var _i2 = 0; _i2 < chunks.length; _i2++) {
        var c = chunks[_i2];

        if (c instanceof TextChunk_1.TextChunk) {
          var unescaped = c.text.replace(this.escapeRE, "");

          if (unescaped.length < c.text.length) {
            chunks[_i2] = new TextChunk_1.TextChunk(unescaped);
          }
        }
      }

      return chunks;
    }
  }, {
    key: "lexer",
    get: function get() {
      return this._lexer;
    }
    /**
     * Used to collect to the grammar file name, token names, rule names for
     * used to parse the pattern into a parse tree.
     */

  }, {
    key: "parser",
    get: function get() {
      return this._parser;
    }
  }]);
  return ParseTreePatternMatcher;
}();

__decorate([Decorators_1.NotNull, __param(1, Decorators_1.NotNull)], ParseTreePatternMatcher.prototype, "match", null);

__decorate([Decorators_1.NotNull], ParseTreePatternMatcher.prototype, "lexer", null);

__decorate([Decorators_1.NotNull], ParseTreePatternMatcher.prototype, "parser", null);

__decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ParseTreePatternMatcher.prototype, "matchImpl", null);

exports.ParseTreePatternMatcher = ParseTreePatternMatcher;

(function (ParseTreePatternMatcher) {
  var CannotInvokeStartRule =
  /*#__PURE__*/
  function (_Error) {
    (0, _inherits2["default"])(CannotInvokeStartRule, _Error);

    function CannotInvokeStartRule(error) {
      var _this;

      (0, _classCallCheck2["default"])(this, CannotInvokeStartRule);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CannotInvokeStartRule).call(this, "CannotInvokeStartRule: ".concat(error)));
      _this.error = error;
      return _this;
    }

    return CannotInvokeStartRule;
  }((0, _wrapNativeSuper2["default"])(Error));

  ParseTreePatternMatcher.CannotInvokeStartRule = CannotInvokeStartRule; // Fixes https://github.com/antlr/antlr4/issues/413
  // "Tree pattern compilation doesn't check for a complete parse"

  var StartRuleDoesNotConsumeFullPattern =
  /*#__PURE__*/
  function (_Error2) {
    (0, _inherits2["default"])(StartRuleDoesNotConsumeFullPattern, _Error2);

    function StartRuleDoesNotConsumeFullPattern() {
      (0, _classCallCheck2["default"])(this, StartRuleDoesNotConsumeFullPattern);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(StartRuleDoesNotConsumeFullPattern).call(this, "StartRuleDoesNotConsumeFullPattern"));
    }

    return StartRuleDoesNotConsumeFullPattern;
  }((0, _wrapNativeSuper2["default"])(Error));

  ParseTreePatternMatcher.StartRuleDoesNotConsumeFullPattern = StartRuleDoesNotConsumeFullPattern;
})(ParseTreePatternMatcher = exports.ParseTreePatternMatcher || (exports.ParseTreePatternMatcher = {}));
//# sourceMappingURL=ParseTreePatternMatcher.js.map
