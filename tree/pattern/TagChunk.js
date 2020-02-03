"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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
}); // ConvertTo-TS run at 2016-10-04T11:26:46.1670669-07:00

var Chunk_1 = require("./Chunk");

var Decorators_1 = require("../../Decorators");
/**
 * Represents a placeholder tag in a tree pattern. A tag can have any of the
 * following forms.
 *
 * * `expr`: An unlabeled placeholder for a parser rule `expr`.
 * * `ID`: An unlabeled placeholder for a token of type `ID`.
 * * `e:expr`: A labeled placeholder for a parser rule `expr`.
 * * `id:ID`: A labeled placeholder for a token of type `ID`.
 *
 * This class does not perform any validation on the tag or label names aside
 * from ensuring that the tag is a defined, non-empty string.
 */


var TagChunk =
/*#__PURE__*/
function (_Chunk_1$Chunk) {
  (0, _inherits2["default"])(TagChunk, _Chunk_1$Chunk);

  /**
   * Construct a new instance of {@link TagChunk} using the specified label
   * and tag.
   *
   * @param label The label for the tag. If this is `undefined`, the
   * {@link TagChunk} represents an unlabeled tag.
   * @param tag The tag, which should be the name of a parser rule or token
   * type.
   *
   * @exception IllegalArgumentException if `tag` is not defined or
   * empty.
   */
  function TagChunk(tag, label) {
    var _this;

    (0, _classCallCheck2["default"])(this, TagChunk);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TagChunk).call(this));

    if (tag == null || tag.length === 0) {
      throw new Error("tag cannot be null or empty");
    }

    _this._tag = tag;
    _this._label = label;
    return _this;
  }
  /**
   * Get the tag for this chunk.
   *
   * @returns The tag for the chunk.
   */


  (0, _createClass2["default"])(TagChunk, [{
    key: "toString",

    /**
     * This method returns a text representation of the tag chunk. Labeled tags
     * are returned in the form `label:tag`, and unlabeled tags are
     * returned as just the tag name.
     */
    value: function toString() {
      if (this._label != null) {
        return this._label + ":" + this._tag;
      }

      return this._tag;
    }
  }, {
    key: "tag",
    get: function get() {
      return this._tag;
    }
    /**
     * Get the label, if any, assigned to this chunk.
     *
     * @returns The label assigned to this chunk, or `undefined` if no label is
     * assigned to the chunk.
     */

  }, {
    key: "label",
    get: function get() {
      return this._label;
    }
  }]);
  return TagChunk;
}(Chunk_1.Chunk);

__decorate([Decorators_1.NotNull], TagChunk.prototype, "tag", null);

__decorate([Decorators_1.Override], TagChunk.prototype, "toString", null);

exports.TagChunk = TagChunk;
//# sourceMappingURL=TagChunk.js.map
