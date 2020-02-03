"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var assert = require("assert");

var IntStream_1 = require("./IntStream");

var Interval_1 = require("./misc/Interval");

var Decorators_1 = require("./Decorators");
/**
 * Alternative to {@link ANTLRInputStream} which treats the input
 * as a series of Unicode code points, instead of a series of UTF-16
 * code units.
 *
 * Use this if you need to parse input which potentially contains
 * Unicode values > U+FFFF.
 */


var CodePointCharStream =
/*#__PURE__*/
function () {
  // Use the factory method {@link #fromBuffer(CodePointBuffer)} to
  // construct instances of this type.
  function CodePointCharStream(array, position, remaining, name) {
    (0, _classCallCheck2["default"])(this, CodePointCharStream);
    // TODO
    assert(position === 0);
    this._array = array;
    this._size = remaining;
    this._name = name;
    this._position = 0;
  }

  (0, _createClass2["default"])(CodePointCharStream, [{
    key: "consume",
    value: function consume() {
      if (this._size - this._position === 0) {
        assert(this.LA(1) === IntStream_1.IntStream.EOF);
        throw new RangeError("cannot consume EOF");
      }

      this._position++;
    }
  }, {
    key: "mark",

    /** mark/release do nothing; we have entire buffer */
    value: function mark() {
      return -1;
    }
  }, {
    key: "release",
    value: function release(marker) {// No default implementation since this stream buffers the entire input
    }
  }, {
    key: "seek",
    value: function seek(index) {
      this._position = index;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.getText(Interval_1.Interval.of(0, this.size - 1));
    }
  }, {
    key: "LA",
    value: function LA(i) {
      var offset;

      switch (Math.sign(i)) {
        case -1:
          offset = this.index + i;

          if (offset < 0) {
            return IntStream_1.IntStream.EOF;
          }

          return this._array[offset];

        case 0:
          // Undefined
          return 0;

        case 1:
          offset = this.index + i - 1;

          if (offset >= this.size) {
            return IntStream_1.IntStream.EOF;
          }

          return this._array[offset];
      }

      throw new RangeError("Not reached");
    }
    /** Return the UTF-16 encoded string for the given interval */

  }, {
    key: "getText",
    value: function getText(interval) {
      var startIdx = Math.min(interval.a, this.size);
      var len = Math.min(interval.b - interval.a + 1, this.size - startIdx);

      if (this._array instanceof Int32Array) {
        return String.fromCodePoint.apply(String, (0, _toConsumableArray2["default"])(Array.from(this._array.subarray(startIdx, startIdx + len))));
      } else {
        return String.fromCharCode.apply(String, (0, _toConsumableArray2["default"])(Array.from(this._array.subarray(startIdx, startIdx + len))));
      }
    }
  }, {
    key: "internalStorage",
    get: function get() {
      return this._array;
    }
  }, {
    key: "index",
    get: function get() {
      return this._position;
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }, {
    key: "sourceName",
    get: function get() {
      return this._name;
    }
  }], [{
    key: "fromBuffer",
    value: function fromBuffer(codePointBuffer, name) {
      if (name === undefined || name.length === 0) {
        name = IntStream_1.IntStream.UNKNOWN_SOURCE_NAME;
      } // Java lacks generics on primitive types.
      //
      // To avoid lots of calls to virtual methods in the
      // very hot codepath of LA() below, we construct one
      // of three concrete subclasses.
      //
      // The concrete subclasses directly access the code
      // points stored in the underlying array (byte[],
      // char[], or int[]), so we can avoid lots of virtual
      // method calls to ByteBuffer.get(offset).


      return new CodePointCharStream(codePointBuffer.array(), codePointBuffer.position, codePointBuffer.remaining, name);
    }
  }]);
  return CodePointCharStream;
}();

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "consume", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "index", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "size", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "mark", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "release", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "seek", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "sourceName", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "toString", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "LA", null);

__decorate([Decorators_1.Override], CodePointCharStream.prototype, "getText", null);

exports.CodePointCharStream = CodePointCharStream;
//# sourceMappingURL=CodePointCharStream.js.map
