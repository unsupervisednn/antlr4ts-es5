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

var ConsoleErrorListener_1 = require("./ConsoleErrorListener");

var ProxyErrorListener_1 = require("./ProxyErrorListener");

var Decorators_1 = require("./Decorators");

var Token_1 = require("./Token");

var Utils = require("./misc/Utils");

var Recognizer =
/*#__PURE__*/
function () {
  function Recognizer() {
    (0, _classCallCheck2["default"])(this, Recognizer);
    this._listeners = [ConsoleErrorListener_1.ConsoleErrorListener.INSTANCE];
    this._stateNumber = -1;
  }
  /**
   * Get a map from token names to token types.
   *
   * Used for XPath and tree pattern compilation.
   */


  (0, _createClass2["default"])(Recognizer, [{
    key: "getTokenTypeMap",
    value: function getTokenTypeMap() {
      var vocabulary = this.vocabulary;
      var result = Recognizer.tokenTypeMapCache.get(vocabulary);

      if (result == null) {
        var intermediateResult = new Map();

        for (var i = 0; i <= this.atn.maxTokenType; i++) {
          var literalName = vocabulary.getLiteralName(i);

          if (literalName != null) {
            intermediateResult.set(literalName, i);
          }

          var symbolicName = vocabulary.getSymbolicName(i);

          if (symbolicName != null) {
            intermediateResult.set(symbolicName, i);
          }
        }

        intermediateResult.set("EOF", Token_1.Token.EOF);
        result = intermediateResult;
        Recognizer.tokenTypeMapCache.set(vocabulary, result);
      }

      return result;
    }
    /**
     * Get a map from rule names to rule indexes.
     *
     * Used for XPath and tree pattern compilation.
     */

  }, {
    key: "getRuleIndexMap",
    value: function getRuleIndexMap() {
      var ruleNames = this.ruleNames;

      if (ruleNames == null) {
        throw new Error("The current recognizer does not provide a list of rule names.");
      }

      var result = Recognizer.ruleIndexMapCache.get(ruleNames);

      if (result == null) {
        result = Utils.toMap(ruleNames);
        Recognizer.ruleIndexMapCache.set(ruleNames, result);
      }

      return result;
    }
  }, {
    key: "getTokenType",
    value: function getTokenType(tokenName) {
      var ttype = this.getTokenTypeMap().get(tokenName);

      if (ttype != null) {
        return ttype;
      }

      return Token_1.Token.INVALID_TYPE;
    }
    /**
     * If this recognizer was generated, it will have a serialized ATN
     * representation of the grammar.
     *
     * For interpreters, we don't know their serialized ATN despite having
     * created the interpreter from it.
     */

  }, {
    key: "getErrorHeader",

    /** What is the error header, normally line/character position information? */
    value: function getErrorHeader(e) {
      var token = e.getOffendingToken();

      if (!token) {
        return "";
      }

      var line = token.line;
      var charPositionInLine = token.charPositionInLine;
      return "line " + line + ":" + charPositionInLine;
    }
    /**
     * @exception NullPointerException if `listener` is `undefined`.
     */

  }, {
    key: "addErrorListener",
    value: function addErrorListener(listener) {
      if (!listener) {
        throw new TypeError("listener must not be null");
      }

      this._listeners.push(listener);
    }
  }, {
    key: "removeErrorListener",
    value: function removeErrorListener(listener) {
      var position = this._listeners.indexOf(listener);

      if (position !== -1) {
        this._listeners.splice(position, 1);
      }
    }
  }, {
    key: "removeErrorListeners",
    value: function removeErrorListeners() {
      this._listeners.length = 0;
    }
  }, {
    key: "getErrorListeners",
    value: function getErrorListeners() {
      return this._listeners.slice(0);
    }
  }, {
    key: "getErrorListenerDispatch",
    value: function getErrorListenerDispatch() {
      return new ProxyErrorListener_1.ProxyErrorListener(this.getErrorListeners());
    } // subclass needs to override these if there are sempreds or actions
    // that the ATN interp needs to execute

  }, {
    key: "sempred",
    value: function sempred(_localctx, ruleIndex, actionIndex) {
      return true;
    }
  }, {
    key: "precpred",
    value: function precpred(localctx, precedence) {
      return true;
    }
  }, {
    key: "action",
    value: function action(_localctx, ruleIndex, actionIndex) {// intentionally empty
    }
  }, {
    key: "serializedATN",
    get: function get() {
      throw new Error("there is no serialized ATN");
    }
    /**
     * Get the {@link ATN} used by the recognizer for prediction.
     *
     * @returns The {@link ATN} used by the recognizer for prediction.
     */

  }, {
    key: "atn",
    get: function get() {
      return this._interp.atn;
    }
    /**
     * Get the ATN interpreter used by the recognizer for prediction.
     *
     * @returns The ATN interpreter used by the recognizer for prediction.
     */

  }, {
    key: "interpreter",
    get: function get() {
      return this._interp;
    }
    /**
     * Set the ATN interpreter used by the recognizer for prediction.
     *
     * @param interpreter The ATN interpreter used by the recognizer for
     * prediction.
     */
    ,
    set: function set(interpreter) {
      this._interp = interpreter;
    }
    /** If profiling during the parse/lex, this will return DecisionInfo records
     *  for each decision in recognizer in a ParseInfo object.
     *
     * @since 4.3
     */

  }, {
    key: "parseInfo",
    get: function get() {
      return Promise.resolve(undefined);
    }
  }, {
    key: "state",
    get: function get() {
      return this._stateNumber;
    }
    /** Indicate that the recognizer has changed internal state that is
     *  consistent with the ATN state passed in.  This way we always know
     *  where we are in the ATN as the parser goes along. The rule
     *  context objects form a stack that lets us see the stack of
     *  invoking rules. Combine this and we have complete ATN
     *  configuration information.
     */
    ,
    set: function set(atnState) {
      //		System.err.println("setState "+atnState);
      this._stateNumber = atnState; //		if ( traceATNStates ) _ctx.trace(atnState);
    }
  }]);
  return Recognizer;
}();

Recognizer.EOF = -1;
Recognizer.tokenTypeMapCache = new WeakMap();
Recognizer.ruleIndexMapCache = new WeakMap();

__decorate([Decorators_1.SuppressWarnings("serial"), Decorators_1.NotNull], Recognizer.prototype, "_listeners", void 0);

__decorate([Decorators_1.NotNull], Recognizer.prototype, "getTokenTypeMap", null);

__decorate([Decorators_1.NotNull], Recognizer.prototype, "getRuleIndexMap", null);

__decorate([Decorators_1.NotNull], Recognizer.prototype, "serializedATN", null);

__decorate([Decorators_1.NotNull], Recognizer.prototype, "atn", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], Recognizer.prototype, "interpreter", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], Recognizer.prototype, "getErrorHeader", null);

__decorate([__param(0, Decorators_1.NotNull)], Recognizer.prototype, "addErrorListener", null);

__decorate([__param(0, Decorators_1.NotNull)], Recognizer.prototype, "removeErrorListener", null);

__decorate([Decorators_1.NotNull], Recognizer.prototype, "getErrorListeners", null);

exports.Recognizer = Recognizer;
//# sourceMappingURL=Recognizer.js.map
