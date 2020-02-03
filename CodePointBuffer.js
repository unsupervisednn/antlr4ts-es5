"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var assert = require("assert");

var Character = require("./misc/Character");
/**
 * Wrapper for `Uint8Array` / `Uint16Array` / `Int32Array`.
 */


var CodePointBuffer =
/*#__PURE__*/
function () {
  function CodePointBuffer(buffer, size) {
    (0, _classCallCheck2["default"])(this, CodePointBuffer);
    this.buffer = buffer;
    this._position = 0;
    this._size = size;
  }

  (0, _createClass2["default"])(CodePointBuffer, [{
    key: "get",
    value: function get(offset) {
      return this.buffer[offset];
    }
  }, {
    key: "array",
    value: function array() {
      return this.buffer.slice(0, this._size);
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    },
    set: function set(newPosition) {
      if (newPosition < 0 || newPosition > this._size) {
        throw new RangeError();
      }

      this._position = newPosition;
    }
  }, {
    key: "remaining",
    get: function get() {
      return this._size - this.position;
    }
  }], [{
    key: "withArray",
    value: function withArray(buffer) {
      return new CodePointBuffer(buffer, buffer.length);
    }
  }, {
    key: "builder",
    value: function builder(initialBufferSize) {
      return new CodePointBuffer.Builder(initialBufferSize);
    }
  }]);
  return CodePointBuffer;
}();

exports.CodePointBuffer = CodePointBuffer;

(function (CodePointBuffer) {
  var Type;

  (function (Type) {
    Type[Type["BYTE"] = 0] = "BYTE";
    Type[Type["CHAR"] = 1] = "CHAR";
    Type[Type["INT"] = 2] = "INT";
  })(Type || (Type = {}));

  var Builder =
  /*#__PURE__*/
  function () {
    function Builder(initialBufferSize) {
      (0, _classCallCheck2["default"])(this, Builder);
      this.type = 0
      /* BYTE */
      ;
      this.buffer = new Uint8Array(initialBufferSize);
      this.prevHighSurrogate = -1;
      this.position = 0;
    }

    (0, _createClass2["default"])(Builder, [{
      key: "build",
      value: function build() {
        return new CodePointBuffer(this.buffer, this.position);
      }
    }, {
      key: "ensureRemaining",
      value: function ensureRemaining(remainingNeeded) {
        switch (this.type) {
          case 0
          /* BYTE */
          :
            if (this.buffer.length - this.position < remainingNeeded) {
              var newCapacity = Builder.roundUpToNextPowerOfTwo(this.buffer.length + remainingNeeded);
              var newBuffer = new Uint8Array(newCapacity);
              newBuffer.set(this.buffer.subarray(0, this.position), 0);
              this.buffer = newBuffer;
            }

            break;

          case 1
          /* CHAR */
          :
            if (this.buffer.length - this.position < remainingNeeded) {
              var _newCapacity = Builder.roundUpToNextPowerOfTwo(this.buffer.length + remainingNeeded);

              var _newBuffer = new Uint16Array(_newCapacity);

              _newBuffer.set(this.buffer.subarray(0, this.position), 0);

              this.buffer = _newBuffer;
            }

            break;

          case 2
          /* INT */
          :
            if (this.buffer.length - this.position < remainingNeeded) {
              var _newCapacity2 = Builder.roundUpToNextPowerOfTwo(this.buffer.length + remainingNeeded);

              var _newBuffer2 = new Int32Array(_newCapacity2);

              _newBuffer2.set(this.buffer.subarray(0, this.position), 0);

              this.buffer = _newBuffer2;
            }

            break;
        }
      }
    }, {
      key: "append",
      value: function append(utf16In) {
        this.ensureRemaining(utf16In.length);
        this.appendArray(utf16In);
      }
    }, {
      key: "appendArray",
      value: function appendArray(utf16In) {
        switch (this.type) {
          case 0
          /* BYTE */
          :
            this.appendArrayByte(utf16In);
            break;

          case 1
          /* CHAR */
          :
            this.appendArrayChar(utf16In);
            break;

          case 2
          /* INT */
          :
            this.appendArrayInt(utf16In);
            break;
        }
      }
    }, {
      key: "appendArrayByte",
      value: function appendArrayByte(utf16In) {
        assert(this.prevHighSurrogate === -1);
        var input = utf16In;
        var inOffset = 0;
        var inLimit = utf16In.length;
        var outByte = this.buffer;
        var outOffset = this.position;

        while (inOffset < inLimit) {
          var c = input[inOffset];

          if (c <= 0xFF) {
            outByte[outOffset] = c;
          } else {
            utf16In = utf16In.subarray(inOffset, inLimit);
            this.position = outOffset;

            if (!Character.isHighSurrogate(c)) {
              this.byteToCharBuffer(utf16In.length);
              this.appendArrayChar(utf16In);
              return;
            } else {
              this.byteToIntBuffer(utf16In.length);
              this.appendArrayInt(utf16In);
              return;
            }
          }

          inOffset++;
          outOffset++;
        }

        this.position = outOffset;
      }
    }, {
      key: "appendArrayChar",
      value: function appendArrayChar(utf16In) {
        assert(this.prevHighSurrogate === -1);
        var input = utf16In;
        var inOffset = 0;
        var inLimit = utf16In.length;
        var outChar = this.buffer;
        var outOffset = this.position;

        while (inOffset < inLimit) {
          var c = input[inOffset];

          if (!Character.isHighSurrogate(c)) {
            outChar[outOffset] = c;
          } else {
            utf16In = utf16In.subarray(inOffset, inLimit);
            this.position = outOffset;
            this.charToIntBuffer(utf16In.length);
            this.appendArrayInt(utf16In);
            return;
          }

          inOffset++;
          outOffset++;
        }

        this.position = outOffset;
      }
    }, {
      key: "appendArrayInt",
      value: function appendArrayInt(utf16In) {
        var input = utf16In;
        var inOffset = 0;
        var inLimit = utf16In.length;
        var outInt = this.buffer;
        var outOffset = this.position;

        while (inOffset < inLimit) {
          var c = input[inOffset];
          inOffset++;

          if (this.prevHighSurrogate !== -1) {
            if (Character.isLowSurrogate(c)) {
              outInt[outOffset] = String.fromCharCode(this.prevHighSurrogate, c).codePointAt(0);
              outOffset++;
              this.prevHighSurrogate = -1;
            } else {
              // Dangling high surrogate
              outInt[outOffset] = this.prevHighSurrogate;
              outOffset++;

              if (Character.isHighSurrogate(c)) {
                this.prevHighSurrogate = c;
              } else {
                outInt[outOffset] = c;
                outOffset++;
                this.prevHighSurrogate = -1;
              }
            }
          } else if (Character.isHighSurrogate(c)) {
            this.prevHighSurrogate = c;
          } else {
            outInt[outOffset] = c;
            outOffset++;
          }
        }

        if (this.prevHighSurrogate !== -1) {
          // Dangling high surrogate
          outInt[outOffset] = this.prevHighSurrogate;
          outOffset++;
        }

        this.position = outOffset;
      }
    }, {
      key: "byteToCharBuffer",
      value: function byteToCharBuffer(toAppend) {
        // CharBuffers hold twice as much per unit as ByteBuffers, so start with half the capacity.
        var newBuffer = new Uint16Array(Math.max(this.position + toAppend, this.buffer.length >> 1));
        newBuffer.set(this.buffer.subarray(0, this.position), 0);
        this.type = 1
        /* CHAR */
        ;
        this.buffer = newBuffer;
      }
    }, {
      key: "byteToIntBuffer",
      value: function byteToIntBuffer(toAppend) {
        // IntBuffers hold four times as much per unit as ByteBuffers, so start with one quarter the capacity.
        var newBuffer = new Int32Array(Math.max(this.position + toAppend, this.buffer.length >> 2));
        newBuffer.set(this.buffer.subarray(0, this.position), 0);
        this.type = 2
        /* INT */
        ;
        this.buffer = newBuffer;
      }
    }, {
      key: "charToIntBuffer",
      value: function charToIntBuffer(toAppend) {
        // IntBuffers hold two times as much per unit as ByteBuffers, so start with one half the capacity.
        var newBuffer = new Int32Array(Math.max(this.position + toAppend, this.buffer.length >> 1));
        newBuffer.set(this.buffer.subarray(0, this.position), 0);
        this.type = 2
        /* INT */
        ;
        this.buffer = newBuffer;
      }
    }], [{
      key: "roundUpToNextPowerOfTwo",
      value: function roundUpToNextPowerOfTwo(i) {
        var nextPowerOfTwo = 32 - Math.clz32(i - 1);
        return Math.pow(2, nextPowerOfTwo);
      }
    }]);
    return Builder;
  }();

  CodePointBuffer.Builder = Builder;
})(CodePointBuffer = exports.CodePointBuffer || (exports.CodePointBuffer = {}));
//# sourceMappingURL=CodePointBuffer.js.map
