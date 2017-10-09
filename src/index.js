/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies, import/first */
/* eslint-env browser */
import './services/analytics';
import * as offlineRuntime from 'offline-plugin/runtime';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router } from 'react-router';

import App from './app';
import history from './services/navigation';

if (process.env.NODE_ENV === 'production') {
    offlineRuntime.install();
}

const rootNode = document.getElementById('root');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(state => state, preloadedState);

export default function Root() {
    return (
        <Provider store={store}>
            <Router history={history} >
                <App />
            </Router>
        </Provider>
    );
}

render(<Root />, rootNode);
