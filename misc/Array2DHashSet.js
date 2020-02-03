"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
}); // ConvertTo-TS run at 2016-10-03T02:09:41.7434086-07:00

var assert = require("assert");

var DefaultEqualityComparator_1 = require("./DefaultEqualityComparator");

var Decorators_1 = require("../Decorators");

var MurmurHash_1 = require("./MurmurHash");
/** {@link Set} implementation with closed hashing (open addressing). */
// NOTE:  JavaScript's Set interface has on significant different diffrence from Java's:
// 		  e.g. the return type of add() differs!
//        For this reason I've commented tweaked the implements clause


var INITAL_CAPACITY = 16; // must be power of 2

var LOAD_FACTOR = 0.75;

var Array2DHashSet =
/*#__PURE__*/
function () {
  function Array2DHashSet(comparatorOrSet) {
    var initialCapacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INITAL_CAPACITY;
    (0, _classCallCheck2["default"])(this, Array2DHashSet);

    /** How many elements in set */
    this.n = 0;
    this.threshold = Math.floor(INITAL_CAPACITY * LOAD_FACTOR); // when to expand

    if (comparatorOrSet instanceof Array2DHashSet) {
      this.comparator = comparatorOrSet.comparator;
      this.buckets = comparatorOrSet.buckets.slice(0);

      for (var i = 0; i < this.buckets.length; i++) {
        var bucket = this.buckets[i];

        if (bucket) {
          this.buckets[i] = bucket.slice(0);
        }
      }

      this.n = comparatorOrSet.n;
      this.threshold = comparatorOrSet.threshold;
    } else {
      this.comparator = comparatorOrSet || DefaultEqualityComparator_1.DefaultEqualityComparator.INSTANCE;
      this.buckets = this.createBuckets(initialCapacity);
    }
  }
  /**
   * Add `o` to set if not there; return existing value if already
   * there. This method performs the same operation as {@link #add} aside from
   * the return value.
   */


  (0, _createClass2["default"])(Array2DHashSet, [{
    key: "getOrAdd",
    value: function getOrAdd(o) {
      if (this.n > this.threshold) {
        this.expand();
      }

      return this.getOrAddImpl(o);
    }
  }, {
    key: "getOrAddImpl",
    value: function getOrAddImpl(o) {
      var b = this.getBucket(o);
      var bucket = this.buckets[b]; // NEW BUCKET

      if (!bucket) {
        bucket = [o];
        this.buckets[b] = bucket;
        this.n++;
        return o;
      } // LOOK FOR IT IN BUCKET


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = bucket[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var existing = _step.value;

          if (this.comparator.equals(existing, o)) {
            return existing; // found existing, quit
          }
        } // FULL BUCKET, expand and add to end

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

      bucket.push(o);
      this.n++;
      return o;
    }
  }, {
    key: "get",
    value: function get(o) {
      if (o == null) {
        return o;
      }

      var b = this.getBucket(o);
      var bucket = this.buckets[b];

      if (!bucket) {
        // no bucket
        return undefined;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = bucket[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var e = _step2.value;

          if (this.comparator.equals(e, o)) {
            return e;
          }
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

      return undefined;
    }
  }, {
    key: "getBucket",
    value: function getBucket(o) {
      var hash = this.comparator.hashCode(o);
      var b = hash & this.buckets.length - 1; // assumes len is power of 2

      return b;
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      var hash = MurmurHash_1.MurmurHash.initialize();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.buckets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var bucket = _step3.value;

          if (bucket == null) {
            continue;
          }

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = bucket[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var o = _step4.value;

              if (o == null) {
                break;
              }

              hash = MurmurHash_1.MurmurHash.update(hash, this.comparator.hashCode(o));
            }
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

      hash = MurmurHash_1.MurmurHash.finish(hash, this.size);
      return hash;
    }
  }, {
    key: "equals",
    value: function equals(o) {
      if (o === this) {
        return true;
      }

      if (!(o instanceof Array2DHashSet)) {
        return false;
      }

      if (o.size !== this.size) {
        return false;
      }

      var same = this.containsAll(o);
      return same;
    }
  }, {
    key: "expand",
    value: function expand() {
      var old = this.buckets;
      var newCapacity = this.buckets.length * 2;
      var newTable = this.createBuckets(newCapacity);
      this.buckets = newTable;
      this.threshold = Math.floor(newCapacity * LOAD_FACTOR); //		System.out.println("new size="+newCapacity+", thres="+threshold);
      // rehash all existing entries

      var oldSize = this.size;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = old[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var bucket = _step5.value;

          if (!bucket) {
            continue;
          }

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = bucket[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var o = _step6.value;
              var b = this.getBucket(o);
              var newBucket = this.buckets[b];

              if (!newBucket) {
                newBucket = [];
                this.buckets[b] = newBucket;
              }

              newBucket.push(o);
            }
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

      assert(this.n === oldSize);
    }
  }, {
    key: "add",
    value: function add(t) {
      var existing = this.getOrAdd(t);
      return existing === t;
    }
  }, {
    key: "contains",
    value: function contains(o) {
      return this.containsFast(this.asElementType(o));
    }
  }, {
    key: "containsFast",
    value: function containsFast(obj) {
      if (obj == null) {
        return false;
      }

      return this.get(obj) != null;
    }
  }, {
    key: Symbol.iterator,
    value:
    /*#__PURE__*/
    _regenerator["default"].mark(function value() {
      return _regenerator["default"].wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.toArray(), "t0", 1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: "toArray",
    value: function toArray() {
      var a = new Array(this.size); // Copy elements from the nested arrays into the destination array

      var i = 0; // Position within destination array

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.buckets[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var bucket = _step7.value;

          if (bucket == null) {
            continue;
          }

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = bucket[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var o = _step8.value;

              if (o == null) {
                break;
              }

              a[i++] = o;
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                _iterator8["return"]();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return a;
    }
  }, {
    key: "containsAll",
    value: function containsAll(collection) {
      if (collection instanceof Array2DHashSet) {
        var s = collection;
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = s.buckets[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var bucket = _step9.value;

            if (bucket == null) {
              continue;
            }

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
              for (var _iterator10 = bucket[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var o = _step10.value;

                if (o == null) {
                  break;
                }

                if (!this.containsFast(this.asElementType(o))) {
                  return false;
                }
              }
            } catch (err) {
              _didIteratorError10 = true;
              _iteratorError10 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                  _iterator10["return"]();
                }
              } finally {
                if (_didIteratorError10) {
                  throw _iteratorError10;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      } else {
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = collection[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _o = _step11.value;

            if (!this.containsFast(this.asElementType(_o))) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }
      }

      return true;
    }
  }, {
    key: "addAll",
    value: function addAll(c) {
      var changed = false;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = c[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var o = _step12.value;
          var existing = this.getOrAdd(o);

          if (existing !== o) {
            changed = true;
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      return changed;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.buckets = this.createBuckets(INITAL_CAPACITY);
      this.n = 0;
      this.threshold = Math.floor(INITAL_CAPACITY * LOAD_FACTOR);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.size === 0) {
        return "{}";
      }

      var buf = "{";
      var first = true;
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = this.buckets[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var bucket = _step13.value;

          if (bucket == null) {
            continue;
          }

          var _iteratorNormalCompletion14 = true;
          var _didIteratorError14 = false;
          var _iteratorError14 = undefined;

          try {
            for (var _iterator14 = bucket[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
              var o = _step14.value;

              if (o == null) {
                break;
              }

              if (first) {
                first = false;
              } else {
                buf += ", ";
              }

              buf += o.toString();
            }
          } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                _iterator14["return"]();
              }
            } finally {
              if (_didIteratorError14) {
                throw _iteratorError14;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      buf += "}";
      return buf;
    }
  }, {
    key: "toTableString",
    value: function toTableString() {
      var buf = "";
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = this.buckets[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var bucket = _step15.value;

          if (bucket == null) {
            buf += "null\n";
            continue;
          }

          buf += "[";
          var first = true;
          var _iteratorNormalCompletion16 = true;
          var _didIteratorError16 = false;
          var _iteratorError16 = undefined;

          try {
            for (var _iterator16 = bucket[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              var o = _step16.value;

              if (first) {
                first = false;
              } else {
                buf += " ";
              }

              if (o == null) {
                buf += "_";
              } else {
                buf += o.toString();
              }
            }
          } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
                _iterator16["return"]();
              }
            } finally {
              if (_didIteratorError16) {
                throw _iteratorError16;
              }
            }
          }

          buf += "]\n";
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      return buf;
    }
    /**
     * Return `o` as an instance of the element type `T`. If
     * `o` is non-undefined but known to not be an instance of `T`, this
     * method returns `undefined`. The base implementation does not perform any
     * type checks; override this method to provide strong type checks for the
     * {@link #contains} and {@link #remove} methods to ensure the arguments to
     * the {@link EqualityComparator} for the set always have the expected
     * types.
     *
     * @param o the object to try and cast to the element type of the set
     * @returns `o` if it could be an instance of `T`, otherwise
     * `undefined`.
     */

  }, {
    key: "asElementType",
    value: function asElementType(o) {
      return o;
    }
    /**
     * Return an array of `T[]` with length `capacity`.
     *
     * @param capacity the length of the array to return
     * @returns the newly constructed array
     */

  }, {
    key: "createBuckets",
    value: function createBuckets(capacity) {
      return new Array(capacity);
    }
  }, {
    key: "size",
    get: function get() {
      return this.n;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.n === 0;
    }
  }]);
  return Array2DHashSet;
}();

__decorate([Decorators_1.NotNull], Array2DHashSet.prototype, "comparator", void 0);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "hashCode", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "equals", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "add", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "size", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "isEmpty", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "contains", null);

__decorate([__param(0, Decorators_1.Nullable)], Array2DHashSet.prototype, "containsFast", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, Symbol.iterator, null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "toArray", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "containsAll", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "addAll", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "clear", null);

__decorate([Decorators_1.Override], Array2DHashSet.prototype, "toString", null);

__decorate([Decorators_1.SuppressWarnings("unchecked")], Array2DHashSet.prototype, "asElementType", null);

__decorate([Decorators_1.SuppressWarnings("unchecked")], Array2DHashSet.prototype, "createBuckets", null);

exports.Array2DHashSet = Array2DHashSet;
//# sourceMappingURL=Array2DHashSet.js.map
