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
}); // ConvertTo-TS run at 2016-10-04T11:26:51.5898546-07:00

var Decorators_1 = require("./Decorators");

var ParserRuleContext_1 = require("./ParserRuleContext");
/**
 * This class extends {@link ParserRuleContext} by allowing the value of
 * {@link #getRuleIndex} to be explicitly set for the context.
 *
 * {@link ParserRuleContext} does not include field storage for the rule index
 * since the context classes created by the code generator override the
 * {@link #getRuleIndex} method to return the correct value for that context.
 * Since the parser interpreter does not use the context classes generated for a
 * parser, this class (with slightly more memory overhead per node) is used to
 * provide equivalent functionality.
 */


var InterpreterRuleContext =
/*#__PURE__*/
function (_ParserRuleContext_1$) {
  (0, _inherits2["default"])(InterpreterRuleContext, _ParserRuleContext_1$);

  function InterpreterRuleContext(ruleIndex, parent, invokingStateNumber) {
    var _this;

    (0, _classCallCheck2["default"])(this, InterpreterRuleContext);

    if (invokingStateNumber !== undefined) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InterpreterRuleContext).call(this, parent, invokingStateNumber));
    } else {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InterpreterRuleContext).call(this));
    }

    _this._ruleIndex = ruleIndex;
    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(InterpreterRuleContext, [{
    key: "ruleIndex",
    get: function get() {
      return this._ruleIndex;
    }
  }]);
  return InterpreterRuleContext;
}(ParserRuleContext_1.ParserRuleContext);

__decorate([Decorators_1.Override], InterpreterRuleContext.prototype, "ruleIndex", null);

exports.InterpreterRuleContext = InterpreterRuleContext;
//# sourceMappingURL=InterpreterRuleContext.js.map
