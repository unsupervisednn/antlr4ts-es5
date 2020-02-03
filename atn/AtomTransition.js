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
/** TODO: make all transitions sets? no, should remove set edges */


var AtomTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(AtomTransition, _Transition_1$Transit);

  function AtomTransition(target, label) {
    var _this;

    (0, _classCallCheck2["default"])(this, AtomTransition);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AtomTransition).call(this, target));
    _this._label = label;
    return _this;
  }

  (0, _createClass2["default"])(AtomTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return this._label === symbol;
    }
  }, {
    key: "toString",
    value: function toString() {
      return String(this.label);
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 5
      /* ATOM */
      ;
    }
  }, {
    key: "label",
    get: function get() {
      return IntervalSet_1.IntervalSet.of(this._label);
    }
  }]);
  return AtomTransition;
}(Transition_1.Transition);

__decorate([Decorators_1.Override], AtomTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], AtomTransition.prototype, "label", null);

__decorate([Decorators_1.Override], AtomTransition.prototype, "matches", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], AtomTransition.prototype, "toString", null);

AtomTransition = __decorate([__param(0, Decorators_1.NotNull)], AtomTransition);
exports.AtomTransition = AtomTransition;
//# sourceMappingURL=AtomTransition.js.map
