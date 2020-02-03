"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:28.4381103-07:00

var ATNState_1 = require("./ATNState");

var DecisionState =
/*#__PURE__*/
function (_ATNState_1$ATNState) {
  (0, _inherits2["default"])(DecisionState, _ATNState_1$ATNState);

  function DecisionState() {
    var _this;

    (0, _classCallCheck2["default"])(this, DecisionState);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DecisionState).apply(this, arguments));
    _this.decision = -1;
    _this.nonGreedy = false;
    _this.sll = false;
    return _this;
  }

  return DecisionState;
}(ATNState_1.ATNState);

exports.DecisionState = DecisionState;
//# sourceMappingURL=DecisionState.js.map
