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
 * Implements the `channel` lexer action by calling
 * {@link Lexer#setChannel} with the assigned channel.
 *
 * @author Sam Harwell
 * @since 4.2
 */


var LexerChannelAction =
/*#__PURE__*/
function () {
  /**
   * Constructs a new `channel` action with the specified channel value.
   * @param channel The channel value to pass to {@link Lexer#setChannel}.
   */
  function LexerChannelAction(channel) {
    (0, _classCallCheck2["default"])(this, LexerChannelAction);
    this._channel = channel;
  }
  /**
   * Gets the channel to use for the {@link Token} created by the lexer.
   *
   * @returns The channel to use for the {@link Token} created by the lexer.
   */


  (0, _createClass2["default"])(LexerChannelAction, [{
    key: "execute",

    /**
     * {@inheritDoc}
     *
     * This action is implemented by calling {@link Lexer#setChannel} with the
     * value provided by {@link #getChannel}.
     */
    value: function execute(lexer) {
      lexer.channel = this._channel;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hash = MurmurHash_1.MurmurHash.initialize();
      hash = MurmurHash_1.MurmurHash.update(hash, this.actionType);
      hash = MurmurHash_1.MurmurHash.update(hash, this._channel);
      return MurmurHash_1.MurmurHash.finish(hash, 2);
    }
  }, {
    key: "equals",
    value: function equals(obj) {
      if (obj === this) {
        return true;
      } else if (!(obj instanceof LexerChannelAction)) {
        return false;
      }

      return this._channel === obj._channel;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "channel(".concat(this._channel, ")");
    }
  }, {
    key: "channel",
    get: function get() {
      return this._channel;
    }
    /**
     * {@inheritDoc}
     * @returns This method returns {@link LexerActionType#CHANNEL}.
     */

  }, {
    key: "actionType",
    get: function get() {
      return 0
      /* CHANNEL */
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
  return LexerChannelAction;
}();

__decorate([Decorators_1.Override], LexerChannelAction.prototype, "actionType", null);

__decorate([Decorators_1.Override], LexerChannelAction.prototype, "isPositionDependent", null);

__decorate([Decorators_1.Override, __param(0, Decorators_1.NotNull)], LexerChannelAction.prototype, "execute", null);

__decorate([Decorators_1.Override], LexerChannelAction.prototype, "hashCode", null);

__decorate([Decorators_1.Override], LexerChannelAction.prototype, "equals", null);

__decorate([Decorators_1.Override], LexerChannelAction.prototype, "toString", null);

exports.LexerChannelAction = LexerChannelAction;
//# sourceMappingURL=LexerChannelAction.js.map
