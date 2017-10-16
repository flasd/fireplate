'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies, import/first */
/* eslint-env browser */


exports.default = Root;

require('./services/analytics');

var _runtime = require('offline-plugin/runtime');

var offlineRuntime = _interopRequireWildcard(_runtime);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _navigation = require('./services/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

if (process.env.NODE_ENV === 'production') {
    offlineRuntime.install();
}

var rootNode = document.getElementById('root');

var preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

var store = (0, _redux.createStore)(function (state) {
    return state;
}, preloadedState);

var _ref = _jsx(_reactRedux.Provider, {
    store: store
}, void 0, _jsx(_reactRouter.Router, {
    history: _navigation2.default
}, void 0, _jsx(_app2.default, {})));

function Root() {
    return _ref;
}

(0, _reactDom.render)(_jsx(Root, {}), rootNode);