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
}); // ConvertTo-TS run at 2016-10-04T11:26:25.8187912-07:00

var Decorators_1 = require("../Decorators");
/**
 *
 * @author Sam Harwell
 */


var ATNDeserializationOptions =
/*#__PURE__*/
function () {
  function ATNDeserializationOptions(options) {
    (0, _classCallCheck2["default"])(this, ATNDeserializationOptions);
    this.readOnly = false;

    if (options) {
      this.verifyATN = options.verifyATN;
      this.generateRuleBypassTransitions = options.generateRuleBypassTransitions;
      this.optimize = options.optimize;
    } else {
      this.verifyATN = true;
      this.generateRuleBypassTransitions = false;
      this.optimize = true;
    }
  }

  (0, _createClass2["default"])(ATNDeserializationOptions, [{
    key: "makeReadOnly",
    value: function makeReadOnly() {
      this.readOnly = true;
    }
  }, {
    key: "throwIfReadOnly",
    value: function throwIfReadOnly() {
      if (this.isReadOnly) {
        throw new Error("The object is read only.");
      }
    }
  }, {
    key: "isReadOnly",
    get: function get() {
      return this.readOnly;
    }
  }, {
    key: "isVerifyATN",
    get: function get() {
      return this.verifyATN;
    },
    set: function set(verifyATN) {
      this.throwIfReadOnly();
      this.verifyATN = verifyATN;
    }
  }, {
    key: "isGenerateRuleBypassTransitions",
    get: function get() {
      return this.generateRuleBypassTransitions;
    },
    set: function set(generateRuleBypassTransitions) {
      this.throwIfReadOnly();
      this.generateRuleBypassTransitions = generateRuleBypassTransitions;
    }
  }, {
    key: "isOptimize",
    get: function get() {
      return this.optimize;
    },
    set: function set(optimize) {
      this.throwIfReadOnly();
      this.optimize = optimize;
    }
  }], [{
    key: "defaultOptions",
    get: function get() {
      if (ATNDeserializationOptions._defaultOptions == null) {
        ATNDeserializationOptions._defaultOptions = new ATNDeserializationOptions();

        ATNDeserializationOptions._defaultOptions.makeReadOnly();
      }

      return ATNDeserializationOptions._defaultOptions;
    }
  }]);
  return ATNDeserializationOptions;
}();

__decorate([Decorators_1.NotNull], ATNDeserializationOptions, "defaultOptions", null);

exports.ATNDeserializationOptions = ATNDeserializationOptions;
//# sourceMappingURL=ATNDeserializationOptions.js.map
