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
}); // ConvertTo-TS run at 2016-10-04T11:26:30.7737978-07:00

var ATNState_1 = require("./ATNState");

var ATNStateType_1 = require("./ATNStateType");

var Decorators_1 = require("../Decorators");
/** Mark the end of a * or + loop. */


var LoopEndState =
/*#__PURE__*/
function (_ATNState_1$ATNState) {
  (0, _inherits2["default"])(LoopEndState, _ATNState_1$ATNState);

  function LoopEndState() {
    (0, _classCallCheck2["default"])(this, LoopEndState);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LoopEndState).apply(this, arguments));
  }

  (0, _createClass2["default"])(LoopEndState, [{
    key: "stateType",
    get: function get() {
      return ATNStateType_1.ATNStateType.LOOP_END;
    }
  }]);
  return LoopEndState;
}(ATNState_1.ATNState);

__decorate([Decorators_1.Override], LoopEndState.prototype, "stateType", null);

exports.LoopEndState = LoopEndState;
//# sourceMappingURL=LoopEndState.js.map
