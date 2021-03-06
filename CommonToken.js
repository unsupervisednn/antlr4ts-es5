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

var Interval_1 = require("./misc/Interval");

var Decorators_1 = require("./Decorators");

var Token_1 = require("./Token");

var CommonToken =
/*#__PURE__*/
function () {
  function CommonToken(type, text) {
    var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CommonToken.EMPTY_SOURCE;
    var channel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Token_1.Token.DEFAULT_CHANNEL;
    var start = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var stop = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    (0, _classCallCheck2["default"])(this, CommonToken);

    /**
     * This is the backing field for {@link #getLine} and {@link #setLine}.
     */
    this._line = 0;
    /**
     * This is the backing field for {@link #getCharPositionInLine} and
     * {@link #setCharPositionInLine}.
     */

    this._charPositionInLine = -1; // set to invalid position

    /**
     * This is the backing field for {@link #getChannel} and
     * {@link #setChannel}.
     */

    this._channel = Token_1.Token.DEFAULT_CHANNEL;
    /**
     * This is the backing field for `tokenIndex`.
     */

    this.index = -1;
    this._text = text;
    this._type = type;
    this.source = source;
    this._channel = channel;
    this.start = start;
    this.stop = stop;

    if (source.source != null) {
      this._line = source.source.line;
      this._charPositionInLine = source.source.charPositionInLine;
    }
  }
  /**
   * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
   *
   * If `oldToken` is also a {@link CommonToken} instance, the newly
   * constructed token will share a reference to the {@link #text} field and
   * the {@link Tuple2} stored in {@link #source}. Otherwise, {@link #text} will
   * be assigned the result of calling {@link #getText}, and {@link #source}
   * will be constructed from the result of {@link Token#getTokenSource} and
   * {@link Token#getInputStream}.
   *
   * @param oldToken The token to copy.
   */


  (0, _createClass2["default"])(CommonToken, [{
    key: "toString",
    value: function toString(recognizer) {
      var channelStr = "";

      if (this._channel > 0) {
        channelStr = ",channel=" + this._channel;
      }

      var txt = this.text;

      if (txt != null) {
        txt = txt.replace(/\n/g, "\\n");
        txt = txt.replace(/\r/g, "\\r");
        txt = txt.replace(/\t/g, "\\t");
      } else {
        txt = "<no text>";
      }

      var typeString = String(this._type);

      if (recognizer) {
        typeString = recognizer.vocabulary.getDisplayName(this._type);
      }

      return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + typeString + ">" + channelStr + "," + this._line + ":" + this.charPositionInLine + "]";
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    } // @Override
    ,
    set: function set(type) {
      this._type = type;
    }
  }, {
    key: "line",
    get: function get() {
      return this._line;
    } // @Override
    ,
    set: function set(line) {
      this._line = line;
    }
  }, {
    key: "text",
    get: function get() {
      if (this._text != null) {
        return this._text;
      }

      var input = this.inputStream;

      if (input == null) {
        return undefined;
      }

      var n = input.size;

      if (this.start < n && this.stop < n) {
        return input.getText(Interval_1.Interval.of(this.start, this.stop));
      } else {
        return "<EOF>";
      }
    }
    /**
     * Explicitly set the text for this token. If {code text} is not
     * `undefined`, then {@link #getText} will return this value rather than
     * extracting the text from the input.
     *
     * @param text The explicit text of the token, or `undefined` if the text
     * should be obtained from the input along with the start and stop indexes
     * of the token.
     */
    // @Override
    ,
    set: function set(text) {
      this._text = text;
    }
  }, {
    key: "charPositionInLine",
    get: function get() {
      return this._charPositionInLine;
    } // @Override
    ,
    set: function set(charPositionInLine) {
      this._charPositionInLine = charPositionInLine;
    }
  }, {
    key: "channel",
    get: function get() {
      return this._channel;
    } // @Override
    ,
    set: function set(channel) {
      this._channel = channel;
    }
  }, {
    key: "startIndex",
    get: function get() {
      return this.start;
    },
    set: function set(start) {
      this.start = start;
    }
  }, {
    key: "stopIndex",
    get: function get() {
      return this.stop;
    },
    set: function set(stop) {
      this.stop = stop;
    }
  }, {
    key: "tokenIndex",
    get: function get() {
      return this.index;
    } // @Override
    ,
    set: function set(index) {
      this.index = index;
    }
  }, {
    key: "tokenSource",
    get: function get() {
      return this.source.source;
    }
  }, {
    key: "inputStream",
    get: function get() {
      return this.source.stream;
    }
  }], [{
    key: "fromToken",
    value: function fromToken(oldToken) {
      var result = new CommonToken(oldToken.type, undefined, CommonToken.EMPTY_SOURCE, oldToken.channel, oldToken.startIndex, oldToken.stopIndex);
      result._line = oldToken.line;
      result.index = oldToken.tokenIndex;
      result._charPositionInLine = oldToken.charPositionInLine;

      if (oldToken instanceof CommonToken) {
        result._text = oldToken._text;
        result.source = oldToken.source;
      } else {
        result._text = oldToken.text;
        result.source = {
          source: oldToken.tokenSource,
          stream: oldToken.inputStream
        };
      }

      return result;
    }
  }]);
  return CommonToken;
}();
/**
 * An empty {@link Tuple2} which is used as the default value of
 * {@link #source} for tokens that do not have a source.
 */


CommonToken.EMPTY_SOURCE = {
  source: undefined,
  stream: undefined
};

__decorate([Decorators_1.NotNull], CommonToken.prototype, "source", void 0);

__decorate([Decorators_1.Override], CommonToken.prototype, "type", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "line", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "text", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "charPositionInLine", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "channel", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "startIndex", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "stopIndex", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "tokenIndex", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "tokenSource", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "inputStream", null);

__decorate([Decorators_1.Override], CommonToken.prototype, "toString", null);

__decorate([__param(0, Decorators_1.NotNull)], CommonToken, "fromToken", null);

CommonToken = __decorate([__param(2, Decorators_1.NotNull)], CommonToken);
exports.CommonToken = CommonToken;
//# sourceMappingURL=CommonToken.js.map
