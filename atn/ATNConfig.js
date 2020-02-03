"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:25.2796692-07:00

var Array2DHashMap_1 = require("../misc/Array2DHashMap");

var DecisionState_1 = require("./DecisionState");

var MurmurHash_1 = require("../misc/MurmurHash");

var Decorators_1 = require("../Decorators");

var ObjectEqualityComparator_1 = require("../misc/ObjectEqualityComparator");

var PredictionContext_1 = require("./PredictionContext");

var SemanticContext_1 = require("./SemanticContext");

var assert = require("assert");
/**
 * This field stores the bit mask for implementing the
 * {@link #isPrecedenceFilterSuppressed} property as a bit within the
 * existing {@link #altAndOuterContextDepth} field.
 */


var SUPPRESS_PRECEDENCE_FILTER = 0x80000000;
/**
 * Represents a location with context in an ATN. The location is identified by the following values:
 *
 * * The current ATN state
 * * The predicted alternative
 * * The semantic context which must be true for this configuration to be enabled
 * * The syntactic context, which is represented as a graph-structured stack whose path(s) lead to the root of the rule
 *   invocations leading to this state
 *
 * In addition to these values, `ATNConfig` stores several properties about paths taken to get to the location which
 * were added over time to help with performance, correctness, and/or debugging.
 *
 * * `reachesIntoOuterContext`:: Used to ensure semantic predicates are not evaluated in the wrong context.
 * * `hasPassedThroughNonGreedyDecision`: Used for enabling first-match-wins instead of longest-match-wins after
 *   crossing a non-greedy decision.
 * * `lexerActionExecutor`: Used for tracking the lexer action(s) to execute should this instance be selected during
 *   lexing.
 * * `isPrecedenceFilterSuppressed`: A state variable for one of the dynamic disambiguation strategies employed by
 *   `ParserATNSimulator.applyPrecedenceFilter`.
 *
 * Due to the use of a graph-structured stack, a single `ATNConfig` is capable of representing many individual ATN
 * configurations which reached the same location in an ATN by following different paths.
 *
 * PERF: To conserve memory, `ATNConfig` is split into several different concrete types. `ATNConfig` itself stores the
 * minimum amount of information typically used to define an `ATNConfig` instance. Various derived types provide
 * additional storage space for cases where a non-default value is used for some of the object properties. The
 * `ATNConfig.create` and `ATNConfig.transform` methods automatically select the smallest concrete type capable of
 * representing the unique information for any given `ATNConfig`.
 */

var ATNConfig =
/*#__PURE__*/
function () {
  function ATNConfig(state, altOrConfig, context) {
    (0, _classCallCheck2["default"])(this, ATNConfig);

    if (typeof altOrConfig === "number") {
      assert((altOrConfig & 0xFFFFFF) === altOrConfig);
      this._state = state;
      this.altAndOuterContextDepth = altOrConfig;
      this._context = context;
    } else {
      this._state = state;
      this.altAndOuterContextDepth = altOrConfig.altAndOuterContextDepth;
      this._context = context;
    }
  }

  (0, _createClass2["default"])(ATNConfig, [{
    key: "clone",
    value: function clone() {
      return this.transform(this.state, false);
    }
  }, {
    key: "transform",
    value: function transform(
    /*@NotNull*/
    state, checkNonGreedy, arg2) {
      if (arg2 == null) {
        return this.transformImpl(state, this._context, this.semanticContext, checkNonGreedy, this.lexerActionExecutor);
      } else if (arg2 instanceof PredictionContext_1.PredictionContext) {
        return this.transformImpl(state, arg2, this.semanticContext, checkNonGreedy, this.lexerActionExecutor);
      } else if (arg2 instanceof SemanticContext_1.SemanticContext) {
        return this.transformImpl(state, this._context, arg2, checkNonGreedy, this.lexerActionExecutor);
      } else {
        return this.transformImpl(state, this._context, this.semanticContext, checkNonGreedy, arg2);
      }
    }
  }, {
    key: "transformImpl",
    value: function transformImpl(state, context, semanticContext, checkNonGreedy, lexerActionExecutor) {
      var passedThroughNonGreedy = checkNonGreedy && ATNConfig.checkNonGreedyDecision(this, state);

      if (semanticContext !== SemanticContext_1.SemanticContext.NONE) {
        if (lexerActionExecutor != null || passedThroughNonGreedy) {
          return new ActionSemanticContextATNConfig(lexerActionExecutor, semanticContext, state, this, context, passedThroughNonGreedy);
        } else {
          return new SemanticContextATNConfig(semanticContext, state, this, context);
        }
      } else if (lexerActionExecutor != null || passedThroughNonGreedy) {
        return new ActionATNConfig(lexerActionExecutor, state, this, context, passedThroughNonGreedy);
      } else {
        return new ATNConfig(state, this, context);
      }
    }
  }, {
    key: "appendContext",
    value: function appendContext(context, contextCache) {
      if (typeof context === "number") {
        var appendedContext = this.context.appendSingleContext(context, contextCache);
        var result = this.transform(this.state, false, appendedContext);
        return result;
      } else {
        var _appendedContext = this.context.appendContext(context, contextCache);

        var _result = this.transform(this.state, false, _appendedContext);

        return _result;
      }
    }
    /**
     * Determines if this `ATNConfig` fully contains another `ATNConfig`.
     *
     * An ATN configuration represents a position (including context) in an ATN during parsing. Since `ATNConfig` stores
     * the context as a graph, a single `ATNConfig` instance is capable of representing many ATN configurations which
     * are all in the same "location" but have different contexts. These `ATNConfig` instances are again merged when
     * they are added to an `ATNConfigSet`. This method supports `ATNConfigSet.contains` by evaluating whether a
     * particular `ATNConfig` contains all of the ATN configurations represented by another `ATNConfig`.
     *
     * An `ATNConfig` _a_ contains another `ATNConfig` _b_ if all of the following conditions are met:
     *
     * * The configurations are in the same state (`state`)
     * * The configurations predict the same alternative (`alt`)
     * * The semantic context of _a_ implies the semantic context of _b_ (this method performs a weaker equality check)
     * * Joining the prediction contexts of _a_ and _b_ results in the prediction context of _a_
     *
     * This method implements a conservative approximation of containment. As a result, when this method returns `true`
     * it is known that parsing from `subconfig` can only recognize a subset of the inputs which can be recognized
     * starting at the current `ATNConfig`. However, due to the imprecise evaluation of implication for the semantic
     * contexts, no assumptions can be made about the relationship between the configurations when this method returns
     * `false`.
     *
     * @param subconfig The sub configuration.
     * @returns `true` if this configuration contains `subconfig`; otherwise, `false`.
     */

  }, {
    key: "contains",
    value: function contains(subconfig) {
      if (this.state.stateNumber !== subconfig.state.stateNumber || this.alt !== subconfig.alt || !this.semanticContext.equals(subconfig.semanticContext)) {
        return false;
      }

      var leftWorkList = [];
      var rightWorkList = [];
      leftWorkList.push(this.context);
      rightWorkList.push(subconfig.context);

      while (true) {
        var left = leftWorkList.pop();
        var right = rightWorkList.pop();

        if (!left || !right) {
          break;
        }

        if (left === right) {
          return true;
        }

        if (left.size < right.size) {
          return false;
        }

        if (right.isEmpty) {
          return left.hasEmpty;
        } else {
          for (var i = 0; i < right.size; i++) {
            var index = left.findReturnState(right.getReturnState(i));

            if (index < 0) {
              // assumes invokingStates has no duplicate entries
              return false;
            }

            leftWorkList.push(left.getParent(index));
            rightWorkList.push(right.getParent(i));
          }
        }
      }

      return false;
    }
  }, {
    key: "equals",

    /** An ATN configuration is equal to another if both have
     *  the same state, they predict the same alternative, and
     *  syntactic/semantic contexts are the same.
     */
    value: function equals(o) {
      if (this === o) {
        return true;
      } else if (!(o instanceof ATNConfig)) {
        return false;
      }

      return this.state.stateNumber === o.state.stateNumber && this.alt === o.alt && this.reachesIntoOuterContext === o.reachesIntoOuterContext && this.context.equals(o.context) && this.semanticContext.equals(o.semanticContext) && this.isPrecedenceFilterSuppressed === o.isPrecedenceFilterSuppressed && this.hasPassedThroughNonGreedyDecision === o.hasPassedThroughNonGreedyDecision && ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE.equals(this.lexerActionExecutor, o.lexerActionExecutor);
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hashCode = MurmurHash_1.MurmurHash.initialize(7);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.state.stateNumber);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.alt);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.reachesIntoOuterContext ? 1 : 0);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.context);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.semanticContext);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.hasPassedThroughNonGreedyDecision ? 1 : 0);
      hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.lexerActionExecutor);
      hashCode = MurmurHash_1.MurmurHash.finish(hashCode, 7);
      return hashCode;
    }
    /**
     * Returns a graphical representation of the current `ATNConfig` in Graphviz format. The graph can be stored to a
     * **.dot** file and then rendered to an image using Graphviz.
     *
     * @returns A Graphviz graph representing the current `ATNConfig`.
     *
     * @see http://www.graphviz.org/
     */

  }, {
    key: "toDotString",
    value: function toDotString() {
      var builder = "";
      builder += "digraph G {\n";
      builder += "rankdir=LR;\n";
      var visited = new Array2DHashMap_1.Array2DHashMap(PredictionContext_1.PredictionContext.IdentityEqualityComparator.INSTANCE);
      var workList = [];

      function getOrAddContext(context) {
        var newNumber = visited.size;
        var result = visited.putIfAbsent(context, newNumber);

        if (result != null) {
          // Already saw this context
          return result;
        }

        workList.push(context);
        return newNumber;
      }

      workList.push(this.context);
      visited.put(this.context, 0);

      while (true) {
        var current = workList.pop();

        if (!current) {
          break;
        }

        for (var i = 0; i < current.size; i++) {
          builder += "  s" + getOrAddContext(current);
          builder += "->";
          builder += "s" + getOrAddContext(current.getParent(i));
          builder += "[label=\"" + current.getReturnState(i) + "\"];\n";
        }
      }

      builder += "}\n";
      return builder.toString();
    }
  }, {
    key: "toString",
    value: function toString(recog, showAlt, showContext) {
      // Must check showContext before showAlt to preserve original overload behavior
      if (showContext == null) {
        showContext = showAlt != null;
      }

      if (showAlt == null) {
        showAlt = true;
      }

      var buf = ""; // if (this.state.ruleIndex >= 0) {
      // 	if (recog != null) {
      // 		buf += (recog.ruleNames[this.state.ruleIndex] + ":");
      // 	} else {
      // 		buf += (this.state.ruleIndex + ":");
      // 	}
      // }

      var contexts;

      if (showContext) {
        contexts = this.context.toStrings(recog, this.state.stateNumber);
      } else {
        contexts = ["?"];
      }

      var first = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = contexts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var contextDesc = _step.value;

          if (first) {
            first = false;
          } else {
            buf += ", ";
          }

          buf += "(";
          buf += this.state;

          if (showAlt) {
            buf += ",";
            buf += this.alt;
          }

          if (this.context) {
            buf += ",";
            buf += contextDesc;
          }

          if (this.semanticContext !== SemanticContext_1.SemanticContext.NONE) {
            buf += ",";
            buf += this.semanticContext;
          }

          if (this.reachesIntoOuterContext) {
            buf += ",up=" + this.outerContextDepth;
          }

          buf += ")";
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

      return buf.toString();
    }
  }, {
    key: "state",

    /** Gets the ATN state associated with this configuration */
    get: function get() {
      return this._state;
    }
    /** What alt (or lexer rule) is predicted by this configuration */

  }, {
    key: "alt",
    get: function get() {
      return this.altAndOuterContextDepth & 0x00FFFFFF;
    }
  }, {
    key: "context",
    get: function get() {
      return this._context;
    },
    set: function set(context) {
      this._context = context;
    }
  }, {
    key: "reachesIntoOuterContext",
    get: function get() {
      return this.outerContextDepth !== 0;
    }
    /**
     * We cannot execute predicates dependent upon local context unless
     * we know for sure we are in the correct context. Because there is
     * no way to do this efficiently, we simply cannot evaluate
     * dependent predicates unless we are in the rule that initially
     * invokes the ATN simulator.
     *
     * closure() tracks the depth of how far we dip into the outer context:
     * depth &gt; 0.  Note that it may not be totally accurate depth since I
     * don't ever decrement. TODO: make it a boolean then
     */

  }, {
    key: "outerContextDepth",
    get: function get() {
      return this.altAndOuterContextDepth >>> 24 & 0x7F;
    },
    set: function set(outerContextDepth) {
      assert(outerContextDepth >= 0); // saturate at 0x7F - everything but zero/positive is only used for debug information anyway

      outerContextDepth = Math.min(outerContextDepth, 0x7F);
      this.altAndOuterContextDepth = outerContextDepth << 24 | (this.altAndOuterContextDepth & ~0x7F000000) >>> 0;
    }
  }, {
    key: "lexerActionExecutor",
    get: function get() {
      return undefined;
    }
  }, {
    key: "semanticContext",
    get: function get() {
      return SemanticContext_1.SemanticContext.NONE;
    }
  }, {
    key: "hasPassedThroughNonGreedyDecision",
    get: function get() {
      return false;
    }
  }, {
    key: "isPrecedenceFilterSuppressed",
    get: function get() {
      return (this.altAndOuterContextDepth & SUPPRESS_PRECEDENCE_FILTER) !== 0;
    },
    set: function set(value) {
      if (value) {
        this.altAndOuterContextDepth |= SUPPRESS_PRECEDENCE_FILTER;
      } else {
        this.altAndOuterContextDepth &= ~SUPPRESS_PRECEDENCE_FILTER;
      }
    }
  }], [{
    key: "create",
    value: function create(state, alt, context) {
      var semanticContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : SemanticContext_1.SemanticContext.NONE;
      var lexerActionExecutor = arguments.length > 4 ? arguments[4] : undefined;

      if (semanticContext !== SemanticContext_1.SemanticContext.NONE) {
        if (lexerActionExecutor != null) {
          return new ActionSemanticContextATNConfig(lexerActionExecutor, semanticContext, state, alt, context, false);
        } else {
          return new SemanticContextATNConfig(semanticContext, state, alt, context);
        }
      } else if (lexerActionExecutor != null) {
        return new ActionATNConfig(lexerActionExecutor, state, alt, context, false);
      } else {
        return new ATNConfig(state, alt, context);
      }
    }
  }, {
    key: "checkNonGreedyDecision",
    value: function checkNonGreedyDecision(source, target) {
      return source.hasPassedThroughNonGreedyDecision || target instanceof DecisionState_1.DecisionState && target.nonGreedy;
    }
  }]);
  return ATNConfig;
}();

__decorate([Decorators_1.NotNull], ATNConfig.prototype, "_state", void 0);

__decorate([Decorators_1.NotNull], ATNConfig.prototype, "_context", void 0);

__decorate([Decorators_1.NotNull], ATNConfig.prototype, "state", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], ATNConfig.prototype, "context", null);

__decorate([Decorators_1.NotNull], ATNConfig.prototype, "semanticContext", null);

__decorate([Decorators_1.Override], ATNConfig.prototype, "clone", null);

__decorate([__param(0, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ATNConfig.prototype, "transformImpl", null);

__decorate([Decorators_1.Override], ATNConfig.prototype, "equals", null);

__decorate([Decorators_1.Override], ATNConfig.prototype, "hashCode", null);

__decorate([__param(0, Decorators_1.NotNull), __param(3, Decorators_1.NotNull)], ATNConfig, "create", null);

ATNConfig = __decorate([__param(0, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ATNConfig);
exports.ATNConfig = ATNConfig;
/**
 * This class was derived from `ATNConfig` purely as a memory optimization. It allows for the creation of an `ATNConfig`
 * with a non-default semantic context.
 *
 * See the `ATNConfig` documentation for more information about conserving memory through the use of several concrete
 * types.
 */

var SemanticContextATNConfig =
/*#__PURE__*/
function (_ATNConfig) {
  (0, _inherits2["default"])(SemanticContextATNConfig, _ATNConfig);

  function SemanticContextATNConfig(semanticContext, state, altOrConfig, context) {
    var _this;

    (0, _classCallCheck2["default"])(this, SemanticContextATNConfig);

    if (typeof altOrConfig === "number") {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SemanticContextATNConfig).call(this, state, altOrConfig, context));
    } else {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SemanticContextATNConfig).call(this, state, altOrConfig, context));
    }

    _this._semanticContext = semanticContext;
    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(SemanticContextATNConfig, [{
    key: "semanticContext",
    get: function get() {
      return this._semanticContext;
    }
  }]);
  return SemanticContextATNConfig;
}(ATNConfig);

__decorate([Decorators_1.NotNull], SemanticContextATNConfig.prototype, "_semanticContext", void 0);

__decorate([Decorators_1.Override], SemanticContextATNConfig.prototype, "semanticContext", null);

SemanticContextATNConfig = __decorate([__param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], SemanticContextATNConfig);
/**
 * This class was derived from `ATNConfig` purely as a memory optimization. It allows for the creation of an `ATNConfig`
 * with a lexer action.
 *
 * See the `ATNConfig` documentation for more information about conserving memory through the use of several concrete
 * types.
 */

var ActionATNConfig =
/*#__PURE__*/
function (_ATNConfig2) {
  (0, _inherits2["default"])(ActionATNConfig, _ATNConfig2);

  function ActionATNConfig(lexerActionExecutor, state, altOrConfig, context, passedThroughNonGreedyDecision) {
    var _this2;

    (0, _classCallCheck2["default"])(this, ActionATNConfig);

    if (typeof altOrConfig === "number") {
      _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActionATNConfig).call(this, state, altOrConfig, context));
    } else {
      _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActionATNConfig).call(this, state, altOrConfig, context));

      if (altOrConfig.semanticContext !== SemanticContext_1.SemanticContext.NONE) {
        throw new Error("Not supported");
      }
    }

    _this2._lexerActionExecutor = lexerActionExecutor;
    _this2.passedThroughNonGreedyDecision = passedThroughNonGreedyDecision;
    return (0, _possibleConstructorReturn2["default"])(_this2);
  }

  (0, _createClass2["default"])(ActionATNConfig, [{
    key: "lexerActionExecutor",
    get: function get() {
      return this._lexerActionExecutor;
    }
  }, {
    key: "hasPassedThroughNonGreedyDecision",
    get: function get() {
      return this.passedThroughNonGreedyDecision;
    }
  }]);
  return ActionATNConfig;
}(ATNConfig);

__decorate([Decorators_1.Override], ActionATNConfig.prototype, "lexerActionExecutor", null);

__decorate([Decorators_1.Override], ActionATNConfig.prototype, "hasPassedThroughNonGreedyDecision", null);

ActionATNConfig = __decorate([__param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ActionATNConfig);
/**
 * This class was derived from `SemanticContextATNConfig` purely as a memory optimization. It allows for the creation of
 * an `ATNConfig` with both a lexer action and a non-default semantic context.
 *
 * See the `ATNConfig` documentation for more information about conserving memory through the use of several concrete
 * types.
 */

var ActionSemanticContextATNConfig =
/*#__PURE__*/
function (_SemanticContextATNCo) {
  (0, _inherits2["default"])(ActionSemanticContextATNConfig, _SemanticContextATNCo);

  function ActionSemanticContextATNConfig(lexerActionExecutor, semanticContext, state, altOrConfig, context, passedThroughNonGreedyDecision) {
    var _this3;

    (0, _classCallCheck2["default"])(this, ActionSemanticContextATNConfig);

    if (typeof altOrConfig === "number") {
      _this3 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActionSemanticContextATNConfig).call(this, semanticContext, state, altOrConfig, context));
    } else {
      _this3 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActionSemanticContextATNConfig).call(this, semanticContext, state, altOrConfig, context));
    }

    _this3._lexerActionExecutor = lexerActionExecutor;
    _this3.passedThroughNonGreedyDecision = passedThroughNonGreedyDecision;
    return (0, _possibleConstructorReturn2["default"])(_this3);
  }

  (0, _createClass2["default"])(ActionSemanticContextATNConfig, [{
    key: "lexerActionExecutor",
    get: function get() {
      return this._lexerActionExecutor;
    }
  }, {
    key: "hasPassedThroughNonGreedyDecision",
    get: function get() {
      return this.passedThroughNonGreedyDecision;
    }
  }]);
  return ActionSemanticContextATNConfig;
}(SemanticContextATNConfig);

__decorate([Decorators_1.Override], ActionSemanticContextATNConfig.prototype, "lexerActionExecutor", null);

__decorate([Decorators_1.Override], ActionSemanticContextATNConfig.prototype, "hasPassedThroughNonGreedyDecision", null);

ActionSemanticContextATNConfig = __decorate([__param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], ActionSemanticContextATNConfig);
//# sourceMappingURL=ATNConfig.js.map
