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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ATN_1 = require("../atn/ATN");

var CommonToken_1 = require("../CommonToken");

var ErrorNode_1 = require("./ErrorNode");

var Decorators_1 = require("../Decorators");

var Parser_1 = require("../Parser");

var ParserRuleContext_1 = require("../ParserRuleContext");

var RuleNode_1 = require("./RuleNode");

var TerminalNode_1 = require("./TerminalNode");

var Token_1 = require("../Token");

var Utils = require("../misc/Utils");
/** A set of utility routines useful for all kinds of ANTLR trees. */


var Trees =
/*#__PURE__*/
function () {
  function Trees() {
    (0, _classCallCheck2["default"])(this, Trees);
  }

  (0, _createClass2["default"])(Trees, null, [{
    key: "toStringTree",
    value: function toStringTree(t, arg2) {
      var ruleNames;

      if (arg2 instanceof Parser_1.Parser) {
        ruleNames = arg2.ruleNames;
      } else {
        ruleNames = arg2;
      }

      var s = Utils.escapeWhitespace(this.getNodeText(t, ruleNames), false);

      if (t.childCount === 0) {
        return s;
      }

      var buf = "";
      buf += "(";
      s = Utils.escapeWhitespace(this.getNodeText(t, ruleNames), false);
      buf += s;
      buf += " ";

      for (var i = 0; i < t.childCount; i++) {
        if (i > 0) {
          buf += " ";
        }

        buf += this.toStringTree(t.getChild(i), ruleNames);
      }

      buf += ")";
      return buf;
    }
  }, {
    key: "getNodeText",
    value: function getNodeText(t, arg2) {
      var ruleNames;

      if (arg2 instanceof Parser_1.Parser) {
        ruleNames = arg2.ruleNames;
      } else if (arg2) {
        ruleNames = arg2;
      } else {
        // no recog or rule names
        var payload = t.payload;

        if (typeof payload.text === "string") {
          return payload.text;
        }

        return t.payload.toString();
      }

      if (t instanceof RuleNode_1.RuleNode) {
        var ruleContext = t.ruleContext;
        var ruleIndex = ruleContext.ruleIndex;
        var ruleName = ruleNames[ruleIndex];
        var altNumber = ruleContext.altNumber;

        if (altNumber !== ATN_1.ATN.INVALID_ALT_NUMBER) {
          return ruleName + ":" + altNumber;
        }

        return ruleName;
      } else if (t instanceof ErrorNode_1.ErrorNode) {
        return t.toString();
      } else if (t instanceof TerminalNode_1.TerminalNode) {
        var symbol = t.symbol;
        return symbol.text || "";
      }

      throw new TypeError("Unexpected node type");
    }
  }, {
    key: "getChildren",
    value: function getChildren(t) {
      var kids = [];

      for (var i = 0; i < t.childCount; i++) {
        kids.push(t.getChild(i));
      }

      return kids;
    }
  }, {
    key: "getAncestors",
    value: function getAncestors(t) {
      var ancestors = [];
      var p = t.parent;

      while (p) {
        ancestors.unshift(p); // insert at start

        p = p.parent;
      }

      return ancestors;
    }
    /** Return true if t is u's parent or a node on path to root from u.
     *  Use === not equals().
     *
     *  @since 4.5.1
     */

  }, {
    key: "isAncestorOf",
    value: function isAncestorOf(t, u) {
      if (!t || !u || !t.parent) {
        return false;
      }

      var p = u.parent;

      while (p) {
        if (t === p) {
          return true;
        }

        p = p.parent;
      }

      return false;
    }
  }, {
    key: "findAllTokenNodes",
    value: function findAllTokenNodes(t, ttype) {
      return Trees.findAllNodes(t, ttype, true);
    }
  }, {
    key: "findAllRuleNodes",
    value: function findAllRuleNodes(t, ruleIndex) {
      return Trees.findAllNodes(t, ruleIndex, false);
    }
  }, {
    key: "findAllNodes",
    value: function findAllNodes(t, index, findTokens) {
      var nodes = [];

      Trees._findAllNodes(t, index, findTokens, nodes);

      return nodes;
    }
  }, {
    key: "_findAllNodes",
    value: function _findAllNodes(t, index, findTokens, nodes) {
      // check this node (the root) first
      if (findTokens && t instanceof TerminalNode_1.TerminalNode) {
        if (t.symbol.type === index) {
          nodes.push(t);
        }
      } else if (!findTokens && t instanceof ParserRuleContext_1.ParserRuleContext) {
        if (t.ruleIndex === index) {
          nodes.push(t);
        }
      } // check children


      for (var i = 0; i < t.childCount; i++) {
        Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
      }
    }
    /** Get all descendents; includes t itself.
     *
     * @since 4.5.1
     */

  }, {
    key: "getDescendants",
    value: function getDescendants(t) {
      var nodes = [];

      function recurse(e) {
        nodes.push(e);
        var n = e.childCount;

        for (var i = 0; i < n; i++) {
          recurse(e.getChild(i));
        }
      }

      recurse(t);
      return nodes;
    }
    /** Find smallest subtree of t enclosing range startTokenIndex..stopTokenIndex
     *  inclusively using postorder traversal.  Recursive depth-first-search.
     *
     *  @since 4.5
     */

  }, {
    key: "getRootOfSubtreeEnclosingRegion",
    value: function getRootOfSubtreeEnclosingRegion(t, startTokenIndex, // inclusive
    stopTokenIndex) {
      var n = t.childCount;

      for (var i = 0; i < n; i++) {
        var child = t.getChild(i);
        var r = Trees.getRootOfSubtreeEnclosingRegion(child, startTokenIndex, stopTokenIndex);

        if (r) {
          return r;
        }
      }

      if (t instanceof ParserRuleContext_1.ParserRuleContext) {
        var stopToken = t.stop;

        if (startTokenIndex >= t.start.tokenIndex && ( // is range fully contained in t?
        stopToken == null || stopTokenIndex <= stopToken.tokenIndex)) {
          // note: r.stop==null likely implies that we bailed out of parser and there's nothing to the right
          return t;
        }
      }

      return undefined;
    }
    /** Replace any subtree siblings of root that are completely to left
     *  or right of lookahead range with a CommonToken(Token.INVALID_TYPE,"...")
     *  node. The source interval for t is not altered to suit smaller range!
     *
     *  WARNING: destructive to t.
     *
     *  @since 4.5.1
     */

  }, {
    key: "stripChildrenOutOfRange",
    value: function stripChildrenOutOfRange(t, root, startIndex, stopIndex) {
      if (!t) {
        return;
      }

      var count = t.childCount;

      for (var i = 0; i < count; i++) {
        var child = t.getChild(i);
        var range = child.sourceInterval;

        if (child instanceof ParserRuleContext_1.ParserRuleContext && (range.b < startIndex || range.a > stopIndex)) {
          if (Trees.isAncestorOf(child, root)) {
            // replace only if subtree doesn't have displayed root
            var abbrev = new CommonToken_1.CommonToken(Token_1.Token.INVALID_TYPE, "...");
            t.children[i] = new TerminalNode_1.TerminalNode(abbrev); // HACK access to private
          }
        }
      }
    }
  }, {
    key: "findNodeSuchThat",
    value: function findNodeSuchThat(t, pred) {
      // No type check needed as long as users only use one of the available overloads
      if (pred(t)) {
        return t;
      }

      var n = t.childCount;

      for (var i = 0; i < n; i++) {
        var u = Trees.findNodeSuchThat(t.getChild(i), pred);

        if (u !== undefined) {
          return u;
        }
      }

      return undefined;
    }
  }]);
  return Trees;
}();

__decorate([__param(0, Decorators_1.NotNull)], Trees, "toStringTree", null);

__decorate([Decorators_1.NotNull, __param(0, Decorators_1.NotNull)], Trees, "getAncestors", null);

__decorate([__param(0, Decorators_1.NotNull)], Trees, "getRootOfSubtreeEnclosingRegion", null);

exports.Trees = Trees;
//# sourceMappingURL=Trees.js.map
