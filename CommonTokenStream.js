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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:50.3953157-07:00

var BufferedTokenStream_1 = require("./BufferedTokenStream");

var Decorators_1 = require("./Decorators");

var Token_1 = require("./Token");
/**
 * This class extends {@link BufferedTokenStream} with functionality to filter
 * token streams to tokens on a particular channel (tokens where
 * {@link Token#getChannel} returns a particular value).
 *
 * This token stream provides access to all tokens by index or when calling
 * methods like {@link #getText}. The channel filtering is only used for code
 * accessing tokens via the lookahead methods {@link #LA}, {@link #LT}, and
 * {@link #LB}.
 *
 * By default, tokens are placed on the default channel
 * ({@link Token#DEFAULT_CHANNEL}), but may be reassigned by using the
 * `->channel(HIDDEN)` lexer command, or by using an embedded action to
 * call {@link Lexer#setChannel}.
 *
 * Note: lexer rules which use the `->skip` lexer command or call
 * {@link Lexer#skip} do not produce tokens at all, so input text matched by
 * such a rule will not be available as part of the token stream, regardless of
 * channel.
 */


var CommonTokenStream =
/*#__PURE__*/
function (_BufferedTokenStream_) {
  (0, _inherits2["default"])(CommonTokenStream, _BufferedTokenStream_);

  /**
   * Constructs a new {@link CommonTokenStream} using the specified token
   * source and filtering tokens to the specified channel. Only tokens whose
   * {@link Token#getChannel} matches `channel` or have the
   * `Token.type` equal to {@link Token#EOF} will be returned by the
   * token stream lookahead methods.
   *
   * @param tokenSource The token source.
   * @param channel The channel to use for filtering tokens.
   */
  function CommonTokenStream(tokenSource) {
    var _this;

    var channel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Token_1.Token.DEFAULT_CHANNEL;
    (0, _classCallCheck2["default"])(this, CommonTokenStream);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CommonTokenStream).call(this, tokenSource));
    _this.channel = channel;
    return _this;
  }

  (0, _createClass2["default"])(CommonTokenStream, [{
    key: "adjustSeekIndex",
    value: function adjustSeekIndex(i) {
      return this.nextTokenOnChannel(i, this.channel);
    }
  }, {
    key: "tryLB",
    value: function tryLB(k) {
      if (this.p - k < 0) {
        return undefined;
      }

      var i = this.p;
      var n = 1; // find k good tokens looking backwards

      while (n <= k && i > 0) {
        // skip off-channel tokens
        i = this.previousTokenOnChannel(i - 1, this.channel);
        n++;
      }

      if (i < 0) {
        return undefined;
      }

      return this.tokens[i];
    }
  }, {
    key: "tryLT",
    value: function tryLT(k) {
      //System.out.println("enter LT("+k+")");
      this.lazyInit();

      if (k === 0) {
        throw new RangeError("0 is not a valid lookahead index");
      }

      if (k < 0) {
        return this.tryLB(-k);
      }

      var i = this.p;
      var n = 1; // we know tokens[p] is a good one
      // find k good tokens

      while (n < k) {
        // skip off-channel tokens, but make sure to not look past EOF
        if (this.sync(i + 1)) {
          i = this.nextTokenOnChannel(i + 1, this.channel);
        }

        n++;
      } //		if ( i>range ) range = i;


      return this.tokens[i];
    }
    /** Count EOF just once. */

  }, {
    key: "getNumberOfOnChannelTokens",
    value: function getNumberOfOnChannelTokens() {
      var n = 0;
      this.fill();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          if (t.channel === this.channel) {
            n++;
          }

          if (t.type === Token_1.Token.EOF) {
            break;
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

      return n;
    }
  }]);
  return CommonTokenStream;
}(BufferedTokenStream_1.BufferedTokenStream);

__decorate([Decorators_1.Override], CommonTokenStream.prototype, "adjustSeekIndex", null);

__decorate([Decorators_1.Override], CommonTokenStream.prototype, "tryLB", null);

__decorate([Decorators_1.Override], CommonTokenStream.prototype, "tryLT", null);

CommonTokenStream = __decorate([__param(0, Decorators_1.NotNull)], CommonTokenStream);
exports.CommonTokenStream = CommonTokenStream;
//# sourceMappingURL=CommonTokenStream.js.map
