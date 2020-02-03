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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:40.6647101-07:00

var IntegerList_1 = require("./IntegerList");
/**
 *
 * @author Sam Harwell
 */


var IntegerStack =
/*#__PURE__*/
function (_IntegerList_1$Intege) {
  (0, _inherits2["default"])(IntegerStack, _IntegerList_1$Intege);

  function IntegerStack(arg) {
    (0, _classCallCheck2["default"])(this, IntegerStack);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IntegerStack).call(this, arg));
  }

  (0, _createClass2["default"])(IntegerStack, [{
    key: "push",
    value: function push(value) {
      this.add(value);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.removeAt(this.size - 1);
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.get(this.size - 1);
    }
  }]);
  return IntegerStack;
}(IntegerList_1.IntegerList);

exports.IntegerStack = IntegerStack;
//# sourceMappingURL=IntegerStack.js.map
