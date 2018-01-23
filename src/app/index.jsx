/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { render } from 'react-dom';

import App from './app.jsx';

import history from './services/navigation';
import store from './services/state';

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
    module.hot.accept('./app.jsx', () => {
        const CurrentApp = require('./app.jsx').default;
        render(getRoot(CurrentApp)(), document.getElementById('app'));
    });
}

render(getRoot(App)(), document.getElementById('app'));
