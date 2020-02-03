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

var Transition_1 = require("./Transition");
/**
 *
 * @author Sam Harwell
 */


var AbstractPredicateTransition =
/*#__PURE__*/
function (_Transition_1$Transit) {
  (0, _inherits2["default"])(AbstractPredicateTransition, _Transition_1$Transit);

  function AbstractPredicateTransition(target) {
    (0, _classCallCheck2["default"])(this, AbstractPredicateTransition);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AbstractPredicateTransition).call(this, target));
  }

  return AbstractPredicateTransition;
}(Transition_1.Transition);

exports.AbstractPredicateTransition = AbstractPredicateTransition;
//# sourceMappingURL=AbstractPredicateTransition.js.map
