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
}); // CONVERSTION complete, Burt Harris 10/14/2016

var ParserRuleContext_1 = require("../../ParserRuleContext");

var Decorators_1 = require("../../Decorators");

var Trees_1 = require("../Trees");

var XPathElement_1 = require("./XPathElement");

var XPathRuleElement =
/*#__PURE__*/
function (_XPathElement_1$XPath) {
  (0, _inherits2["default"])(XPathRuleElement, _XPathElement_1$XPath);

  function XPathRuleElement(ruleName, ruleIndex) {
    var _this;

    (0, _classCallCheck2["default"])(this, XPathRuleElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(XPathRuleElement).call(this, ruleName));
    _this.ruleIndex = ruleIndex;
    return _this;
  }

  (0, _createClass2["default"])(XPathRuleElement, [{
    key: "evaluate",
    value: function evaluate(t) {
      // return all children of t that match nodeName
      var nodes = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Trees_1.Trees.getChildren(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;

          if (c instanceof ParserRuleContext_1.ParserRuleContext) {
            if (c.ruleIndex === this.ruleIndex && !this.invert || c.ruleIndex !== this.ruleIndex && this.invert) {
              nodes.push(c);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return nodes;
    }
  }]);
  return XPathRuleElement;
}(XPathElement_1.XPathElement);

__decorate([Decorators_1.Override], XPathRuleElement.prototype, "evaluate", null);

exports.XPathRuleElement = XPathRuleElement;
//# sourceMappingURL=XPathRuleElement.js.map
