'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getState = undefined;

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _firebase = require('../firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = (0, _firebase2.default)().ref('pages');

ref.once('value', function (snapshot) {
    if (snapshot.exists()) {
        (0, _state.populateState)(snapshot.val());
    }
});

ref.on('child_change', function (snapshot) {
    if (snapshot.exists()) {
        (0, _state.updateState)(snapshot.val(), snapshot.ref);
    }
});

exports.default = _state2.default.subscribe;
var getState = exports.getState = _state2.default.getState;