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
}); // ConvertTo-TS run at 2016-10-04T11:26:25.9683447-07:00

var ActionTransition_1 = require("./ActionTransition");

var Array2DHashSet_1 = require("../misc/Array2DHashSet");

var ATN_1 = require("./ATN");

var ATNDeserializationOptions_1 = require("./ATNDeserializationOptions");

var ATNStateType_1 = require("./ATNStateType");

var AtomTransition_1 = require("./AtomTransition");

var BasicBlockStartState_1 = require("./BasicBlockStartState");

var BasicState_1 = require("./BasicState");

var BitSet_1 = require("../misc/BitSet");

var BlockEndState_1 = require("./BlockEndState");

var BlockStartState_1 = require("./BlockStartState");

var DecisionState_1 = require("./DecisionState");

var DFA_1 = require("../dfa/DFA");

var EpsilonTransition_1 = require("./EpsilonTransition");

var IntervalSet_1 = require("../misc/IntervalSet");

var InvalidState_1 = require("./InvalidState");

var LexerChannelAction_1 = require("./LexerChannelAction");

var LexerCustomAction_1 = require("./LexerCustomAction");

var LexerModeAction_1 = require("./LexerModeAction");

var LexerMoreAction_1 = require("./LexerMoreAction");

var LexerPopModeAction_1 = require("./LexerPopModeAction");

var LexerPushModeAction_1 = require("./LexerPushModeAction");

var LexerSkipAction_1 = require("./LexerSkipAction");

var LexerTypeAction_1 = require("./LexerTypeAction");

var LoopEndState_1 = require("./LoopEndState");

var Decorators_1 = require("../Decorators");

var NotSetTransition_1 = require("./NotSetTransition");

var ParserATNSimulator_1 = require("./ParserATNSimulator");

var PlusBlockStartState_1 = require("./PlusBlockStartState");

var PlusLoopbackState_1 = require("./PlusLoopbackState");

var PrecedencePredicateTransition_1 = require("./PrecedencePredicateTransition");

var PredicateTransition_1 = require("./PredicateTransition");

var RangeTransition_1 = require("./RangeTransition");

var RuleStartState_1 = require("./RuleStartState");

var RuleStopState_1 = require("./RuleStopState");

var RuleTransition_1 = require("./RuleTransition");

var SetTransition_1 = require("./SetTransition");

var StarBlockStartState_1 = require("./StarBlockStartState");

var StarLoopbackState_1 = require("./StarLoopbackState");

var StarLoopEntryState_1 = require("./StarLoopEntryState");

var Token_1 = require("../Token");

var TokensStartState_1 = require("./TokensStartState");

var UUID_1 = require("../misc/UUID");

var WildcardTransition_1 = require("./WildcardTransition");

var UnicodeDeserializingMode;

(function (UnicodeDeserializingMode) {
  UnicodeDeserializingMode[UnicodeDeserializingMode["UNICODE_BMP"] = 0] = "UNICODE_BMP";
  UnicodeDeserializingMode[UnicodeDeserializingMode["UNICODE_SMP"] = 1] = "UNICODE_SMP";
})(UnicodeDeserializingMode || (UnicodeDeserializingMode = {}));
/**
 *
 * @author Sam Harwell
 */


var ATNDeserializer =
/*#__PURE__*/
function () {
  function ATNDeserializer(deserializationOptions) {
    (0, _classCallCheck2["default"])(this, ATNDeserializer);

    if (deserializationOptions == null) {
      deserializationOptions = ATNDeserializationOptions_1.ATNDeserializationOptions.defaultOptions;
    }

    this.deserializationOptions = deserializationOptions;
  }

  (0, _createClass2["default"])(ATNDeserializer, [{
    key: "deserialize",
    value: function deserialize(data) {
      data = data.slice(0); // Each Uint16 value in data is shifted by +2 at the entry to this method. This is an encoding optimization
      // targeting the serialized values 0 and -1 (serialized to 0xFFFF), each of which are very common in the
      // serialized form of the ATN. In the modified UTF-8 that Java uses for compiled string literals, these two
      // character values have multi-byte forms. By shifting each value by +2, they become characters 2 and 1 prior to
      // writing the string, each of which have single-byte representations. Since the shift occurs in the tool during
      // ATN serialization, each target is responsible for adjusting the values during deserialization.
      //
      // As a special case, note that the first element of data is not adjusted because it contains the major version
      // number of the serialized ATN, which was fixed at 3 at the time the value shifting was implemented.

      for (var i = 1; i < data.length; i++) {
        data[i] = data[i] - 2 & 0xFFFF;
      }

      var p = 0;
      var version = ATNDeserializer.toInt(data[p++]);

      if (version !== ATNDeserializer.SERIALIZED_VERSION) {
        var reason = "Could not deserialize ATN with version ".concat(version, " (expected ").concat(ATNDeserializer.SERIALIZED_VERSION, ").");
        throw new Error(reason);
      }

      var uuid = ATNDeserializer.toUUID(data, p);
      p += 8;

      if (ATNDeserializer.SUPPORTED_UUIDS.findIndex(function (e) {
        return e.equals(uuid);
      }) < 0) {
        var _reason = "Could not deserialize ATN with UUID ".concat(uuid, " (expected ").concat(ATNDeserializer.SERIALIZED_UUID, " or a legacy UUID).");

        throw new Error(_reason);
      }

      var supportsLexerActions = ATNDeserializer.isFeatureSupported(ATNDeserializer.ADDED_LEXER_ACTIONS, uuid);
      var grammarType = ATNDeserializer.toInt(data[p++]);
      var maxTokenType = ATNDeserializer.toInt(data[p++]);
      var atn = new ATN_1.ATN(grammarType, maxTokenType); //
      // STATES
      //

      var loopBackStateNumbers = [];
      var endStateNumbers = [];
      var nstates = ATNDeserializer.toInt(data[p++]);

      for (var _i = 0; _i < nstates; _i++) {
        var stype = ATNDeserializer.toInt(data[p++]); // ignore bad type of states

        if (stype === ATNStateType_1.ATNStateType.INVALID_TYPE) {
          atn.addState(new InvalidState_1.InvalidState());
          continue;
        }

        var ruleIndex = ATNDeserializer.toInt(data[p++]);

        if (ruleIndex === 0xFFFF) {
          ruleIndex = -1;
        }

        var s = this.stateFactory(stype, ruleIndex);

        if (stype === ATNStateType_1.ATNStateType.LOOP_END) {
          // special case
          var loopBackStateNumber = ATNDeserializer.toInt(data[p++]);
          loopBackStateNumbers.push([s, loopBackStateNumber]);
        } else if (s instanceof BlockStartState_1.BlockStartState) {
          var endStateNumber = ATNDeserializer.toInt(data[p++]);
          endStateNumbers.push([s, endStateNumber]);
        }

        atn.addState(s);
      } // delay the assignment of loop back and end states until we know all the state instances have been initialized


      for (var _i2 = 0, _loopBackStateNumbers = loopBackStateNumbers; _i2 < _loopBackStateNumbers.length; _i2++) {
        var pair = _loopBackStateNumbers[_i2];
        pair[0].loopBackState = atn.states[pair[1]];
      }

      for (var _i3 = 0, _endStateNumbers = endStateNumbers; _i3 < _endStateNumbers.length; _i3++) {
        var _pair = _endStateNumbers[_i3];
        _pair[0].endState = atn.states[_pair[1]];
      }

      var numNonGreedyStates = ATNDeserializer.toInt(data[p++]);

      for (var _i4 = 0; _i4 < numNonGreedyStates; _i4++) {
        var stateNumber = ATNDeserializer.toInt(data[p++]);
        atn.states[stateNumber].nonGreedy = true;
      }

      var numSllDecisions = ATNDeserializer.toInt(data[p++]);

      for (var _i5 = 0; _i5 < numSllDecisions; _i5++) {
        var _stateNumber = ATNDeserializer.toInt(data[p++]);

        atn.states[_stateNumber].sll = true;
      }

      var numPrecedenceStates = ATNDeserializer.toInt(data[p++]);

      for (var _i6 = 0; _i6 < numPrecedenceStates; _i6++) {
        var _stateNumber2 = ATNDeserializer.toInt(data[p++]);

        atn.states[_stateNumber2].isPrecedenceRule = true;
      } //
      // RULES
      //


      var nrules = ATNDeserializer.toInt(data[p++]);

      if (atn.grammarType === 0
      /* LEXER */
      ) {
          atn.ruleToTokenType = new Int32Array(nrules);
        }

      atn.ruleToStartState = new Array(nrules);

      for (var _i7 = 0; _i7 < nrules; _i7++) {
        var _s = ATNDeserializer.toInt(data[p++]);

        var startState = atn.states[_s];
        startState.leftFactored = ATNDeserializer.toInt(data[p++]) !== 0;
        atn.ruleToStartState[_i7] = startState;

        if (atn.grammarType === 0
        /* LEXER */
        ) {
            var tokenType = ATNDeserializer.toInt(data[p++]);

            if (tokenType === 0xFFFF) {
              tokenType = Token_1.Token.EOF;
            }

            atn.ruleToTokenType[_i7] = tokenType;

            if (!ATNDeserializer.isFeatureSupported(ATNDeserializer.ADDED_LEXER_ACTIONS, uuid)) {
              // this piece of unused metadata was serialized prior to the
              // addition of LexerAction
              var actionIndexIgnored = ATNDeserializer.toInt(data[p++]);

              if (actionIndexIgnored === 0xFFFF) {
                actionIndexIgnored = -1;
              }
            }
          }
      }

      atn.ruleToStopState = new Array(nrules);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = atn.states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _state3 = _step.value;

          if (!(_state3 instanceof RuleStopState_1.RuleStopState)) {
            continue;
          }

          atn.ruleToStopState[_state3.ruleIndex] = _state3;
          atn.ruleToStartState[_state3.ruleIndex].stopState = _state3;
        } //
        // MODES
        //

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

      var nmodes = ATNDeserializer.toInt(data[p++]);

      for (var _i8 = 0; _i8 < nmodes; _i8++) {
        var _s2 = ATNDeserializer.toInt(data[p++]);

        atn.modeToStartState.push(atn.states[_s2]);
      }

      atn.modeToDFA = new Array(nmodes);

      for (var _i9 = 0; _i9 < nmodes; _i9++) {
        atn.modeToDFA[_i9] = new DFA_1.DFA(atn.modeToStartState[_i9]);
      } //
      // SETS
      //


      var sets = []; // First, read all sets with 16-bit Unicode code points <= U+FFFF.

      p = this.deserializeSets(data, p, sets, ATNDeserializer.getUnicodeDeserializer(0
      /* UNICODE_BMP */
      )); // Next, if the ATN was serialized with the Unicode SMP feature,
      // deserialize sets with 32-bit arguments <= U+10FFFF.

      if (ATNDeserializer.isFeatureSupported(ATNDeserializer.ADDED_UNICODE_SMP, uuid)) {
        p = this.deserializeSets(data, p, sets, ATNDeserializer.getUnicodeDeserializer(1
        /* UNICODE_SMP */
        ));
      } //
      // EDGES
      //


      var nedges = ATNDeserializer.toInt(data[p++]);

      for (var _i10 = 0; _i10 < nedges; _i10++) {
        var src = ATNDeserializer.toInt(data[p]);
        var trg = ATNDeserializer.toInt(data[p + 1]);
        var ttype = ATNDeserializer.toInt(data[p + 2]);
        var arg1 = ATNDeserializer.toInt(data[p + 3]);
        var arg2 = ATNDeserializer.toInt(data[p + 4]);
        var arg3 = ATNDeserializer.toInt(data[p + 5]);
        var trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets); // console.log(`EDGE ${trans.constructor.name} ${src}->${trg} ${Transition.serializationNames[ttype]} ${arg1},${arg2},${arg3}`);

        var srcState = atn.states[src];
        srcState.addTransition(trans);
        p += 6;
      }

      var returnTransitionsSet = new Array2DHashSet_1.Array2DHashSet({
        hashCode: function hashCode(o) {
          return o.stopState ^ o.returnState ^ o.outermostPrecedenceReturn;
        },
        equals: function equals(a, b) {
          return a.stopState === b.stopState && a.returnState === b.returnState && a.outermostPrecedenceReturn === b.outermostPrecedenceReturn;
        }
      });
      var returnTransitions = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = atn.states[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _state4 = _step2.value;
          var returningToLeftFactored = _state4.ruleIndex >= 0 && atn.ruleToStartState[_state4.ruleIndex].leftFactored;

          for (var _i19 = 0; _i19 < _state4.numberOfTransitions; _i19++) {
            var t = _state4.transition(_i19);

            if (!(t instanceof RuleTransition_1.RuleTransition)) {
              continue;
            }

            var ruleTransition = t;
            var returningFromLeftFactored = atn.ruleToStartState[ruleTransition.target.ruleIndex].leftFactored;

            if (!returningFromLeftFactored && returningToLeftFactored) {
              continue;
            }

            var outermostPrecedenceReturn = -1;

            if (atn.ruleToStartState[ruleTransition.target.ruleIndex].isPrecedenceRule) {
              if (ruleTransition.precedence === 0) {
                outermostPrecedenceReturn = ruleTransition.target.ruleIndex;
              }
            }

            var current = {
              stopState: ruleTransition.target.ruleIndex,
              returnState: ruleTransition.followState.stateNumber,
              outermostPrecedenceReturn: outermostPrecedenceReturn
            };

            if (returnTransitionsSet.add(current)) {
              returnTransitions.push(current);
            }
          }
        } // Add all elements from returnTransitions to the ATN

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

      for (var _i11 = 0, _returnTransitions = returnTransitions; _i11 < _returnTransitions.length; _i11++) {
        var returnTransition = _returnTransitions[_i11];

        var _transition3 = new EpsilonTransition_1.EpsilonTransition(atn.states[returnTransition.returnState], returnTransition.outermostPrecedenceReturn);

        atn.ruleToStopState[returnTransition.stopState].addTransition(_transition3);
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = atn.states[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _state5 = _step3.value;

          if (_state5 instanceof BlockStartState_1.BlockStartState) {
            // we need to know the end state to set its start state
            if (_state5.endState == null) {
              throw new Error("IllegalStateException");
            } // block end states can only be associated to a single block start state


            if (_state5.endState.startState != null) {
              throw new Error("IllegalStateException");
            }

            _state5.endState.startState = _state5;
          }

          if (_state5 instanceof PlusLoopbackState_1.PlusLoopbackState) {
            var loopbackState = _state5;

            for (var _i20 = 0; _i20 < loopbackState.numberOfTransitions; _i20++) {
              var target = loopbackState.transition(_i20).target;

              if (target instanceof PlusBlockStartState_1.PlusBlockStartState) {
                target.loopBackState = loopbackState;
              }
            }
          } else if (_state5 instanceof StarLoopbackState_1.StarLoopbackState) {
            var _loopbackState = _state5;

            for (var _i21 = 0; _i21 < _loopbackState.numberOfTransitions; _i21++) {
              var _target = _loopbackState.transition(_i21).target;

              if (_target instanceof StarLoopEntryState_1.StarLoopEntryState) {
                _target.loopBackState = _loopbackState;
              }
            }
          }
        } //
        // DECISIONS
        //

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

      var ndecisions = ATNDeserializer.toInt(data[p++]);

      for (var _i12 = 1; _i12 <= ndecisions; _i12++) {
        var _s3 = ATNDeserializer.toInt(data[p++]);

        var decState = atn.states[_s3];
        atn.decisionToState.push(decState);
        decState.decision = _i12 - 1;
      } //
      // LEXER ACTIONS
      //


      if (atn.grammarType === 0
      /* LEXER */
      ) {
          if (supportsLexerActions) {
            atn.lexerActions = new Array(ATNDeserializer.toInt(data[p++]));

            for (var _i13 = 0; _i13 < atn.lexerActions.length; _i13++) {
              var actionType = ATNDeserializer.toInt(data[p++]);
              var data1 = ATNDeserializer.toInt(data[p++]);

              if (data1 === 0xFFFF) {
                data1 = -1;
              }

              var data2 = ATNDeserializer.toInt(data[p++]);

              if (data2 === 0xFFFF) {
                data2 = -1;
              }

              var lexerAction = this.lexerActionFactory(actionType, data1, data2);
              atn.lexerActions[_i13] = lexerAction;
            }
          } else {
            // for compatibility with older serialized ATNs, convert the old
            // serialized action index for action transitions to the new
            // form, which is the index of a LexerCustomAction
            var legacyLexerActions = [];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = atn.states[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var state = _step4.value;

                for (var _i14 = 0; _i14 < state.numberOfTransitions; _i14++) {
                  var transition = state.transition(_i14);

                  if (!(transition instanceof ActionTransition_1.ActionTransition)) {
                    continue;
                  }

                  var _ruleIndex = transition.ruleIndex;
                  var actionIndex = transition.actionIndex;

                  var _lexerAction = new LexerCustomAction_1.LexerCustomAction(_ruleIndex, actionIndex);

                  state.setTransition(_i14, new ActionTransition_1.ActionTransition(transition.target, _ruleIndex, legacyLexerActions.length, false));
                  legacyLexerActions.push(_lexerAction);
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

            atn.lexerActions = legacyLexerActions;
          }
        }

      this.markPrecedenceDecisions(atn);
      atn.decisionToDFA = new Array(ndecisions);

      for (var _i15 = 0; _i15 < ndecisions; _i15++) {
        atn.decisionToDFA[_i15] = new DFA_1.DFA(atn.decisionToState[_i15], _i15);
      }

      if (this.deserializationOptions.isVerifyATN) {
        this.verifyATN(atn);
      }

      if (this.deserializationOptions.isGenerateRuleBypassTransitions && atn.grammarType === 1
      /* PARSER */
      ) {
          atn.ruleToTokenType = new Int32Array(atn.ruleToStartState.length);

          for (var _i16 = 0; _i16 < atn.ruleToStartState.length; _i16++) {
            atn.ruleToTokenType[_i16] = atn.maxTokenType + _i16 + 1;
          }

          for (var _i17 = 0; _i17 < atn.ruleToStartState.length; _i17++) {
            var bypassStart = new BasicBlockStartState_1.BasicBlockStartState();
            bypassStart.ruleIndex = _i17;
            atn.addState(bypassStart);
            var bypassStop = new BlockEndState_1.BlockEndState();
            bypassStop.ruleIndex = _i17;
            atn.addState(bypassStop);
            bypassStart.endState = bypassStop;
            atn.defineDecisionState(bypassStart);
            bypassStop.startState = bypassStart;
            var endState = void 0;
            var excludeTransition = void 0;

            if (atn.ruleToStartState[_i17].isPrecedenceRule) {
              // wrap from the beginning of the rule to the StarLoopEntryState
              endState = undefined;
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = atn.states[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var _state = _step5.value;

                  if (_state.ruleIndex !== _i17) {
                    continue;
                  }

                  if (!(_state instanceof StarLoopEntryState_1.StarLoopEntryState)) {
                    continue;
                  }

                  var maybeLoopEndState = _state.transition(_state.numberOfTransitions - 1).target;

                  if (!(maybeLoopEndState instanceof LoopEndState_1.LoopEndState)) {
                    continue;
                  }

                  if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transition(0).target instanceof RuleStopState_1.RuleStopState) {
                    endState = _state;
                    break;
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

              if (!endState) {
                throw new Error("Couldn't identify final state of the precedence rule prefix section.");
              }

              excludeTransition = endState.loopBackState.transition(0);
            } else {
              endState = atn.ruleToStopState[_i17];
            } // all non-excluded transitions that currently target end state need to target blockEnd instead


            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = atn.states[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _state2 = _step6.value;

                for (var _i18 = 0; _i18 < _state2.numberOfTransitions; _i18++) {
                  var _transition2 = _state2.transition(_i18);

                  if (_transition2 === excludeTransition) {
                    continue;
                  }

                  if (_transition2.target === endState) {
                    _transition2.target = bypassStop;
                  }
                }
              } // all transitions leaving the rule start state need to leave blockStart instead

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

            while (atn.ruleToStartState[_i17].numberOfTransitions > 0) {
              var _transition = atn.ruleToStartState[_i17].removeTransition(atn.ruleToStartState[_i17].numberOfTransitions - 1);

              bypassStart.addTransition(_transition);
            } // link the new states


            atn.ruleToStartState[_i17].addTransition(new EpsilonTransition_1.EpsilonTransition(bypassStart));

            bypassStop.addTransition(new EpsilonTransition_1.EpsilonTransition(endState));
            var matchState = new BasicState_1.BasicState();
            atn.addState(matchState);
            matchState.addTransition(new AtomTransition_1.AtomTransition(bypassStop, atn.ruleToTokenType[_i17]));
            bypassStart.addTransition(new EpsilonTransition_1.EpsilonTransition(matchState));
          }

          if (this.deserializationOptions.isVerifyATN) {
            // reverify after modification
            this.verifyATN(atn);
          }
        }

      if (this.deserializationOptions.isOptimize) {
        while (true) {
          var optimizationCount = 0;
          optimizationCount += ATNDeserializer.inlineSetRules(atn);
          optimizationCount += ATNDeserializer.combineChainedEpsilons(atn);
          var preserveOrder = atn.grammarType === 0
          /* LEXER */
          ;
          optimizationCount += ATNDeserializer.optimizeSets(atn, preserveOrder);

          if (optimizationCount === 0) {
            break;
          }
        }

        if (this.deserializationOptions.isVerifyATN) {
          // reverify after modification
          this.verifyATN(atn);
        }
      }

      ATNDeserializer.identifyTailCalls(atn);
      return atn;
    }
  }, {
    key: "deserializeSets",
    value: function deserializeSets(data, p, sets, unicodeDeserializer) {
      var nsets = ATNDeserializer.toInt(data[p++]);

      for (var i = 0; i < nsets; i++) {
        var nintervals = ATNDeserializer.toInt(data[p]);
        p++;
        var set = new IntervalSet_1.IntervalSet();
        sets.push(set);
        var containsEof = ATNDeserializer.toInt(data[p++]) !== 0;

        if (containsEof) {
          set.add(-1);
        }

        for (var j = 0; j < nintervals; j++) {
          var a = unicodeDeserializer.readUnicode(data, p);
          p += unicodeDeserializer.size;
          var b = unicodeDeserializer.readUnicode(data, p);
          p += unicodeDeserializer.size;
          set.add(a, b);
        }
      }

      return p;
    }
    /**
     * Analyze the {@link StarLoopEntryState} states in the specified ATN to set
     * the {@link StarLoopEntryState#precedenceRuleDecision} field to the
     * correct value.
     *
     * @param atn The ATN.
     */

  }, {
    key: "markPrecedenceDecisions",
    value: function markPrecedenceDecisions(atn) {
      // Map rule index -> precedence decision for that rule
      var rulePrecedenceDecisions = new Map();
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = atn.states[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var state = _step7.value;

          if (!(state instanceof StarLoopEntryState_1.StarLoopEntryState)) {
            continue;
          }
          /* We analyze the ATN to determine if this ATN decision state is the
           * decision for the closure block that determines whether a
           * precedence rule should continue or complete.
           */


          if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
            var maybeLoopEndState = state.transition(state.numberOfTransitions - 1).target;

            if (maybeLoopEndState instanceof LoopEndState_1.LoopEndState) {
              if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transition(0).target instanceof RuleStopState_1.RuleStopState) {
                rulePrecedenceDecisions.set(state.ruleIndex, state);
                state.precedenceRuleDecision = true;
                state.precedenceLoopbackStates = new BitSet_1.BitSet(atn.states.length);
              }
            }
          }
        } // After marking precedence decisions, we go back through and fill in
        // StarLoopEntryState.precedenceLoopbackStates.

      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = rulePrecedenceDecisions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var precedenceDecision = _step8.value;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = atn.ruleToStopState[precedenceDecision[0]].getTransitions()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var transition = _step9.value;

              if (transition.serializationType !== 1
              /* EPSILON */
              ) {
                  continue;
                }

              var epsilonTransition = transition;

              if (epsilonTransition.outermostPrecedenceReturn !== -1) {
                continue;
              }

              precedenceDecision[1].precedenceLoopbackStates.set(transition.target.stateNumber);
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                _iterator9["return"]();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  }, {
    key: "verifyATN",
    value: function verifyATN(atn) {
      // verify assumptions
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = atn.states[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var state = _step10.value;
          this.checkCondition(state != null, "ATN states should not be null.");

          if (state.stateType === ATNStateType_1.ATNStateType.INVALID_TYPE) {
            continue;
          }

          this.checkCondition(state.onlyHasEpsilonTransitions || state.numberOfTransitions <= 1);

          if (state instanceof PlusBlockStartState_1.PlusBlockStartState) {
            this.checkCondition(state.loopBackState != null);
          }

          if (state instanceof StarLoopEntryState_1.StarLoopEntryState) {
            var starLoopEntryState = state;
            this.checkCondition(starLoopEntryState.loopBackState != null);
            this.checkCondition(starLoopEntryState.numberOfTransitions === 2);

            if (starLoopEntryState.transition(0).target instanceof StarBlockStartState_1.StarBlockStartState) {
              this.checkCondition(starLoopEntryState.transition(1).target instanceof LoopEndState_1.LoopEndState);
              this.checkCondition(!starLoopEntryState.nonGreedy);
            } else if (starLoopEntryState.transition(0).target instanceof LoopEndState_1.LoopEndState) {
              this.checkCondition(starLoopEntryState.transition(1).target instanceof StarBlockStartState_1.StarBlockStartState);
              this.checkCondition(starLoopEntryState.nonGreedy);
            } else {
              throw new Error("IllegalStateException");
            }
          }

          if (state instanceof StarLoopbackState_1.StarLoopbackState) {
            this.checkCondition(state.numberOfTransitions === 1);
            this.checkCondition(state.transition(0).target instanceof StarLoopEntryState_1.StarLoopEntryState);
          }

          if (state instanceof LoopEndState_1.LoopEndState) {
            this.checkCondition(state.loopBackState != null);
          }

          if (state instanceof RuleStartState_1.RuleStartState) {
            this.checkCondition(state.stopState != null);
          }

          if (state instanceof BlockStartState_1.BlockStartState) {
            this.checkCondition(state.endState != null);
          }

          if (state instanceof BlockEndState_1.BlockEndState) {
            this.checkCondition(state.startState != null);
          }

          if (state instanceof DecisionState_1.DecisionState) {
            var decisionState = state;
            this.checkCondition(decisionState.numberOfTransitions <= 1 || decisionState.decision >= 0);
          } else {
            this.checkCondition(state.numberOfTransitions <= 1 || state instanceof RuleStopState_1.RuleStopState);
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  }, {
    key: "checkCondition",
    value: function checkCondition(condition, message) {
      if (!condition) {
        throw new Error("IllegalStateException: " + message);
      }
    }
  }, {
    key: "edgeFactory",
    value: function edgeFactory(atn, type, src, trg, arg1, arg2, arg3, sets) {
      var target = atn.states[trg];

      switch (type) {
        case 1
        /* EPSILON */
        :
          return new EpsilonTransition_1.EpsilonTransition(target);

        case 2
        /* RANGE */
        :
          if (arg3 !== 0) {
            return new RangeTransition_1.RangeTransition(target, Token_1.Token.EOF, arg2);
          } else {
            return new RangeTransition_1.RangeTransition(target, arg1, arg2);
          }

        case 3
        /* RULE */
        :
          var rt = new RuleTransition_1.RuleTransition(atn.states[arg1], arg2, arg3, target);
          return rt;

        case 4
        /* PREDICATE */
        :
          var pt = new PredicateTransition_1.PredicateTransition(target, arg1, arg2, arg3 !== 0);
          return pt;

        case 10
        /* PRECEDENCE */
        :
          return new PrecedencePredicateTransition_1.PrecedencePredicateTransition(target, arg1);

        case 5
        /* ATOM */
        :
          if (arg3 !== 0) {
            return new AtomTransition_1.AtomTransition(target, Token_1.Token.EOF);
          } else {
            return new AtomTransition_1.AtomTransition(target, arg1);
          }

        case 6
        /* ACTION */
        :
          var a = new ActionTransition_1.ActionTransition(target, arg1, arg2, arg3 !== 0);
          return a;

        case 7
        /* SET */
        :
          return new SetTransition_1.SetTransition(target, sets[arg1]);

        case 8
        /* NOT_SET */
        :
          return new NotSetTransition_1.NotSetTransition(target, sets[arg1]);

        case 9
        /* WILDCARD */
        :
          return new WildcardTransition_1.WildcardTransition(target);
      }

      throw new Error("The specified transition type is not valid.");
    }
  }, {
    key: "stateFactory",
    value: function stateFactory(type, ruleIndex) {
      var s;

      switch (type) {
        case ATNStateType_1.ATNStateType.INVALID_TYPE:
          return new InvalidState_1.InvalidState();

        case ATNStateType_1.ATNStateType.BASIC:
          s = new BasicState_1.BasicState();
          break;

        case ATNStateType_1.ATNStateType.RULE_START:
          s = new RuleStartState_1.RuleStartState();
          break;

        case ATNStateType_1.ATNStateType.BLOCK_START:
          s = new BasicBlockStartState_1.BasicBlockStartState();
          break;

        case ATNStateType_1.ATNStateType.PLUS_BLOCK_START:
          s = new PlusBlockStartState_1.PlusBlockStartState();
          break;

        case ATNStateType_1.ATNStateType.STAR_BLOCK_START:
          s = new StarBlockStartState_1.StarBlockStartState();
          break;

        case ATNStateType_1.ATNStateType.TOKEN_START:
          s = new TokensStartState_1.TokensStartState();
          break;

        case ATNStateType_1.ATNStateType.RULE_STOP:
          s = new RuleStopState_1.RuleStopState();
          break;

        case ATNStateType_1.ATNStateType.BLOCK_END:
          s = new BlockEndState_1.BlockEndState();
          break;

        case ATNStateType_1.ATNStateType.STAR_LOOP_BACK:
          s = new StarLoopbackState_1.StarLoopbackState();
          break;

        case ATNStateType_1.ATNStateType.STAR_LOOP_ENTRY:
          s = new StarLoopEntryState_1.StarLoopEntryState();
          break;

        case ATNStateType_1.ATNStateType.PLUS_LOOP_BACK:
          s = new PlusLoopbackState_1.PlusLoopbackState();
          break;

        case ATNStateType_1.ATNStateType.LOOP_END:
          s = new LoopEndState_1.LoopEndState();
          break;

        default:
          var message = "The specified state type ".concat(type, " is not valid.");
          throw new Error(message);
      }

      s.ruleIndex = ruleIndex;
      return s;
    }
  }, {
    key: "lexerActionFactory",
    value: function lexerActionFactory(type, data1, data2) {
      switch (type) {
        case 0
        /* CHANNEL */
        :
          return new LexerChannelAction_1.LexerChannelAction(data1);

        case 1
        /* CUSTOM */
        :
          return new LexerCustomAction_1.LexerCustomAction(data1, data2);

        case 2
        /* MODE */
        :
          return new LexerModeAction_1.LexerModeAction(data1);

        case 3
        /* MORE */
        :
          return LexerMoreAction_1.LexerMoreAction.INSTANCE;

        case 4
        /* POP_MODE */
        :
          return LexerPopModeAction_1.LexerPopModeAction.INSTANCE;

        case 5
        /* PUSH_MODE */
        :
          return new LexerPushModeAction_1.LexerPushModeAction(data1);

        case 6
        /* SKIP */
        :
          return LexerSkipAction_1.LexerSkipAction.INSTANCE;

        case 7
        /* TYPE */
        :
          return new LexerTypeAction_1.LexerTypeAction(data1);

        default:
          var message = "The specified lexer action type ".concat(type, " is not valid.");
          throw new Error(message);
      }
    }
  }], [{
    key: "isFeatureSupported",

    /**
     * Determines if a particular serialized representation of an ATN supports
     * a particular feature, identified by the {@link UUID} used for serializing
     * the ATN at the time the feature was first introduced.
     *
     * @param feature The {@link UUID} marking the first time the feature was
     * supported in the serialized ATN.
     * @param actualUuid The {@link UUID} of the actual serialized ATN which is
     * currently being deserialized.
     * @returns `true` if the `actualUuid` value represents a
     * serialized ATN at or after the feature identified by `feature` was
     * introduced; otherwise, `false`.
     */
    value: function isFeatureSupported(feature, actualUuid) {
      var featureIndex = ATNDeserializer.SUPPORTED_UUIDS.findIndex(function (e) {
        return e.equals(feature);
      });

      if (featureIndex < 0) {
        return false;
      }

      return ATNDeserializer.SUPPORTED_UUIDS.findIndex(function (e) {
        return e.equals(actualUuid);
      }) >= featureIndex;
    }
  }, {
    key: "getUnicodeDeserializer",
    value: function getUnicodeDeserializer(mode) {
      if (mode === 0
      /* UNICODE_BMP */
      ) {
          return {
            readUnicode: function readUnicode(data, p) {
              return ATNDeserializer.toInt(data[p]);
            },
            size: 1
          };
        } else {
        return {
          readUnicode: function readUnicode(data, p) {
            return ATNDeserializer.toInt32(data, p);
          },
          size: 2
        };
      }
    }
  }, {
    key: "inlineSetRules",
    value: function inlineSetRules(atn) {
      var inlinedCalls = 0;
      var ruleToInlineTransition = new Array(atn.ruleToStartState.length);

      for (var i = 0; i < atn.ruleToStartState.length; i++) {
        var startState = atn.ruleToStartState[i];
        var middleState = startState;

        while (middleState.onlyHasEpsilonTransitions && middleState.numberOfOptimizedTransitions === 1 && middleState.getOptimizedTransition(0).serializationType === 1
        /* EPSILON */
        ) {
          middleState = middleState.getOptimizedTransition(0).target;
        }

        if (middleState.numberOfOptimizedTransitions !== 1) {
          continue;
        }

        var matchTransition = middleState.getOptimizedTransition(0);
        var matchTarget = matchTransition.target;

        if (matchTransition.isEpsilon || !matchTarget.onlyHasEpsilonTransitions || matchTarget.numberOfOptimizedTransitions !== 1 || !(matchTarget.getOptimizedTransition(0).target instanceof RuleStopState_1.RuleStopState)) {
          continue;
        }

        switch (matchTransition.serializationType) {
          case 5
          /* ATOM */
          :
          case 2
          /* RANGE */
          :
          case 7
          /* SET */
          :
            ruleToInlineTransition[i] = matchTransition;
            break;

          case 8
          /* NOT_SET */
          :
          case 9
          /* WILDCARD */
          :
            // not implemented yet
            continue;

          default:
            continue;
        }
      }

      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = atn.states[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var state = _step11.value;

          if (state.ruleIndex < 0) {
            continue;
          }

          var optimizedTransitions = void 0;

          for (var _i22 = 0; _i22 < state.numberOfOptimizedTransitions; _i22++) {
            var transition = state.getOptimizedTransition(_i22);

            if (!(transition instanceof RuleTransition_1.RuleTransition)) {
              if (optimizedTransitions != null) {
                optimizedTransitions.push(transition);
              }

              continue;
            }

            var ruleTransition = transition;
            var effective = ruleToInlineTransition[ruleTransition.target.ruleIndex];

            if (effective == null) {
              if (optimizedTransitions != null) {
                optimizedTransitions.push(transition);
              }

              continue;
            }

            if (optimizedTransitions == null) {
              optimizedTransitions = [];

              for (var j = 0; j < _i22; j++) {
                optimizedTransitions.push(state.getOptimizedTransition(_i22));
              }
            }

            inlinedCalls++;
            var target = ruleTransition.followState;
            var intermediateState = new BasicState_1.BasicState();
            intermediateState.setRuleIndex(target.ruleIndex);
            atn.addState(intermediateState);
            optimizedTransitions.push(new EpsilonTransition_1.EpsilonTransition(intermediateState));

            switch (effective.serializationType) {
              case 5
              /* ATOM */
              :
                intermediateState.addTransition(new AtomTransition_1.AtomTransition(target, effective._label));
                break;

              case 2
              /* RANGE */
              :
                intermediateState.addTransition(new RangeTransition_1.RangeTransition(target, effective.from, effective.to));
                break;

              case 7
              /* SET */
              :
                intermediateState.addTransition(new SetTransition_1.SetTransition(target, effective.label));
                break;

              default:
                throw new Error("UnsupportedOperationException");
            }
          }

          if (optimizedTransitions != null) {
            if (state.isOptimized) {
              while (state.numberOfOptimizedTransitions > 0) {
                state.removeOptimizedTransition(state.numberOfOptimizedTransitions - 1);
              }
            }

            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
              for (var _iterator12 = optimizedTransitions[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                var _transition4 = _step12.value;
                state.addOptimizedTransition(_transition4);
              }
            } catch (err) {
              _didIteratorError12 = true;
              _iteratorError12 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                  _iterator12["return"]();
                }
              } finally {
                if (_didIteratorError12) {
                  throw _iteratorError12;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      if (ParserATNSimulator_1.ParserATNSimulator.debug) {
        console.log("ATN runtime optimizer removed " + inlinedCalls + " rule invocations by inlining sets.");
      }

      return inlinedCalls;
    }
  }, {
    key: "combineChainedEpsilons",
    value: function combineChainedEpsilons(atn) {
      var removedEdges = 0;
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = atn.states[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var state = _step13.value;

          if (!state.onlyHasEpsilonTransitions || state instanceof RuleStopState_1.RuleStopState) {
            continue;
          }

          var optimizedTransitions = void 0;

          nextTransition: for (var i = 0; i < state.numberOfOptimizedTransitions; i++) {
            var transition = state.getOptimizedTransition(i);
            var intermediate = transition.target;

            if (transition.serializationType !== 1
            /* EPSILON */
            || transition.outermostPrecedenceReturn !== -1 || intermediate.stateType !== ATNStateType_1.ATNStateType.BASIC || !intermediate.onlyHasEpsilonTransitions) {
              if (optimizedTransitions != null) {
                optimizedTransitions.push(transition);
              }

              continue nextTransition;
            }

            for (var j = 0; j < intermediate.numberOfOptimizedTransitions; j++) {
              if (intermediate.getOptimizedTransition(j).serializationType !== 1
              /* EPSILON */
              || intermediate.getOptimizedTransition(j).outermostPrecedenceReturn !== -1) {
                if (optimizedTransitions != null) {
                  optimizedTransitions.push(transition);
                }

                continue nextTransition;
              }
            }

            removedEdges++;

            if (optimizedTransitions == null) {
              optimizedTransitions = [];

              for (var _j = 0; _j < i; _j++) {
                optimizedTransitions.push(state.getOptimizedTransition(_j));
              }
            }

            for (var _j2 = 0; _j2 < intermediate.numberOfOptimizedTransitions; _j2++) {
              var target = intermediate.getOptimizedTransition(_j2).target;
              optimizedTransitions.push(new EpsilonTransition_1.EpsilonTransition(target));
            }
          }

          if (optimizedTransitions != null) {
            if (state.isOptimized) {
              while (state.numberOfOptimizedTransitions > 0) {
                state.removeOptimizedTransition(state.numberOfOptimizedTransitions - 1);
              }
            }

            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
              for (var _iterator14 = optimizedTransitions[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                var _transition5 = _step14.value;
                state.addOptimizedTransition(_transition5);
              }
            } catch (err) {
              _didIteratorError14 = true;
              _iteratorError14 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                  _iterator14["return"]();
                }
              } finally {
                if (_didIteratorError14) {
                  throw _iteratorError14;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      if (ParserATNSimulator_1.ParserATNSimulator.debug) {
        console.log("ATN runtime optimizer removed " + removedEdges + " transitions by combining chained epsilon transitions.");
      }

      return removedEdges;
    }
  }, {
    key: "optimizeSets",
    value: function optimizeSets(atn, preserveOrder) {
      if (preserveOrder) {
        // this optimization currently doesn't preserve edge order.
        return 0;
      }

      var removedPaths = 0;
      var decisions = atn.decisionToState;
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = decisions[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var decision = _step15.value;
          var setTransitions = new IntervalSet_1.IntervalSet();

          for (var i = 0; i < decision.numberOfOptimizedTransitions; i++) {
            var epsTransition = decision.getOptimizedTransition(i);

            if (!(epsTransition instanceof EpsilonTransition_1.EpsilonTransition)) {
              continue;
            }

            if (epsTransition.target.numberOfOptimizedTransitions !== 1) {
              continue;
            }

            var transition = epsTransition.target.getOptimizedTransition(0);

            if (!(transition.target instanceof BlockEndState_1.BlockEndState)) {
              continue;
            }

            if (transition instanceof NotSetTransition_1.NotSetTransition) {
              // TODO: not yet implemented
              continue;
            }

            if (transition instanceof AtomTransition_1.AtomTransition || transition instanceof RangeTransition_1.RangeTransition || transition instanceof SetTransition_1.SetTransition) {
              setTransitions.add(i);
            }
          }

          if (setTransitions.size <= 1) {
            continue;
          }

          var optimizedTransitions = [];

          for (var _i23 = 0; _i23 < decision.numberOfOptimizedTransitions; _i23++) {
            if (!setTransitions.contains(_i23)) {
              optimizedTransitions.push(decision.getOptimizedTransition(_i23));
            }
          }

          var blockEndState = decision.getOptimizedTransition(setTransitions.minElement).target.getOptimizedTransition(0).target;
          var matchSet = new IntervalSet_1.IntervalSet();
          var _iteratorNormalCompletion16 = true;
          var _didIteratorError16 = false;
          var _iteratorError16 = undefined;

          try {
            for (var _iterator16 = setTransitions.intervals[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              var interval = _step16.value;

              for (var j = interval.a; j <= interval.b; j++) {
                var matchTransition = decision.getOptimizedTransition(j).target.getOptimizedTransition(0);

                if (matchTransition instanceof NotSetTransition_1.NotSetTransition) {
                  throw new Error("Not yet implemented.");
                } else {
                  matchSet.addAll(matchTransition.label);
                }
              }
            }
          } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
                _iterator16["return"]();
              }
            } finally {
              if (_didIteratorError16) {
                throw _iteratorError16;
              }
            }
          }

          var newTransition = void 0;

          if (matchSet.intervals.length === 1) {
            if (matchSet.size === 1) {
              newTransition = new AtomTransition_1.AtomTransition(blockEndState, matchSet.minElement);
            } else {
              var matchInterval = matchSet.intervals[0];
              newTransition = new RangeTransition_1.RangeTransition(blockEndState, matchInterval.a, matchInterval.b);
            }
          } else {
            newTransition = new SetTransition_1.SetTransition(blockEndState, matchSet);
          }

          var setOptimizedState = new BasicState_1.BasicState();
          setOptimizedState.setRuleIndex(decision.ruleIndex);
          atn.addState(setOptimizedState);
          setOptimizedState.addTransition(newTransition);
          optimizedTransitions.push(new EpsilonTransition_1.EpsilonTransition(setOptimizedState));
          removedPaths += decision.numberOfOptimizedTransitions - optimizedTransitions.length;

          if (decision.isOptimized) {
            while (decision.numberOfOptimizedTransitions > 0) {
              decision.removeOptimizedTransition(decision.numberOfOptimizedTransitions - 1);
            }
          }

          for (var _i24 = 0, _optimizedTransitions = optimizedTransitions; _i24 < _optimizedTransitions.length; _i24++) {
            var _transition6 = _optimizedTransitions[_i24];
            decision.addOptimizedTransition(_transition6);
          }
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      if (ParserATNSimulator_1.ParserATNSimulator.debug) {
        console.log("ATN runtime optimizer removed " + removedPaths + " paths by collapsing sets.");
      }

      return removedPaths;
    }
  }, {
    key: "identifyTailCalls",
    value: function identifyTailCalls(atn) {
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = atn.states[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var state = _step17.value;

          for (var i = 0; i < state.numberOfTransitions; i++) {
            var transition = state.transition(i);

            if (!(transition instanceof RuleTransition_1.RuleTransition)) {
              continue;
            }

            transition.tailCall = this.testTailCall(atn, transition, false);
            transition.optimizedTailCall = this.testTailCall(atn, transition, true);
          }

          if (!state.isOptimized) {
            continue;
          }

          for (var _i25 = 0; _i25 < state.numberOfOptimizedTransitions; _i25++) {
            var _transition7 = state.getOptimizedTransition(_i25);

            if (!(_transition7 instanceof RuleTransition_1.RuleTransition)) {
              continue;
            }

            _transition7.tailCall = this.testTailCall(atn, _transition7, false);
            _transition7.optimizedTailCall = this.testTailCall(atn, _transition7, true);
          }
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }
    }
  }, {
    key: "testTailCall",
    value: function testTailCall(atn, transition, optimizedPath) {
      if (!optimizedPath && transition.tailCall) {
        return true;
      }

      if (optimizedPath && transition.optimizedTailCall) {
        return true;
      }

      var reachable = new BitSet_1.BitSet(atn.states.length);
      var worklist = [];
      worklist.push(transition.followState);

      while (true) {
        var state = worklist.pop();

        if (!state) {
          break;
        }

        if (reachable.get(state.stateNumber)) {
          continue;
        }

        if (state instanceof RuleStopState_1.RuleStopState) {
          continue;
        }

        if (!state.onlyHasEpsilonTransitions) {
          return false;
        }

        var transitionCount = optimizedPath ? state.numberOfOptimizedTransitions : state.numberOfTransitions;

        for (var i = 0; i < transitionCount; i++) {
          var t = optimizedPath ? state.getOptimizedTransition(i) : state.transition(i);

          if (t.serializationType !== 1
          /* EPSILON */
          ) {
              return false;
            }

          worklist.push(t.target);
        }
      }

      return true;
    }
  }, {
    key: "toInt",
    value: function toInt(c) {
      return c;
    }
  }, {
    key: "toInt32",
    value: function toInt32(data, offset) {
      return (data[offset] | data[offset + 1] << 16) >>> 0;
    }
  }, {
    key: "toUUID",
    value: function toUUID(data, offset) {
      var leastSigBits = ATNDeserializer.toInt32(data, offset);
      var lessSigBits = ATNDeserializer.toInt32(data, offset + 2);
      var moreSigBits = ATNDeserializer.toInt32(data, offset + 4);
      var mostSigBits = ATNDeserializer.toInt32(data, offset + 6);
      return new UUID_1.UUID(mostSigBits, moreSigBits, lessSigBits, leastSigBits);
    }
  }, {
    key: "SERIALIZED_VERSION",
    get: function get() {
      /* This value should never change. Updates following this version are
       * reflected as change in the unique ID SERIALIZED_UUID.
       */
      return 3;
    }
  }]);
  return ATNDeserializer;
}();
/* WARNING: DO NOT MERGE THESE LINES. If UUIDs differ during a merge,
 * resolve the conflict by generating a new ID!
 */

/**
 * This is the earliest supported serialized UUID.
 */


ATNDeserializer.BASE_SERIALIZED_UUID = UUID_1.UUID.fromString("E4178468-DF95-44D0-AD87-F22A5D5FB6D3");
/**
 * This UUID indicates an extension of {@link #ADDED_PRECEDENCE_TRANSITIONS}
 * for the addition of lexer actions encoded as a sequence of
 * {@link LexerAction} instances.
 */

ATNDeserializer.ADDED_LEXER_ACTIONS = UUID_1.UUID.fromString("AB35191A-1603-487E-B75A-479B831EAF6D");
/**
 * This UUID indicates the serialized ATN contains two sets of
 * IntervalSets, where the second set's values are encoded as
 * 32-bit integers to support the full Unicode SMP range up to U+10FFFF.
 */

ATNDeserializer.ADDED_UNICODE_SMP = UUID_1.UUID.fromString("C23FEA89-0605-4f51-AFB8-058BCAB8C91B");
/**
 * This list contains all of the currently supported UUIDs, ordered by when
 * the feature first appeared in this branch.
 */

ATNDeserializer.SUPPORTED_UUIDS = [ATNDeserializer.BASE_SERIALIZED_UUID, ATNDeserializer.ADDED_LEXER_ACTIONS, ATNDeserializer.ADDED_UNICODE_SMP];
/**
 * This is the current serialized UUID.
 */

ATNDeserializer.SERIALIZED_UUID = ATNDeserializer.ADDED_UNICODE_SMP;

__decorate([Decorators_1.NotNull], ATNDeserializer.prototype, "deserializationOptions", void 0);

__decorate([__param(0, Decorators_1.NotNull)], ATNDeserializer.prototype, "deserialize", null);

__decorate([__param(0, Decorators_1.NotNull)], ATNDeserializer.prototype, "markPrecedenceDecisions", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], ATNDeserializer.prototype, "edgeFactory", null);

exports.ATNDeserializer = ATNDeserializer;
//# sourceMappingURL=ATNDeserializer.js.map
