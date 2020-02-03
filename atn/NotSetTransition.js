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
});

var Decorators_1 = require("../Decorators");

var SetTransition_1 = require("./SetTransition");

var NotSetTransition =
/*#__PURE__*/
function (_SetTransition_1$SetT) {
  (0, _inherits2["default"])(NotSetTransition, _SetTransition_1$SetT);

  function NotSetTransition(target, set) {
    (0, _classCallCheck2["default"])(this, NotSetTransition);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NotSetTransition).call(this, target, set));
  }

  (0, _createClass2["default"])(NotSetTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !(0, _get2["default"])((0, _getPrototypeOf2["default"])(NotSetTransition.prototype), "matches", this).call(this, symbol, minVocabSymbol, maxVocabSymbol);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "~" + (0, _get2["default"])((0, _getPrototypeOf2["default"])(NotSetTransition.prototype), "toString", this).call(this);
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 8
      /* NOT_SET */
      ;
    }
  }]);
  return NotSetTransition;
}(SetTransition_1.SetTransition);

__decorate([Decorators_1.Override], NotSetTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override], NotSetTransition.prototype, "matches", null);

__decorate([Decorators_1.Override], NotSetTransition.prototype, "toString", null);

NotSetTransition = __decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.Nullable)], NotSetTransition);
exports.NotSetTransition = NotSetTransition;
//# sourceMappingURL=NotSetTransition.js.map
