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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:56.6285494-07:00

var ErrorNode_1 = require("./tree/ErrorNode");

var Interval_1 = require("./misc/Interval");

var Decorators_1 = require("./Decorators");

var RuleContext_1 = require("./RuleContext");

var TerminalNode_1 = require("./tree/TerminalNode");
/** A rule invocation record for parsing.
 *
 *  Contains all of the information about the current rule not stored in the
 *  RuleContext. It handles parse tree children list, Any ATN state
 *  tracing, and the default values available for rule invocations:
 *  start, stop, rule index, current alt number.
 *
 *  Subclasses made for each rule and grammar track the parameters,
 *  return values, locals, and labels specific to that rule. These
 *  are the objects that are returned from rules.
 *
 *  Note text is not an actual field of a rule return value; it is computed
 *  from start and stop using the input stream's toString() method.  I
 *  could add a ctor to this so that we can pass in and store the input
 *  stream, but I'm not sure we want to do that.  It would seem to be undefined
 *  to get the .text property anyway if the rule matches tokens from multiple
 *  input streams.
 *
 *  I do not use getters for fields of objects that are used simply to
 *  group values such as this aggregate.  The getters/setters are there to
 *  satisfy the superclass interface.
 */


var ParserRuleContext =
/*#__PURE__*/
function (_RuleContext_1$RuleCo) {
  (0, _inherits2["default"])(ParserRuleContext, _RuleContext_1$RuleCo);

  function ParserRuleContext(parent, invokingStateNumber) {
    var _this;

    (0, _classCallCheck2["default"])(this, ParserRuleContext);

    if (invokingStateNumber == null) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ParserRuleContext).call(this));
    } else {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ParserRuleContext).call(this, parent, invokingStateNumber));
    }

    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(ParserRuleContext, [{
    key: "copyFrom",

    /**
     * COPY a ctx (I'm deliberately not using copy constructor) to avoid
     * confusion with creating node with parent. Does not copy children
     * (except error leaves).
     *
     * This is used in the generated parser code to flip a generic XContext
     * node for rule X to a YContext for alt label Y. In that sense, it is not
     * really a generic copy function.
     *
     * If we do an error sync() at start of a rule, we might add error nodes
     * to the generic XContext so this function must copy those nodes to the
     * YContext as well else they are lost!
     */
    value: function copyFrom(ctx) {
      this._parent = ctx._parent;
      this.invokingState = ctx.invokingState;
      this._start = ctx._start;
      this._stop = ctx._stop; // copy any error nodes to alt label node

      if (ctx.children) {
        this.children = []; // reset parent pointer for any error nodes

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ctx.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child instanceof ErrorNode_1.ErrorNode) {
              this.addChild(child);
            }
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
    } // Double dispatch methods for listeners

  }, {
    key: "enterRule",
    value: function enterRule(listener) {// intentionally empty
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {} // intentionally empty

    /** Add a parse tree node to this as a child.  Works for
     *  internal and leaf nodes. Does not set parent link;
     *  other add methods must do that. Other addChild methods
     *  call this.
     *
     *  We cannot set the parent pointer of the incoming node
     *  because the existing interfaces do not have a setParent()
     *  method and I don't want to break backward compatibility for this.
     *
     *  @since 4.7
     */

  }, {
    key: "addAnyChild",
    value: function addAnyChild(t) {
      if (!this.children) {
        this.children = [t];
      } else {
        this.children.push(t);
      }

      return t;
    }
  }, {
    key: "addChild",
    value: function addChild(t) {
      var result;

      if (t instanceof TerminalNode_1.TerminalNode) {
        t.setParent(this);
        this.addAnyChild(t);
        return;
      } else if (t instanceof RuleContext_1.RuleContext) {
        // Does not set parent link
        this.addAnyChild(t);
        return;
      } else {
        // Deprecated code path
        t = new TerminalNode_1.TerminalNode(t);
        this.addAnyChild(t);
        t.setParent(this);
        return t;
      }
    }
  }, {
    key: "addErrorNode",
    value: function addErrorNode(node) {
      if (node instanceof ErrorNode_1.ErrorNode) {
        var errorNode = node;
        errorNode.setParent(this);
        return this.addAnyChild(errorNode);
      } else {
        // deprecated path
        var badToken = node;
        var t = new ErrorNode_1.ErrorNode(badToken);
        this.addAnyChild(t);
        t.setParent(this);
        return t;
      }
    } //	public void trace(int s) {
    //		if ( states==null ) states = new ArrayList<Integer>();
    //		states.add(s);
    //	}

    /** Used by enterOuterAlt to toss out a RuleContext previously added as
     *  we entered a rule. If we have # label, we will need to remove
     *  generic ruleContext object.
     */

  }, {
    key: "removeLastChild",
    value: function removeLastChild() {
      if (this.children) {
        this.children.pop();
      }
    }
  }, {
    key: "getChild",
    // Note: in TypeScript, order or arguments reversed
    value: function getChild(i, ctxType) {
      if (!this.children || i < 0 || i >= this.children.length) {
        throw new RangeError("index parameter must be between >= 0 and <= number of children.");
      }

      if (ctxType == null) {
        return this.children[i];
      }

      var result = this.tryGetChild(i, ctxType);

      if (result === undefined) {
        throw new Error("The specified node does not exist");
      }

      return result;
    }
  }, {
    key: "tryGetChild",
    value: function tryGetChild(i, ctxType) {
      if (!this.children || i < 0 || i >= this.children.length) {
        return undefined;
      }

      var j = -1; // what node with ctxType have we found?

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          if (o instanceof ctxType) {
            j++;

            if (j === i) {
              return o;
            }
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

      return undefined;
    }
  }, {
    key: "getToken",
    value: function getToken(ttype, i) {
      var result = this.tryGetToken(ttype, i);

      if (result === undefined) {
        throw new Error("The specified token does not exist");
      }

      return result;
    }
  }, {
    key: "tryGetToken",
    value: function tryGetToken(ttype, i) {
      if (!this.children || i < 0 || i >= this.children.length) {
        return undefined;
      }

      var j = -1; // what token with ttype have we found?

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var o = _step3.value;

          if (o instanceof TerminalNode_1.TerminalNode) {
            var symbol = o.symbol;

            if (symbol.type === ttype) {
              j++;

              if (j === i) {
                return o;
              }
            }
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

      return undefined;
    }
  }, {
    key: "getTokens",
    value: function getTokens(ttype) {
      var tokens = [];

      if (!this.children) {
        return tokens;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var o = _step4.value;

          if (o instanceof TerminalNode_1.TerminalNode) {
            var symbol = o.symbol;

            if (symbol.type === ttype) {
              tokens.push(o);
            }
          }
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

      return tokens;
    }
  }, {
    key: "getRuleContext",
    // NOTE: argument order change from Java version
    value: function getRuleContext(i, ctxType) {
      return this.getChild(i, ctxType);
    }
  }, {
    key: "tryGetRuleContext",
    value: function tryGetRuleContext(i, ctxType) {
      return this.tryGetChild(i, ctxType);
    }
  }, {
    key: "getRuleContexts",
    value: function getRuleContexts(ctxType) {
      var contexts = [];

      if (!this.children) {
        return contexts;
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var o = _step5.value;

          if (o instanceof ctxType) {
            contexts.push(o);
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

      return contexts;
    }
  }, {
    key: "toInfoString",

    /** Used for rule context info debugging during parse-time, not so much for ATN debugging */
    value: function toInfoString(recognizer) {
      var rules = recognizer.getRuleInvocationStack(this).reverse();
      return "ParserRuleContext" + rules + "{" + "start=" + this._start + ", stop=" + this._stop + "}";
    }
  }, {
    key: "parent",
    get: function get() {
      var parent = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ParserRuleContext.prototype), "parent", this);

      if (parent === undefined || parent instanceof ParserRuleContext) {
        return parent;
      }

      throw new TypeError("Invalid parent type for ParserRuleContext");
    }
  }, {
    key: "ruleContext",
    get: function get() {
      return this;
    }
  }, {
    key: "childCount",
    get: function get() {
      return this.children ? this.children.length : 0;
    }
  }, {
    key: "sourceInterval",
    get: function get() {
      if (!this._start) {
        return Interval_1.Interval.INVALID;
      }

      if (!this._stop || this._stop.tokenIndex < this._start.tokenIndex) {
        return Interval_1.Interval.of(this._start.tokenIndex, this._start.tokenIndex - 1); // empty
      }

      return Interval_1.Interval.of(this._start.tokenIndex, this._stop.tokenIndex);
    }
    /**
     * Get the initial token in this context.
     * Note that the range from start to stop is inclusive, so for rules that do not consume anything
     * (for example, zero length or error productions) this token may exceed stop.
     */

  }, {
    key: "start",
    get: function get() {
      return this._start;
    }
    /**
     * Get the final token in this context.
     * Note that the range from start to stop is inclusive, so for rules that do not consume anything
     * (for example, zero length or error productions) this token may precede start.
     */

  }, {
    key: "stop",
    get: function get() {
      return this._stop;
    }
  }], [{
    key: "emptyContext",
    value: function emptyContext() {
      return ParserRuleContext.EMPTY;
    }
  }]);
  return ParserRuleContext;
}(RuleContext_1.RuleContext);

ParserRuleContext.EMPTY = new ParserRuleContext();

__decorate([Decorators_1.Override
/** Override to make type more specific */
], ParserRuleContext.prototype, "parent", null);

__decorate([Decorators_1.Override], ParserRuleContext.prototype, "childCount", null);

__decorate([Decorators_1.Override], ParserRuleContext.prototype, "sourceInterval", null);

exports.ParserRuleContext = ParserRuleContext;
//# sourceMappingURL=ParserRuleContext.js.map
