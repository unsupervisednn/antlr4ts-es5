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
}); // ConvertTo-TS run at 2016-10-04T11:26:35.2826960-07:00

var AbstractPredicateTransition_1 = require("./AbstractPredicateTransition");

var Decorators_1 = require("../Decorators");

var SemanticContext_1 = require("./SemanticContext");
/** TODO: this is old comment:
 *  A tree of semantic predicates from the grammar AST if label==SEMPRED.
 *  In the ATN, labels will always be exactly one predicate, but the DFA
 *  may have to combine a bunch of them as it collects predicates from
 *  multiple ATN configurations into a single DFA state.
 */


var PredicateTransition =
/*#__PURE__*/
function (_AbstractPredicateTra) {
  (0, _inherits2["default"])(PredicateTransition, _AbstractPredicateTra);

  function PredicateTransition(target, ruleIndex, predIndex, isCtxDependent) {
    var _this;

    (0, _classCallCheck2["default"])(this, PredicateTransition);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PredicateTransition).call(this, target));
    _this.ruleIndex = ruleIndex;
    _this.predIndex = predIndex;
    _this.isCtxDependent = isCtxDependent;
    return _this;
  }

  (0, _createClass2["default"])(PredicateTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return false;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "pred_" + this.ruleIndex + ":" + this.predIndex;
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 4
      /* PREDICATE */
      ;
    }
  }, {
    key: "isEpsilon",
    get: function get() {
      return true;
    }
  }, {
    key: "predicate",
    get: function get() {
      return new SemanticContext_1.SemanticContext.Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
    }
  }]);
  return PredicateTransition;
}(AbstractPredicateTransition_1.AbstractPredicateTransition);

__decorate([Decorators_1.Override], PredicateTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override], PredicateTransition.prototype, "isEpsilon", null);

__decorate([Decorators_1.Override], PredicateTransition.prototype, "matches", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], PredicateTransition.prototype, "toString", null);

PredicateTransition = __decorate([__param(0, Decorators_1.NotNull)], PredicateTransition);
exports.PredicateTransition = PredicateTransition;
//# sourceMappingURL=PredicateTransition.js.map
