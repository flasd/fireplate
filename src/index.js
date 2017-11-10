/* eslint-disable no-underscore-dangle */ /* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router } from 'react-router';

import App from './app';
import history from './services/navigation';
import store from './services/store';

const __DEV__ = process.env.NODE_ENV === 'development';

if (!__DEV__) {
    /* eslint-disable global-require, import/no-extraneous-dependencies */

    require('offline-plugin/runtime').install();
    require('./services/analytics');

    /* eslint-enable */
}

// ////////////////////////////////////////

export default function Root() {
    return (
        <Provider store={store}>
            <Router history={history} >
                <App />
            </Router>
        </Provider>
    );
}

const rootNode = document.getElementById('root');

render(<Root />, rootNode);

// ////////////////////////////////////////
// If dev & hmr, enable re-rendering


if (__DEV__ && module.hot) {
    module.hot.accept('./app', () => {
        // eslint-disable-next-line global-require
        const NextApp = require('./app').default;
        const NextRoot = (
            <Provider store={store}>
                <Router history={history} >
                    <NextApp />
                </Router>
            </Provider>
        );

        render(<NextRoot />, rootNode);
    });
}
/* eslint-enable */
