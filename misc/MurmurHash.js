"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @author Sam Harwell
 */

var MurmurHash;

(function (MurmurHash) {
  var DEFAULT_SEED = 0;
  /**
   * Initialize the hash using the specified `seed`.
   *
   * @param seed the seed (optional)
   * @returns the intermediate hash value
   */

  function initialize() {
    var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SEED;
    return seed;
  }

  MurmurHash.initialize = initialize;
  /**
   * Update the intermediate hash value for the next input `value`.
   *
   * @param hash the intermediate hash value
   * @param value the value to add to the current hash
   * @returns the updated intermediate hash value
   */

  function update(hash, value) {
    var c1 = 0xCC9E2D51;
    var c2 = 0x1B873593;
    var r1 = 15;
    var r2 = 13;
    var m = 5;
    var n = 0xE6546B64;

    if (value == null) {
      value = 0;
    } else if (typeof value === "string") {
      value = hashString(value);
    } else if ((0, _typeof2["default"])(value) === "object") {
      value = value.hashCode();
    }

    var k = value;
    k = Math.imul(k, c1);
    k = k << r1 | k >>> 32 - r1;
    k = Math.imul(k, c2);
    hash = hash ^ k;
    hash = hash << r2 | hash >>> 32 - r2;
    hash = Math.imul(hash, m) + n;
    return hash & 0xFFFFFFFF;
  }

  MurmurHash.update = update;
  /**
   * Apply the final computation steps to the intermediate value `hash`
   * to form the final result of the MurmurHash 3 hash function.
   *
   * @param hash the intermediate hash value
   * @param numberOfWords the number of integer values added to the hash
   * @returns the final hash result
   */

  function finish(hash, numberOfWords) {
    hash = hash ^ numberOfWords * 4;
    hash = hash ^ hash >>> 16;
    hash = Math.imul(hash, 0x85EBCA6B);
    hash = hash ^ hash >>> 13;
    hash = Math.imul(hash, 0xC2B2AE35);
    hash = hash ^ hash >>> 16;
    return hash;
  }

  MurmurHash.finish = finish;
  /**
   * Utility function to compute the hash code of an array using the
   * MurmurHash algorithm.
   *
   * @param <T> the array element type
   * @param data the array data
   * @param seed the seed for the MurmurHash algorithm
   * @returns the hash code of the data
   */

  function hashCode(data) {
    var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SEED;
    var hash = initialize(seed);
    var length = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        hash = update(hash, value);
        length++;
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

    hash = finish(hash, length);
    return hash;
  }

  MurmurHash.hashCode = hashCode;
  /**
   * Function to hash a string. Based on the implementation found here:
   * http://stackoverflow.com/a/7616484
   */

  function hashString(str) {
    var len = str.length;

    if (len === 0) {
      return 0;
    }

    var hash = 0;

    for (var i = 0; i < len; i++) {
      var c = str.charCodeAt(i);
      hash = (hash << 5 >>> 0) - hash + c;
      hash |= 0;
    }

    return hash;
  }
})(MurmurHash = exports.MurmurHash || (exports.MurmurHash = {}));
//# sourceMappingURL=MurmurHash.js.map
