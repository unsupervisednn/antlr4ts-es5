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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Decorators_1 = require("../Decorators");

var INITIAL_NUM_TRANSITIONS = 4;
/**
 * The following images show the relation of states and
 * {@link ATNState#transitions} for various grammar constructs.
 *
 * * Solid edges marked with an &#0949; indicate a required
 *   {@link EpsilonTransition}.
 *
 * * Dashed edges indicate locations where any transition derived from
 *   {@link Transition} might appear.
 *
 * * Dashed nodes are place holders for either a sequence of linked
 *   {@link BasicState} states or the inclusion of a block representing a nested
 *   construct in one of the forms below.
 *
 * * Nodes showing multiple outgoing alternatives with a `...` support
 *   any number of alternatives (one or more). Nodes without the `...` only
 *   support the exact number of alternatives shown in the diagram.
 *
 * <h2>Basic Blocks</h2>
 *
 * <h3>Rule</h3>
 *
 * <embed src="images/Rule.svg" type="image/svg+xml"/>
 *
 * <h3>Block of 1 or more alternatives</h3>
 *
 * <embed src="images/Block.svg" type="image/svg+xml"/>
 *
 * <h2>Greedy Loops</h2>
 *
 * <h3>Greedy Closure: `(...)*`</h3>
 *
 * <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Positive Closure: `(...)+`</h3>
 *
 * <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Optional: `(...)?`</h3>
 *
 * <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
 *
 * <h2>Non-Greedy Loops</h2>
 *
 * <h3>Non-Greedy Closure: `(...)*?`</h3>
 *
 * <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Positive Closure: `(...)+?`</h3>
 *
 * <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Optional: `(...)??`</h3>
 *
 * <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
 */

var ATNState =
/*#__PURE__*/
function () {
  function ATNState() {
    (0, _classCallCheck2["default"])(this, ATNState);
    this.stateNumber = ATNState.INVALID_STATE_NUMBER;
    this.ruleIndex = 0; // at runtime, we don't have Rule objects

    this.epsilonOnlyTransitions = false;
    /** Track the transitions emanating from this ATN state. */

    this.transitions = [];
    this.optimizedTransitions = this.transitions;
  }
  /**
   * Gets the state number.
   *
   * @returns the state number
   */


  (0, _createClass2["default"])(ATNState, [{
    key: "getStateNumber",
    value: function getStateNumber() {
      return this.stateNumber;
    }
    /**
     * For all states except {@link RuleStopState}, this returns the state
     * number. Returns -1 for stop states.
     *
     * @returns -1 for {@link RuleStopState}, otherwise the state number
     */

  }, {
    key: "hashCode",
    value: function hashCode() {
      return this.stateNumber;
    }
  }, {
    key: "equals",
    value: function equals(o) {
      // are these states same object?
      if (o instanceof ATNState) {
        return this.stateNumber === o.stateNumber;
      }

      return false;
    }
  }, {
    key: "toString",
    value: function toString() {
      return String(this.stateNumber);
    }
  }, {
    key: "getTransitions",
    value: function getTransitions() {
      return this.transitions.slice(0);
    }
  }, {
    key: "addTransition",
    value: function addTransition(e, index) {
      if (this.transitions.length === 0) {
        this.epsilonOnlyTransitions = e.isEpsilon;
      } else if (this.epsilonOnlyTransitions !== e.isEpsilon) {
        this.epsilonOnlyTransitions = false;
        throw new Error("ATN state " + this.stateNumber + " has both epsilon and non-epsilon transitions.");
      }

      this.transitions.splice(index !== undefined ? index : this.transitions.length, 0, e);
    }
  }, {
    key: "transition",
    value: function transition(i) {
      return this.transitions[i];
    }
  }, {
    key: "setTransition",
    value: function setTransition(i, e) {
      this.transitions[i] = e;
    }
  }, {
    key: "removeTransition",
    value: function removeTransition(index) {
      return this.transitions.splice(index, 1)[0];
    }
  }, {
    key: "setRuleIndex",
    value: function setRuleIndex(ruleIndex) {
      this.ruleIndex = ruleIndex;
    }
  }, {
    key: "getOptimizedTransition",
    value: function getOptimizedTransition(i) {
      return this.optimizedTransitions[i];
    }
  }, {
    key: "addOptimizedTransition",
    value: function addOptimizedTransition(e) {
      if (!this.isOptimized) {
        this.optimizedTransitions = new Array();
      }

      this.optimizedTransitions.push(e);
    }
  }, {
    key: "setOptimizedTransition",
    value: function setOptimizedTransition(i, e) {
      if (!this.isOptimized) {
        throw new Error("This ATNState is not optimized.");
      }

      this.optimizedTransitions[i] = e;
    }
  }, {
    key: "removeOptimizedTransition",
    value: function removeOptimizedTransition(i) {
      if (!this.isOptimized) {
        throw new Error("This ATNState is not optimized.");
      }

      this.optimizedTransitions.splice(i, 1);
    }
  }, {
    key: "nonStopStateNumber",
    get: function get() {
      return this.getStateNumber();
    }
  }, {
    key: "isNonGreedyExitState",
    get: function get() {
      return false;
    }
  }, {
    key: "numberOfTransitions",
    get: function get() {
      return this.transitions.length;
    }
  }, {
    key: "onlyHasEpsilonTransitions",
    get: function get() {
      return this.epsilonOnlyTransitions;
    }
  }, {
    key: "isOptimized",
    get: function get() {
      return this.optimizedTransitions !== this.transitions;
    }
  }, {
    key: "numberOfOptimizedTransitions",
    get: function get() {
      return this.optimizedTransitions.length;
    }
  }]);
  return ATNState;
}();

__decorate([Decorators_1.Override], ATNState.prototype, "hashCode", null);

__decorate([Decorators_1.Override], ATNState.prototype, "equals", null);

__decorate([Decorators_1.Override], ATNState.prototype, "toString", null);

exports.ATNState = ATNState;

(function (ATNState) {
  ATNState.INVALID_STATE_NUMBER = -1;
})(ATNState = exports.ATNState || (exports.ATNState = {}));
//# sourceMappingURL=ATNState.js.map
