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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MurmurHash_1 = require("../misc/MurmurHash");

var Decorators_1 = require("../Decorators");
/**
 * Implements the `type` lexer action by setting `Lexer.type`
 * with the assigned type.
 *
 * @author Sam Harwell
 * @since 4.2
 */


var LexerTypeAction =
/*#__PURE__*/
function () {
  /**
   * Constructs a new `type` action with the specified token type value.
   * @param type The type to assign to the token using `Lexer.type`.
   */
  function LexerTypeAction(type) {
    (0, _classCallCheck2["default"])(this, LexerTypeAction);
    this._type = type;
  }
  /**
   * Gets the type to assign to a token created by the lexer.
   * @returns The type to assign to a token created by the lexer.
   */


  (0, _createClass2["default"])(LexerTypeAction, [{
    key: "execute",

    /**
     * {@inheritDoc}
     *
     * This action is implemented by setting `Lexer.type` with the
     * value provided by `type`.
     */
    value: function execute(lexer) {
      lexer.type = this._type;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hash = MurmurHash_1.MurmurHash.initialize();
      hash = MurmurHash_1.MurmurHash.update(hash, this.actionType);
      hash = MurmurHash_1.MurmurHash.update(hash, this._type);
      return MurmurHash_1.MurmurHash.finish(hash, 2);
    }
  }, {
    key: "equals",
    value: function equals(obj) {
      if (obj === this) {
        return true;
      } else if (!(obj instanceof LexerTypeAction)) {
        return false;
      }

      return this._type === obj._type;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "type(".concat(this._type, ")");
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
    /**
     * {@inheritDoc}
     * @returns This method returns {@link LexerActionType#TYPE}.
     */

  }, {
    key: "actionType",
    get: function get() {
      return 7
      /* TYPE */
      ;
    }
    /**
     * {@inheritDoc}
     * @returns This method returns `false`.
     */

  }, {
    key: "isPositionDependent",
    get: function get() {
      return false;
    }
  }]);
  return LexerTypeAction;
}();

__decorate([Decorators_1.Override], LexerTypeAction.prototype, "actionType", null);

__decorate([Decorators_1.Override], LexerTypeAction.prototype, "isPositionDependent", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull)], LexerTypeAction.prototype, "execute", null);

__decorate([Decorators_1.Override], LexerTypeAction.prototype, "hashCode", null);

__decorate([Decorators_1.Override], LexerTypeAction.prototype, "equals", null);

__decorate([Decorators_1.Override], LexerTypeAction.prototype, "toString", null);

exports.LexerTypeAction = LexerTypeAction;
//# sourceMappingURL=LexerTypeAction.js.map
