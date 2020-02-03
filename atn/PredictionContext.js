"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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
}); // ConvertTo-TS run at 2016-10-04T11:26:35.3812636-07:00

var Array2DHashMap_1 = require("../misc/Array2DHashMap");

var Array2DHashSet_1 = require("../misc/Array2DHashSet");

var Arrays_1 = require("../misc/Arrays");

var MurmurHash_1 = require("../misc/MurmurHash");

var Decorators_1 = require("../Decorators");

var PredictionContextCache_1 = require("./PredictionContextCache");

var assert = require("assert");

var INITIAL_HASH = 1;

var PredictionContext =
/*#__PURE__*/
function () {
  function PredictionContext(cachedHashCode) {
    (0, _classCallCheck2["default"])(this, PredictionContext);
    this.cachedHashCode = cachedHashCode;
  }

  (0, _createClass2["default"])(PredictionContext, [{
    key: "appendSingleContext",
    value: function appendSingleContext(returnContext, contextCache) {
      return this.appendContext(PredictionContext.EMPTY_FULL.getChild(returnContext), contextCache);
    }
  }, {
    key: "getChild",
    value: function getChild(returnState) {
      return new SingletonPredictionContext(this, returnState);
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      return this.cachedHashCode;
    }
  }, {
    key: "toStrings",
    value: function toStrings(recognizer, currentState) {
      var stop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PredictionContext.EMPTY_FULL;
      var result = [];

      outer: for (var perm = 0;; perm++) {
        var offset = 0;
        var last = true;
        var p = this;
        var stateNumber = currentState;
        var localBuffer = "";
        localBuffer += "[";

        while (!p.isEmpty && p !== stop) {
          var index = 0;

          if (p.size > 0) {
            var bits = 1;

            while (1 << bits >>> 0 < p.size) {
              bits++;
            }

            var mask = (1 << bits >>> 0) - 1;
            index = perm >> offset & mask;
            last = last && index >= p.size - 1;

            if (index >= p.size) {
              continue outer;
            }

            offset += bits;
          }

          if (recognizer) {
            if (localBuffer.length > 1) {
              // first char is '[', if more than that this isn't the first rule
              localBuffer += " ";
            }

            var atn = recognizer.atn;
            var s = atn.states[stateNumber];
            var ruleName = recognizer.ruleNames[s.ruleIndex];
            localBuffer += ruleName;
          } else if (p.getReturnState(index) !== PredictionContext.EMPTY_FULL_STATE_KEY) {
            if (!p.isEmpty) {
              if (localBuffer.length > 1) {
                // first char is '[', if more than that this isn't the first rule
                localBuffer += " ";
              }

              localBuffer += p.getReturnState(index);
            }
          }

          stateNumber = p.getReturnState(index);
          p = p.getParent(index);
        }

        localBuffer += "]";
        result.push(localBuffer);

        if (last) {
          break;
        }
      }

      return result;
    }
  }], [{
    key: "calculateEmptyHashCode",
    value: function calculateEmptyHashCode() {
      var hash = MurmurHash_1.MurmurHash.initialize(INITIAL_HASH);
      hash = MurmurHash_1.MurmurHash.finish(hash, 0);
      return hash;
    }
  }, {
    key: "calculateSingleHashCode",
    value: function calculateSingleHashCode(parent, returnState) {
      var hash = MurmurHash_1.MurmurHash.initialize(INITIAL_HASH);
      hash = MurmurHash_1.MurmurHash.update(hash, parent);
      hash = MurmurHash_1.MurmurHash.update(hash, returnState);
      hash = MurmurHash_1.MurmurHash.finish(hash, 2);
      return hash;
    }
  }, {
    key: "calculateHashCode",
    value: function calculateHashCode(parents, returnStates) {
      var hash = MurmurHash_1.MurmurHash.initialize(INITIAL_HASH);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parent = _step.value;
          hash = MurmurHash_1.MurmurHash.update(hash, parent);
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = returnStates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var returnState = _step2.value;
          hash = MurmurHash_1.MurmurHash.update(hash, returnState);
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

      hash = MurmurHash_1.MurmurHash.finish(hash, 2 * parents.length);
      return hash;
    }
  }, {
    key: "fromRuleContext",
    value: function fromRuleContext(atn, outerContext) {
      var fullContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (outerContext.isEmpty) {
        return fullContext ? PredictionContext.EMPTY_FULL : PredictionContext.EMPTY_LOCAL;
      }

      var parent;

      if (outerContext._parent) {
        parent = PredictionContext.fromRuleContext(atn, outerContext._parent, fullContext);
      } else {
        parent = fullContext ? PredictionContext.EMPTY_FULL : PredictionContext.EMPTY_LOCAL;
      }

      var state = atn.states[outerContext.invokingState];
      var transition = state.transition(0);
      return parent.getChild(transition.followState.stateNumber);
    }
  }, {
    key: "addEmptyContext",
    value: function addEmptyContext(context) {
      return context.addEmptyContext();
    }
  }, {
    key: "removeEmptyContext",
    value: function removeEmptyContext(context) {
      return context.removeEmptyContext();
    }
  }, {
    key: "join",
    value: function join(context0, context1) {
      var contextCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PredictionContextCache_1.PredictionContextCache.UNCACHED;

      if (context0 === context1) {
        return context0;
      }

      if (context0.isEmpty) {
        return PredictionContext.isEmptyLocal(context0) ? context0 : PredictionContext.addEmptyContext(context1);
      } else if (context1.isEmpty) {
        return PredictionContext.isEmptyLocal(context1) ? context1 : PredictionContext.addEmptyContext(context0);
      }

      var context0size = context0.size;
      var context1size = context1.size;

      if (context0size === 1 && context1size === 1 && context0.getReturnState(0) === context1.getReturnState(0)) {
        var merged = contextCache.join(context0.getParent(0), context1.getParent(0));

        if (merged === context0.getParent(0)) {
          return context0;
        } else if (merged === context1.getParent(0)) {
          return context1;
        } else {
          return merged.getChild(context0.getReturnState(0));
        }
      }

      var count = 0;
      var parentsList = new Array(context0size + context1size);
      var returnStatesList = new Array(parentsList.length);
      var leftIndex = 0;
      var rightIndex = 0;
      var canReturnLeft = true;
      var canReturnRight = true;

      while (leftIndex < context0size && rightIndex < context1size) {
        if (context0.getReturnState(leftIndex) === context1.getReturnState(rightIndex)) {
          parentsList[count] = contextCache.join(context0.getParent(leftIndex), context1.getParent(rightIndex));
          returnStatesList[count] = context0.getReturnState(leftIndex);
          canReturnLeft = canReturnLeft && parentsList[count] === context0.getParent(leftIndex);
          canReturnRight = canReturnRight && parentsList[count] === context1.getParent(rightIndex);
          leftIndex++;
          rightIndex++;
        } else if (context0.getReturnState(leftIndex) < context1.getReturnState(rightIndex)) {
          parentsList[count] = context0.getParent(leftIndex);
          returnStatesList[count] = context0.getReturnState(leftIndex);
          canReturnRight = false;
          leftIndex++;
        } else {
          assert(context1.getReturnState(rightIndex) < context0.getReturnState(leftIndex));
          parentsList[count] = context1.getParent(rightIndex);
          returnStatesList[count] = context1.getReturnState(rightIndex);
          canReturnLeft = false;
          rightIndex++;
        }

        count++;
      }

      while (leftIndex < context0size) {
        parentsList[count] = context0.getParent(leftIndex);
        returnStatesList[count] = context0.getReturnState(leftIndex);
        leftIndex++;
        canReturnRight = false;
        count++;
      }

      while (rightIndex < context1size) {
        parentsList[count] = context1.getParent(rightIndex);
        returnStatesList[count] = context1.getReturnState(rightIndex);
        rightIndex++;
        canReturnLeft = false;
        count++;
      }

      if (canReturnLeft) {
        return context0;
      } else if (canReturnRight) {
        return context1;
      }

      if (count < parentsList.length) {
        parentsList = parentsList.slice(0, count);
        returnStatesList = returnStatesList.slice(0, count);
      }

      if (parentsList.length === 0) {
        // if one of them was EMPTY_LOCAL, it would be empty and handled at the beginning of the method
        return PredictionContext.EMPTY_FULL;
      } else if (parentsList.length === 1) {
        return new SingletonPredictionContext(parentsList[0], returnStatesList[0]);
      } else {
        return new ArrayPredictionContext(parentsList, returnStatesList);
      }
    }
  }, {
    key: "isEmptyLocal",
    value: function isEmptyLocal(context) {
      return context === PredictionContext.EMPTY_LOCAL;
    }
  }, {
    key: "getCachedContext",
    value: function getCachedContext(context, contextCache, visited) {
      if (context.isEmpty) {
        return context;
      }

      var existing = visited.get(context);

      if (existing) {
        return existing;
      }

      existing = contextCache.get(context);

      if (existing) {
        visited.put(context, existing);
        return existing;
      }

      var changed = false;
      var parents = new Array(context.size);

      for (var i = 0; i < parents.length; i++) {
        var parent = PredictionContext.getCachedContext(context.getParent(i), contextCache, visited);

        if (changed || parent !== context.getParent(i)) {
          if (!changed) {
            parents = new Array(context.size);

            for (var j = 0; j < context.size; j++) {
              parents[j] = context.getParent(j);
            }

            changed = true;
          }

          parents[i] = parent;
        }
      }

      if (!changed) {
        existing = contextCache.putIfAbsent(context, context);
        visited.put(context, existing != null ? existing : context);
        return context;
      } // We know parents.length>0 because context.isEmpty is checked at the beginning of the method.


      var updated;

      if (parents.length === 1) {
        updated = new SingletonPredictionContext(parents[0], context.getReturnState(0));
      } else {
        var returnStates = new Array(context.size);

        for (var _i = 0; _i < context.size; _i++) {
          returnStates[_i] = context.getReturnState(_i);
        }

        updated = new ArrayPredictionContext(parents, returnStates, context.hashCode());
      }

      existing = contextCache.putIfAbsent(updated, updated);
      visited.put(updated, existing || updated);
      visited.put(context, existing || updated);
      return updated;
    }
  }]);
  return PredictionContext;
}();

__decorate([Decorators_1.Override], PredictionContext.prototype, "hashCode", null);

__decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], PredictionContext, "join", null);

__decorate([__param(0, Decorators_1.NotNull), __param(1, Decorators_1.NotNull), __param(2, Decorators_1.NotNull)], PredictionContext, "getCachedContext", null);

exports.PredictionContext = PredictionContext;

var EmptyPredictionContext =
/*#__PURE__*/
function (_PredictionContext) {
  (0, _inherits2["default"])(EmptyPredictionContext, _PredictionContext);

  function EmptyPredictionContext(fullContext) {
    var _this;

    (0, _classCallCheck2["default"])(this, EmptyPredictionContext);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(EmptyPredictionContext).call(this, PredictionContext.calculateEmptyHashCode()));
    _this.fullContext = fullContext;
    return _this;
  }

  (0, _createClass2["default"])(EmptyPredictionContext, [{
    key: "addEmptyContext",
    value: function addEmptyContext() {
      return this;
    }
  }, {
    key: "removeEmptyContext",
    value: function removeEmptyContext() {
      throw new Error("Cannot remove the empty context from itself.");
    }
  }, {
    key: "getParent",
    value: function getParent(index) {
      throw new Error("index out of bounds");
    }
  }, {
    key: "getReturnState",
    value: function getReturnState(index) {
      throw new Error("index out of bounds");
    }
  }, {
    key: "findReturnState",
    value: function findReturnState(returnState) {
      return -1;
    }
  }, {
    key: "appendSingleContext",
    value: function appendSingleContext(returnContext, contextCache) {
      return contextCache.getChild(this, returnContext);
    }
  }, {
    key: "appendContext",
    value: function appendContext(suffix, contextCache) {
      return suffix;
    }
  }, {
    key: "equals",
    value: function equals(o) {
      return this === o;
    }
  }, {
    key: "toStrings",
    value: function toStrings(recognizer, currentState, stop) {
      return ["[]"];
    }
  }, {
    key: "isFullContext",
    get: function get() {
      return this.fullContext;
    }
  }, {
    key: "size",
    get: function get() {
      return 0;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return true;
    }
  }, {
    key: "hasEmpty",
    get: function get() {
      return true;
    }
  }]);
  return EmptyPredictionContext;
}(PredictionContext);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "addEmptyContext", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "removeEmptyContext", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "getParent", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "getReturnState", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "findReturnState", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "size", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "appendSingleContext", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "appendContext", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "isEmpty", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "hasEmpty", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "equals", null);

__decorate([Decorators_1.Override], EmptyPredictionContext.prototype, "toStrings", null);

var ArrayPredictionContext =
/*#__PURE__*/
function (_PredictionContext2) {
  (0, _inherits2["default"])(ArrayPredictionContext, _PredictionContext2);

  function ArrayPredictionContext(parents, returnStates, hashCode) {
    var _this2;

    (0, _classCallCheck2["default"])(this, ArrayPredictionContext);
    _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ArrayPredictionContext).call(this, hashCode || PredictionContext.calculateHashCode(parents, returnStates)));
    assert(parents.length === returnStates.length);
    assert(returnStates.length > 1 || returnStates[0] !== PredictionContext.EMPTY_FULL_STATE_KEY, "Should be using PredictionContext.EMPTY instead.");
    _this2.parents = parents;
    _this2.returnStates = returnStates;
    return _this2;
  }

  (0, _createClass2["default"])(ArrayPredictionContext, [{
    key: "getParent",
    value: function getParent(index) {
      return this.parents[index];
    }
  }, {
    key: "getReturnState",
    value: function getReturnState(index) {
      return this.returnStates[index];
    }
  }, {
    key: "findReturnState",
    value: function findReturnState(returnState) {
      return Arrays_1.Arrays.binarySearch(this.returnStates, returnState);
    }
  }, {
    key: "addEmptyContext",
    value: function addEmptyContext() {
      if (this.hasEmpty) {
        return this;
      }

      var parents2 = this.parents.slice(0);
      var returnStates2 = this.returnStates.slice(0);
      parents2.push(PredictionContext.EMPTY_FULL);
      returnStates2.push(PredictionContext.EMPTY_FULL_STATE_KEY);
      return new ArrayPredictionContext(parents2, returnStates2);
    }
  }, {
    key: "removeEmptyContext",
    value: function removeEmptyContext() {
      if (!this.hasEmpty) {
        return this;
      }

      if (this.returnStates.length === 2) {
        return new SingletonPredictionContext(this.parents[0], this.returnStates[0]);
      } else {
        var parents2 = this.parents.slice(0, this.parents.length - 1);
        var returnStates2 = this.returnStates.slice(0, this.returnStates.length - 1);
        return new ArrayPredictionContext(parents2, returnStates2);
      }
    }
  }, {
    key: "appendContext",
    value: function appendContext(suffix, contextCache) {
      return ArrayPredictionContext.appendContextImpl(this, suffix, new PredictionContext.IdentityHashMap());
    }
  }, {
    key: "equals",
    value: function equals(o) {
      if (this === o) {
        return true;
      } else if (!(o instanceof ArrayPredictionContext)) {
        return false;
      }

      if (this.hashCode() !== o.hashCode()) {
        // can't be same if hash is different
        return false;
      }

      var other = o;
      return this.equalsImpl(other, new Array2DHashSet_1.Array2DHashSet());
    }
  }, {
    key: "equalsImpl",
    value: function equalsImpl(other, visited) {
      var selfWorkList = [];
      var otherWorkList = [];
      selfWorkList.push(this);
      otherWorkList.push(other);

      while (true) {
        var currentSelf = selfWorkList.pop();
        var currentOther = otherWorkList.pop();

        if (!currentSelf || !currentOther) {
          break;
        }

        var operands = new PredictionContextCache_1.PredictionContextCache.IdentityCommutativePredictionContextOperands(currentSelf, currentOther);

        if (!visited.add(operands)) {
          continue;
        }

        var selfSize = operands.x.size;

        if (selfSize === 0) {
          if (!operands.x.equals(operands.y)) {
            return false;
          }

          continue;
        }

        var otherSize = operands.y.size;

        if (selfSize !== otherSize) {
          return false;
        }

        for (var i = 0; i < selfSize; i++) {
          if (operands.x.getReturnState(i) !== operands.y.getReturnState(i)) {
            return false;
          }

          var selfParent = operands.x.getParent(i);
          var otherParent = operands.y.getParent(i);

          if (selfParent.hashCode() !== otherParent.hashCode()) {
            return false;
          }

          if (selfParent !== otherParent) {
            selfWorkList.push(selfParent);
            otherWorkList.push(otherParent);
          }
        }
      }

      return true;
    }
  }, {
    key: "size",
    get: function get() {
      return this.returnStates.length;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return false;
    }
  }, {
    key: "hasEmpty",
    get: function get() {
      return this.returnStates[this.returnStates.length - 1] === PredictionContext.EMPTY_FULL_STATE_KEY;
    }
  }], [{
    key: "appendContextImpl",
    value: function appendContextImpl(context, suffix, visited) {
      if (suffix.isEmpty) {
        if (PredictionContext.isEmptyLocal(suffix)) {
          if (context.hasEmpty) {
            return PredictionContext.EMPTY_LOCAL;
          }

          throw new Error("what to do here?");
        }

        return context;
      }

      if (suffix.size !== 1) {
        throw new Error("Appending a tree suffix is not yet supported.");
      }

      var result = visited.get(context);

      if (!result) {
        if (context.isEmpty) {
          result = suffix;
        } else {
          var parentCount = context.size;

          if (context.hasEmpty) {
            parentCount--;
          }

          var updatedParents = new Array(parentCount);
          var updatedReturnStates = new Array(parentCount);

          for (var i = 0; i < parentCount; i++) {
            updatedReturnStates[i] = context.getReturnState(i);
          }

          for (var _i2 = 0; _i2 < parentCount; _i2++) {
            updatedParents[_i2] = ArrayPredictionContext.appendContextImpl(context.getParent(_i2), suffix, visited);
          }

          if (updatedParents.length === 1) {
            result = new SingletonPredictionContext(updatedParents[0], updatedReturnStates[0]);
          } else {
            assert(updatedParents.length > 1);
            result = new ArrayPredictionContext(updatedParents, updatedReturnStates);
          }

          if (context.hasEmpty) {
            result = PredictionContext.join(result, suffix);
          }
        }

        visited.put(context, result);
      }

      return result;
    }
  }]);
  return ArrayPredictionContext;
}(PredictionContext);

__decorate([Decorators_1.NotNull], ArrayPredictionContext.prototype, "parents", void 0);

__decorate([Decorators_1.NotNull], ArrayPredictionContext.prototype, "returnStates", void 0);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "getParent", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "getReturnState", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "findReturnState", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "size", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "isEmpty", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "hasEmpty", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "addEmptyContext", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "removeEmptyContext", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "appendContext", null);

__decorate([Decorators_1.Override], ArrayPredictionContext.prototype, "equals", null);

ArrayPredictionContext = __decorate([__param(0, Decorators_1.NotNull)], ArrayPredictionContext);

var SingletonPredictionContext =
/*#__PURE__*/
function (_PredictionContext3) {
  (0, _inherits2["default"])(SingletonPredictionContext, _PredictionContext3);

  function SingletonPredictionContext(parent, returnState) {
    var _this3;

    (0, _classCallCheck2["default"])(this, SingletonPredictionContext);
    _this3 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SingletonPredictionContext).call(this, PredictionContext.calculateSingleHashCode(parent, returnState))); // assert(returnState != PredictionContext.EMPTY_FULL_STATE_KEY && returnState != PredictionContext.EMPTY_LOCAL_STATE_KEY);

    _this3.parent = parent;
    _this3.returnState = returnState;
    return _this3;
  }

  (0, _createClass2["default"])(SingletonPredictionContext, [{
    key: "getParent",
    value: function getParent(index) {
      // assert(index == 0);
      return this.parent;
    }
  }, {
    key: "getReturnState",
    value: function getReturnState(index) {
      // assert(index == 0);
      return this.returnState;
    }
  }, {
    key: "findReturnState",
    value: function findReturnState(returnState) {
      return this.returnState === returnState ? 0 : -1;
    }
  }, {
    key: "appendContext",
    value: function appendContext(suffix, contextCache) {
      return contextCache.getChild(this.parent.appendContext(suffix, contextCache), this.returnState);
    }
  }, {
    key: "addEmptyContext",
    value: function addEmptyContext() {
      var parents = [this.parent, PredictionContext.EMPTY_FULL];
      var returnStates = [this.returnState, PredictionContext.EMPTY_FULL_STATE_KEY];
      return new ArrayPredictionContext(parents, returnStates);
    }
  }, {
    key: "removeEmptyContext",
    value: function removeEmptyContext() {
      return this;
    }
  }, {
    key: "equals",
    value: function equals(o) {
      if (o === this) {
        return true;
      } else if (!(o instanceof SingletonPredictionContext)) {
        return false;
      }

      var other = o;

      if (this.hashCode() !== other.hashCode()) {
        return false;
      }

      return this.returnState === other.returnState && this.parent.equals(other.parent);
    }
  }, {
    key: "size",
    get: function get() {
      return 1;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return false;
    }
  }, {
    key: "hasEmpty",
    get: function get() {
      return false;
    }
  }]);
  return SingletonPredictionContext;
}(PredictionContext);

__decorate([Decorators_1.NotNull], SingletonPredictionContext.prototype, "parent", void 0);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "getParent", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "getReturnState", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "findReturnState", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "size", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "isEmpty", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "hasEmpty", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "appendContext", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "addEmptyContext", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "removeEmptyContext", null);

__decorate([Decorators_1.Override], SingletonPredictionContext.prototype, "equals", null);

SingletonPredictionContext = __decorate([__param(0, Decorators_1.NotNull)], SingletonPredictionContext);
exports.SingletonPredictionContext = SingletonPredictionContext;

(function (PredictionContext) {
  PredictionContext.EMPTY_LOCAL = new EmptyPredictionContext(false);
  PredictionContext.EMPTY_FULL = new EmptyPredictionContext(true);
  PredictionContext.EMPTY_LOCAL_STATE_KEY = -(1 << 31 >>> 0);
  PredictionContext.EMPTY_FULL_STATE_KEY = (1 << 31 >>> 0) - 1;

  var IdentityHashMap =
  /*#__PURE__*/
  function (_Array2DHashMap_1$Arr) {
    (0, _inherits2["default"])(IdentityHashMap, _Array2DHashMap_1$Arr);

    function IdentityHashMap() {
      (0, _classCallCheck2["default"])(this, IdentityHashMap);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IdentityHashMap).call(this, IdentityEqualityComparator.INSTANCE));
    }

    return IdentityHashMap;
  }(Array2DHashMap_1.Array2DHashMap);

  PredictionContext.IdentityHashMap = IdentityHashMap;

  var IdentityEqualityComparator =
  /*#__PURE__*/
  function () {
    function IdentityEqualityComparator() {
      (0, _classCallCheck2["default"])(this, IdentityEqualityComparator);
    }

    (0, _createClass2["default"])(IdentityEqualityComparator, [{
      key: "IdentityEqualityComparator",
      value: function IdentityEqualityComparator() {// intentionally empty
      }
    }, {
      key: "hashCode",
      value: function hashCode(obj) {
        return obj.hashCode();
      }
    }, {
      key: "equals",
      value: function equals(a, b) {
        return a === b;
      }
    }]);
    return IdentityEqualityComparator;
  }();

  IdentityEqualityComparator.INSTANCE = new IdentityEqualityComparator();

  __decorate([Decorators_1.Override], IdentityEqualityComparator.prototype, "hashCode", null);

  __decorate([Decorators_1.Override], IdentityEqualityComparator.prototype, "equals", null);

  PredictionContext.IdentityEqualityComparator = IdentityEqualityComparator;
})(PredictionContext = exports.PredictionContext || (exports.PredictionContext = {}));
//# sourceMappingURL=PredictionContext.js.map
