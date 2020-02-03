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
}); // ConvertTo-TS run at 2016-10-04T11:26:36.9521478-07:00

var Array2DHashSet_1 = require("../misc/Array2DHashSet");

var ArrayEqualityComparator_1 = require("../misc/ArrayEqualityComparator");

var MurmurHash_1 = require("../misc/MurmurHash");

var Decorators_1 = require("../Decorators");

var ObjectEqualityComparator_1 = require("../misc/ObjectEqualityComparator");

var Utils = require("../misc/Utils");

function max(items) {
  var result;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var current = _step.value;

      if (result === undefined) {
        result = current;
        continue;
      }

      var comparison = result.compareTo(current);

      if (comparison < 0) {
        result = current;
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

  return result;
}

function min(items) {
  var result;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var current = _step2.value;

      if (result === undefined) {
        result = current;
        continue;
      }

      var comparison = result.compareTo(current);

      if (comparison > 0) {
        result = current;
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

  return result;
}
/** A tree structure used to record the semantic context in which
 *  an ATN configuration is valid.  It's either a single predicate,
 *  a conjunction `p1&&p2`, or a sum of products `p1||p2`.
 *
 *  I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
 *  {@link SemanticContext} within the scope of this outer class.
 */


var SemanticContext =
/*#__PURE__*/
function () {
  function SemanticContext() {
    (0, _classCallCheck2["default"])(this, SemanticContext);
  }

  (0, _createClass2["default"])(SemanticContext, [{
    key: "evalPrecedence",

    /**
     * Evaluate the precedence predicates for the context and reduce the result.
     *
     * @param parser The parser instance.
     * @param parserCallStack
     * @returns The simplified semantic context after precedence predicates are
     * evaluated, which will be one of the following values.
     *
     * * {@link #NONE}: if the predicate simplifies to `true` after
     *   precedence predicates are evaluated.
     * * `undefined`: if the predicate simplifies to `false` after
     *   precedence predicates are evaluated.
     * * `this`: if the semantic context is not changed as a result of
     *   precedence predicate evaluation.
     * * A non-`undefined` {@link SemanticContext}: the new simplified
     *   semantic context after precedence predicates are evaluated.
     */
    value: function evalPrecedence(parser, parserCallStack) {
      return this;
    }
  }], [{
    key: "and",
    value: function and(a, b) {
      if (!a || a === SemanticContext.NONE) {
        return b;
      }

      if (b === SemanticContext.NONE) {
        return a;
      }

      var result = new SemanticContext.AND(a, b);

      if (result.opnds.length === 1) {
        return result.opnds[0];
      }

      return result;
    }
    /**
     *
     *  @see ParserATNSimulator#getPredsForAmbigAlts
     */

  }, {
    key: "or",
    value: function or(a, b) {
      if (!a) {
        return b;
      }

      if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
        return SemanticContext.NONE;
      }

      var result = new SemanticContext.OR(a, b);

      if (result.opnds.length === 1) {
        return result.opnds[0];
      }

      return result;
    }
  }, {
    key: "NONE",

    /**
     * The default {@link SemanticContext}, which is semantically equivalent to
     * a predicate of the form `{true}?`.
     */
    get: function get() {
      if (SemanticContext._NONE === undefined) {
        SemanticContext._NONE = new SemanticContext.Predicate();
      }

      return SemanticContext._NONE;
    }
  }]);
  return SemanticContext;
}();

exports.SemanticContext = SemanticContext;

(function (SemanticContext) {
  /**
   * This random 30-bit prime represents the value of `AND.class.hashCode()`.
   */
  var AND_HASHCODE = 40363613;
  /**
   * This random 30-bit prime represents the value of `OR.class.hashCode()`.
   */

  var OR_HASHCODE = 486279973;

  function filterPrecedencePredicates(collection) {
    var result = [];

    for (var i = 0; i < collection.length; i++) {
      var context = collection[i];

      if (context instanceof SemanticContext.PrecedencePredicate) {
        result.push(context); // Remove the item from 'collection' and move i back so we look at the same index again

        collection.splice(i, 1);
        i--;
      }
    }

    return result;
  }

  var Predicate =
  /*#__PURE__*/
  function (_SemanticContext) {
    (0, _inherits2["default"])(Predicate, _SemanticContext);

    function Predicate() {
      var _this;

      var ruleIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var predIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var isCtxDependent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      (0, _classCallCheck2["default"])(this, Predicate);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Predicate).call(this));
      _this.ruleIndex = ruleIndex;
      _this.predIndex = predIndex;
      _this.isCtxDependent = isCtxDependent;
      return _this;
    }

    (0, _createClass2["default"])(Predicate, [{
      key: "eval",
      value: function _eval(parser, parserCallStack) {
        var localctx = this.isCtxDependent ? parserCallStack : undefined;
        return parser.sempred(localctx, this.ruleIndex, this.predIndex);
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        var hashCode = MurmurHash_1.MurmurHash.initialize();
        hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.ruleIndex);
        hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.predIndex);
        hashCode = MurmurHash_1.MurmurHash.update(hashCode, this.isCtxDependent ? 1 : 0);
        hashCode = MurmurHash_1.MurmurHash.finish(hashCode, 3);
        return hashCode;
      }
    }, {
      key: "equals",
      value: function equals(obj) {
        if (!(obj instanceof Predicate)) {
          return false;
        }

        if (this === obj) {
          return true;
        }

        return this.ruleIndex === obj.ruleIndex && this.predIndex === obj.predIndex && this.isCtxDependent === obj.isCtxDependent;
      }
    }, {
      key: "toString",
      value: function toString() {
        return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
      }
    }]);
    return Predicate;
  }(SemanticContext);

  __decorate([Decorators_1.Override], Predicate.prototype, "eval", null);

  __decorate([Decorators_1.Override], Predicate.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], Predicate.prototype, "equals", null);

  __decorate([Decorators_1.Override], Predicate.prototype, "toString", null);

  SemanticContext.Predicate = Predicate;

  var PrecedencePredicate =
  /*#__PURE__*/
  function (_SemanticContext2) {
    (0, _inherits2["default"])(PrecedencePredicate, _SemanticContext2);

    function PrecedencePredicate(precedence) {
      var _this2;

      (0, _classCallCheck2["default"])(this, PrecedencePredicate);
      _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PrecedencePredicate).call(this));
      _this2.precedence = precedence;
      return _this2;
    }

    (0, _createClass2["default"])(PrecedencePredicate, [{
      key: "eval",
      value: function _eval(parser, parserCallStack) {
        return parser.precpred(parserCallStack, this.precedence);
      }
    }, {
      key: "evalPrecedence",
      value: function evalPrecedence(parser, parserCallStack) {
        if (parser.precpred(parserCallStack, this.precedence)) {
          return SemanticContext.NONE;
        } else {
          return undefined;
        }
      }
    }, {
      key: "compareTo",
      value: function compareTo(o) {
        return this.precedence - o.precedence;
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        var hashCode = 1;
        hashCode = 31 * hashCode + this.precedence;
        return hashCode;
      }
    }, {
      key: "equals",
      value: function equals(obj) {
        if (!(obj instanceof PrecedencePredicate)) {
          return false;
        }

        if (this === obj) {
          return true;
        }

        return this.precedence === obj.precedence;
      }
    }, {
      key: "toString",
      value: function toString() {
        return "{" + this.precedence + ">=prec}?";
      }
    }]);
    return PrecedencePredicate;
  }(SemanticContext);

  __decorate([Decorators_1.Override], PrecedencePredicate.prototype, "eval", null);

  __decorate([Decorators_1.Override], PrecedencePredicate.prototype, "evalPrecedence", null);

  __decorate([Decorators_1.Override], PrecedencePredicate.prototype, "compareTo", null);

  __decorate([Decorators_1.Override], PrecedencePredicate.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], PrecedencePredicate.prototype, "equals", null);

  __decorate([Decorators_1.Override // precedence >= _precedenceStack.peek()
  ], PrecedencePredicate.prototype, "toString", null);

  SemanticContext.PrecedencePredicate = PrecedencePredicate;
  /**
   * This is the base class for semantic context "operators", which operate on
   * a collection of semantic context "operands".
   *
   * @since 4.3
   */

  var Operator =
  /*#__PURE__*/
  function (_SemanticContext3) {
    (0, _inherits2["default"])(Operator, _SemanticContext3);

    function Operator() {
      (0, _classCallCheck2["default"])(this, Operator);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Operator).apply(this, arguments));
    }

    return Operator;
  }(SemanticContext);

  SemanticContext.Operator = Operator;
  /**
   * A semantic context which is true whenever none of the contained contexts
   * is false.
   */

  var AND =
  /*#__PURE__*/
  function (_Operator) {
    (0, _inherits2["default"])(AND, _Operator);

    function AND(a, b) {
      var _this3;

      (0, _classCallCheck2["default"])(this, AND);
      _this3 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AND).call(this));
      var operands = new Array2DHashSet_1.Array2DHashSet(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);

      if (a instanceof AND) {
        operands.addAll(a.opnds);
      } else {
        operands.add(a);
      }

      if (b instanceof AND) {
        operands.addAll(b.opnds);
      } else {
        operands.add(b);
      }

      _this3.opnds = operands.toArray();
      var precedencePredicates = filterPrecedencePredicates(_this3.opnds); // interested in the transition with the lowest precedence

      var reduced = min(precedencePredicates);

      if (reduced) {
        _this3.opnds.push(reduced);
      }

      return _this3;
    }

    (0, _createClass2["default"])(AND, [{
      key: "equals",
      value: function equals(obj) {
        if (this === obj) {
          return true;
        }

        if (!(obj instanceof AND)) {
          return false;
        }

        return ArrayEqualityComparator_1.ArrayEqualityComparator.INSTANCE.equals(this.opnds, obj.opnds);
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        return MurmurHash_1.MurmurHash.hashCode(this.opnds, AND_HASHCODE);
      }
      /**
       * {@inheritDoc}
       *
       * The evaluation of predicates by this context is short-circuiting, but
       * unordered.
       */

    }, {
      key: "eval",
      value: function _eval(parser, parserCallStack) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.opnds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var opnd = _step3.value;

            if (!opnd.eval(parser, parserCallStack)) {
              return false;
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

        return true;
      }
    }, {
      key: "evalPrecedence",
      value: function evalPrecedence(parser, parserCallStack) {
        var differs = false;
        var operands = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.opnds[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var context = _step4.value;
            var evaluated = context.evalPrecedence(parser, parserCallStack);
            differs = differs || evaluated !== context;

            if (evaluated == null) {
              // The AND context is false if any element is false
              return undefined;
            } else if (evaluated !== SemanticContext.NONE) {
              // Reduce the result by skipping true elements
              operands.push(evaluated);
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

        if (!differs) {
          return this;
        }

        if (operands.length === 0) {
          // all elements were true, so the AND context is true
          return SemanticContext.NONE;
        }

        var result = operands[0];

        for (var i = 1; i < operands.length; i++) {
          result = SemanticContext.and(result, operands[i]);
        }

        return result;
      }
    }, {
      key: "toString",
      value: function toString() {
        return Utils.join(this.opnds, "&&");
      }
    }, {
      key: "operands",
      get: function get() {
        return this.opnds;
      }
    }]);
    return AND;
  }(Operator);

  __decorate([Decorators_1.Override], AND.prototype, "operands", null);

  __decorate([Decorators_1.Override], AND.prototype, "equals", null);

  __decorate([Decorators_1.Override], AND.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], AND.prototype, "eval", null);

  __decorate([Decorators_1.Override], AND.prototype, "evalPrecedence", null);

  __decorate([Decorators_1.Override], AND.prototype, "toString", null);

  AND = __decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull)], AND);
  SemanticContext.AND = AND;
  /**
   * A semantic context which is true whenever at least one of the contained
   * contexts is true.
   */

  var OR =
  /*#__PURE__*/
  function (_Operator2) {
    (0, _inherits2["default"])(OR, _Operator2);

    function OR(a, b) {
      var _this4;

      (0, _classCallCheck2["default"])(this, OR);
      _this4 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(OR).call(this));
      var operands = new Array2DHashSet_1.Array2DHashSet(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);

      if (a instanceof OR) {
        operands.addAll(a.opnds);
      } else {
        operands.add(a);
      }

      if (b instanceof OR) {
        operands.addAll(b.opnds);
      } else {
        operands.add(b);
      }

      _this4.opnds = operands.toArray();
      var precedencePredicates = filterPrecedencePredicates(_this4.opnds); // interested in the transition with the highest precedence

      var reduced = max(precedencePredicates);

      if (reduced) {
        _this4.opnds.push(reduced);
      }

      return _this4;
    }

    (0, _createClass2["default"])(OR, [{
      key: "equals",
      value: function equals(obj) {
        if (this === obj) {
          return true;
        }

        if (!(obj instanceof OR)) {
          return false;
        }

        return ArrayEqualityComparator_1.ArrayEqualityComparator.INSTANCE.equals(this.opnds, obj.opnds);
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        return MurmurHash_1.MurmurHash.hashCode(this.opnds, OR_HASHCODE);
      }
      /**
       * {@inheritDoc}
       *
       * The evaluation of predicates by this context is short-circuiting, but
       * unordered.
       */

    }, {
      key: "eval",
      value: function _eval(parser, parserCallStack) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.opnds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var opnd = _step5.value;

            if (opnd.eval(parser, parserCallStack)) {
              return true;
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

        return false;
      }
    }, {
      key: "evalPrecedence",
      value: function evalPrecedence(parser, parserCallStack) {
        var differs = false;
        var operands = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.opnds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var context = _step6.value;
            var evaluated = context.evalPrecedence(parser, parserCallStack);
            differs = differs || evaluated !== context;

            if (evaluated === SemanticContext.NONE) {
              // The OR context is true if any element is true
              return SemanticContext.NONE;
            } else if (evaluated) {
              // Reduce the result by skipping false elements
              operands.push(evaluated);
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        if (!differs) {
          return this;
        }

        if (operands.length === 0) {
          // all elements were false, so the OR context is false
          return undefined;
        }

        var result = operands[0];

        for (var i = 1; i < operands.length; i++) {
          result = SemanticContext.or(result, operands[i]);
        }

        return result;
      }
    }, {
      key: "toString",
      value: function toString() {
        return Utils.join(this.opnds, "||");
      }
    }, {
      key: "operands",
      get: function get() {
        return this.opnds;
      }
    }]);
    return OR;
  }(Operator);

  __decorate([Decorators_1.Override], OR.prototype, "operands", null);

  __decorate([Decorators_1.Override], OR.prototype, "equals", null);

  __decorate([Decorators_1.Override], OR.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], OR.prototype, "eval", null);

  __decorate([Decorators_1.Override], OR.prototype, "evalPrecedence", null);

  __decorate([Decorators_1.Override], OR.prototype, "toString", null);

  OR = __decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull)], OR);
  SemanticContext.OR = OR;
})(SemanticContext = exports.SemanticContext || (exports.SemanticContext = {}));
//# sourceMappingURL=SemanticContext.js.map
