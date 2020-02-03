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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:36.4188352-07:00

var AmbiguityInfo_1 = require("./AmbiguityInfo");

var ATN_1 = require("./ATN");

var ATNSimulator_1 = require("./ATNSimulator");

var ContextSensitivityInfo_1 = require("./ContextSensitivityInfo");

var DecisionInfo_1 = require("./DecisionInfo");

var ErrorInfo_1 = require("./ErrorInfo");

var Decorators_1 = require("../Decorators");

var LookaheadEventInfo_1 = require("./LookaheadEventInfo");

var ParserATNSimulator_1 = require("./ParserATNSimulator");

var PredicateEvalInfo_1 = require("./PredicateEvalInfo");

var SemanticContext_1 = require("./SemanticContext");

var SimulatorState_1 = require("./SimulatorState");
/**
 * @since 4.3
 */


var ProfilingATNSimulator =
/*#__PURE__*/
function (_ParserATNSimulator_) {
  (0, _inherits2["default"])(ProfilingATNSimulator, _ParserATNSimulator_);

  function ProfilingATNSimulator(parser) {
    var _this;

    (0, _classCallCheck2["default"])(this, ProfilingATNSimulator);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ProfilingATNSimulator).call(this, parser.interpreter.atn, parser));
    _this._startIndex = 0;
    _this._sllStopIndex = 0;
    _this._llStopIndex = 0;
    _this.currentDecision = 0;
    /** At the point of LL failover, we record how SLL would resolve the conflict so that
     *  we can determine whether or not a decision / input pair is context-sensitive.
     *  If LL gives a different result than SLL's predicted alternative, we have a
     *  context sensitivity for sure. The converse is not necessarily true, however.
     *  It's possible that after conflict resolution chooses minimum alternatives,
     *  SLL could get the same answer as LL. Regardless of whether or not the result indicates
     *  an ambiguity, it is not treated as a context sensitivity because LL prediction
     *  was not required in order to produce a correct prediction for this decision and input sequence.
     *  It may in fact still be a context sensitivity but we don't know by looking at the
     *  minimum alternatives for the current input.
     */

    _this.conflictingAltResolvedBySLL = 0;
    _this.optimize_ll1 = false;
    _this.reportAmbiguities = true;
    _this.numDecisions = _this.atn.decisionToState.length;
    _this.decisions = [];

    for (var i = 0; i < _this.numDecisions; i++) {
      _this.decisions.push(new DecisionInfo_1.DecisionInfo(i));
    }

    return _this;
  }

  (0, _createClass2["default"])(ProfilingATNSimulator, [{
    key: "adaptivePredict",
    value: function adaptivePredict(input, decision, outerContext, useContext) {
      if (useContext !== undefined) {
        return (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "adaptivePredict", this).call(this, input, decision, outerContext, useContext);
      }

      try {
        this._input = input;
        this._startIndex = input.index; // it's possible for SLL to reach a conflict state without consuming any input

        this._sllStopIndex = this._startIndex - 1;
        this._llStopIndex = -1;
        this.currentDecision = decision;
        this.currentState = undefined;
        this.conflictingAltResolvedBySLL = ATN_1.ATN.INVALID_ALT_NUMBER;
        var start = process.hrtime();
        var alt = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "adaptivePredict", this).call(this, input, decision, outerContext);
        var stop = process.hrtime();
        var nanoseconds = (stop[0] - start[0]) * 1000000000;

        if (nanoseconds === 0) {
          nanoseconds = stop[1] - start[1];
        } else {
          // Add nanoseconds from start to end of that second, plus start of the end second to end
          nanoseconds += 1000000000 - start[1] + stop[1];
        }

        this.decisions[decision].timeInPrediction += nanoseconds;
        this.decisions[decision].invocations++;
        var SLL_k = this._sllStopIndex - this._startIndex + 1;
        this.decisions[decision].SLL_TotalLook += SLL_k;
        this.decisions[decision].SLL_MinLook = this.decisions[decision].SLL_MinLook === 0 ? SLL_k : Math.min(this.decisions[decision].SLL_MinLook, SLL_k);

        if (SLL_k > this.decisions[decision].SLL_MaxLook) {
          this.decisions[decision].SLL_MaxLook = SLL_k;
          this.decisions[decision].SLL_MaxLookEvent = new LookaheadEventInfo_1.LookaheadEventInfo(decision, undefined, alt, input, this._startIndex, this._sllStopIndex, false);
        }

        if (this._llStopIndex >= 0) {
          var LL_k = this._llStopIndex - this._startIndex + 1;
          this.decisions[decision].LL_TotalLook += LL_k;
          this.decisions[decision].LL_MinLook = this.decisions[decision].LL_MinLook === 0 ? LL_k : Math.min(this.decisions[decision].LL_MinLook, LL_k);

          if (LL_k > this.decisions[decision].LL_MaxLook) {
            this.decisions[decision].LL_MaxLook = LL_k;
            this.decisions[decision].LL_MaxLookEvent = new LookaheadEventInfo_1.LookaheadEventInfo(decision, undefined, alt, input, this._startIndex, this._llStopIndex, true);
          }
        }

        return alt;
      } finally {
        this._input = undefined;
        this.currentDecision = -1;
      }
    }
  }, {
    key: "getStartState",
    value: function getStartState(dfa, input, outerContext, useContext) {
      var state = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "getStartState", this).call(this, dfa, input, outerContext, useContext);
      this.currentState = state;
      return state;
    }
  }, {
    key: "computeStartState",
    value: function computeStartState(dfa, globalContext, useContext) {
      var state = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "computeStartState", this).call(this, dfa, globalContext, useContext);
      this.currentState = state;
      return state;
    }
  }, {
    key: "computeReachSet",
    value: function computeReachSet(dfa, previous, t, contextCache) {
      if (this._input === undefined) {
        throw new Error("Invalid state");
      }

      var reachState = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "computeReachSet", this).call(this, dfa, previous, t, contextCache);

      if (reachState == null) {
        // no reach on current lookahead symbol. ERROR.
        this.decisions[this.currentDecision].errors.push(new ErrorInfo_1.ErrorInfo(this.currentDecision, previous, this._input, this._startIndex, this._input.index));
      }

      this.currentState = reachState;
      return reachState;
    }
  }, {
    key: "getExistingTargetState",
    value: function getExistingTargetState(previousD, t) {
      if (this.currentState === undefined || this._input === undefined) {
        throw new Error("Invalid state");
      } // this method is called after each time the input position advances


      if (this.currentState.useContext) {
        this._llStopIndex = this._input.index;
      } else {
        this._sllStopIndex = this._input.index;
      }

      var existingTargetState = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "getExistingTargetState", this).call(this, previousD, t);

      if (existingTargetState != null) {
        // this method is directly called by execDFA; must construct a SimulatorState
        // to represent the current state for this case
        this.currentState = new SimulatorState_1.SimulatorState(this.currentState.outerContext, existingTargetState, this.currentState.useContext, this.currentState.remainingOuterContext);

        if (this.currentState.useContext) {
          this.decisions[this.currentDecision].LL_DFATransitions++;
        } else {
          this.decisions[this.currentDecision].SLL_DFATransitions++; // count only if we transition over a DFA state
        }

        if (existingTargetState === ATNSimulator_1.ATNSimulator.ERROR) {
          var state = new SimulatorState_1.SimulatorState(this.currentState.outerContext, previousD, this.currentState.useContext, this.currentState.remainingOuterContext);
          this.decisions[this.currentDecision].errors.push(new ErrorInfo_1.ErrorInfo(this.currentDecision, state, this._input, this._startIndex, this._input.index));
        }
      }

      return existingTargetState;
    }
  }, {
    key: "computeTargetState",
    value: function computeTargetState(dfa, s, remainingGlobalContext, t, useContext, contextCache) {
      var targetState = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "computeTargetState", this).call(this, dfa, s, remainingGlobalContext, t, useContext, contextCache);

      if (useContext) {
        this.decisions[this.currentDecision].LL_ATNTransitions++;
      } else {
        this.decisions[this.currentDecision].SLL_ATNTransitions++;
      }

      return targetState;
    }
  }, {
    key: "evalSemanticContextImpl",
    value: function evalSemanticContextImpl(pred, parserCallStack, alt) {
      if (this.currentState === undefined || this._input === undefined) {
        throw new Error("Invalid state");
      }

      var result = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "evalSemanticContextImpl", this).call(this, pred, parserCallStack, alt);

      if (!(pred instanceof SemanticContext_1.SemanticContext.PrecedencePredicate)) {
        var fullContext = this._llStopIndex >= 0;
        var stopIndex = fullContext ? this._llStopIndex : this._sllStopIndex;
        this.decisions[this.currentDecision].predicateEvals.push(new PredicateEvalInfo_1.PredicateEvalInfo(this.currentState, this.currentDecision, this._input, this._startIndex, stopIndex, pred, result, alt));
      }

      return result;
    }
  }, {
    key: "reportContextSensitivity",
    value: function reportContextSensitivity(dfa, prediction, acceptState, startIndex, stopIndex) {
      if (this._input === undefined) {
        throw new Error("Invalid state");
      }

      if (prediction !== this.conflictingAltResolvedBySLL) {
        this.decisions[this.currentDecision].contextSensitivities.push(new ContextSensitivityInfo_1.ContextSensitivityInfo(this.currentDecision, acceptState, this._input, startIndex, stopIndex));
      }

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "reportContextSensitivity", this).call(this, dfa, prediction, acceptState, startIndex, stopIndex);
    }
  }, {
    key: "reportAttemptingFullContext",
    value: function reportAttemptingFullContext(dfa, conflictingAlts, conflictState, startIndex, stopIndex) {
      if (conflictingAlts != null) {
        this.conflictingAltResolvedBySLL = conflictingAlts.nextSetBit(0);
      } else {
        this.conflictingAltResolvedBySLL = conflictState.s0.configs.getRepresentedAlternatives().nextSetBit(0);
      }

      this.decisions[this.currentDecision].LL_Fallback++;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "reportAttemptingFullContext", this).call(this, dfa, conflictingAlts, conflictState, startIndex, stopIndex);
    }
  }, {
    key: "reportAmbiguity",
    value: function reportAmbiguity(dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
      if (this.currentState === undefined || this._input === undefined) {
        throw new Error("Invalid state");
      }

      var prediction;

      if (ambigAlts != null) {
        prediction = ambigAlts.nextSetBit(0);
      } else {
        prediction = configs.getRepresentedAlternatives().nextSetBit(0);
      }

      if (this.conflictingAltResolvedBySLL !== ATN_1.ATN.INVALID_ALT_NUMBER && prediction !== this.conflictingAltResolvedBySLL) {
        // Even though this is an ambiguity we are reporting, we can
        // still detect some context sensitivities.  Both SLL and LL
        // are showing a conflict, hence an ambiguity, but if they resolve
        // to different minimum alternatives we have also identified a
        // context sensitivity.
        this.decisions[this.currentDecision].contextSensitivities.push(new ContextSensitivityInfo_1.ContextSensitivityInfo(this.currentDecision, this.currentState, this._input, startIndex, stopIndex));
      }

      this.decisions[this.currentDecision].ambiguities.push(new AmbiguityInfo_1.AmbiguityInfo(this.currentDecision, this.currentState, ambigAlts, this._input, startIndex, stopIndex));
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ProfilingATNSimulator.prototype), "reportAmbiguity", this).call(this, dfa, D, startIndex, stopIndex, exact, ambigAlts, configs);
    } // ---------------------------------------------------------------------

  }, {
    key: "getDecisionInfo",
    value: function getDecisionInfo() {
      return this.decisions;
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return this.currentState;
    }
  }]);
  return ProfilingATNSimulator;
}(ParserATNSimulator_1.ParserATNSimulator);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull)], ProfilingATNSimulator.prototype, "adaptivePredict", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "getStartState", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "computeStartState", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "computeReachSet", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "getExistingTargetState", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "computeTargetState", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "evalSemanticContextImpl", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "reportContextSensitivity", null);

__decorate([Decorators_1.Override], ProfilingATNSimulator.prototype, "reportAttemptingFullContext", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull), __param(5, Decorators_1.NotNull), __param(6, Decorators_1.NotNull)], ProfilingATNSimulator.prototype, "reportAmbiguity", null);

exports.ProfilingATNSimulator = ProfilingATNSimulator;
//# sourceMappingURL=ProfilingATNSimulator.js.map
