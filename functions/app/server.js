'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); // eslint-disable-line


exports.default = renderingMiddleware;

require('ignore-styles');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactAsyncBootstrapper = require('react-async-bootstrapper');

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactAsyncComponent = require('react-async-component');

var _fs = require('fs');

var _server = require('react-dom/server');

var _path = require('path');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _state = require('./services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templatePath = (0, _path.resolve)(__dirname, './index.html');
var template = (0, _fs.readFileSync)(templatePath, 'utf8');

/**
 * Renders the app and ships it to the user
 *
 * @param      {express.Request}  request   The request,
 * @param      {express.Response}  response  The response,
 */

var _ref = _jsx(_app2.default, {});

function renderingMiddleware(request, response) {
    (0, _state2.default)().then(function (store) {
        var asyncContext = (0, _reactAsyncComponent.createAsyncContext)();
        var routerContext = {};

        var app = _jsx(_reactAsyncComponent.AsyncComponentProvider, {
            asyncContext: asyncContext
        }, void 0, _jsx(_reactRedux.Provider, {
            store: store
        }, void 0, _jsx(_reactRouter.StaticRouter, {
            location: request.url,
            context: routerContext
        }, void 0, _ref)));

        if (routerContext.url) {
            return response.redirect(302, routerContext.url);
        }

        return (0, _reactAsyncBootstrapper2.default)(app).then(function () {
            var appMarkup = (0, _server.renderToString)(app);
            var reduxState = store.getState();
            var asyncState = asyncContext.getState();

            var helmetData = _reactHelmet2.default.renderStatic();

            var html = template.replace('<title></title>', helmetData.title.toString()).replace('<!-- ::META:: -->', helmetData.meta.toString()).replace('<!-- ::APP:: -->', appMarkup).replace('/* ::REDUX__STATE:: */', (0, _serializeJavascript2.default)(reduxState)).replace('/* ::ASYNC__STATE:: */', (0, _serializeJavascript2.default)(asyncState));

            response.status(200).send(html);
        });
    }).catch(function () {
        response.status(500).send('The server encountered an unexpected condition which prevented it from fulfilling the request.');
    });
}