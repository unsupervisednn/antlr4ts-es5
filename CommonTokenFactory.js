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
});

var CommonToken_1 = require("./CommonToken");

var Interval_1 = require("./misc/Interval");

var Decorators_1 = require("./Decorators");
/**
 * This default implementation of {@link TokenFactory} creates
 * {@link CommonToken} objects.
 */


var CommonTokenFactory =
/*#__PURE__*/
function () {
  /**
   * Constructs a {@link CommonTokenFactory} with the specified value for
   * {@link #copyText}.
   *
   * When `copyText` is `false`, the {@link #DEFAULT} instance
   * should be used instead of constructing a new instance.
   *
   * @param copyText The value for {@link #copyText}.
   */
  function CommonTokenFactory() {
    var copyText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    (0, _classCallCheck2["default"])(this, CommonTokenFactory);
    this.copyText = copyText;
  }

  (0, _createClass2["default"])(CommonTokenFactory, [{
    key: "create",
    value: function create(source, type, text, channel, start, stop, line, charPositionInLine) {
      var t = new CommonToken_1.CommonToken(type, text, source, channel, start, stop);
      t.line = line;
      t.charPositionInLine = charPositionInLine;

      if (text == null && this.copyText && source.stream != null) {
        t.text = source.stream.getText(Interval_1.Interval.of(start, stop));
      }

      return t;
    }
  }, {
    key: "createSimple",
    value: function createSimple(type, text) {
      return new CommonToken_1.CommonToken(type, text);
    }
  }]);
  return CommonTokenFactory;
}();

__decorate([Decorators_1.Override], CommonTokenFactory.prototype, "create", null);

__decorate([Decorators_1.Override], CommonTokenFactory.prototype, "createSimple", null);

exports.CommonTokenFactory = CommonTokenFactory;

(function (CommonTokenFactory) {
  /**
   * The default {@link CommonTokenFactory} instance.
   *
   * This token factory does not explicitly copy token text when constructing
   * tokens.
   */
  CommonTokenFactory.DEFAULT = new CommonTokenFactory();
})(CommonTokenFactory = exports.CommonTokenFactory || (exports.CommonTokenFactory = {}));
//# sourceMappingURL=CommonTokenFactory.js.map
