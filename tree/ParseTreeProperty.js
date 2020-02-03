"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Associate a property with a parse tree node. Useful with parse tree listeners
 * that need to associate values with particular tree nodes, kind of like
 * specifying a return value for the listener event method that visited a
 * particular node. Example:
 *
 * ```
 * ParseTreeProperty<Integer> values = new ParseTreeProperty<Integer>();
 * values.put(tree, 36);
 * int x = values.get(tree);
 * values.removeFrom(tree);
 * ```
 *
 * You would make one decl (values here) in the listener and use lots of times
 * in your event methods.
 */

var ParseTreeProperty =
/*#__PURE__*/
function () {
  function ParseTreeProperty() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ParseTreeProperty";
    (0, _classCallCheck2["default"])(this, ParseTreeProperty);
    this._symbol = Symbol(name);
  }

  (0, _createClass2["default"])(ParseTreeProperty, [{
    key: "get",
    value: function get(node) {
      return node[this._symbol];
    }
  }, {
    key: "set",
    value: function set(node, value) {
      node[this._symbol] = value;
    }
  }, {
    key: "removeFrom",
    value: function removeFrom(node) {
      var result = node[this._symbol];
      delete node[this._symbol];
      return result;
    }
  }]);
  return ParseTreeProperty;
}();

exports.ParseTreeProperty = ParseTreeProperty;
//# sourceMappingURL=ParseTreeProperty.js.map
