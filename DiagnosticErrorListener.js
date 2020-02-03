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

var BitSet_1 = require("./misc/BitSet");

var Decorators_1 = require("./Decorators");

var Interval_1 = require("./misc/Interval");
/**
 * This implementation of {@link ANTLRErrorListener} can be used to identify
 * certain potential correctness and performance problems in grammars. "Reports"
 * are made by calling {@link Parser#notifyErrorListeners} with the appropriate
 * message.
 *
 * * **Ambiguities**: These are cases where more than one path through the
 *   grammar can match the input.
 * * **Weak context sensitivity**: These are cases where full-context
 *   prediction resolved an SLL conflict to a unique alternative which equaled the
 *   minimum alternative of the SLL conflict.
 * * **Strong (forced) context sensitivity**: These are cases where the
 *   full-context prediction resolved an SLL conflict to a unique alternative,
 *   *and* the minimum alternative of the SLL conflict was found to not be
 *   a truly viable alternative. Two-stage parsing cannot be used for inputs where
 *   this situation occurs.
 *
 * @author Sam Harwell
 */


var DiagnosticErrorListener =
/*#__PURE__*/
function () {
  /**
   * Initializes a new instance of {@link DiagnosticErrorListener}, specifying
   * whether all ambiguities or only exact ambiguities are reported.
   *
   * @param exactOnly `true` to report only exact ambiguities, otherwise
   * `false` to report all ambiguities.  Defaults to true.
   */
  function DiagnosticErrorListener() {
    var exactOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (0, _classCallCheck2["default"])(this, DiagnosticErrorListener);
    this.exactOnly = exactOnly;
    this.exactOnly = exactOnly;
  }

  (0, _createClass2["default"])(DiagnosticErrorListener, [{
    key: "syntaxError",
    value: function syntaxError(
    /*@NotNull*/
    recognizer, offendingSymbol, line, charPositionInLine,
    /*@NotNull*/
    msg, e) {// intentionally empty
    }
  }, {
    key: "reportAmbiguity",
    value: function reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
      if (this.exactOnly && !exact) {
        return;
      }

      var decision = this.getDecisionDescription(recognizer, dfa);
      var conflictingAlts = this.getConflictingAlts(ambigAlts, configs);
      var text = recognizer.inputStream.getText(Interval_1.Interval.of(startIndex, stopIndex));
      var message = "reportAmbiguity d=".concat(decision, ": ambigAlts=").concat(conflictingAlts, ", input='").concat(text, "'");
      recognizer.notifyErrorListeners(message);
    }
  }, {
    key: "reportAttemptingFullContext",
    value: function reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, conflictState) {
      var format = "reportAttemptingFullContext d=%s, input='%s'";
      var decision = this.getDecisionDescription(recognizer, dfa);
      var text = recognizer.inputStream.getText(Interval_1.Interval.of(startIndex, stopIndex));
      var message = "reportAttemptingFullContext d=".concat(decision, ", input='").concat(text, "'");
      recognizer.notifyErrorListeners(message);
    }
  }, {
    key: "reportContextSensitivity",
    value: function reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, acceptState) {
      var format = "reportContextSensitivity d=%s, input='%s'";
      var decision = this.getDecisionDescription(recognizer, dfa);
      var text = recognizer.inputStream.getText(Interval_1.Interval.of(startIndex, stopIndex));
      var message = "reportContextSensitivity d=".concat(decision, ", input='").concat(text, "'");
      recognizer.notifyErrorListeners(message);
    }
  }, {
    key: "getDecisionDescription",
    value: function getDecisionDescription(recognizer, dfa) {
      var decision = dfa.decision;
      var ruleIndex = dfa.atnStartState.ruleIndex;
      var ruleNames = recognizer.ruleNames;

      if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
        return decision.toString();
      }

      var ruleName = ruleNames[ruleIndex];

      if (!ruleName) {
        return decision.toString();
      }

      return "".concat(decision, " (").concat(ruleName, ")");
    }
    /**
     * Computes the set of conflicting or ambiguous alternatives from a
     * configuration set, if that information was not already provided by the
     * parser.
     *
     * @param reportedAlts The set of conflicting or ambiguous alternatives, as
     * reported by the parser.
     * @param configs The conflicting or ambiguous configuration set.
     * @returns Returns `reportedAlts` if it is not `undefined`, otherwise
     * returns the set of alternatives represented in `configs`.
     */

  }, {
    key: "getConflictingAlts",
    value: function getConflictingAlts(reportedAlts, configs) {
      if (reportedAlts != null) {
        return reportedAlts;
      }

      var result = new BitSet_1.BitSet();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = configs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var config = _step.value;
          result.set(config.alt);
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
  }]);
  return DiagnosticErrorListener;
}();

__decorate([Decorators_1.Override], DiagnosticErrorListener.prototype, "syntaxError", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(6, Decorators_1.NotNull)], DiagnosticErrorListener.prototype, "reportAmbiguity", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(5, Decorators_1.NotNull)], DiagnosticErrorListener.prototype, "reportAttemptingFullContext", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(5, Decorators_1.NotNull)], DiagnosticErrorListener.prototype, "reportContextSensitivity", null);

__decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull)], DiagnosticErrorListener.prototype, "getDecisionDescription", null);

__decorate([Decorators_1.NotNull, __param(1, Decorators_1.NotNull)], DiagnosticErrorListener.prototype, "getConflictingAlts", null);

exports.DiagnosticErrorListener = DiagnosticErrorListener;
//# sourceMappingURL=DiagnosticErrorListener.js.map
