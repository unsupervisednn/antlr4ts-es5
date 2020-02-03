"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ATNSimulator_1 = require("../atn/ATNSimulator");

var Decorators_1 = require("../Decorators");

var PredictionContext_1 = require("../atn/PredictionContext");

var Recognizer_1 = require("../Recognizer");

var VocabularyImpl_1 = require("../VocabularyImpl");
/** A DFA walker that knows how to dump them to serialized strings. */


var DFASerializer =
/*#__PURE__*/
function () {
  function DFASerializer(dfa, vocabulary, ruleNames, atn) {
    (0, _classCallCheck2["default"])(this, DFASerializer);

    if (vocabulary instanceof Recognizer_1.Recognizer) {
      ruleNames = vocabulary.ruleNames;
      atn = vocabulary.atn;
      vocabulary = vocabulary.vocabulary;
    } else if (!vocabulary) {
      vocabulary = VocabularyImpl_1.VocabularyImpl.EMPTY_VOCABULARY;
    }

    this.dfa = dfa;
    this.vocabulary = vocabulary;
    this.ruleNames = ruleNames;
    this.atn = atn;
  }

  (0, _createClass2["default"])(DFASerializer, [{
    key: "toString",
    value: function toString() {
      if (!this.dfa.s0) {
        return "";
      }

      var buf = "";

      if (this.dfa.states) {
        var states = (0, _construct2["default"])(Array, (0, _toConsumableArray2["default"])(this.dfa.states.toArray()));
        states.sort(function (o1, o2) {
          return o1.stateNumber - o2.stateNumber;
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var s = _step.value;
            var edges = s.getEdgeMap();
            var edgeKeys = (0, _toConsumableArray2["default"])(edges.keys()).sort(function (a, b) {
              return a - b;
            });
            var contextEdges = s.getContextEdgeMap();
            var contextEdgeKeys = (0, _toConsumableArray2["default"])(contextEdges.keys()).sort(function (a, b) {
              return a - b;
            });
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = edgeKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _entry = _step2.value;
                var value = edges.get(_entry);

                if ((value == null || value === ATNSimulator_1.ATNSimulator.ERROR) && !s.isContextSymbol(_entry)) {
                  continue;
                }

                var contextSymbol = false;
                buf += this.getStateString(s) + "-" + this.getEdgeLabel(_entry) + "->";

                if (s.isContextSymbol(_entry)) {
                  buf += "!";
                  contextSymbol = true;
                }

                var t = value;

                if (t && t.stateNumber !== ATNSimulator_1.ATNSimulator.ERROR.stateNumber) {
                  buf += this.getStateString(t) + "\n";
                } else if (contextSymbol) {
                  buf += "ctx\n";
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

            if (s.isContextSensitive) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = contextEdgeKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var entry = _step3.value;
                  buf += this.getStateString(s) + "-" + this.getContextLabel(entry) + "->" + this.getStateString(contextEdges.get(entry)) + "\n";
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

      var output = buf;

      if (output.length === 0) {
        return "";
      } //return Utils.sortLinesInString(output);


      return output;
    }
  }, {
    key: "getContextLabel",
    value: function getContextLabel(i) {
      if (i === PredictionContext_1.PredictionContext.EMPTY_FULL_STATE_KEY) {
        return "ctx:EMPTY_FULL";
      } else if (i === PredictionContext_1.PredictionContext.EMPTY_LOCAL_STATE_KEY) {
        return "ctx:EMPTY_LOCAL";
      }

      if (this.atn && i > 0 && i <= this.atn.states.length) {
        var state = this.atn.states[i];
        var ruleIndex = state.ruleIndex;

        if (this.ruleNames && ruleIndex >= 0 && ruleIndex < this.ruleNames.length) {
          return "ctx:" + String(i) + "(" + this.ruleNames[ruleIndex] + ")";
        }
      }

      return "ctx:" + String(i);
    }
  }, {
    key: "getEdgeLabel",
    value: function getEdgeLabel(i) {
      return this.vocabulary.getDisplayName(i);
    }
  }, {
    key: "getStateString",
    value: function getStateString(s) {
      if (s === ATNSimulator_1.ATNSimulator.ERROR) {
        return "ERROR";
      }

      var n = s.stateNumber;
      var stateStr = "s" + n;

      if (s.isAcceptState) {
        if (s.predicates) {
          stateStr = ":s" + n + "=>" + s.predicates;
        } else {
          stateStr = ":s" + n + "=>" + s.prediction;
        }
      }

      if (s.isContextSensitive) {
        stateStr += "*";
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = s.configs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var config = _step4.value;

            if (config.reachesIntoOuterContext) {
              stateStr += "*";
              break;
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
      }

      return stateStr;
    }
  }]);
  return DFASerializer;
}();

__decorate([Decorators_1.NotNull], DFASerializer.prototype, "dfa", void 0);

__decorate([Decorators_1.NotNull], DFASerializer.prototype, "vocabulary", void 0);

__decorate([Decorators_1.Override], DFASerializer.prototype, "toString", null);

exports.DFASerializer = DFASerializer;
//# sourceMappingURL=DFASerializer.js.map
