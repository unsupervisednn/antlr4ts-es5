"use strict";
/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require("fs");

var util = require("util");

var VocabularyImpl_1 = require("../VocabularyImpl");

var ATNDeserializer_1 = require("../atn/ATNDeserializer");

function splitToLines(buffer) {
  var lines = [];
  var index = 0;

  while (index < buffer.length) {
    var lineStart = index;
    var lineEndLF = buffer.indexOf("\n".charCodeAt(0), index);
    var lineEndCR = buffer.indexOf("\r".charCodeAt(0), index);
    var lineEnd = void 0;

    if (lineEndCR >= 0 && (lineEndCR < lineEndLF || lineEndLF === -1)) {
      lineEnd = lineEndCR;
    } else if (lineEndLF >= 0) {
      lineEnd = lineEndLF;
    } else {
      lineEnd = buffer.length;
    }

    lines.push(buffer.toString("utf-8", lineStart, lineEnd));

    if (lineEnd === lineEndCR && lineEnd + 1 === lineEndLF) {
      index = lineEnd + 2;
    } else {
      index = lineEnd + 1;
    }
  }

  return lines;
} // A class to read plain text interpreter data produced by ANTLR.


var InterpreterDataReader;

(function (InterpreterDataReader) {
  /**
   * The structure of the data file is very simple. Everything is line based with empty lines
   * separating the different parts. For lexers the layout is:
   * token literal names:
   * ...
   *
   * token symbolic names:
   * ...
   *
   * rule names:
   * ...
   *
   * channel names:
   * ...
   *
   * mode names:
   * ...
   *
   * atn:
   * <a single line with comma separated int values> enclosed in a pair of squared brackets.
   *
   * Data for a parser does not contain channel and mode names.
   */
  function parseFile(fileName) {
    return __awaiter(this, void 0, void 0,
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var result, input, lines, line, lineIndex, literalNames, symbolicNames, displayNames, elements, serializedATN, i, value, element, deserializer;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = new InterpreterDataReader.InterpreterData();
              result.ruleNames = [];
              _context.next = 4;
              return util.promisify(fs.readFile)(fileName);

            case 4:
              input = _context.sent;
              lines = splitToLines(input);
              _context.prev = 6;
              lineIndex = 0;
              literalNames = [];
              symbolicNames = [];
              line = lines[lineIndex++];

              if (!(line !== "token literal names:")) {
                _context.next = 13;
                break;
              }

              throw new RangeError("Unexpected data entry");

            case 13:
              line = lines[lineIndex++];

            case 14:
              if (!(line !== undefined)) {
                _context.next = 21;
                break;
              }

              if (!(line.length === 0)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("break", 21);

            case 17:
              literalNames.push(line === "null" ? "" : line);

            case 18:
              line = lines[lineIndex++];
              _context.next = 14;
              break;

            case 21:
              line = lines[lineIndex++];

              if (!(line !== "token symbolic names:")) {
                _context.next = 24;
                break;
              }

              throw new RangeError("Unexpected data entry");

            case 24:
              line = lines[lineIndex++];

            case 25:
              if (!(line !== undefined)) {
                _context.next = 32;
                break;
              }

              if (!(line.length === 0)) {
                _context.next = 28;
                break;
              }

              return _context.abrupt("break", 32);

            case 28:
              symbolicNames.push(line === "null" ? "" : line);

            case 29:
              line = lines[lineIndex++];
              _context.next = 25;
              break;

            case 32:
              displayNames = [];
              result.vocabulary = new VocabularyImpl_1.VocabularyImpl(literalNames, symbolicNames, displayNames);
              line = lines[lineIndex++];

              if (!(line !== "rule names:")) {
                _context.next = 37;
                break;
              }

              throw new RangeError("Unexpected data entry");

            case 37:
              line = lines[lineIndex++];

            case 38:
              if (!(line !== undefined)) {
                _context.next = 45;
                break;
              }

              if (!(line.length === 0)) {
                _context.next = 41;
                break;
              }

              return _context.abrupt("break", 45);

            case 41:
              result.ruleNames.push(line);

            case 42:
              line = lines[lineIndex++];
              _context.next = 38;
              break;

            case 45:
              line = lines[lineIndex++];

              if (!(line === "channel names:")) {
                _context.next = 68;
                break;
              }

              // Additional lexer data.
              result.channels = [];
              line = lines[lineIndex++];

            case 49:
              if (!(line !== undefined)) {
                _context.next = 56;
                break;
              }

              if (!(line.length === 0)) {
                _context.next = 52;
                break;
              }

              return _context.abrupt("break", 56);

            case 52:
              result.channels.push(line);

            case 53:
              line = lines[lineIndex++];
              _context.next = 49;
              break;

            case 56:
              line = lines[lineIndex++];

              if (!(line !== "mode names:")) {
                _context.next = 59;
                break;
              }

              throw new RangeError("Unexpected data entry");

            case 59:
              result.modes = [];
              line = lines[lineIndex++];

            case 61:
              if (!(line !== undefined)) {
                _context.next = 68;
                break;
              }

              if (!(line.length === 0)) {
                _context.next = 64;
                break;
              }

              return _context.abrupt("break", 68);

            case 64:
              result.modes.push(line);

            case 65:
              line = lines[lineIndex++];
              _context.next = 61;
              break;

            case 68:
              line = lines[lineIndex++];

              if (!(line !== "atn:")) {
                _context.next = 71;
                break;
              }

              throw new RangeError("Unexpected data entry");

            case 71:
              line = lines[lineIndex++];
              elements = line.split(",");
              serializedATN = new Uint16Array(elements.length);

              for (i = 0; i < elements.length; ++i) {
                value = void 0;
                element = elements[i];

                if (element.startsWith("[")) {
                  value = parseInt(element.substring(1).trim(), 10);
                } else if (element.endsWith("]")) {
                  value = parseInt(element.substring(0, element.length - 1).trim(), 10);
                } else {
                  value = parseInt(element.trim(), 10);
                }

                serializedATN[i] = value;
              }

              deserializer = new ATNDeserializer_1.ATNDeserializer();
              result.atn = deserializer.deserialize(serializedATN);
              _context.next = 81;
              break;

            case 79:
              _context.prev = 79;
              _context.t0 = _context["catch"](6);

            case 81:
              return _context.abrupt("return", result);

            case 82:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 79]]);
    }));
  }

  InterpreterDataReader.parseFile = parseFile;

  var InterpreterData = function InterpreterData() {
    (0, _classCallCheck2["default"])(this, InterpreterData);
  };

  InterpreterDataReader.InterpreterData = InterpreterData;
})(InterpreterDataReader = exports.InterpreterDataReader || (exports.InterpreterDataReader = {}));
//# sourceMappingURL=InterpreterDataReader.js.map
