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

var Decorators_1 = require("../Decorators");
/**
 * This class provides access to specific and aggregate statistics gathered
 * during profiling of a parser.
 *
 * @since 4.3
 */


var ParseInfo =
/*#__PURE__*/
function () {
  function ParseInfo(atnSimulator) {
    (0, _classCallCheck2["default"])(this, ParseInfo);
    this.atnSimulator = atnSimulator;
  }
  /**
   * Gets an array of {@link DecisionInfo} instances containing the profiling
   * information gathered for each decision in the ATN.
   *
   * @returns An array of {@link DecisionInfo} instances, indexed by decision
   * number.
   */


  (0, _createClass2["default"])(ParseInfo, [{
    key: "getDecisionInfo",
    value: function getDecisionInfo() {
      return this.atnSimulator.getDecisionInfo();
    }
    /**
     * Gets the decision numbers for decisions that required one or more
     * full-context predictions during parsing. These are decisions for which
     * {@link DecisionInfo#LL_Fallback} is non-zero.
     *
     * @returns A list of decision numbers which required one or more
     * full-context predictions during parsing.
     */

  }, {
    key: "getLLDecisions",
    value: function getLLDecisions() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var LL = [];

      for (var i = 0; i < decisions.length; i++) {
        var fallBack = decisions[i].LL_Fallback;

        if (fallBack > 0) {
          LL.push(i);
        }
      }

      return LL;
    }
    /**
     * Gets the total time spent during prediction across all decisions made
     * during parsing. This value is the sum of
     * {@link DecisionInfo#timeInPrediction} for all decisions.
     */

  }, {
    key: "getTotalTimeInPrediction",
    value: function getTotalTimeInPrediction() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var t = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = decisions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var decision = _step.value;
          t += decision.timeInPrediction;
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

      return t;
    }
    /**
     * Gets the total number of SLL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#SLL_TotalLook} for all decisions.
     */

  }, {
    key: "getTotalSLLLookaheadOps",
    value: function getTotalSLLLookaheadOps() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var k = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = decisions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var decision = _step2.value;
          k += decision.SLL_TotalLook;
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

      return k;
    }
    /**
     * Gets the total number of LL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#LL_TotalLook} for all decisions.
     */

  }, {
    key: "getTotalLLLookaheadOps",
    value: function getTotalLLLookaheadOps() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var k = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = decisions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var decision = _step3.value;
          k += decision.LL_TotalLook;
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

      return k;
    }
    /**
     * Gets the total number of ATN lookahead operations for SLL prediction
     * across all decisions made during parsing.
     */

  }, {
    key: "getTotalSLLATNLookaheadOps",
    value: function getTotalSLLATNLookaheadOps() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var k = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = decisions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var decision = _step4.value;
          k += decision.SLL_ATNTransitions;
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

      return k;
    }
    /**
     * Gets the total number of ATN lookahead operations for LL prediction
     * across all decisions made during parsing.
     */

  }, {
    key: "getTotalLLATNLookaheadOps",
    value: function getTotalLLATNLookaheadOps() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var k = 0;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = decisions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var decision = _step5.value;
          k += decision.LL_ATNTransitions;
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

      return k;
    }
    /**
     * Gets the total number of ATN lookahead operations for SLL and LL
     * prediction across all decisions made during parsing.
     *
     * This value is the sum of {@link #getTotalSLLATNLookaheadOps} and
     * {@link #getTotalLLATNLookaheadOps}.
     */

  }, {
    key: "getTotalATNLookaheadOps",
    value: function getTotalATNLookaheadOps() {
      var decisions = this.atnSimulator.getDecisionInfo();
      var k = 0;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = decisions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var decision = _step6.value;
          k += decision.SLL_ATNTransitions;
          k += decision.LL_ATNTransitions;
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

      return k;
    }
  }, {
    key: "getDFASize",
    value: function getDFASize(decision) {
      if (decision) {
        var decisionToDFA = this.atnSimulator.atn.decisionToDFA[decision];
        return decisionToDFA.states.size;
      } else {
        var n = 0;
        var _decisionToDFA = this.atnSimulator.atn.decisionToDFA;

        for (var i = 0; i < _decisionToDFA.length; i++) {
          n += this.getDFASize(i);
        }

        return n;
      }
    }
  }]);
  return ParseInfo;
}();

__decorate([Decorators_1.NotNull], ParseInfo.prototype, "getDecisionInfo", null);

__decorate([Decorators_1.NotNull], ParseInfo.prototype, "getLLDecisions", null);

ParseInfo = __decorate([__param(0, Decorators_1.NotNull)], ParseInfo);
exports.ParseInfo = ParseInfo;
//# sourceMappingURL=ParseInfo.js.map
