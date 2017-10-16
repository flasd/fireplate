'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canGo = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.listen = undefined;

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

var listen = exports.listen = history.listen;
var push = exports.push = history.push;
var replace = exports.replace = history.replace;
var go = exports.go = history.go;
var goBack = exports.goBack = history.goBack;
var goForward = exports.goForward = history.goForward;
var canGo = exports.canGo = history.canGo;

exports.default = history;