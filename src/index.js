/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies, import/first */
/* eslint-env browser */

import React from 'react';
import { createStore, compose  } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router } from 'react-router';

import App from './app';
import history from './services/navigation';

const __PRODUCTION__ = process.env.NODE_ENV === 'production';

// ////////////////////////////////////////

if (__PRODUCTION__) {
    /* eslint-disable global-require */
    require('offline-plugin/runtime').install();
    require('./services/analytics');
    /* eslint-enable global-require */
}

// ////////////////////////////////////////

const preloadedState = window.__PRELOADED_STATE__ || {};

delete window.__PRELOADED_STATE__;
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(state => state, preloadedState, enhancer);
store.dispatch({ type: 'HELLO_WORLD' });

// ////////////////////////////////////////

const rootNode = document.getElementById('root');

export default function mount(AppComponent) {
    return (
        <Provider store={store}>
            <Router history={history} >
                <div>
                    <AppComponent />
                    <DevTools />
                </div>
            </Router>
        </Provider>
    );
}

render(mount(App), rootNode);

// ////////////////////////////////////////


if (!__PRODUCTION__ && module.hot) {
    module.hot.accept('./app', () => {
        // eslint-disable-next-line global-require
        const NextApp = require('./app').default;

        render(mount(NextApp), rootNode);
    });
}

