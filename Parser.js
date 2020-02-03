"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils = require("./misc/Utils");

var ATNDeserializationOptions_1 = require("./atn/ATNDeserializationOptions");

var ATNDeserializer_1 = require("./atn/ATNDeserializer");

var DefaultErrorStrategy_1 = require("./DefaultErrorStrategy");

var ErrorNode_1 = require("./tree/ErrorNode");

var IntegerStack_1 = require("./misc/IntegerStack");

var Lexer_1 = require("./Lexer");

var Decorators_1 = require("./Decorators");

var ParseInfo_1 = require("./atn/ParseInfo");

var ParserATNSimulator_1 = require("./atn/ParserATNSimulator");

var ProxyParserErrorListener_1 = require("./ProxyParserErrorListener");

var Recognizer_1 = require("./Recognizer");

var TerminalNode_1 = require("./tree/TerminalNode");

var Token_1 = require("./Token");

var TraceListener =
/*#__PURE__*/
function () {
  function TraceListener(ruleNames, tokenStream) {
    (0, _classCallCheck2["default"])(this, TraceListener);
    this.ruleNames = ruleNames;
    this.tokenStream = tokenStream;
  }

  (0, _createClass2["default"])(TraceListener, [{
    key: "enterEveryRule",
    value: function enterEveryRule(ctx) {
      console.log("enter   " + this.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.tokenStream.LT(1).text);
    }
  }, {
    key: "exitEveryRule",
    value: function exitEveryRule(ctx) {
      console.log("exit    " + this.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.tokenStream.LT(1).text);
    }
  }, {
    key: "visitErrorNode",
    value: function visitErrorNode(node) {// intentionally empty
    }
  }, {
    key: "visitTerminal",
    value: function visitTerminal(node) {
      var parent = node.parent.ruleContext;
      var token = node.symbol;
      console.log("consume " + token + " rule " + this.ruleNames[parent.ruleIndex]);
    }
  }]);
  return TraceListener;
}();

__decorate([Decorators_1.Override], TraceListener.prototype, "enterEveryRule", null);

__decorate([Decorators_1.Override], TraceListener.prototype, "exitEveryRule", null);

__decorate([Decorators_1.Override], TraceListener.prototype, "visitErrorNode", null);

__decorate([Decorators_1.Override], TraceListener.prototype, "visitTerminal", null);
/** This is all the parsing support code essentially; most of it is error recovery stuff. */


var Parser =
/*#__PURE__*/
function (_Recognizer_1$Recogni) {
  (0, _inherits2["default"])(Parser, _Recognizer_1$Recogni);

  function Parser(input) {
    var _this;

    (0, _classCallCheck2["default"])(this, Parser);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Parser).call(this));
    /**
     * The error handling strategy for the parser. The default value is a new
     * instance of {@link DefaultErrorStrategy}.
     *
     * @see #getErrorHandler
     * @see #setErrorHandler
     */

    _this._errHandler = new DefaultErrorStrategy_1.DefaultErrorStrategy();
    _this._precedenceStack = new IntegerStack_1.IntegerStack();
    /**
     * Specifies whether or not the parser should construct a parse tree during
     * the parsing process. The default value is `true`.
     *
     * @see `buildParseTree`
     */

    _this._buildParseTrees = true;
    /**
     * The list of {@link ParseTreeListener} listeners registered to receive
     * events during the parse.
     *
     * @see #addParseListener
     */

    _this._parseListeners = [];
    /**
     * The number of syntax errors reported during parsing. This value is
     * incremented each time {@link #notifyErrorListeners} is called.
     */

    _this._syntaxErrors = 0;
    /** Indicates parser has match()ed EOF token. See {@link #exitRule()}. */

    _this.matchedEOF = false;

    _this._precedenceStack.push(0);

    _this.inputStream = input;
    return _this;
  }

  (0, _createClass2["default"])(Parser, [{
    key: "reset",
    value: function reset(resetInput) {
      // Note: this method executes when not parsing, so _ctx can be undefined
      if (resetInput === undefined || resetInput) {
        this.inputStream.seek(0);
      }

      this._errHandler.reset(this);

      this._ctx = undefined;
      this._syntaxErrors = 0;
      this.matchedEOF = false;
      this.isTrace = false;

      this._precedenceStack.clear();

      this._precedenceStack.push(0);

      var interpreter = this.interpreter;

      if (interpreter != null) {
        interpreter.reset();
      }
    }
    /**
     * Match current input symbol against `ttype`. If the symbol type
     * matches, {@link ANTLRErrorStrategy#reportMatch} and {@link #consume} are
     * called to complete the match process.
     *
     * If the symbol type does not match,
     * {@link ANTLRErrorStrategy#recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link #getBuildParseTree} is
     * `true` and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy#recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link #createErrorNode(ParserRuleContext, Token)} then
     * {@link ParserRuleContext#addErrorNode(ErrorNode)}.
     *
     * @param ttype the token type to match
     * @returns the matched symbol
     * @ if the current input symbol did not match
     * `ttype` and the error strategy could not recover from the
     * mismatched symbol
     */

  }, {
    key: "match",
    value: function match(ttype) {
      var t = this.currentToken;

      if (t.type === ttype) {
        if (ttype === Token_1.Token.EOF) {
          this.matchedEOF = true;
        }

        this._errHandler.reportMatch(this);

        this.consume();
      } else {
        t = this._errHandler.recoverInline(this);

        if (this._buildParseTrees && t.tokenIndex === -1) {
          // we must have conjured up a new token during single token insertion
          // if it's not the current symbol
          this._ctx.addErrorNode(this.createErrorNode(this._ctx, t));
        }
      }

      return t;
    }
    /**
     * Match current input symbol as a wildcard. If the symbol type matches
     * (i.e. has a value greater than 0), {@link ANTLRErrorStrategy#reportMatch}
     * and {@link #consume} are called to complete the match process.
     *
     * If the symbol type does not match,
     * {@link ANTLRErrorStrategy#recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link #getBuildParseTree} is
     * `true` and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy#recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link Parser#createErrorNode(ParserRuleContext, Token)} then
     * {@link ParserRuleContext#addErrorNode(ErrorNode)}.
     *
     * @returns the matched symbol
     * @ if the current input symbol did not match
     * a wildcard and the error strategy could not recover from the mismatched
     * symbol
     */

  }, {
    key: "matchWildcard",
    value: function matchWildcard() {
      var t = this.currentToken;

      if (t.type > 0) {
        this._errHandler.reportMatch(this);

        this.consume();
      } else {
        t = this._errHandler.recoverInline(this);

        if (this._buildParseTrees && t.tokenIndex === -1) {
          // we must have conjured up a new token during single token insertion
          // if it's not the current symbol
          this._ctx.addErrorNode(this.createErrorNode(this._ctx, t));
        }
      }

      return t;
    }
    /**
     * Track the {@link ParserRuleContext} objects during the parse and hook
     * them up using the {@link ParserRuleContext#children} list so that it
     * forms a parse tree. The {@link ParserRuleContext} returned from the start
     * rule represents the root of the parse tree.
     *
     * Note that if we are not building parse trees, rule contexts only point
     * upwards. When a rule exits, it returns the context but that gets garbage
     * collected if nobody holds a reference. It points upwards but nobody
     * points at it.
     *
     * When we build parse trees, we are adding all of these contexts to
     * {@link ParserRuleContext#children} list. Contexts are then not candidates
     * for garbage collection.
     */

  }, {
    key: "getParseListeners",
    value: function getParseListeners() {
      return this._parseListeners;
    }
    /**
     * Registers `listener` to receive events during the parsing process.
     *
     * To support output-preserving grammar transformations (including but not
     * limited to left-recursion removal, automated left-factoring, and
     * optimized code generation), calls to listener methods during the parse
     * may differ substantially from calls made by
     * {@link ParseTreeWalker#DEFAULT} used after the parse is complete. In
     * particular, rule entry and exit events may occur in a different order
     * during the parse than after the parser. In addition, calls to certain
     * rule entry methods may be omitted.
     *
     * With the following specific exceptions, calls to listener events are
     * *deterministic*, i.e. for identical input the calls to listener
     * methods will be the same.
     *
     * * Alterations to the grammar used to generate code may change the
     *   behavior of the listener calls.
     * * Alterations to the command line options passed to ANTLR 4 when
     *   generating the parser may change the behavior of the listener calls.
     * * Changing the version of the ANTLR Tool used to generate the parser
     *   may change the behavior of the listener calls.
     *
     * @param listener the listener to add
     *
     * @throws {@link TypeError} if `listener` is `undefined`
     */

  }, {
    key: "addParseListener",
    value: function addParseListener(listener) {
      if (listener == null) {
        throw new TypeError("listener cannot be null");
      }

      this._parseListeners.push(listener);
    }
    /**
     * Remove `listener` from the list of parse listeners.
     *
     * If `listener` is `undefined` or has not been added as a parse
     * listener, this method does nothing.
     *
     * @see #addParseListener
     *
     * @param listener the listener to remove
     */

  }, {
    key: "removeParseListener",
    value: function removeParseListener(listener) {
      var index = this._parseListeners.findIndex(function (l) {
        return l === listener;
      });

      if (index !== -1) {
        this._parseListeners.splice(index, 1);
      }
    }
    /**
     * Remove all parse listeners.
     *
     * @see #addParseListener
     */

  }, {
    key: "removeParseListeners",
    value: function removeParseListeners() {
      this._parseListeners.length = 0;
    }
    /**
     * Notify any parse listeners of an enter rule event.
     *
     * @see #addParseListener
     */

  }, {
    key: "triggerEnterRuleEvent",
    value: function triggerEnterRuleEvent() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._parseListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;

          if (listener.enterEveryRule) {
            listener.enterEveryRule(this._ctx);
          }

          this._ctx.enterRule(listener);
        }
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
    }
    /**
     * Notify any parse listeners of an exit rule event.
     *
     * @see #addParseListener
     */

  }, {
    key: "triggerExitRuleEvent",
    value: function triggerExitRuleEvent() {
      // reverse order walk of listeners
      for (var i = this._parseListeners.length - 1; i >= 0; i--) {
        var listener = this._parseListeners[i];

        this._ctx.exitRule(listener);

        if (listener.exitEveryRule) {
          listener.exitEveryRule(this._ctx);
        }
      }
    }
    /**
     * Gets the number of syntax errors reported during parsing. This value is
     * incremented each time {@link #notifyErrorListeners} is called.
     *
     * @see #notifyErrorListeners
     */

  }, {
    key: "getATNWithBypassAlts",

    /**
     * The ATN with bypass alternatives is expensive to create so we create it
     * lazily.
     *
     * @ if the current parser does not
     * implement the `serializedATN` property.
     */
    value: function getATNWithBypassAlts() {
      var serializedAtn = this.serializedATN;

      if (serializedAtn == null) {
        throw new Error("The current parser does not support an ATN with bypass alternatives.");
      }

      var result = Parser.bypassAltsAtnCache.get(serializedAtn);

      if (result == null) {
        var deserializationOptions = new ATNDeserializationOptions_1.ATNDeserializationOptions();
        deserializationOptions.isGenerateRuleBypassTransitions = true;
        result = new ATNDeserializer_1.ATNDeserializer(deserializationOptions).deserialize(Utils.toCharArray(serializedAtn));
        Parser.bypassAltsAtnCache.set(serializedAtn, result);
      }

      return result;
    }
  }, {
    key: "compileParseTreePattern",
    value: function compileParseTreePattern(pattern, patternRuleIndex, lexer) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var tokenSource, currentLexer, m, matcher;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (lexer) {
                  _context.next = 4;
                  break;
                }

                if (this.inputStream) {
                  tokenSource = this.inputStream.tokenSource;

                  if (tokenSource instanceof Lexer_1.Lexer) {
                    lexer = tokenSource;
                  }
                }

                if (lexer) {
                  _context.next = 4;
                  break;
                }

                throw new Error("Parser can't discover a lexer to use");

              case 4:
                currentLexer = lexer;
                _context.next = 7;
                return Promise.resolve().then(function () {
                  return require("./tree/pattern/ParseTreePatternMatcher");
                });

              case 7:
                m = _context.sent;
                matcher = new m.ParseTreePatternMatcher(currentLexer, this);
                return _context.abrupt("return", matcher.compile(pattern, patternRuleIndex));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "notifyErrorListeners",
    value: function notifyErrorListeners(msg, offendingToken, e) {
      if (offendingToken === undefined) {
        offendingToken = this.currentToken;
      } else if (offendingToken === null) {
        offendingToken = undefined;
      }

      this._syntaxErrors++;
      var line = -1;
      var charPositionInLine = -1;

      if (offendingToken != null) {
        line = offendingToken.line;
        charPositionInLine = offendingToken.charPositionInLine;
      }

      var listener = this.getErrorListenerDispatch();

      if (listener.syntaxError) {
        listener.syntaxError(this, offendingToken, line, charPositionInLine, msg, e);
      }
    }
    /**
     * Consume and return the [current symbol](`currentToken`).
     *
     * E.g., given the following input with `A` being the current
     * lookahead symbol, this function moves the cursor to `B` and returns
     * `A`.
     *
     * ```
     * A B
     * ^
     * ```
     *
     * If the parser is not in error recovery mode, the consumed symbol is added
     * to the parse tree using {@link ParserRuleContext#addChild(TerminalNode)}, and
     * {@link ParseTreeListener#visitTerminal} is called on any parse listeners.
     * If the parser *is* in error recovery mode, the consumed symbol is
     * added to the parse tree using {@link #createErrorNode(ParserRuleContext, Token)} then
     * {@link ParserRuleContext#addErrorNode(ErrorNode)} and
     * {@link ParseTreeListener#visitErrorNode} is called on any parse
     * listeners.
     */

  }, {
    key: "consume",
    value: function consume() {
      var o = this.currentToken;

      if (o.type !== Parser.EOF) {
        this.inputStream.consume();
      }

      var hasListener = this._parseListeners.length !== 0;

      if (this._buildParseTrees || hasListener) {
        if (this._errHandler.inErrorRecoveryMode(this)) {
          var node = this._ctx.addErrorNode(this.createErrorNode(this._ctx, o));

          if (hasListener) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this._parseListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var listener = _step2.value;

                if (listener.visitErrorNode) {
                  listener.visitErrorNode(node);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } else {
          var _node = this.createTerminalNode(this._ctx, o);

          this._ctx.addChild(_node);

          if (hasListener) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = this._parseListeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _listener = _step3.value;

                if (_listener.visitTerminal) {
                  _listener.visitTerminal(_node);
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        }
      }

      return o;
    }
    /**
     * How to create a token leaf node associated with a parent.
     * Typically, the terminal node to create is not a function of the parent.
     *
     * @since 4.7
     */

  }, {
    key: "createTerminalNode",
    value: function createTerminalNode(parent, t) {
      return new TerminalNode_1.TerminalNode(t);
    }
    /**
     * How to create an error node, given a token, associated with a parent.
     * Typically, the error node to create is not a function of the parent.
     *
     * @since 4.7
     */

  }, {
    key: "createErrorNode",
    value: function createErrorNode(parent, t) {
      return new ErrorNode_1.ErrorNode(t);
    }
  }, {
    key: "addContextToParseTree",
    value: function addContextToParseTree() {
      var parent = this._ctx._parent; // add current context to parent if we have a parent

      if (parent != null) {
        parent.addChild(this._ctx);
      }
    }
    /**
     * Always called by generated parsers upon entry to a rule. Access field
     * {@link #_ctx} get the current context.
     */

  }, {
    key: "enterRule",
    value: function enterRule(localctx, state, ruleIndex) {
      this.state = state;
      this._ctx = localctx;
      this._ctx._start = this._input.LT(1);

      if (this._buildParseTrees) {
        this.addContextToParseTree();
      }

      this.triggerEnterRuleEvent();
    }
  }, {
    key: "enterLeftFactoredRule",
    value: function enterLeftFactoredRule(localctx, state, ruleIndex) {
      this.state = state;

      if (this._buildParseTrees) {
        var factoredContext = this._ctx.getChild(this._ctx.childCount - 1);

        this._ctx.removeLastChild();

        factoredContext._parent = localctx;
        localctx.addChild(factoredContext);
      }

      this._ctx = localctx;
      this._ctx._start = this._input.LT(1);

      if (this._buildParseTrees) {
        this.addContextToParseTree();
      }

      this.triggerEnterRuleEvent();
    }
  }, {
    key: "exitRule",
    value: function exitRule() {
      if (this.matchedEOF) {
        // if we have matched EOF, it cannot consume past EOF so we use LT(1) here
        this._ctx._stop = this._input.LT(1); // LT(1) will be end of file
      } else {
        this._ctx._stop = this._input.tryLT(-1); // stop node is what we just matched
      } // trigger event on _ctx, before it reverts to parent


      this.triggerExitRuleEvent();
      this.state = this._ctx.invokingState;
      this._ctx = this._ctx._parent;
    }
  }, {
    key: "enterOuterAlt",
    value: function enterOuterAlt(localctx, altNum) {
      localctx.altNumber = altNum; // if we have new localctx, make sure we replace existing ctx
      // that is previous child of parse tree

      if (this._buildParseTrees && this._ctx !== localctx) {
        var parent = this._ctx._parent;

        if (parent != null) {
          parent.removeLastChild();
          parent.addChild(localctx);
        }
      }

      this._ctx = localctx;
    }
    /**
     * Get the precedence level for the top-most precedence rule.
     *
     * @returns The precedence level for the top-most precedence rule, or -1 if
     * the parser context is not nested within a precedence rule.
     */

  }, {
    key: "enterRecursionRule",
    value: function enterRecursionRule(localctx, state, ruleIndex, precedence) {
      this.state = state;

      this._precedenceStack.push(precedence);

      this._ctx = localctx;
      this._ctx._start = this._input.LT(1);
      this.triggerEnterRuleEvent(); // simulates rule entry for left-recursive rules
    }
    /** Like {@link #enterRule} but for recursive rules.
     *  Make the current context the child of the incoming localctx.
     */

  }, {
    key: "pushNewRecursionContext",
    value: function pushNewRecursionContext(localctx, state, ruleIndex) {
      var previous = this._ctx;
      previous._parent = localctx;
      previous.invokingState = state;
      previous._stop = this._input.tryLT(-1);
      this._ctx = localctx;
      this._ctx._start = previous._start;

      if (this._buildParseTrees) {
        this._ctx.addChild(previous);
      }

      this.triggerEnterRuleEvent(); // simulates rule entry for left-recursive rules
    }
  }, {
    key: "unrollRecursionContexts",
    value: function unrollRecursionContexts(_parentctx) {
      this._precedenceStack.pop();

      this._ctx._stop = this._input.tryLT(-1);
      var retctx = this._ctx; // save current ctx (return value)
      // unroll so _ctx is as it was before call to recursive method

      if (this._parseListeners.length > 0) {
        while (this._ctx !== _parentctx) {
          this.triggerExitRuleEvent();
          this._ctx = this._ctx._parent;
        }
      } else {
        this._ctx = _parentctx;
      } // hook into tree


      retctx._parent = _parentctx;

      if (this._buildParseTrees && _parentctx != null) {
        // add return ctx into invoking rule's tree
        _parentctx.addChild(retctx);
      }
    }
  }, {
    key: "getInvokingContext",
    value: function getInvokingContext(ruleIndex) {
      var p = this._ctx;

      while (p && p.ruleIndex !== ruleIndex) {
        p = p._parent;
      }

      return p;
    }
  }, {
    key: "precpred",
    value: function precpred(localctx, precedence) {
      return precedence >= this._precedenceStack.peek();
    }
  }, {
    key: "getErrorListenerDispatch",
    value: function getErrorListenerDispatch() {
      return new ProxyParserErrorListener_1.ProxyParserErrorListener(this.getErrorListeners());
    }
  }, {
    key: "inContext",
    value: function inContext(context) {
      // TODO: useful in parser?
      return false;
    }
    /**
     * Checks whether or not `symbol` can follow the current state in the
     * ATN. The behavior of this method is equivalent to the following, but is
     * implemented such that the complete context-sensitive follow set does not
     * need to be explicitly constructed.
     *
     * ```
     * return getExpectedTokens().contains(symbol);
     * ```
     *
     * @param symbol the symbol type to check
     * @returns `true` if `symbol` can follow the current state in
     * the ATN, otherwise `false`.
     */

  }, {
    key: "isExpectedToken",
    value: function isExpectedToken(symbol) {
      //   		return interpreter.atn.nextTokens(_ctx);
      var atn = this.interpreter.atn;
      var ctx = this._ctx;
      var s = atn.states[this.state];
      var following = atn.nextTokens(s);

      if (following.contains(symbol)) {
        return true;
      } //        System.out.println("following "+s+"="+following);


      if (!following.contains(Token_1.Token.EPSILON)) {
        return false;
      }

      while (ctx != null && ctx.invokingState >= 0 && following.contains(Token_1.Token.EPSILON)) {
        var invokingState = atn.states[ctx.invokingState];
        var rt = invokingState.transition(0);
        following = atn.nextTokens(rt.followState);

        if (following.contains(symbol)) {
          return true;
        }

        ctx = ctx._parent;
      }

      if (following.contains(Token_1.Token.EPSILON) && symbol === Token_1.Token.EOF) {
        return true;
      }

      return false;
    }
  }, {
    key: "getExpectedTokens",

    /**
     * Computes the set of input symbols which could follow the current parser
     * state and context, as given by {@link #getState} and {@link #getContext},
     * respectively.
     *
     * @see ATN#getExpectedTokens(int, RuleContext)
     */
    value: function getExpectedTokens() {
      return this.atn.getExpectedTokens(this.state, this.context);
    }
  }, {
    key: "getExpectedTokensWithinCurrentRule",
    value: function getExpectedTokensWithinCurrentRule() {
      var atn = this.interpreter.atn;
      var s = atn.states[this.state];
      return atn.nextTokens(s);
    }
    /** Get a rule's index (i.e., `RULE_ruleName` field) or -1 if not found. */

  }, {
    key: "getRuleIndex",
    value: function getRuleIndex(ruleName) {
      var ruleIndex = this.getRuleIndexMap().get(ruleName);

      if (ruleIndex != null) {
        return ruleIndex;
      }

      return -1;
    }
  }, {
    key: "getRuleInvocationStack",

    /** Return List&lt;String&gt; of the rule names in your parser instance
     *  leading up to a call to the current rule.  You could override if
     *  you want more details such as the file/line info of where
     *  in the ATN a rule is invoked.
     *
     *  This is very useful for error messages.
     */
    value: function getRuleInvocationStack() {
      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._ctx;
      var p = ctx; // Workaround for Microsoft/TypeScript#14487

      var ruleNames = this.ruleNames;
      var stack = [];

      while (p != null) {
        // compute what follows who invoked us
        var ruleIndex = p.ruleIndex;

        if (ruleIndex < 0) {
          stack.push("n/a");
        } else {
          stack.push(ruleNames[ruleIndex]);
        }

        p = p._parent;
      }

      return stack;
    }
    /** For debugging and other purposes. */

  }, {
    key: "getDFAStrings",
    value: function getDFAStrings() {
      var s = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._interp.atn.decisionToDFA[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var dfa = _step4.value;
          s.push(dfa.toString(this.vocabulary, this.ruleNames));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return s;
    }
    /** For debugging and other purposes. */

  }, {
    key: "dumpDFA",
    value: function dumpDFA() {
      var seenOne = false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._interp.atn.decisionToDFA[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var dfa = _step5.value;

          if (!dfa.isEmpty) {
            if (seenOne) {
              console.log();
            }

            console.log("Decision " + dfa.decision + ":");
            process.stdout.write(dfa.toString(this.vocabulary, this.ruleNames));
            seenOne = true;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "setProfile",

    /**
     * @since 4.3
     */
    value: function setProfile(profile) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var m, interp;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.resolve().then(function () {
                  return require("./atn/ProfilingATNSimulator");
                });

              case 2:
                m = _context2.sent;
                interp = this.interpreter;

                if (profile) {
                  if (!(interp instanceof m.ProfilingATNSimulator)) {
                    this.interpreter = new m.ProfilingATNSimulator(this);
                  }
                } else if (interp instanceof m.ProfilingATNSimulator) {
                  this.interpreter = new ParserATNSimulator_1.ParserATNSimulator(this.atn, this);
                }

                this.interpreter.setPredictionMode(interp.getPredictionMode());

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
    /** During a parse is sometimes useful to listen in on the rule entry and exit
     *  events as well as token matches. This is for quick and dirty debugging.
     */

  }, {
    key: "buildParseTree",
    set: function set(buildParseTrees) {
      this._buildParseTrees = buildParseTrees;
    }
    /**
     * Gets whether or not a complete parse tree will be constructed while
     * parsing. This property is `true` for a newly constructed parser.
     *
     * @returns `true` if a complete parse tree will be constructed while
     * parsing, otherwise `false`
     */
    ,
    get: function get() {
      return this._buildParseTrees;
    }
  }, {
    key: "numberOfSyntaxErrors",
    get: function get() {
      return this._syntaxErrors;
    }
  }, {
    key: "tokenFactory",
    get: function get() {
      return this._input.tokenSource.tokenFactory;
    }
  }, {
    key: "errorHandler",
    get: function get() {
      return this._errHandler;
    },
    set: function set(handler) {
      this._errHandler = handler;
    }
  }, {
    key: "inputStream",
    get: function get() {
      return this._input;
    }
    /** Set the token stream and reset the parser. */
    ,
    set: function set(input) {
      this.reset(false);
      this._input = input;
    }
    /** Match needs to return the current input symbol, which gets put
     *  into the label for the associated token ref; e.g., x=ID.
     */

  }, {
    key: "currentToken",
    get: function get() {
      return this._input.LT(1);
    }
  }, {
    key: "precedence",
    get: function get() {
      if (this._precedenceStack.isEmpty) {
        return -1;
      }

      return this._precedenceStack.peek();
    }
  }, {
    key: "context",
    get: function get() {
      return this._ctx;
    },
    set: function set(ctx) {
      this._ctx = ctx;
    }
  }, {
    key: "isMatchedEOF",
    get: function get() {
      return this.matchedEOF;
    }
  }, {
    key: "ruleContext",
    get: function get() {
      return this._ctx;
    }
  }, {
    key: "sourceName",
    get: function get() {
      return this._input.sourceName;
    }
  }, {
    key: "parseInfo",
    get: function get() {
      var _this2 = this;

      return Promise.resolve().then(function () {
        return require("./atn/ProfilingATNSimulator");
      }).then(function (m) {
        var interp = _this2.interpreter;

        if (interp instanceof m.ProfilingATNSimulator) {
          return new ParseInfo_1.ParseInfo(interp);
        }

        return undefined;
      });
    }
  }, {
    key: "isTrace",
    set: function set(trace) {
      if (!trace) {
        if (this._tracer) {
          this.removeParseListener(this._tracer);
          this._tracer = undefined;
        }
      } else {
        if (this._tracer) {
          this.removeParseListener(this._tracer);
        } else {
          this._tracer = new TraceListener(this.ruleNames, this._input);
        }

        this.addParseListener(this._tracer);
      }
    }
    /**
     * Gets whether a {@link TraceListener} is registered as a parse listener
     * for the parser.
     */
    ,
    get: function get() {
      return this._tracer != null;
    }
  }]);
  return Parser;
}(Recognizer_1.Recognizer);
/**
 * This field maps from the serialized ATN string to the deserialized {@link ATN} with
 * bypass alternatives.
 *
 * @see ATNDeserializationOptions.isGenerateRuleBypassTransitions
 */


Parser.bypassAltsAtnCache = new Map();

__decorate([Decorators_1.NotNull], Parser.prototype, "_errHandler", void 0);

__decorate([Decorators_1.NotNull], Parser.prototype, "match", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "matchWildcard", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "getParseListeners", null);

__decorate([__param(0, Decorators_1.NotNull)], Parser.prototype, "addParseListener", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "getATNWithBypassAlts", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], Parser.prototype, "errorHandler", null);

__decorate([Decorators_1.Override], Parser.prototype, "inputStream", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "currentToken", null);

__decorate([__param(0, Decorators_1.NotNull)], Parser.prototype, "enterRule", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.Nullable)], Parser.prototype, "precpred", null);

__decorate([Decorators_1.Override], Parser.prototype, "getErrorListenerDispatch", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "getExpectedTokens", null);

__decorate([Decorators_1.NotNull], Parser.prototype, "getExpectedTokensWithinCurrentRule", null);

__decorate([Decorators_1.Override], Parser.prototype, "parseInfo", null);

exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map
