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
}); // ConvertTo-TS run at 2016-10-04T11:26:38.3567094-07:00

var Array2DHashSet_1 = require("../misc/Array2DHashSet");

var ATNConfigSet_1 = require("../atn/ATNConfigSet");

var DFASerializer_1 = require("./DFASerializer");

var DFAState_1 = require("./DFAState");

var LexerDFASerializer_1 = require("./LexerDFASerializer");

var Decorators_1 = require("../Decorators");

var ObjectEqualityComparator_1 = require("../misc/ObjectEqualityComparator");

var StarLoopEntryState_1 = require("../atn/StarLoopEntryState");

var VocabularyImpl_1 = require("../VocabularyImpl");

var DFA =
/*#__PURE__*/
function () {
  function DFA(atnStartState) {
    var decision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    (0, _classCallCheck2["default"])(this, DFA);

    /**
     * A set of all states in the `DFA`.
     *
     * Note that this collection of states holds the DFA states for both SLL and LL prediction. Only the start state
     * needs to be differentiated for these cases, which is tracked by the `s0` and `s0full` fields.
     */
    this.states = new Array2DHashSet_1.Array2DHashSet(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);
    this.nextStateNumber = 0;

    if (!atnStartState.atn) {
      throw new Error("The ATNState must be associated with an ATN");
    }

    this.atnStartState = atnStartState;
    this.atn = atnStartState.atn;
    this.decision = decision; // Precedence DFAs are associated with the special precedence decision created for left-recursive rules which
    // evaluate their alternatives using a precedence hierarchy. When such a decision is encountered, we mark this
    // DFA instance as a precedence DFA and initialize the initial states s0 and s0full to special DFAState
    // instances which use outgoing edges to link to the actual start state used for each precedence level.

    var isPrecedenceDfa = false;

    if (atnStartState instanceof StarLoopEntryState_1.StarLoopEntryState) {
      if (atnStartState.precedenceRuleDecision) {
        isPrecedenceDfa = true;
        this.s0 = new DFAState_1.DFAState(new ATNConfigSet_1.ATNConfigSet());
        this.s0full = new DFAState_1.DFAState(new ATNConfigSet_1.ATNConfigSet());
      }
    }

    this.precedenceDfa = isPrecedenceDfa;
  }
  /**
   * Gets whether this DFA is a precedence DFA. Precedence DFAs use a special
   * start state {@link #s0} which is not stored in {@link #states}. The
   * {@link DFAState#edges} array for this start state contains outgoing edges
   * supplying individual start states corresponding to specific precedence
   * values.
   *
   * @returns `true` if this is a precedence DFA; otherwise,
   * `false`.
   * @see Parser.precedence
   */


  (0, _createClass2["default"])(DFA, [{
    key: "getPrecedenceStartState",

    /**
     * Get the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @returns The start state corresponding to the specified precedence, or
     * `undefined` if no start state exists for the specified precedence.
     *
     * @ if this is not a precedence DFA.
     * @see `isPrecedenceDfa`
     */
    value: function getPrecedenceStartState(precedence, fullContext) {
      if (!this.isPrecedenceDfa) {
        throw new Error("Only precedence DFAs may contain a precedence start state.");
      } // s0 and s0full are never null for a precedence DFA


      if (fullContext) {
        return this.s0full.getTarget(precedence);
      } else {
        return this.s0.getTarget(precedence);
      }
    }
    /**
     * Set the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @param startState The start state corresponding to the specified
     * precedence.
     *
     * @ if this is not a precedence DFA.
     * @see `isPrecedenceDfa`
     */

  }, {
    key: "setPrecedenceStartState",
    value: function setPrecedenceStartState(precedence, fullContext, startState) {
      if (!this.isPrecedenceDfa) {
        throw new Error("Only precedence DFAs may contain a precedence start state.");
      }

      if (precedence < 0) {
        return;
      }

      if (fullContext) {
        // s0full is never null for a precedence DFA
        this.s0full.setTarget(precedence, startState);
      } else {
        // s0 is never null for a precedence DFA
        this.s0.setTarget(precedence, startState);
      }
    }
  }, {
    key: "addState",
    value: function addState(state) {
      state.stateNumber = this.nextStateNumber++;
      return this.states.getOrAdd(state);
    }
  }, {
    key: "toString",
    value: function toString(vocabulary, ruleNames) {
      if (!vocabulary) {
        vocabulary = VocabularyImpl_1.VocabularyImpl.EMPTY_VOCABULARY;
      }

      if (!this.s0) {
        return "";
      }

      var serializer;

      if (ruleNames) {
        serializer = new DFASerializer_1.DFASerializer(this, vocabulary, ruleNames, this.atnStartState.atn);
      } else {
        serializer = new DFASerializer_1.DFASerializer(this, vocabulary);
      }

      return serializer.toString();
    }
  }, {
    key: "toLexerString",
    value: function toLexerString() {
      if (!this.s0) {
        return "";
      }

      var serializer = new LexerDFASerializer_1.LexerDFASerializer(this);
      return serializer.toString();
    }
  }, {
    key: "isPrecedenceDfa",
    get: function get() {
      return this.precedenceDfa;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      if (this.isPrecedenceDfa) {
        // s0 and s0full are never null for a precedence DFA
        return this.s0.getEdgeMap().size === 0 && this.s0full.getEdgeMap().size === 0;
      }

      return this.s0 == null && this.s0full == null;
    }
  }, {
    key: "isContextSensitive",
    get: function get() {
      if (this.isPrecedenceDfa) {
        // s0full is never null for a precedence DFA
        return this.s0full.getEdgeMap().size > 0;
      }

      return this.s0full != null;
    }
  }]);
  return DFA;
}();

__decorate([Decorators_1.NotNull], DFA.prototype, "states", void 0);

__decorate([Decorators_1.NotNull], DFA.prototype, "atnStartState", void 0);

__decorate([Decorators_1.NotNull], DFA.prototype, "atn", void 0);

DFA = __decorate([__param(0, Decorators_1.NotNull)], DFA);
exports.DFA = DFA;
//# sourceMappingURL=DFA.js.map
