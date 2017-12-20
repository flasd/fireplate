/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { render } from 'react-dom';

import App from './app';
import './app.scss';

import history from './services/navigation';
import store from './services/state';

if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install();
    require('./services/analytics');
}

export default function getRoot(CurrentApp) {
    return () => (
        <Provider store={store}>
            <Router history={history}>
                <CurrentApp />
            </Router>
        </Provider>
    );
}

if (process.env.NODE_ENV === 'development' && module && module.hot) {
    module.hot.accept('./app.js', () => {
        const CurrentApp = require('./app.js').default;
        render(getRoot(CurrentApp)(), document.getElementById('app'));
    });
}

render(getRoot(App)(), document.getElementById('app'));
