'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Load;

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
    delay: 225,
    timeout: 10000
};

function Load(options) {
    return (0, _reactLoadable2.default)(Object.assign({}, defaults, options));
}