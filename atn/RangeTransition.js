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

var IntervalSet_1 = require("../misc/IntervalSet");

var Decorators_1 = require("../Decorators");

var Transition_1 = require("./Transition");

var RangeTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(RangeTransition, _Transition_1$Transit);

  function RangeTransition(target, from, to) {
    var _this;

    (0, _classCallCheck2["default"])(this, RangeTransition);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RangeTransition).call(this, target));
    _this.from = from;
    _this.to = to;
    return _this;
  }

  (0, _createClass2["default"])(RangeTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return symbol >= this.from && symbol <= this.to;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "'" + String.fromCodePoint(this.from) + "'..'" + String.fromCodePoint(this.to) + "'";
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 2
      /* RANGE */
      ;
    }
  }, {
    key: "label",
    get: function get() {
      return IntervalSet_1.IntervalSet.of(this.from, this.to);
    }
  }]);
  return RangeTransition;
}(Transition_1.Transition);

__decorate([Decorators_1.Override], RangeTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], RangeTransition.prototype, "label", null);

__decorate([Decorators_1.Override], RangeTransition.prototype, "matches", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], RangeTransition.prototype, "toString", null);

RangeTransition = __decorate([__param(0, Decorators_1.NotNull)], RangeTransition);
exports.RangeTransition = RangeTransition;
//# sourceMappingURL=RangeTransition.js.map
