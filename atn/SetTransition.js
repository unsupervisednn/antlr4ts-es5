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

var Token_1 = require("../Token");

var Transition_1 = require("./Transition");
/** A transition containing a set of values. */


var SetTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(SetTransition, _Transition_1$Transit);

  // TODO (sam): should we really allow undefined here?
  function SetTransition(target, set) {
    var _this;

    (0, _classCallCheck2["default"])(this, SetTransition);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SetTransition).call(this, target));

    if (set == null) {
      set = IntervalSet_1.IntervalSet.of(Token_1.Token.INVALID_TYPE);
    }

    _this.set = set;
    return _this;
  }

  (0, _createClass2["default"])(SetTransition, [{
    key: "matches",
    value: function matches(symbol, minVocabSymbol, maxVocabSymbol) {
      return this.set.contains(symbol);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.set.toString();
    }
  }, {
    key: "serializationType",
    get: function get() {
      return 7
      /* SET */
      ;
    }
  }, {
    key: "label",
    get: function get() {
      return this.set;
    }
  }]);
  return SetTransition;
}(Transition_1.Transition);

__decorate([Decorators_1.NotNull], SetTransition.prototype, "set", void 0);

__decorate([Decorators_1.Override], SetTransition.prototype, "serializationType", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], SetTransition.prototype, "label", null);

__decorate([Decorators_1.Override], SetTransition.prototype, "matches", null);

__decorate([Decorators_1.Override, Decorators_1.NotNull], SetTransition.prototype, "toString", null);

SetTransition = __decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.Nullable)], SetTransition);
exports.SetTransition = SetTransition;
//# sourceMappingURL=SetTransition.js.map
