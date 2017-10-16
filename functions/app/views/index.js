'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeView = undefined;

var _reactAsyncComponent = require('react-async-component');

var HomeView = exports.HomeView = (0, _reactAsyncComponent.asyncComponent)({
    resolve: function resolve() {
        return Promise.resolve().then(function () {
            return require('./home');
        });
    }
});