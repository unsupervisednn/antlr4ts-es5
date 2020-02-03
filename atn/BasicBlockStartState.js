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
}); // ConvertTo-TS run at 2016-10-04T11:26:27.7669801-07:00

var ATNStateType_1 = require("./ATNStateType");

var BlockStartState_1 = require("./BlockStartState");

var Decorators_1 = require("../Decorators");
/**
 *
 * @author Sam Harwell
 */


var BasicBlockStartState =
/*#__PURE__*/
function (_BlockStartState_1$Bl) {
  (0, _inherits2["default"])(BasicBlockStartState, _BlockStartState_1$Bl);

  function BasicBlockStartState() {
    (0, _classCallCheck2["default"])(this, BasicBlockStartState);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BasicBlockStartState).apply(this, arguments));
  }

  (0, _createClass2["default"])(BasicBlockStartState, [{
    key: "stateType",
    get: function get() {
      return ATNStateType_1.ATNStateType.BLOCK_START;
    }
  }]);
  return BasicBlockStartState;
}(BlockStartState_1.BlockStartState);

__decorate([Decorators_1.Override], BasicBlockStartState.prototype, "stateType", null);

exports.BasicBlockStartState = BasicBlockStartState;
//# sourceMappingURL=BasicBlockStartState.js.map
