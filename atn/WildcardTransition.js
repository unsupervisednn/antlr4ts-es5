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

var WildcardTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(WildcardTransition, _Transition_1$Transit);

  function WildcardTransition(target) {
    (0, _classCallCheck2["default"])(this, WildcardTransition);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WildcardTransition).call(this, target));
  }

  (0, _createClass2["default"])(WildcardTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
    }
  }, {
    key: "toString",
    value: function toString() {
      return ".";
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 9
      /* WILDCARD */
      ;
    }
  }]);
  return WildcardTransition;
}(Transition_1.Transition);

__decorate([Decorators_1.Override], WildcardTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override], WildcardTransition.prototype, "matches", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], WildcardTransition.prototype, "toString", null);

WildcardTransition = __decorate([__param(0, Decorators_1.NotNull)], WildcardTransition);
exports.WildcardTransition = WildcardTransition;
//# sourceMappingURL=WildcardTransition.js.map
