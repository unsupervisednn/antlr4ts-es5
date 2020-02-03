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
});

var Decorators_1 = require("../Decorators");

var MurmurHash_1 = require("./MurmurHash");

var ObjectEqualityComparator_1 = require("./ObjectEqualityComparator");
/**
 * This default implementation of {@link EqualityComparator} uses object equality
 * for comparisons by calling {@link Object#hashCode} and {@link Object#equals}.
 *
 * @author Sam Harwell
 */


var ArrayEqualityComparator =
/*#__PURE__*/
function () {
  function ArrayEqualityComparator() {
    (0, _classCallCheck2["default"])(this, ArrayEqualityComparator);
  }

  (0, _createClass2["default"])(ArrayEqualityComparator, [{
    key: "hashCode",

    /**
     * {@inheritDoc}
     *
     * This implementation returns
     * `obj.`{@link Object#hashCode hashCode()}.
     */
    value: function hashCode(obj) {
      if (obj == null) {
        return 0;
      }

      return MurmurHash_1.MurmurHash.hashCode(obj, 0);
    }
    /**
     * {@inheritDoc}
     *
     * This implementation relies on object equality. If both objects are
     * `undefined`, this method returns `true`. Otherwise if only
     * `a` is `undefined`, this method returns `false`. Otherwise,
     * this method returns the result of
     * `a.`{@link Object#equals equals}`(b)`.
     */

  }, {
    key: "equals",
    value: function equals(a, b) {
      if (a == null) {
        return b == null;
      } else if (b == null) {
        return false;
      }

      if (a.length !== b.length) {
        return false;
      }

      for (var i = 0; i < a.length; i++) {
        if (!ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE.equals(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }
  }]);
  return ArrayEqualityComparator;
}();

ArrayEqualityComparator.INSTANCE = new ArrayEqualityComparator();

__decorate([Decorators_1.Override], ArrayEqualityComparator.prototype, "hashCode", null);

__decorate([Decorators_1.Override], ArrayEqualityComparator.prototype, "equals", null);

exports.ArrayEqualityComparator = ArrayEqualityComparator;
//# sourceMappingURL=ArrayEqualityComparator.js.map
