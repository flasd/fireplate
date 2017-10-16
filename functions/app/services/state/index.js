'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getStore;

var _redux = require('redux');

// Usefull for pre-hydrating redux store

function getStore() {
    return Promise.resolve((0, _redux.createStore)(function (state) {
        return state;
    }, {}));
}