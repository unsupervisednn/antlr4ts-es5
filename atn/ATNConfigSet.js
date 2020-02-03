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

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ConvertTo-TS run at 2016-10-04T11:26:25.5488013-07:00

var Array2DHashMap_1 = require("../misc/Array2DHashMap");

var Array2DHashSet_1 = require("../misc/Array2DHashSet");

var ArrayEqualityComparator_1 = require("../misc/ArrayEqualityComparator");

var ATN_1 = require("./ATN");

var ATNConfig_1 = require("./ATNConfig");

var BitSet_1 = require("../misc/BitSet");

var Decorators_1 = require("../Decorators");

var ObjectEqualityComparator_1 = require("../misc/ObjectEqualityComparator");

var PredictionContext_1 = require("./PredictionContext");

var PredictionContextCache_1 = require("./PredictionContextCache");

var SemanticContext_1 = require("./SemanticContext");

var assert = require("assert");

var Utils = require("../misc/Utils");

var KeyTypeEqualityComparer =
/*#__PURE__*/
function () {
  function KeyTypeEqualityComparer() {
    (0, _classCallCheck2["default"])(this, KeyTypeEqualityComparer);
  }

  (0, _createClass2["default"])(KeyTypeEqualityComparer, [{
    key: "hashCode",
    value: function hashCode(key) {
      return key.state ^ key.alt;
    }
  }, {
    key: "equals",
    value: function equals(a, b) {
      return a.state === b.state && a.alt === b.alt;
    }
  }]);
  return KeyTypeEqualityComparer;
}();

KeyTypeEqualityComparer.INSTANCE = new KeyTypeEqualityComparer();

function NewKeyedConfigMap(map) {
  if (map) {
    return new Array2DHashMap_1.Array2DHashMap(map);
  } else {
    return new Array2DHashMap_1.Array2DHashMap(KeyTypeEqualityComparer.INSTANCE);
  }
}
/**
 * Represents a set of ATN configurations (see `ATNConfig`). As configurations are added to the set, they are merged
 * with other `ATNConfig` instances already in the set when possible using the graph-structured stack.
 *
 * An instance of this class represents the complete set of positions (with context) in an ATN which would be associated
 * with a single DFA state. Its internal representation is more complex than traditional state used for NFA to DFA
 * conversion due to performance requirements (both improving speed and reducing memory overhead) as well as supporting
 * features such as semantic predicates and non-greedy operators in a form to support ANTLR's prediction algorithm.
 *
 * @author Sam Harwell
 */


var ATNConfigSet =
/*#__PURE__*/
function () {
  function ATNConfigSet(set, readonly) {
    (0, _classCallCheck2["default"])(this, ATNConfigSet);
    this._uniqueAlt = 0; // Used in parser and lexer. In lexer, it indicates we hit a pred
    // while computing a closure operation.  Don't make a DFA state from this.

    this._hasSemanticContext = false;
    this._dipsIntoOuterContext = false;
    /**
     * When `true`, this config set represents configurations where the entire
     * outer context has been consumed by the ATN interpreter. This prevents the
     * {@link ParserATNSimulator#closure} from pursuing the global FOLLOW when a
     * rule stop state is reached with an empty prediction context.
     *
     * Note: `outermostConfigSet` and {@link #dipsIntoOuterContext} should never
     * be true at the same time.
     */

    this.outermostConfigSet = false;
    this.cachedHashCode = -1;

    if (!set) {
      this.mergedConfigs = NewKeyedConfigMap();
      this.unmerged = [];
      this.configs = [];
      this._uniqueAlt = ATN_1.ATN.INVALID_ALT_NUMBER;
    } else {
      if (readonly) {
        this.mergedConfigs = undefined;
        this.unmerged = undefined;
      } else if (!set.isReadOnly) {
        this.mergedConfigs = NewKeyedConfigMap(set.mergedConfigs);
        this.unmerged = set.unmerged.slice(0);
      } else {
        this.mergedConfigs = NewKeyedConfigMap();
        this.unmerged = [];
      }

      this.configs = set.configs.slice(0);
      this._dipsIntoOuterContext = set._dipsIntoOuterContext;
      this._hasSemanticContext = set._hasSemanticContext;
      this.outermostConfigSet = set.outermostConfigSet;

      if (readonly || !set.isReadOnly) {
        this._uniqueAlt = set._uniqueAlt;
        this._conflictInfo = set._conflictInfo;
      } // if (!readonly && set.isReadOnly) -> addAll is called from clone()

    }
  }
  /**
   * Get the set of all alternatives represented by configurations in this
   * set.
   */


  (0, _createClass2["default"])(ATNConfigSet, [{
    key: "getRepresentedAlternatives",
    value: function getRepresentedAlternatives() {
      if (this._conflictInfo != null) {
        return this._conflictInfo.conflictedAlts.clone();
      }

      var alts = new BitSet_1.BitSet();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var config = _step.value;
          alts.set(config.alt);
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

      return alts;
    }
  }, {
    key: "getStates",
    value: function getStates() {
      var states = new Array2DHashSet_1.Array2DHashSet(ObjectEqualityComparator_1.ObjectEqualityComparator.INSTANCE);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.configs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var c = _step2.value;
          states.add(c.state);
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

      return states;
    }
  }, {
    key: "optimizeConfigs",
    value: function optimizeConfigs(interpreter) {
      if (this.configs.length === 0) {
        return;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.configs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var config = _step3.value;
          config.context = interpreter.atn.getCachedContext(config.context);
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
    }
  }, {
    key: "clone",
    value: function clone(readonly) {
      var copy = new ATNConfigSet(this, readonly);

      if (!readonly && this.isReadOnly) {
        copy.addAll(this.configs);
      }

      return copy;
    }
  }, {
    key: "contains",
    value: function contains(o) {
      if (!(o instanceof ATNConfig_1.ATNConfig)) {
        return false;
      }

      if (this.mergedConfigs && this.unmerged) {
        var config = o;
        var configKey = this.getKey(config);
        var mergedConfig = this.mergedConfigs.get(configKey);

        if (mergedConfig != null && this.canMerge(config, configKey, mergedConfig)) {
          return mergedConfig.contains(config);
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.unmerged[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var c = _step4.value;

            if (c.contains(o)) {
              return true;
            }
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
      } else {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.configs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _c = _step5.value;

            if (_c.contains(o)) {
              return true;
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
      }

      return false;
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
              return _context.delegateYield(this.configs, "t0", 1);

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
      return this.configs;
    }
  }, {
    key: "add",
    value: function add(e, contextCache) {
      this.ensureWritable();

      if (!this.mergedConfigs || !this.unmerged) {
        throw new Error("Covered by ensureWritable but duplicated here for strict null check limitation");
      }

      assert(!this.outermostConfigSet || !e.reachesIntoOuterContext);

      if (contextCache == null) {
        contextCache = PredictionContextCache_1.PredictionContextCache.UNCACHED;
      }

      var addKey;
      var key = this.getKey(e);
      var mergedConfig = this.mergedConfigs.get(key);
      addKey = mergedConfig == null;

      if (mergedConfig != null && this.canMerge(e, key, mergedConfig)) {
        mergedConfig.outerContextDepth = Math.max(mergedConfig.outerContextDepth, e.outerContextDepth);

        if (e.isPrecedenceFilterSuppressed) {
          mergedConfig.isPrecedenceFilterSuppressed = true;
        }

        var joined = PredictionContext_1.PredictionContext.join(mergedConfig.context, e.context, contextCache);
        this.updatePropertiesForMergedConfig(e);

        if (mergedConfig.context === joined) {
          return false;
        }

        mergedConfig.context = joined;
        return true;
      }

      for (var i = 0; i < this.unmerged.length; i++) {
        var unmergedConfig = this.unmerged[i];

        if (this.canMerge(e, key, unmergedConfig)) {
          unmergedConfig.outerContextDepth = Math.max(unmergedConfig.outerContextDepth, e.outerContextDepth);

          if (e.isPrecedenceFilterSuppressed) {
            unmergedConfig.isPrecedenceFilterSuppressed = true;
          }

          var _joined = PredictionContext_1.PredictionContext.join(unmergedConfig.context, e.context, contextCache);

          this.updatePropertiesForMergedConfig(e);

          if (unmergedConfig.context === _joined) {
            return false;
          }

          unmergedConfig.context = _joined;

          if (addKey) {
            this.mergedConfigs.put(key, unmergedConfig);
            this.unmerged.splice(i, 1);
          }

          return true;
        }
      }

      this.configs.push(e);

      if (addKey) {
        this.mergedConfigs.put(key, e);
      } else {
        this.unmerged.push(e);
      }

      this.updatePropertiesForAddedConfig(e);
      return true;
    }
  }, {
    key: "updatePropertiesForMergedConfig",
    value: function updatePropertiesForMergedConfig(config) {
      // merged configs can't change the alt or semantic context
      this._dipsIntoOuterContext = this._dipsIntoOuterContext || config.reachesIntoOuterContext;
      assert(!this.outermostConfigSet || !this._dipsIntoOuterContext);
    }
  }, {
    key: "updatePropertiesForAddedConfig",
    value: function updatePropertiesForAddedConfig(config) {
      if (this.configs.length === 1) {
        this._uniqueAlt = config.alt;
      } else if (this._uniqueAlt !== config.alt) {
        this._uniqueAlt = ATN_1.ATN.INVALID_ALT_NUMBER;
      }

      this._hasSemanticContext = this._hasSemanticContext || !SemanticContext_1.SemanticContext.NONE.equals(config.semanticContext);
      this._dipsIntoOuterContext = this._dipsIntoOuterContext || config.reachesIntoOuterContext;
      assert(!this.outermostConfigSet || !this._dipsIntoOuterContext);
    }
  }, {
    key: "canMerge",
    value: function canMerge(left, leftKey, right) {
      if (left.state.stateNumber !== right.state.stateNumber) {
        return false;
      }

      if (leftKey.alt !== right.alt) {
        return false;
      }

      return left.semanticContext.equals(right.semanticContext);
    }
  }, {
    key: "getKey",
    value: function getKey(e) {
      return {
        state: e.state.stateNumber,
        alt: e.alt
      };
    }
  }, {
    key: "containsAll",
    value: function containsAll(c) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = c[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var o = _step6.value;

          if (!(o instanceof ATNConfig_1.ATNConfig)) {
            return false;
          }

          if (!this.contains(o)) {
            return false;
          }
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

      return true;
    }
  }, {
    key: "addAll",
    value: function addAll(c, contextCache) {
      this.ensureWritable();
      var changed = false;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = c[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var group = _step7.value;

          if (this.add(group, contextCache)) {
            changed = true;
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

      return changed;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ensureWritable();

      if (!this.mergedConfigs || !this.unmerged) {
        throw new Error("Covered by ensureWritable but duplicated here for strict null check limitation");
      }

      this.mergedConfigs.clear();
      this.unmerged.length = 0;
      this.configs.length = 0;
      this._dipsIntoOuterContext = false;
      this._hasSemanticContext = false;
      this._uniqueAlt = ATN_1.ATN.INVALID_ALT_NUMBER;
      this._conflictInfo = undefined;
    }
  }, {
    key: "equals",
    value: function equals(obj) {
      if (this === obj) {
        return true;
      }

      if (!(obj instanceof ATNConfigSet)) {
        return false;
      }

      return this.outermostConfigSet === obj.outermostConfigSet && Utils.equals(this._conflictInfo, obj._conflictInfo) && ArrayEqualityComparator_1.ArrayEqualityComparator.INSTANCE.equals(this.configs, obj.configs);
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      if (this.isReadOnly && this.cachedHashCode !== -1) {
        return this.cachedHashCode;
      }

      var hashCode = 1;
      hashCode = 5 * hashCode ^ (this.outermostConfigSet ? 1 : 0);
      hashCode = 5 * hashCode ^ ArrayEqualityComparator_1.ArrayEqualityComparator.INSTANCE.hashCode(this.configs);

      if (this.isReadOnly) {
        this.cachedHashCode = hashCode;
      }

      return hashCode;
    }
  }, {
    key: "toString",
    value: function toString(showContext) {
      if (showContext == null) {
        showContext = false;
      }

      var buf = "";
      var sortedConfigs = this.configs.slice(0);
      sortedConfigs.sort(function (o1, o2) {
        if (o1.alt !== o2.alt) {
          return o1.alt - o2.alt;
        } else if (o1.state.stateNumber !== o2.state.stateNumber) {
          return o1.state.stateNumber - o2.state.stateNumber;
        } else {
          return o1.semanticContext.toString().localeCompare(o2.semanticContext.toString());
        }
      });
      buf += "[";

      for (var i = 0; i < sortedConfigs.length; i++) {
        if (i > 0) {
          buf += ", ";
        }

        buf += sortedConfigs[i].toString(undefined, true, showContext);
      }

      buf += "]";

      if (this._hasSemanticContext) {
        buf += ",hasSemanticContext=" + this._hasSemanticContext;
      }

      if (this._uniqueAlt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
        buf += ",uniqueAlt=" + this._uniqueAlt;
      }

      if (this._conflictInfo != null) {
        buf += ",conflictingAlts=" + this._conflictInfo.conflictedAlts;

        if (!this._conflictInfo.isExact) {
          buf += "*";
        }
      }

      if (this._dipsIntoOuterContext) {
        buf += ",dipsIntoOuterContext";
      }

      return buf.toString();
    }
  }, {
    key: "get",
    value: function get(index) {
      return this.configs[index];
    }
  }, {
    key: "ensureWritable",
    value: function ensureWritable() {
      if (this.isReadOnly) {
        throw new Error("This ATNConfigSet is read only.");
      }
    }
  }, {
    key: "isReadOnly",
    get: function get() {
      return this.mergedConfigs == null;
    }
  }, {
    key: "isOutermostConfigSet",
    get: function get() {
      return this.outermostConfigSet;
    },
    set: function set(outermostConfigSet) {
      if (this.outermostConfigSet && !outermostConfigSet) {
        throw new Error("IllegalStateException");
      }

      assert(!outermostConfigSet || !this._dipsIntoOuterContext);
      this.outermostConfigSet = outermostConfigSet;
    }
  }, {
    key: "size",
    get: function get() {
      return this.configs.length;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.configs.length === 0;
    }
  }, {
    key: "uniqueAlt",
    get: function get() {
      return this._uniqueAlt;
    }
  }, {
    key: "hasSemanticContext",
    get: function get() {
      return this._hasSemanticContext;
    },
    set: function set(value) {
      this.ensureWritable();
      this._hasSemanticContext = value;
    }
  }, {
    key: "conflictInfo",
    get: function get() {
      return this._conflictInfo;
    },
    set: function set(conflictInfo) {
      this.ensureWritable();
      this._conflictInfo = conflictInfo;
    }
  }, {
    key: "conflictingAlts",
    get: function get() {
      if (this._conflictInfo == null) {
        return undefined;
      }

      return this._conflictInfo.conflictedAlts;
    }
  }, {
    key: "isExactConflict",
    get: function get() {
      if (this._conflictInfo == null) {
        return false;
      }

      return this._conflictInfo.isExact;
    }
  }, {
    key: "dipsIntoOuterContext",
    get: function get() {
      return this._dipsIntoOuterContext;
    }
  }]);
  return ATNConfigSet;
}();

__decorate([Decorators_1.NotNull], ATNConfigSet.prototype, "getRepresentedAlternatives", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "size", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "isEmpty", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "contains", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, Symbol.iterator, null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "toArray", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "containsAll", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "clear", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "equals", null);

__decorate([Decorators_1.Override], ATNConfigSet.prototype, "hashCode", null);

exports.ATNConfigSet = ATNConfigSet;
//# sourceMappingURL=ATNConfigSet.js.map
