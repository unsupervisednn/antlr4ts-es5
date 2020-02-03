"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:36.2673893-07:00

var Array2DHashMap_1 = require("../misc/Array2DHashMap");

var MurmurHash_1 = require("../misc/MurmurHash");

var Decorators_1 = require("../Decorators");

var RuleStopState_1 = require("./RuleStopState");
/**
 * This enumeration defines the prediction modes available in ANTLR 4 along with
 * utility methods for analyzing configuration sets for conflicts and/or
 * ambiguities.
 */


var PredictionMode;

(function (PredictionMode) {
  /**
   * The SLL(*) prediction mode. This prediction mode ignores the current
   * parser context when making predictions. This is the fastest prediction
   * mode, and provides correct results for many grammars. This prediction
   * mode is more powerful than the prediction mode provided by ANTLR 3, but
   * may result in syntax errors for grammar and input combinations which are
   * not SLL.
   *
   * When using this prediction mode, the parser will either return a correct
   * parse tree (i.e. the same parse tree that would be returned with the
   * {@link #LL} prediction mode), or it will report a syntax error. If a
   * syntax error is encountered when using the {@link #SLL} prediction mode,
   * it may be due to either an actual syntax error in the input or indicate
   * that the particular combination of grammar and input requires the more
   * powerful {@link #LL} prediction abilities to complete successfully.
   *
   * This prediction mode does not provide any guarantees for prediction
   * behavior for syntactically-incorrect inputs.
   */
  PredictionMode[PredictionMode["SLL"] = 0] = "SLL";
  /**
   * The LL(*) prediction mode. This prediction mode allows the current parser
   * context to be used for resolving SLL conflicts that occur during
   * prediction. This is the fastest prediction mode that guarantees correct
   * parse results for all combinations of grammars with syntactically correct
   * inputs.
   *
   * When using this prediction mode, the parser will make correct decisions
   * for all syntactically-correct grammar and input combinations. However, in
   * cases where the grammar is truly ambiguous this prediction mode might not
   * report a precise answer for *exactly which* alternatives are
   * ambiguous.
   *
   * This prediction mode does not provide any guarantees for prediction
   * behavior for syntactically-incorrect inputs.
   */

  PredictionMode[PredictionMode["LL"] = 1] = "LL";
  /**
   * The LL(*) prediction mode with exact ambiguity detection. In addition to
   * the correctness guarantees provided by the {@link #LL} prediction mode,
   * this prediction mode instructs the prediction algorithm to determine the
   * complete and exact set of ambiguous alternatives for every ambiguous
   * decision encountered while parsing.
   *
   * This prediction mode may be used for diagnosing ambiguities during
   * grammar development. Due to the performance overhead of calculating sets
   * of ambiguous alternatives, this prediction mode should be avoided when
   * the exact results are not necessary.
   *
   * This prediction mode does not provide any guarantees for prediction
   * behavior for syntactically-incorrect inputs.
   */

  PredictionMode[PredictionMode["LL_EXACT_AMBIG_DETECTION"] = 2] = "LL_EXACT_AMBIG_DETECTION";
})(PredictionMode = exports.PredictionMode || (exports.PredictionMode = {}));

(function (PredictionMode) {
  /** A Map that uses just the state and the stack context as the key. */
  // NOTE: Base type used to be FlexibleHashMap<ATNConfig, BitSet>
  var AltAndContextMap =
  /*#__PURE__*/
  function (_Array2DHashMap_1$Arr) {
    (0, _inherits2["default"])(AltAndContextMap, _Array2DHashMap_1$Arr);

    function AltAndContextMap() {
      (0, _classCallCheck2["default"])(this, AltAndContextMap);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AltAndContextMap).call(this, AltAndContextConfigEqualityComparator.INSTANCE));
    }

    return AltAndContextMap;
  }(Array2DHashMap_1.Array2DHashMap);

  var AltAndContextConfigEqualityComparator =
  /*#__PURE__*/
  function () {
    function AltAndContextConfigEqualityComparator() {
      (0, _classCallCheck2["default"])(this, AltAndContextConfigEqualityComparator);
    }

    (0, _createClass2["default"])(AltAndContextConfigEqualityComparator, [{
      key: "AltAndContextConfigEqualityComparator",
      value: function AltAndContextConfigEqualityComparator() {} // intentionally empty

      /**
       * The hash code is only a function of the {@link ATNState#stateNumber}
       * and {@link ATNConfig#context}.
       */

    }, {
      key: "hashCode",
      value: function hashCode(o) {
        var hashCode = MurmurHash_1.MurmurHash.initialize(7);
        hashCode = MurmurHash_1.MurmurHash.update(hashCode, o.state.stateNumber);
        hashCode = MurmurHash_1.MurmurHash.update(hashCode, o.context);
        hashCode = MurmurHash_1.MurmurHash.finish(hashCode, 2);
        return hashCode;
      }
    }, {
      key: "equals",
      value: function equals(a, b) {
        if (a === b) {
          return true;
        }

        if (a == null || b == null) {
          return false;
        }

        return a.state.stateNumber === b.state.stateNumber && a.context.equals(b.context);
      }
    }]);
    return AltAndContextConfigEqualityComparator;
  }();

  AltAndContextConfigEqualityComparator.INSTANCE = new AltAndContextConfigEqualityComparator();

  __decorate([Decorators_1.Override], AltAndContextConfigEqualityComparator.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], AltAndContextConfigEqualityComparator.prototype, "equals", null);
  /**
   * Checks if any configuration in `configs` is in a
   * {@link RuleStopState}. Configurations meeting this condition have reached
   * the end of the decision rule (local context) or end of start rule (full
   * context).
   *
   * @param configs the configuration set to test
   * @returns `true` if any configuration in `configs` is in a
   * {@link RuleStopState}, otherwise `false`
   */


  function hasConfigInRuleStopState(configs) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = configs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        if (c.state instanceof RuleStopState_1.RuleStopState) {
          return true;
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

    return false;
  }

  PredictionMode.hasConfigInRuleStopState = hasConfigInRuleStopState;
  /**
   * Checks if all configurations in `configs` are in a
   * {@link RuleStopState}. Configurations meeting this condition have reached
   * the end of the decision rule (local context) or end of start rule (full
   * context).
   *
   * @param configs the configuration set to test
   * @returns `true` if all configurations in `configs` are in a
   * {@link RuleStopState}, otherwise `false`
   */

  function allConfigsInRuleStopStates(
  /*@NotNull*/
  configs) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = configs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var config = _step2.value;

        if (!(config.state instanceof RuleStopState_1.RuleStopState)) {
          return false;
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

    return true;
  }

  PredictionMode.allConfigsInRuleStopStates = allConfigsInRuleStopStates;
})(PredictionMode = exports.PredictionMode || (exports.PredictionMode = {}));
//# sourceMappingURL=PredictionMode.js.map
