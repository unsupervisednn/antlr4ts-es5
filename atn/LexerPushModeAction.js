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
 * Implements the `pushMode` lexer action by calling
 * {@link Lexer#pushMode} with the assigned mode.
 *
 * @author Sam Harwell
 * @since 4.2
 */


var LexerPushModeAction =
/*#__PURE__*/
function () {
  /**
   * Constructs a new `pushMode` action with the specified mode value.
   * @param mode The mode value to pass to {@link Lexer#pushMode}.
   */
  function LexerPushModeAction(mode) {
    (0, _classCallCheck2["default"])(this, LexerPushModeAction);
    this._mode = mode;
  }
  /**
   * Get the lexer mode this action should transition the lexer to.
   *
   * @returns The lexer mode for this `pushMode` command.
   */


  (0, _createClass2["default"])(LexerPushModeAction, [{
    key: "execute",

    /**
     * {@inheritDoc}
     *
     * This action is implemented by calling {@link Lexer#pushMode} with the
     * value provided by {@link #getMode}.
     */
    value: function execute(lexer) {
      lexer.pushMode(this._mode);
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hash = MurmurHash_1.MurmurHash.initialize();
      hash = MurmurHash_1.MurmurHash.update(hash, this.actionType);
      hash = MurmurHash_1.MurmurHash.update(hash, this._mode);
      return MurmurHash_1.MurmurHash.finish(hash, 2);
    }
  }, {
    key: "equals",
    value: function equals(obj) {
      if (obj === this) {
        return true;
      } else if (!(obj instanceof LexerPushModeAction)) {
        return false;
      }

      return this._mode === obj._mode;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "pushMode(".concat(this._mode, ")");
    }
  }, {
    key: "mode",
    get: function get() {
      return this._mode;
    }
    /**
     * {@inheritDoc}
     * @returns This method returns {@link LexerActionType#PUSH_MODE}.
     */

  }, {
    key: "actionType",
    get: function get() {
      return 5
      /* PUSH_MODE */
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
  return LexerPushModeAction;
}();

__decorate([Decorators_1.Override], LexerPushModeAction.prototype, "actionType", null);

__decorate([Decorators_1.Override], LexerPushModeAction.prototype, "isPositionDependent", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull)], LexerPushModeAction.prototype, "execute", null);

__decorate([Decorators_1.Override], LexerPushModeAction.prototype, "hashCode", null);

__decorate([Decorators_1.Override], LexerPushModeAction.prototype, "equals", null);

__decorate([Decorators_1.Override], LexerPushModeAction.prototype, "toString", null);

exports.LexerPushModeAction = LexerPushModeAction;
//# sourceMappingURL=LexerPushModeAction.js.map
