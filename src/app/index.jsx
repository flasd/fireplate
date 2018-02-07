/* eslint-env browser */
import React from 'react';
import asyncBootstrapper from 'react-async-bootstrapper';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { render } from 'react-dom';
import { AsyncComponentProvider } from 'react-async-component';

import App from './app';

import history from './services/navigation';
import store from './services/state';

export default function getRoot(CurrentApp) {
    return () => (
        <AsyncComponentProvider rehydrateState={window.ASYNC_COMPONENTS_STATE || { resolved: {} }}>
            <Provider store={store}>
                <Router history={history}>
                    <CurrentApp />
                </Router>
            </Provider>
        </AsyncComponentProvider>
    );
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development' && module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        // eslint-disable-next-line global-require
        const CurrentApp = require('./app.jsx').default;
        render(getRoot(CurrentApp)(), document.getElementById('app'));
    });
}

const EntryApp = getRoot(App)();

export const bootstrap = asyncBootstrapper(EntryApp).then(() => {
    render(EntryApp, document.getElementById('app'));
});
