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
}); // ConvertTo-TS run at 2016-10-04T11:26:40.7402214-07:00

var Decorators_1 = require("../Decorators");

var INTERVAL_POOL_MAX_VALUE = 1000;
/** An immutable inclusive interval a..b */

var Interval =
/*#__PURE__*/
function () {
  /**
   * @param a The start of the interval
   * @param b The end of the interval (inclusive)
   */
  function Interval(a, b) {
    (0, _classCallCheck2["default"])(this, Interval);
    this.a = a;
    this.b = b;
  }

  (0, _createClass2["default"])(Interval, [{
    key: "equals",
    value: function equals(o) {
      if (o === this) {
        return true;
      } else if (!(o instanceof Interval)) {
        return false;
      }

      return this.a === o.a && this.b === o.b;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hash = 23;
      hash = hash * 31 + this.a;
      hash = hash * 31 + this.b;
      return hash;
    }
    /** Does this start completely before other? Disjoint */

  }, {
    key: "startsBeforeDisjoint",
    value: function startsBeforeDisjoint(other) {
      return this.a < other.a && this.b < other.a;
    }
    /** Does this start at or before other? Nondisjoint */

  }, {
    key: "startsBeforeNonDisjoint",
    value: function startsBeforeNonDisjoint(other) {
      return this.a <= other.a && this.b >= other.a;
    }
    /** Does this.a start after other.b? May or may not be disjoint */

  }, {
    key: "startsAfter",
    value: function startsAfter(other) {
      return this.a > other.a;
    }
    /** Does this start completely after other? Disjoint */

  }, {
    key: "startsAfterDisjoint",
    value: function startsAfterDisjoint(other) {
      return this.a > other.b;
    }
    /** Does this start after other? NonDisjoint */

  }, {
    key: "startsAfterNonDisjoint",
    value: function startsAfterNonDisjoint(other) {
      return this.a > other.a && this.a <= other.b; // this.b>=other.b implied
    }
    /** Are both ranges disjoint? I.e., no overlap? */

  }, {
    key: "disjoint",
    value: function disjoint(other) {
      return this.startsBeforeDisjoint(other) || this.startsAfterDisjoint(other);
    }
    /** Are two intervals adjacent such as 0..41 and 42..42? */

  }, {
    key: "adjacent",
    value: function adjacent(other) {
      return this.a === other.b + 1 || this.b === other.a - 1;
    }
  }, {
    key: "properlyContains",
    value: function properlyContains(other) {
      return other.a >= this.a && other.b <= this.b;
    }
    /** Return the interval computed from combining this and other */

  }, {
    key: "union",
    value: function union(other) {
      return Interval.of(Math.min(this.a, other.a), Math.max(this.b, other.b));
    }
    /** Return the interval in common between this and o */

  }, {
    key: "intersection",
    value: function intersection(other) {
      return Interval.of(Math.max(this.a, other.a), Math.min(this.b, other.b));
    }
    /** Return the interval with elements from `this` not in `other`;
     *  `other` must not be totally enclosed (properly contained)
     *  within `this`, which would result in two disjoint intervals
     *  instead of the single one returned by this method.
     */

  }, {
    key: "differenceNotProperlyContained",
    value: function differenceNotProperlyContained(other) {
      var diff;

      if (other.startsBeforeNonDisjoint(this)) {
        // other.a to left of this.a (or same)
        diff = Interval.of(Math.max(this.a, other.b + 1), this.b);
      } else if (other.startsAfterNonDisjoint(this)) {
        // other.a to right of this.a
        diff = Interval.of(this.a, other.a - 1);
      }

      return diff;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.a + ".." + this.b;
    }
  }, {
    key: "length",

    /** return number of elements between a and b inclusively. x..x is length 1.
     *  if b &lt; a, then length is 0.  9..10 has length 2.
     */
    get: function get() {
      if (this.b < this.a) {
        return 0;
      }

      return this.b - this.a + 1;
    }
  }], [{
    key: "of",

    /** Interval objects are used readonly so share all with the
     *  same single value a==b up to some max size.  Use an array as a perfect hash.
     *  Return shared object for 0..INTERVAL_POOL_MAX_VALUE or a new
     *  Interval object with a..a in it.  On Java.g4, 218623 IntervalSets
     *  have a..a (set with 1 element).
     */
    value: function of(a, b) {
      // cache just a..a
      if (a !== b || a < 0 || a > INTERVAL_POOL_MAX_VALUE) {
        return new Interval(a, b);
      }

      if (Interval.cache[a] == null) {
        Interval.cache[a] = new Interval(a, a);
      }

      return Interval.cache[a];
    }
  }, {
    key: "INVALID",
    get: function get() {
      return Interval._INVALID;
    }
  }]);
  return Interval;
}();

Interval._INVALID = new Interval(-1, -2);
Interval.cache = new Array(INTERVAL_POOL_MAX_VALUE + 1);

__decorate([Decorators_1.Override], Interval.prototype, "equals", null);

__decorate([Decorators_1.Override], Interval.prototype, "hashCode", null);

__decorate([Decorators_1.Override], Interval.prototype, "toString", null);

exports.Interval = Interval;
//# sourceMappingURL=Interval.js.map
