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
}); // ConvertTo-TS run at 2016-10-04T11:26:35.6390614-07:00

var Array2DHashMap_1 = require("../misc/Array2DHashMap");

var Decorators_1 = require("../Decorators");

var ObjectEqualityComparator_1 = require("../misc/ObjectEqualityComparator");

var PredictionContext_1 = require("./PredictionContext");

var assert = require("assert");
/** Used to cache {@link PredictionContext} objects. Its used for the shared
 *  context cash associated with contexts in DFA states. This cache
 *  can be used for both lexers and parsers.
 *
 * @author Sam Harwell
 */


var PredictionContextCache =
/*#__PURE__*/
function () {
  function PredictionContextCache() {
    var enableCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (0, _classCallCheck2["default"])(this, PredictionContextCache);
    this.contexts = new Array2DHashMap_1.Array2DHashMap(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);
    this.childContexts = new Array2DHashMap_1.Array2DHashMap(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);
    this.joinContexts = new Array2DHashMap_1.Array2DHashMap(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);
    this.enableCache = enableCache;
  }

  (0, _createClass2["default"])(PredictionContextCache, [{
    key: "getAsCached",
    value: function getAsCached(context) {
      if (!this.enableCache) {
        return context;
      }

      var result = this.contexts.get(context);

      if (!result) {
        result = context;
        this.contexts.put(context, context);
      }

      return result;
    }
  }, {
    key: "getChild",
    value: function getChild(context, invokingState) {
      if (!this.enableCache) {
        return context.getChild(invokingState);
      }

      var operands = new PredictionContextCache.PredictionContextAndInt(context, invokingState);
      var result = this.childContexts.get(operands);

      if (!result) {
        result = context.getChild(invokingState);
        result = this.getAsCached(result);
        this.childContexts.put(operands, result);
      }

      return result;
    }
  }, {
    key: "join",
    value: function join(x, y) {
      if (!this.enableCache) {
        return PredictionContext_1.PredictionContext.join(x, y, this);
      }

      var operands = new PredictionContextCache.IdentityCommutativePredictionContextOperands(x, y);
      var result = this.joinContexts.get(operands);

      if (result) {
        return result;
      }

      result = PredictionContext_1.PredictionContext.join(x, y, this);
      result = this.getAsCached(result);
      this.joinContexts.put(operands, result);
      return result;
    }
  }]);
  return PredictionContextCache;
}();

PredictionContextCache.UNCACHED = new PredictionContextCache(false);
exports.PredictionContextCache = PredictionContextCache;

(function (PredictionContextCache) {
  var PredictionContextAndInt =
  /*#__PURE__*/
  function () {
    function PredictionContextAndInt(obj, value) {
      (0, _classCallCheck2["default"])(this, PredictionContextAndInt);
      this.obj = obj;
      this.value = value;
    }

    (0, _createClass2["default"])(PredictionContextAndInt, [{
      key: "equals",
      value: function equals(obj) {
        if (!(obj instanceof PredictionContextAndInt)) {
          return false;
        } else if (obj === this) {
          return true;
        }

        var other = obj;
        return this.value === other.value && (this.obj === other.obj || this.obj != null && this.obj.equals(other.obj));
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        var hashCode = 5;
        hashCode = 7 * hashCode + (this.obj != null ? this.obj.hashCode() : 0);
        hashCode = 7 * hashCode + this.value;
        return hashCode;
      }
    }]);
    return PredictionContextAndInt;
  }();

  __decorate([Decorators_1.Override], PredictionContextAndInt.prototype, "equals", null);

  __decorate([Decorators_1.Override], PredictionContextAndInt.prototype, "hashCode", null);

  PredictionContextCache.PredictionContextAndInt = PredictionContextAndInt;

  var IdentityCommutativePredictionContextOperands =
  /*#__PURE__*/
  function () {
    function IdentityCommutativePredictionContextOperands(x, y) {
      (0, _classCallCheck2["default"])(this, IdentityCommutativePredictionContextOperands);
      assert(x != null);
      assert(y != null);
      this._x = x;
      this._y = y;
    }

    (0, _createClass2["default"])(IdentityCommutativePredictionContextOperands, [{
      key: "equals",
      value: function equals(o) {
        if (!(o instanceof IdentityCommutativePredictionContextOperands)) {
          return false;
        } else if (this === o) {
          return true;
        }

        var other = o;
        return this._x === other._x && this._y === other._y || this._x === other._y && this._y === other._x;
      }
    }, {
      key: "hashCode",
      value: function hashCode() {
        return this._x.hashCode() ^ this._y.hashCode();
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      }
    }]);
    return IdentityCommutativePredictionContextOperands;
  }();

  __decorate([Decorators_1.Override], IdentityCommutativePredictionContextOperands.prototype, "equals", null);

  __decorate([Decorators_1.Override], IdentityCommutativePredictionContextOperands.prototype, "hashCode", null);

  PredictionContextCache.IdentityCommutativePredictionContextOperands = IdentityCommutativePredictionContextOperands;
})(PredictionContextCache = exports.PredictionContextCache || (exports.PredictionContextCache = {}));
//# sourceMappingURL=PredictionContextCache.js.map
