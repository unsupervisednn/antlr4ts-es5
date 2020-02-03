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
}); // ConvertTo-TS run at 2016-10-04T11:26:57.4741196-07:00

var ATN_1 = require("./atn/ATN");

var Decorators_1 = require("./Decorators");

var ParserRuleContext_1 = require("./ParserRuleContext");
/** A handy class for use with
 *
 *  options {contextSuperClass=org.antlr.v4.runtime.RuleContextWithAltNum;}
 *
 *  that provides a backing field / impl for the outer alternative number
 *  matched for an internal parse tree node.
 *
 *  I'm only putting into Java runtime as I'm certain I'm the only one that
 *  will really every use this.
 */


var RuleContextWithAltNum =
/*#__PURE__*/
function (_ParserRuleContext_1$) {
  (0, _inherits2["default"])(RuleContextWithAltNum, _ParserRuleContext_1$);

  function RuleContextWithAltNum(parent, invokingStateNumber) {
    var _this;

    (0, _classCallCheck2["default"])(this, RuleContextWithAltNum);

    if (invokingStateNumber !== undefined) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RuleContextWithAltNum).call(this, parent, invokingStateNumber));
    } else {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RuleContextWithAltNum).call(this));
    }

    _this._altNumber = ATN_1.ATN.INVALID_ALT_NUMBER;
    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(RuleContextWithAltNum, [{
    key: "altNumber",
    get: function get() {
      return this._altNumber;
    } // @Override
    ,
    set: function set(altNum) {
      this._altNumber = altNum;
    }
  }]);
  return RuleContextWithAltNum;
}(ParserRuleContext_1.ParserRuleContext);

__decorate([Decorators_1.Override], RuleContextWithAltNum.prototype, "altNumber", null);

exports.RuleContextWithAltNum = RuleContextWithAltNum;
//# sourceMappingURL=RuleContextWithAltNum.js.map
