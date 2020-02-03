"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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
}); // ConvertTo-TS run at 2016-10-04T11:26:58.1768850-07:00

var Interval_1 = require("./misc/Interval");

var Decorators_1 = require("./Decorators");

var Token_1 = require("./Token");
/**
 * Useful for rewriting out a buffered input token stream after doing some
 * augmentation or other manipulations on it.
 *
 * You can insert stuff, replace, and delete chunks. Note that the operations
 * are done lazily--only if you convert the buffer to a {@link String} with
 * {@link TokenStream#getText()}. This is very efficient because you are not
 * moving data around all the time. As the buffer of tokens is converted to
 * strings, the {@link #getText()} method(s) scan the input token stream and
 * check to see if there is an operation at the current index. If so, the
 * operation is done and then normal {@link String} rendering continues on the
 * buffer. This is like having multiple Turing machine instruction streams
 * (programs) operating on a single input tape. :)
 *
 * This rewriter makes no modifications to the token stream. It does not ask the
 * stream to fill itself up nor does it advance the input cursor. The token
 * stream `TokenStream.index` will return the same value before and
 * after any {@link #getText()} call.
 *
 * The rewriter only works on tokens that you have in the buffer and ignores the
 * current input cursor. If you are buffering tokens on-demand, calling
 * {@link #getText()} halfway through the input will only do rewrites for those
 * tokens in the first half of the file.
 *
 * Since the operations are done lazily at {@link #getText}-time, operations do
 * not screw up the token index values. That is, an insert operation at token
 * index `i` does not change the index values for tokens
 * `i`+1..n-1.
 *
 * Because operations never actually alter the buffer, you may always get the
 * original token stream back without undoing anything. Since the instructions
 * are queued up, you can easily simulate transactions and roll back any changes
 * if there is an error just by removing instructions. For example,
 *
 * ```
 * CharStream input = new ANTLRFileStream("input");
 * TLexer lex = new TLexer(input);
 * CommonTokenStream tokens = new CommonTokenStream(lex);
 * T parser = new T(tokens);
 * TokenStreamRewriter rewriter = new TokenStreamRewriter(tokens);
 * parser.startRule();
 * ```
 *
 * Then in the rules, you can execute (assuming rewriter is visible):
 *
 * ```
 * Token t,u;
 * ...
 * rewriter.insertAfter(t, "text to put after t");}
 * rewriter.insertAfter(u, "text after u");}
 * System.out.println(rewriter.getText());
 * ```
 *
 * You can also have multiple "instruction streams" and get multiple rewrites
 * from a single pass over the input. Just name the instruction streams and use
 * that name again when printing the buffer. This could be useful for generating
 * a C file and also its header file--all from the same buffer:
 *
 * ```
 * rewriter.insertAfter("pass1", t, "text to put after t");}
 * rewriter.insertAfter("pass2", u, "text after u");}
 * System.out.println(rewriter.getText("pass1"));
 * System.out.println(rewriter.getText("pass2"));
 * ```
 *
 * If you don't use named rewrite streams, a "default" stream is used as the
 * first example shows.
 */


var TokenStreamRewriter =
/*#__PURE__*/
function () {
  function TokenStreamRewriter(tokens) {
    (0, _classCallCheck2["default"])(this, TokenStreamRewriter);
    this.tokens = tokens;
    this.programs = new Map();
    this.programs.set(TokenStreamRewriter.DEFAULT_PROGRAM_NAME, []);
    this.lastRewriteTokenIndexes = new Map();
  }

  (0, _createClass2["default"])(TokenStreamRewriter, [{
    key: "getTokenStream",
    value: function getTokenStream() {
      return this.tokens;
    }
  }, {
    key: "rollback",
    value: function rollback(instructionIndex) {
      var programName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      var is = this.programs.get(programName);

      if (is != null) {
        this.programs.set(programName, is.slice(TokenStreamRewriter.MIN_TOKEN_INDEX, instructionIndex));
      }
    }
  }, {
    key: "deleteProgram",
    value: function deleteProgram() {
      var programName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      this.rollback(TokenStreamRewriter.MIN_TOKEN_INDEX, programName);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(tokenOrIndex, text) {
      var programName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      var index;

      if (typeof tokenOrIndex === "number") {
        index = tokenOrIndex;
      } else {
        index = tokenOrIndex.tokenIndex;
      } // to insert after, just insert before next index (even if past end)


      var op = new InsertAfterOp(this.tokens, index, text);
      var rewrites = this.getProgram(programName);
      op.instructionIndex = rewrites.length;
      rewrites.push(op);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(tokenOrIndex, text) {
      var programName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      var index;

      if (typeof tokenOrIndex === "number") {
        index = tokenOrIndex;
      } else {
        index = tokenOrIndex.tokenIndex;
      }

      var op = new InsertBeforeOp(this.tokens, index, text);
      var rewrites = this.getProgram(programName);
      op.instructionIndex = rewrites.length;
      rewrites.push(op);
    }
  }, {
    key: "replaceSingle",
    value: function replaceSingle(index, text) {
      if (typeof index === "number") {
        this.replace(index, index, text);
      } else {
        this.replace(index, index, text);
      }
    }
  }, {
    key: "replace",
    value: function replace(from, to, text) {
      var programName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;

      if (typeof from !== "number") {
        from = from.tokenIndex;
      }

      if (typeof to !== "number") {
        to = to.tokenIndex;
      }

      if (from > to || from < 0 || to < 0 || to >= this.tokens.size) {
        throw new RangeError("replace: range invalid: ".concat(from, "..").concat(to, "(size=").concat(this.tokens.size, ")"));
      }

      var op = new ReplaceOp(this.tokens, from, to, text);
      var rewrites = this.getProgram(programName);
      op.instructionIndex = rewrites.length;
      rewrites.push(op);
    }
  }, {
    key: "delete",
    value: function _delete(from, to) {
      var programName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;

      if (to === undefined) {
        to = from;
      }

      if (typeof from === "number") {
        this.replace(from, to, "", programName);
      } else {
        this.replace(from, to, "", programName);
      }
    }
  }, {
    key: "getLastRewriteTokenIndex",
    value: function getLastRewriteTokenIndex() {
      var programName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      var I = this.lastRewriteTokenIndexes.get(programName);

      if (I == null) {
        return -1;
      }

      return I;
    }
  }, {
    key: "setLastRewriteTokenIndex",
    value: function setLastRewriteTokenIndex(programName, i) {
      this.lastRewriteTokenIndexes.set(programName, i);
    }
  }, {
    key: "getProgram",
    value: function getProgram(name) {
      var is = this.programs.get(name);

      if (is == null) {
        is = this.initializeProgram(name);
      }

      return is;
    }
  }, {
    key: "initializeProgram",
    value: function initializeProgram(name) {
      var is = [];
      this.programs.set(name, is);
      return is;
    }
  }, {
    key: "getText",
    value: function getText(intervalOrProgram) {
      var programName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TokenStreamRewriter.DEFAULT_PROGRAM_NAME;
      var interval;

      if (intervalOrProgram instanceof Interval_1.Interval) {
        interval = intervalOrProgram;
      } else {
        interval = Interval_1.Interval.of(0, this.tokens.size - 1);
      }

      if (typeof intervalOrProgram === "string") {
        programName = intervalOrProgram;
      }

      var rewrites = this.programs.get(programName);
      var start = interval.a;
      var stop = interval.b; // ensure start/end are in range

      if (stop > this.tokens.size - 1) {
        stop = this.tokens.size - 1;
      }

      if (start < 0) {
        start = 0;
      }

      if (rewrites == null || rewrites.length === 0) {
        return this.tokens.getText(interval); // no instructions to execute
      }

      var buf = []; // First, optimize instruction stream

      var indexToOp = this.reduceToSingleOperationPerIndex(rewrites); // Walk buffer, executing instructions and emitting tokens

      var i = start;

      while (i <= stop && i < this.tokens.size) {
        var op = indexToOp.get(i);
        indexToOp["delete"](i); // remove so any left have index size-1

        var t = this.tokens.get(i);

        if (op == null) {
          // no operation at that index, just dump token
          if (t.type !== Token_1.Token.EOF) {
            buf.push(String(t.text));
          }

          i++; // move to next token
        } else {
          i = op.execute(buf); // execute operation and skip
        }
      } // include stuff after end if it's last index in buffer
      // So, if they did an insertAfter(lastValidIndex, "foo"), include
      // foo if end==lastValidIndex.


      if (stop === this.tokens.size - 1) {
        // Scan any remaining operations after last token
        // should be included (they will be inserts).
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = indexToOp.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _op = _step.value;

            if (_op.index >= this.tokens.size - 1) {
              buf.push(_op.text.toString());
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
      }

      return buf.join("");
    }
    /** We need to combine operations and report invalid operations (like
     *  overlapping replaces that are not completed nested). Inserts to
     *  same index need to be combined etc...  Here are the cases:
     *
     *  I.i.u I.j.v								leave alone, nonoverlapping
     *  I.i.u I.i.v								combine: Iivu
     *
     *  R.i-j.u R.x-y.v	| i-j in x-y			delete first R
     *  R.i-j.u R.i-j.v							delete first R
     *  R.i-j.u R.x-y.v	| x-y in i-j			ERROR
     *  R.i-j.u R.x-y.v	| boundaries overlap	ERROR
     *
     *  Delete special case of replace (text==undefined):
     *  D.i-j.u D.x-y.v	| boundaries overlap	combine to max(min)..max(right)
     *
     *  I.i.u R.x-y.v | i in (x+1)-y			delete I (since insert before
     * 											we're not deleting i)
     *  I.i.u R.x-y.v | i not in (x+1)-y		leave alone, nonoverlapping
     *  R.x-y.v I.i.u | i in x-y				ERROR
     *  R.x-y.v I.x.u 							R.x-y.uv (combine, delete I)
     *  R.x-y.v I.i.u | i not in x-y			leave alone, nonoverlapping
     *
     *  I.i.u = insert u before op @ index i
     *  R.x-y.u = replace x-y indexed tokens with u
     *
     *  First we need to examine replaces. For any replace op:
     *
     * 		1. wipe out any insertions before op within that range.
     * 		2. Drop any replace op before that is contained completely within
     * 	 that range.
     * 		3. Throw exception upon boundary overlap with any previous replace.
     *
     *  Then we can deal with inserts:
     *
     * 		1. for any inserts to same index, combine even if not adjacent.
     * 		2. for any prior replace with same left boundary, combine this
     * 	 insert with replace and delete this replace.
     * 		3. throw exception if index in same range as previous replace
     *
     *  Don't actually delete; make op undefined in list. Easier to walk list.
     *  Later we can throw as we add to index &rarr; op map.
     *
     *  Note that I.2 R.2-2 will wipe out I.2 even though, technically, the
     *  inserted stuff would be before the replace range. But, if you
     *  add tokens in front of a method body '{' and then delete the method
     *  body, I think the stuff before the '{' you added should disappear too.
     *
     *  Return a map from token index to operation.
     */

  }, {
    key: "reduceToSingleOperationPerIndex",
    value: function reduceToSingleOperationPerIndex(rewrites) {
      // console.log(`rewrites=[${Utils.join(rewrites, ", ")}]`);
      // WALK REPLACES
      for (var i = 0; i < rewrites.length; i++) {
        var op = rewrites[i];

        if (op == null) {
          continue;
        }

        if (!(op instanceof ReplaceOp)) {
          continue;
        }

        var rop = op; // Wipe prior inserts within range

        var inserts = this.getKindOfOps(rewrites, InsertBeforeOp, i);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = inserts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var iop = _step2.value;

            if (iop.index === rop.index) {
              // E.g., insert before 2, delete 2..2; update replace
              // text to include insert before, kill insert
              rewrites[iop.instructionIndex] = undefined;
              rop.text = iop.text.toString() + (rop.text != null ? rop.text.toString() : "");
            } else if (iop.index > rop.index && iop.index <= rop.lastIndex) {
              // delete insert as it's a no-op.
              rewrites[iop.instructionIndex] = undefined;
            }
          } // Drop any prior replaces contained within

        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, i);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = prevReplaces[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var prevRop = _step3.value;

            if (prevRop.index >= rop.index && prevRop.lastIndex <= rop.lastIndex) {
              // delete replace as it's a no-op.
              rewrites[prevRop.instructionIndex] = undefined;
              continue;
            } // throw exception unless disjoint or identical


            var disjoint = prevRop.lastIndex < rop.index || prevRop.index > rop.lastIndex; // Delete special case of replace (text==null):
            // D.i-j.u D.x-y.v	| boundaries overlap	combine to max(min)..max(right)

            if (prevRop.text == null && rop.text == null && !disjoint) {
              // console.log(`overlapping deletes: ${prevRop}, ${rop}`);
              rewrites[prevRop.instructionIndex] = undefined; // kill first delete

              rop.index = Math.min(prevRop.index, rop.index);
              rop.lastIndex = Math.max(prevRop.lastIndex, rop.lastIndex); // console.log(`new rop ${rop}`);
            } else if (!disjoint) {
              throw new Error("replace op boundaries of ".concat(rop, " overlap with previous ").concat(prevRop));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } // WALK INSERTS


      for (var _i = 0; _i < rewrites.length; _i++) {
        var _op2 = rewrites[_i];

        if (_op2 == null) {
          continue;
        }

        if (!(_op2 instanceof InsertBeforeOp)) {
          continue;
        }

        var _iop = _op2; // combine current insert with prior if any at same index

        var prevInserts = this.getKindOfOps(rewrites, InsertBeforeOp, _i);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = prevInserts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var prevIop = _step4.value;

            if (prevIop.index === _iop.index) {
              if (prevIop instanceof InsertAfterOp) {
                _iop.text = this.catOpText(prevIop.text, _iop.text);
                rewrites[prevIop.instructionIndex] = undefined;
              } else if (prevIop instanceof InsertBeforeOp) {
                // combine objects
                // convert to strings...we're in process of toString'ing
                // whole token buffer so no lazy eval issue with any templates
                _iop.text = this.catOpText(_iop.text, prevIop.text); // delete redundant prior insert

                rewrites[prevIop.instructionIndex] = undefined;
              }
            }
          } // look for replaces where iop.index is in range; error

        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var _prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, _i);

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = _prevReplaces[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _rop = _step5.value;

            if (_iop.index === _rop.index) {
              _rop.text = this.catOpText(_iop.text, _rop.text);
              rewrites[_i] = undefined; // delete current insert

              continue;
            }

            if (_iop.index >= _rop.index && _iop.index <= _rop.lastIndex) {
              throw new Error("insert op ".concat(_iop, " within boundaries of previous ").concat(_rop));
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      } // console.log(`rewrites after=[${Utils.join(rewrites, ", ")}]`);


      var m = new Map();
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = rewrites[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _op3 = _step6.value;

          if (_op3 == null) {
            // ignore deleted ops
            continue;
          }

          if (m.get(_op3.index) != null) {
            throw new Error("should only be one op per index");
          }

          m.set(_op3.index, _op3);
        } // console.log(`index to op: ${m}`);

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return m;
    }
  }, {
    key: "catOpText",
    value: function catOpText(a, b) {
      var x = "";
      var y = "";

      if (a != null) {
        x = a.toString();
      }

      if (b != null) {
        y = b.toString();
      }

      return x + y;
    }
    /** Get all operations before an index of a particular kind */

  }, {
    key: "getKindOfOps",
    value: function getKindOfOps(rewrites, kind, before) {
      var ops = [];

      for (var i = 0; i < before && i < rewrites.length; i++) {
        var op = rewrites[i];

        if (op == null) {
          // ignore deleted
          continue;
        }

        if (op instanceof kind) {
          ops.push(op);
        }
      }

      return ops;
    }
  }]);
  return TokenStreamRewriter;
}();

TokenStreamRewriter.DEFAULT_PROGRAM_NAME = "default";
TokenStreamRewriter.PROGRAM_INIT_SIZE = 100;
TokenStreamRewriter.MIN_TOKEN_INDEX = 0;
exports.TokenStreamRewriter = TokenStreamRewriter; // Define the rewrite operation hierarchy

var RewriteOperation =
/*#__PURE__*/
function () {
  function RewriteOperation(tokens, index, text) {
    (0, _classCallCheck2["default"])(this, RewriteOperation);
    this.tokens = tokens;
    this.index = index;
    this.text = text === undefined ? "" : text;
  }
  /** Execute the rewrite operation by possibly adding to the buffer.
   *  Return the index of the next token to operate on.
   */


  (0, _createClass2["default"])(RewriteOperation, [{
    key: "execute",
    value: function execute(buf) {
      return this.index;
    }
  }, {
    key: "toString",
    value: function toString() {
      var opName = this.constructor.name;
      var $index = opName.indexOf("$");
      opName = opName.substring($index + 1, opName.length);
      return "<" + opName + "@" + this.tokens.get(this.index) + ":\"" + this.text + "\">";
    }
  }]);
  return RewriteOperation;
}();

__decorate([Decorators_1.Override], RewriteOperation.prototype, "toString", null);

exports.RewriteOperation = RewriteOperation;

var InsertBeforeOp =
/*#__PURE__*/
function (_RewriteOperation) {
  (0, _inherits2["default"])(InsertBeforeOp, _RewriteOperation);

  function InsertBeforeOp(tokens, index, text) {
    (0, _classCallCheck2["default"])(this, InsertBeforeOp);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InsertBeforeOp).call(this, tokens, index, text));
  }

  (0, _createClass2["default"])(InsertBeforeOp, [{
    key: "execute",
    value: function execute(buf) {
      buf.push(this.text.toString());

      if (this.tokens.get(this.index).type !== Token_1.Token.EOF) {
        buf.push(String(this.tokens.get(this.index).text));
      }

      return this.index + 1;
    }
  }]);
  return InsertBeforeOp;
}(RewriteOperation);

__decorate([Decorators_1.Override], InsertBeforeOp.prototype, "execute", null);
/** Distinguish between insert after/before to do the "insert afters"
 *  first and then the "insert befores" at same index. Implementation
 *  of "insert after" is "insert before index+1".
 */


var InsertAfterOp =
/*#__PURE__*/
function (_InsertBeforeOp) {
  (0, _inherits2["default"])(InsertAfterOp, _InsertBeforeOp);

  function InsertAfterOp(tokens, index, text) {
    (0, _classCallCheck2["default"])(this, InsertAfterOp);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InsertAfterOp).call(this, tokens, index + 1, text)); // insert after is insert before index+1
  }

  return InsertAfterOp;
}(InsertBeforeOp);
/** I'm going to try replacing range from x..y with (y-x)+1 ReplaceOp
 *  instructions.
 */


var ReplaceOp =
/*#__PURE__*/
function (_RewriteOperation2) {
  (0, _inherits2["default"])(ReplaceOp, _RewriteOperation2);

  function ReplaceOp(tokens, from, to, text) {
    var _this;

    (0, _classCallCheck2["default"])(this, ReplaceOp);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ReplaceOp).call(this, tokens, from, text));
    _this.lastIndex = to;
    return _this;
  }

  (0, _createClass2["default"])(ReplaceOp, [{
    key: "execute",
    value: function execute(buf) {
      if (this.text != null) {
        buf.push(this.text.toString());
      }

      return this.lastIndex + 1;
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.text == null) {
        return "<DeleteOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ">";
      }

      return "<ReplaceOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ":\"" + this.text + "\">";
    }
  }]);
  return ReplaceOp;
}(RewriteOperation);

__decorate([Decorators_1.Override], ReplaceOp.prototype, "execute", null);

__decorate([Decorators_1.Override], ReplaceOp.prototype, "toString", null);
//# sourceMappingURL=TokenStreamRewriter.js.map
