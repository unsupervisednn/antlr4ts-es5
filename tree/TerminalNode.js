"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
}); // ConvertTo-TS run at 2016-10-04T11:26:48.1433686-07:00

var Interval_1 = require("../misc/Interval");

var Decorators_1 = require("../Decorators");

var Token_1 = require("../Token");

var TerminalNode =
/*#__PURE__*/
function () {
  function TerminalNode(symbol) {
    (0, _classCallCheck2["default"])(this, TerminalNode);
    this._symbol = symbol;
  }

  (0, _createClass2["default"])(TerminalNode, [{
    key: "getChild",
    value: function getChild(i) {
      throw new RangeError("Terminal Node has no children.");
    }
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this._parent = parent;
    }
  }, {
    key: "accept",
    value: function accept(visitor) {
      return visitor.visitTerminal(this);
    }
  }, {
    key: "toStringTree",
    value: function toStringTree(parser) {
      return this.toString();
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this._symbol.type === Token_1.Token.EOF) {
        return "<EOF>";
      }

      return this._symbol.text || "";
    }
  }, {
    key: "symbol",
    get: function get() {
      return this._symbol;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }, {
    key: "payload",
    get: function get() {
      return this._symbol;
    }
  }, {
    key: "sourceInterval",
    get: function get() {
      var tokenIndex = this._symbol.tokenIndex;
      return new Interval_1.Interval(tokenIndex, tokenIndex);
    }
  }, {
    key: "childCount",
    get: function get() {
      return 0;
    }
  }, {
    key: "text",
    get: function get() {
      return this._symbol.text || "";
    }
  }]);
  return TerminalNode;
}();

__decorate([Decorators_1.Override], TerminalNode.prototype, "getChild", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "parent", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "setParent", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "payload", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "sourceInterval", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "childCount", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "accept", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "text", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "toStringTree", null);

__decorate([Decorators_1.Override], TerminalNode.prototype, "toString", null);

exports.TerminalNode = TerminalNode;
//# sourceMappingURL=TerminalNode.js.map
