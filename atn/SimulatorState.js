"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

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
});

var Decorators_1 = require("../Decorators");

var ParserRuleContext_1 = require("../ParserRuleContext");
/**
 *
 * @author Sam Harwell
 */


var SimulatorState = function SimulatorState(outerContext, s0, useContext, remainingOuterContext) {
  (0, _classCallCheck2["default"])(this, SimulatorState);
  this.outerContext = outerContext != null ? outerContext : ParserRuleContext_1.ParserRuleContext.emptyContext();
  this.s0 = s0;
  this.useContext = useContext;
  this.remainingOuterContext = remainingOuterContext;
};

SimulatorState = __decorate([__param(1, Decorators_1.NotNull)], SimulatorState);
exports.SimulatorState = SimulatorState;
//# sourceMappingURL=SimulatorState.js.map
