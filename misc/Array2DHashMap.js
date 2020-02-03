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

var Array2DHashSet_1 = require("./Array2DHashSet");

var MapKeyEqualityComparator =
/*#__PURE__*/
function () {
  function MapKeyEqualityComparator(keyComparator) {
    (0, _classCallCheck2["default"])(this, MapKeyEqualityComparator);
    this.keyComparator = keyComparator;
  }

  (0, _createClass2["default"])(MapKeyEqualityComparator, [{
    key: "hashCode",
    value: function hashCode(obj) {
      return this.keyComparator.hashCode(obj.key);
    }
  }, {
    key: "equals",
    value: function equals(a, b) {
      return this.keyComparator.equals(a.key, b.key);
    }
  }]);
  return MapKeyEqualityComparator;
}();

var Array2DHashMap =
/*#__PURE__*/
function () {
  function Array2DHashMap(keyComparer) {
    (0, _classCallCheck2["default"])(this, Array2DHashMap);

    if (keyComparer instanceof Array2DHashMap) {
      this.backingStore = new Array2DHashSet_1.Array2DHashSet(keyComparer.backingStore);
    } else {
      this.backingStore = new Array2DHashSet_1.Array2DHashSet(new MapKeyEqualityComparator(keyComparer));
    }
  }

  (0, _createClass2["default"])(Array2DHashMap, [{
    key: "clear",
    value: function clear() {
      this.backingStore.clear();
    }
  }, {
    key: "containsKey",
    value: function containsKey(key) {
      return this.backingStore.contains({
        key: key
      });
    }
  }, {
    key: "get",
    value: function get(key) {
      var bucket = this.backingStore.get({
        key: key
      });

      if (!bucket) {
        return undefined;
      }

      return bucket.value;
    }
  }, {
    key: "put",
    value: function put(key, value) {
      var element = this.backingStore.get({
        key: key,
        value: value
      });
      var result;

      if (!element) {
        this.backingStore.add({
          key: key,
          value: value
        });
      } else {
        result = element.value;
        element.value = value;
      }

      return result;
    }
  }, {
    key: "putIfAbsent",
    value: function putIfAbsent(key, value) {
      var element = this.backingStore.get({
        key: key,
        value: value
      });
      var result;

      if (!element) {
        this.backingStore.add({
          key: key,
          value: value
        });
      } else {
        result = element.value;
      }

      return result;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      return this.backingStore.hashCode();
    }
  }, {
    key: "equals",
    value: function equals(o) {
      if (!(o instanceof Array2DHashMap)) {
        return false;
      }

      return this.backingStore.equals(o.backingStore);
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.backingStore.isEmpty;
    }
  }, {
    key: "size",
    get: function get() {
      return this.backingStore.size;
    }
  }]);
  return Array2DHashMap;
}();

exports.Array2DHashMap = Array2DHashMap;
//# sourceMappingURL=Array2DHashMap.js.map
