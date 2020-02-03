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
});

var Decorators_1 = require("../Decorators");

var Transition_1 = require("./Transition");
/** */


var RuleTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(RuleTransition, _Transition_1$Transit);

  function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
    var _this;

    (0, _classCallCheck2["default"])(this, RuleTransition);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RuleTransition).call(this, ruleStart));
    _this.tailCall = false;
    _this.optimizedTailCall = false;
    _this.ruleIndex = ruleIndex;
    _this.precedence = precedence;
    _this.followState = followState;
    return _this;
  }

  (0, _createClass2["default"])(RuleTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return false;
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 3
      /* RULE */
      ;
    }
  }, {
    key: "isEpsilon",
    get: function get() {
      return true;
    }
  }]);
  return RuleTransition;
}(Transition_1.Transition);

__decorate([Decorators_1.NotNull], RuleTransition.prototype, "followState", void 0);

__decorate([Decorators_1.Override], RuleTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override], RuleTransition.prototype, "isEpsilon", null);

__decorate([Decorators_1.Override], RuleTransition.prototype, "matches", null);

RuleTransition = __decorate([__param(0, Decorators_1.NotNull), __param(3, Decorators_1.NotNull)], RuleTransition);
exports.RuleTransition = RuleTransition;
//# sourceMappingURL=RuleTransition.js.map
