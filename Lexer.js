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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CommonTokenFactory_1 = require("./CommonTokenFactory");

var IntegerStack_1 = require("./misc/IntegerStack");

var Interval_1 = require("./misc/Interval");

var IntStream_1 = require("./IntStream");

var LexerATNSimulator_1 = require("./atn/LexerATNSimulator");

var LexerNoViableAltException_1 = require("./LexerNoViableAltException");

var Decorators_1 = require("./Decorators");

var Recognizer_1 = require("./Recognizer");

var Token_1 = require("./Token");
/** A lexer is recognizer that draws input symbols from a character stream.
 *  lexer grammars result in a subclass of this object. A Lexer object
 *  uses simplified match() and error recovery mechanisms in the interest
 *  of speed.
 */


var Lexer =
/*#__PURE__*/
function (_Recognizer_1$Recogni) {
  (0, _inherits2["default"])(Lexer, _Recognizer_1$Recogni);

  function Lexer(input) {
    var _this;

    (0, _classCallCheck2["default"])(this, Lexer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Lexer).call(this));
    /** How to create token objects */

    _this._factory = CommonTokenFactory_1.CommonTokenFactory.DEFAULT;
    /** What character index in the stream did the current token start at?
     *  Needed, for example, to get the text for current token.  Set at
     *  the start of nextToken.
     */

    _this._tokenStartCharIndex = -1;
    /** The line on which the first character of the token resides */

    _this._tokenStartLine = 0;
    /** The character position of first character within the line */

    _this._tokenStartCharPositionInLine = 0;
    /** Once we see EOF on char stream, next token will be EOF.
     *  If you have DONE : EOF ; then you see DONE EOF.
     */

    _this._hitEOF = false;
    /** The channel number for the current token */

    _this._channel = 0;
    /** The token type for the current token */

    _this._type = 0;
    _this._modeStack = new IntegerStack_1.IntegerStack();
    _this._mode = Lexer.DEFAULT_MODE;
    _this._input = input;
    _this._tokenFactorySourcePair = {
      source: (0, _assertThisInitialized2["default"])(_this),
      stream: input
    };
    return _this;
  }

  (0, _createClass2["default"])(Lexer, [{
    key: "reset",
    value: function reset(resetInput) {
      // wack Lexer state variables
      if (resetInput === undefined || resetInput) {
        this._input.seek(0); // rewind the input

      }

      this._token = undefined;
      this._type = Token_1.Token.INVALID_TYPE;
      this._channel = Token_1.Token.DEFAULT_CHANNEL;
      this._tokenStartCharIndex = -1;
      this._tokenStartCharPositionInLine = -1;
      this._tokenStartLine = -1;
      this._text = undefined;
      this._hitEOF = false;
      this._mode = Lexer.DEFAULT_MODE;

      this._modeStack.clear();

      this.interpreter.reset();
    }
    /** Return a token from this source; i.e., match a token on the char
     *  stream.
     */

  }, {
    key: "nextToken",
    value: function nextToken() {
      if (this._input == null) {
        throw new Error("nextToken requires a non-null input stream.");
      } // Mark start location in char stream so unbuffered streams are
      // guaranteed at least have text of current token


      var tokenStartMarker = this._input.mark();

      try {
        outer: while (true) {
          if (this._hitEOF) {
            return this.emitEOF();
          }

          this._token = undefined;
          this._channel = Token_1.Token.DEFAULT_CHANNEL;
          this._tokenStartCharIndex = this._input.index;
          this._tokenStartCharPositionInLine = this.interpreter.charPositionInLine;
          this._tokenStartLine = this.interpreter.line;
          this._text = undefined;

          do {
            this._type = Token_1.Token.INVALID_TYPE; //				System.out.println("nextToken line "+tokenStartLine+" at "+((char)input.LA(1))+
            //								   " in mode "+mode+
            //								   " at index "+input.index);

            var ttype = void 0;

            try {
              ttype = this.interpreter.match(this._input, this._mode);
            } catch (e) {
              if (e instanceof LexerNoViableAltException_1.LexerNoViableAltException) {
                this.notifyListeners(e); // report error

                this.recover(e);
                ttype = Lexer.SKIP;
              } else {
                throw e;
              }
            }

            if (this._input.LA(1) === IntStream_1.IntStream.EOF) {
              this._hitEOF = true;
            }

            if (this._type === Token_1.Token.INVALID_TYPE) {
              this._type = ttype;
            }

            if (this._type === Lexer.SKIP) {
              continue outer;
            }
          } while (this._type === Lexer.MORE);

          if (this._token == null) {
            return this.emit();
          }

          return this._token;
        }
      } finally {
        // make sure we release marker after match or
        // unbuffered char stream will keep buffering
        this._input.release(tokenStartMarker);
      }
    }
    /** Instruct the lexer to skip creating a token for current lexer rule
     *  and look for another token.  nextToken() knows to keep looking when
     *  a lexer rule finishes with token set to SKIP_TOKEN.  Recall that
     *  if token==undefined at end of any token rule, it creates one for you
     *  and emits it.
     */

  }, {
    key: "skip",
    value: function skip() {
      this._type = Lexer.SKIP;
    }
  }, {
    key: "more",
    value: function more() {
      this._type = Lexer.MORE;
    }
  }, {
    key: "mode",
    value: function mode(m) {
      this._mode = m;
    }
  }, {
    key: "pushMode",
    value: function pushMode(m) {
      if (LexerATNSimulator_1.LexerATNSimulator.debug) {
        console.log("pushMode " + m);
      }

      this._modeStack.push(this._mode);

      this.mode(m);
    }
  }, {
    key: "popMode",
    value: function popMode() {
      if (this._modeStack.isEmpty) {
        throw new Error("EmptyStackException");
      }

      if (LexerATNSimulator_1.LexerATNSimulator.debug) {
        console.log("popMode back to " + this._modeStack.peek());
      }

      this.mode(this._modeStack.pop());
      return this._mode;
    }
  }, {
    key: "emit",
    value: function emit(token) {
      if (!token) {
        token = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.charIndex - 1, this._tokenStartLine, this._tokenStartCharPositionInLine);
      }

      this._token = token;
      return token;
    }
  }, {
    key: "emitEOF",
    value: function emitEOF() {
      var cpos = this.charPositionInLine;
      var line = this.line;

      var eof = this._factory.create(this._tokenFactorySourcePair, Token_1.Token.EOF, undefined, Token_1.Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, line, cpos);

      this.emit(eof);
      return eof;
    }
  }, {
    key: "getAllTokens",

    /** Return a list of all Token objects in input char stream.
     *  Forces load of all tokens. Does not include EOF token.
     */
    value: function getAllTokens() {
      var tokens = [];
      var t = this.nextToken();

      while (t.type !== Token_1.Token.EOF) {
        tokens.push(t);
        t = this.nextToken();
      }

      return tokens;
    }
  }, {
    key: "notifyListeners",
    value: function notifyListeners(e) {
      var text = this._input.getText(Interval_1.Interval.of(this._tokenStartCharIndex, this._input.index));

      var msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
      var listener = this.getErrorListenerDispatch();

      if (listener.syntaxError) {
        listener.syntaxError(this, undefined, this._tokenStartLine, this._tokenStartCharPositionInLine, msg, e);
      }
    }
  }, {
    key: "getErrorDisplay",
    value: function getErrorDisplay(s) {
      if (typeof s === "number") {
        switch (s) {
          case Token_1.Token.EOF:
            return "<EOF>";

          case 0x0a:
            return "\\n";

          case 0x09:
            return "\\t";

          case 0x0d:
            return "\\r";
        }

        return String.fromCharCode(s);
      }

      return s.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r");
    }
  }, {
    key: "getCharErrorDisplay",
    value: function getCharErrorDisplay(c) {
      var s = this.getErrorDisplay(c);
      return "'" + s + "'";
    }
  }, {
    key: "recover",
    value: function recover(re) {
      if (re instanceof LexerNoViableAltException_1.LexerNoViableAltException) {
        if (this._input.LA(1) !== IntStream_1.IntStream.EOF) {
          // skip a char and try again
          this.interpreter.consume(this._input);
        }
      } else {
        //System.out.println("consuming char "+(char)input.LA(1)+" during recovery");
        //re.printStackTrace();
        // TODO: Do we lose character or line position information?
        this._input.consume();
      }
    }
  }, {
    key: "tokenFactory",
    get: function get() {
      return this._factory;
    } // @Override
    ,
    set: function set(factory) {
      this._factory = factory;
    }
  }, {
    key: "inputStream",
    get: function get() {
      return this._input;
    }
    /** Set the char stream and reset the lexer */
    ,
    set: function set(input) {
      this.reset(false);
      this._input = input;
      this._tokenFactorySourcePair = {
        source: this,
        stream: this._input
      };
    }
  }, {
    key: "sourceName",
    get: function get() {
      return this._input.sourceName;
    }
  }, {
    key: "line",
    get: function get() {
      return this.interpreter.line;
    },
    set: function set(line) {
      this.interpreter.line = line;
    }
  }, {
    key: "charPositionInLine",
    get: function get() {
      return this.interpreter.charPositionInLine;
    },
    set: function set(charPositionInLine) {
      this.interpreter.charPositionInLine = charPositionInLine;
    }
    /** What is the index of the current character of lookahead? */

  }, {
    key: "charIndex",
    get: function get() {
      return this._input.index;
    }
    /** Return the text matched so far for the current token or any
     *  text override.
     */

  }, {
    key: "text",
    get: function get() {
      if (this._text != null) {
        return this._text;
      }

      return this.interpreter.getText(this._input);
    }
    /** Set the complete text of this token; it wipes any previous
     *  changes to the text.
     */
    ,
    set: function set(text) {
      this._text = text;
    }
    /** Override if emitting multiple tokens. */

  }, {
    key: "token",
    get: function get() {
      return this._token;
    },
    set: function set(_token) {
      this._token = _token;
    }
  }, {
    key: "type",
    set: function set(ttype) {
      this._type = ttype;
    },
    get: function get() {
      return this._type;
    }
  }, {
    key: "channel",
    set: function set(channel) {
      this._channel = channel;
    },
    get: function get() {
      return this._channel;
    }
  }], [{
    key: "DEFAULT_TOKEN_CHANNEL",
    get: function get() {
      return Token_1.Token.DEFAULT_CHANNEL;
    }
  }, {
    key: "HIDDEN",
    get: function get() {
      return Token_1.Token.HIDDEN_CHANNEL;
    }
  }]);
  return Lexer;
}(Recognizer_1.Recognizer);

Lexer.DEFAULT_MODE = 0;
Lexer.MORE = -2;
Lexer.SKIP = -3;
Lexer.MIN_CHAR_VALUE = 0x0000;
Lexer.MAX_CHAR_VALUE = 0x10FFFF;

__decorate([Decorators_1.Override], Lexer.prototype, "nextToken", null);

__decorate([Decorators_1.Override], Lexer.prototype, "tokenFactory", null);

__decorate([Decorators_1.Override], Lexer.prototype, "inputStream", null);

__decorate([Decorators_1.Override], Lexer.prototype, "sourceName", null);

__decorate([Decorators_1.Override], Lexer.prototype, "line", null);

__decorate([Decorators_1.Override], Lexer.prototype, "charPositionInLine", null);

exports.Lexer = Lexer;
//# sourceMappingURL=Lexer.js.map
