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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:40.5099429-07:00

var Arrays_1 = require("./Arrays");

var Decorators_1 = require("../Decorators");

var EMPTY_DATA = new Int32Array(0);
var INITIAL_SIZE = 4;
var MAX_ARRAY_SIZE = (1 << 31 >>> 0) - 1 - 8;
/**
 *
 * @author Sam Harwell
 */

var IntegerList =
/*#__PURE__*/
function () {
  function IntegerList(arg) {
    (0, _classCallCheck2["default"])(this, IntegerList);

    if (!arg) {
      this._data = EMPTY_DATA;
      this._size = 0;
    } else if (arg instanceof IntegerList) {
      this._data = arg._data.slice(0);
      this._size = arg._size;
    } else if (typeof arg === "number") {
      if (arg === 0) {
        this._data = EMPTY_DATA;
        this._size = 0;
      } else {
        this._data = new Int32Array(arg);
        this._size = 0;
      }
    } else {
      // arg is Iterable<number>
      this._data = EMPTY_DATA;
      this._size = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;
          this.add(value);
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
  }

  (0, _createClass2["default"])(IntegerList, [{
    key: "add",
    value: function add(value) {
      if (this._data.length === this._size) {
        this.ensureCapacity(this._size + 1);
      }

      this._data[this._size] = value;
      this._size++;
    }
  }, {
    key: "addAll",
    value: function addAll(list) {
      if (Array.isArray(list)) {
        this.ensureCapacity(this._size + list.length);

        this._data.subarray(this._size, this._size + list.length).set(list);

        this._size += list.length;
      } else if (list instanceof IntegerList) {
        this.ensureCapacity(this._size + list._size);

        this._data.subarray(this._size, this._size + list.size).set(list._data);

        this._size += list._size;
      } else {
        // list is JavaCollection<number>
        this.ensureCapacity(this._size + list.size);
        var current = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var xi = _step2.value;
            this._data[this._size + current] = xi;
            current++;
          }
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

        this._size += list.size;
      }
    }
  }, {
    key: "get",
    value: function get(index) {
      if (index < 0 || index >= this._size) {
        throw RangeError();
      }

      return this._data[index];
    }
  }, {
    key: "contains",
    value: function contains(value) {
      for (var i = 0; i < this._size; i++) {
        if (this._data[i] === value) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "set",
    value: function set(index, value) {
      if (index < 0 || index >= this._size) {
        throw RangeError();
      }

      var previous = this._data[index];
      this._data[index] = value;
      return previous;
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      var value = this.get(index);

      this._data.copyWithin(index, index + 1, this._size);

      this._data[this._size - 1] = 0;
      this._size--;
      return value;
    }
  }, {
    key: "removeRange",
    value: function removeRange(fromIndex, toIndex) {
      if (fromIndex < 0 || toIndex < 0 || fromIndex > this._size || toIndex > this._size) {
        throw RangeError();
      }

      if (fromIndex > toIndex) {
        throw RangeError();
      }

      this._data.copyWithin(toIndex, fromIndex, this._size);

      this._data.fill(0, this._size - (toIndex - fromIndex), this._size);

      this._size -= toIndex - fromIndex;
    }
  }, {
    key: "trimToSize",
    value: function trimToSize() {
      if (this._data.length === this._size) {
        return;
      }

      this._data = this._data.slice(0, this._size);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._data.fill(0, 0, this._size);

      this._size = 0;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      if (this._size === 0) {
        return [];
      }

      return Array.from(this._data.subarray(0, this._size));
    }
  }, {
    key: "sort",
    value: function sort() {
      this._data.subarray(0, this._size).sort();
    }
    /**
     * Compares the specified object with this list for equality.  Returns
     * `true` if and only if the specified object is also an {@link IntegerList},
     * both lists have the same size, and all corresponding pairs of elements in
     * the two lists are equal.  In other words, two lists are defined to be
     * equal if they contain the same elements in the same order.
     *
     * This implementation first checks if the specified object is this
     * list. If so, it returns `true`; if not, it checks if the
     * specified object is an {@link IntegerList}. If not, it returns `false`;
     * if so, it checks the size of both lists. If the lists are not the same size,
     * it returns `false`; otherwise it iterates over both lists, comparing
     * corresponding pairs of elements.  If any comparison returns `false`,
     * this method returns `false`.
     *
     * @param o the object to be compared for equality with this list
     * @returns `true` if the specified object is equal to this list
     */

  }, {
    key: "equals",
    value: function equals(o) {
      if (o === this) {
        return true;
      }

      if (!(o instanceof IntegerList)) {
        return false;
      }

      if (this._size !== o._size) {
        return false;
      }

      for (var i = 0; i < this._size; i++) {
        if (this._data[i] !== o._data[i]) {
          return false;
        }
      }

      return true;
    }
    /**
     * Returns the hash code value for this list.
     *
     * This implementation uses exactly the code that is used to define the
     * list hash function in the documentation for the {@link List#hashCode}
     * method.
     *
     * @returns the hash code value for this list
     */

  }, {
    key: "hashCode",
    value: function hashCode() {
      var hashCode = 1;

      for (var i = 0; i < this._size; i++) {
        hashCode = 31 * hashCode + this._data[i];
      }

      return hashCode;
    }
    /**
     * Returns a string representation of this list.
     */

  }, {
    key: "toString",
    value: function toString() {
      return this._data.toString();
    }
  }, {
    key: "binarySearch",
    value: function binarySearch(key, fromIndex, toIndex) {
      if (fromIndex === undefined) {
        fromIndex = 0;
      }

      if (toIndex === undefined) {
        toIndex = this._size;
      }

      if (fromIndex < 0 || toIndex < 0 || fromIndex > this._size || toIndex > this._size) {
        throw new RangeError();
      }

      if (fromIndex > toIndex) {
        throw new RangeError();
      }

      return Arrays_1.Arrays.binarySearch(this._data, key, fromIndex, toIndex);
    }
  }, {
    key: "ensureCapacity",
    value: function ensureCapacity(capacity) {
      if (capacity < 0 || capacity > MAX_ARRAY_SIZE) {
        throw new RangeError();
      }

      var newLength;

      if (this._data.length === 0) {
        newLength = INITIAL_SIZE;
      } else {
        newLength = this._data.length;
      }

      while (newLength < capacity) {
        newLength = newLength * 2;

        if (newLength < 0 || newLength > MAX_ARRAY_SIZE) {
          newLength = MAX_ARRAY_SIZE;
        }
      }

      var tmp = new Int32Array(newLength);
      tmp.set(this._data);
      this._data = tmp;
    }
    /** Convert the list to a UTF-16 encoded char array. If all values are less
     *  than the 0xFFFF 16-bit code point limit then this is just a char array
     *  of 16-bit char as usual. For values in the supplementary range, encode
     * them as two UTF-16 code units.
     */

  }, {
    key: "toCharArray",
    value: function toCharArray() {
      // Optimize for the common case (all data values are < 0xFFFF) to avoid an extra scan
      var resultArray = new Uint16Array(this._size);
      var resultIdx = 0;
      var calculatedPreciseResultSize = false;

      for (var i = 0; i < this._size; i++) {
        var codePoint = this._data[i];

        if (codePoint >= 0 && codePoint < 0x10000) {
          resultArray[resultIdx] = codePoint;
          resultIdx++;
          continue;
        } // Calculate the precise result size if we encounter a code point > 0xFFFF


        if (!calculatedPreciseResultSize) {
          var newResultArray = new Uint16Array(this.charArraySize());
          newResultArray.set(resultArray, 0);
          resultArray = newResultArray;
          calculatedPreciseResultSize = true;
        } // This will throw RangeError if the code point is not a valid Unicode code point


        var pair = String.fromCodePoint(codePoint);
        resultArray[resultIdx] = pair.charCodeAt(0);
        resultArray[resultIdx + 1] = pair.charCodeAt(1);
        resultIdx += 2;
      }

      return resultArray;
    }
  }, {
    key: "charArraySize",
    value: function charArraySize() {
      var result = 0;

      for (var i = 0; i < this._size; i++) {
        result += this._data[i] >= 0x10000 ? 2 : 1;
      }

      return result;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this._size === 0;
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }]);
  return IntegerList;
}();

__decorate([Decorators_1.NotNull], IntegerList.prototype, "_data", void 0);

__decorate([Decorators_1.Override], IntegerList.prototype, "equals", null);

__decorate([Decorators_1.Override], IntegerList.prototype, "hashCode", null);

__decorate([Decorators_1.Override], IntegerList.prototype, "toString", null);

exports.IntegerList = IntegerList;
//# sourceMappingURL=IntegerList.js.map
