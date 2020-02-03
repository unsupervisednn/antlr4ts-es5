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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ATNConfigSet_1 = require("./ATNConfigSet");

var Decorators_1 = require("../Decorators");
/**
 *
 * @author Sam Harwell
 */


var OrderedATNConfigSet =
/*#__PURE__*/
function (_ATNConfigSet_1$ATNCo) {
  (0, _inherits2["default"])(OrderedATNConfigSet, _ATNConfigSet_1$ATNCo);

  function OrderedATNConfigSet(set, readonly) {
    var _this;

    (0, _classCallCheck2["default"])(this, OrderedATNConfigSet);

    if (set != null && readonly != null) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(OrderedATNConfigSet).call(this, set, readonly));
    } else {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(OrderedATNConfigSet).call(this));
    }

    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(OrderedATNConfigSet, [{
    key: "clone",
    value: function clone(readonly) {
      var copy = new OrderedATNConfigSet(this, readonly);

      if (!readonly && this.isReadOnly) {
        copy.addAll(this);
      }

      return copy;
    }
  }, {
    key: "getKey",
    value: function getKey(e) {
      // This is a specially crafted key to ensure configurations are only merged if they are equal
      return {
        state: 0,
        alt: e.hashCode()
      };
    }
  }, {
    key: "canMerge",
    value: function canMerge(left, leftKey, right) {
      return left.equals(right);
    }
  }]);
  return OrderedATNConfigSet;
}(ATNConfigSet_1.ATNConfigSet);

__decorate([Decorators_1.Override], OrderedATNConfigSet.prototype, "clone", null);

__decorate([Decorators_1.Override], OrderedATNConfigSet.prototype, "getKey", null);

__decorate([Decorators_1.Override], OrderedATNConfigSet.prototype, "canMerge", null);

exports.OrderedATNConfigSet = OrderedATNConfigSet;
//# sourceMappingURL=OrderedATNConfigSet.js.map
