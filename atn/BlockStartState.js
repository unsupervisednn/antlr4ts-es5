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
});

var DecisionState_1 = require("./DecisionState");
/**  The start of a regular `(...)` block. */


var BlockStartState =
/*#__PURE__*/
function (_DecisionState_1$Deci) {
  (0, _inherits2["default"])(BlockStartState, _DecisionState_1$Deci);

  function BlockStartState() {
    (0, _classCallCheck2["default"])(this, BlockStartState);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BlockStartState).apply(this, arguments));
  }

  return BlockStartState;
}(DecisionState_1.DecisionState);

exports.BlockStartState = BlockStartState;
//# sourceMappingURL=BlockStartState.js.map
