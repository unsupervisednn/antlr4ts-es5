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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Lexer_1 = require("./Lexer");

var LexerATNSimulator_1 = require("./atn/LexerATNSimulator");

var Decorators_1 = require("./Decorators");

var Decorators_2 = require("./Decorators");

var LexerInterpreter =
/*#__PURE__*/
function (_Lexer_1$Lexer) {
  (0, _inherits2["default"])(LexerInterpreter, _Lexer_1$Lexer);

  function LexerInterpreter(grammarFileName, vocabulary, ruleNames, channelNames, modeNames, atn, input) {
    var _this;

    (0, _classCallCheck2["default"])(this, LexerInterpreter);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LexerInterpreter).call(this, input));

    if (atn.grammarType !== 0
    /* LEXER */
    ) {
        throw new Error("IllegalArgumentException: The ATN must be a lexer ATN.");
      }

    _this._grammarFileName = grammarFileName;
    _this._atn = atn;
    _this._ruleNames = ruleNames.slice(0);
    _this._channelNames = channelNames.slice(0);
    _this._modeNames = modeNames.slice(0);
    _this._vocabulary = vocabulary;
    _this._interp = new LexerATNSimulator_1.LexerATNSimulator(atn, (0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(LexerInterpreter, [{
    key: "atn",
    get: function get() {
      return this._atn;
    }
  }, {
    key: "grammarFileName",
    get: function get() {
      return this._grammarFileName;
    }
  }, {
    key: "ruleNames",
    get: function get() {
      return this._ruleNames;
    }
  }, {
    key: "channelNames",
    get: function get() {
      return this._channelNames;
    }
  }, {
    key: "modeNames",
    get: function get() {
      return this._modeNames;
    }
  }, {
    key: "vocabulary",
    get: function get() {
      return this._vocabulary;
    }
  }]);
  return LexerInterpreter;
}(Lexer_1.Lexer);

__decorate([Decorators_1.NotNull], LexerInterpreter.prototype, "_vocabulary", void 0);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "atn", null);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "grammarFileName", null);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "ruleNames", null);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "channelNames", null);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "modeNames", null);

__decorate([Decorators_2.Override], LexerInterpreter.prototype, "vocabulary", null);

LexerInterpreter = __decorate([__param(1, Decorators_1.NotNull)], LexerInterpreter);
exports.LexerInterpreter = LexerInterpreter;
//# sourceMappingURL=LexerInterpreter.js.map
