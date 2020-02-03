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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:42.1346951-07:00

var MultiMap =
/*#__PURE__*/
function (_Map) {
  (0, _inherits2["default"])(MultiMap, _Map);

  function MultiMap() {
    (0, _classCallCheck2["default"])(this, MultiMap);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MultiMap).call(this));
  }

  (0, _createClass2["default"])(MultiMap, [{
    key: "map",
    value: function map(key, value) {
      var elementsForKey = (0, _get2["default"])((0, _getPrototypeOf2["default"])(MultiMap.prototype), "get", this).call(this, key);

      if (!elementsForKey) {
        elementsForKey = [];
        (0, _get2["default"])((0, _getPrototypeOf2["default"])(MultiMap.prototype), "set", this).call(this, key, elementsForKey);
      }

      elementsForKey.push(value);
    }
  }, {
    key: "getPairs",
    value: function getPairs() {
      var pairs = [];
      this.forEach(function (values, key) {
        values.forEach(function (v) {
          pairs.push([key, v]);
        });
      });
      return pairs;
    }
  }]);
  return MultiMap;
}((0, _wrapNativeSuper2["default"])(Map));

exports.MultiMap = MultiMap;
//# sourceMappingURL=MultiMap.js.map
