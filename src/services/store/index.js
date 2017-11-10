/* eslint-disable no-underscore-dangle */ /* eslint-env browser */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './app.epic';
import rootReducer from './app.reducer';
import reporter from './app.report';

// ////////////////////////////////////////

export function initializeProduction(epicMiddleware) {
    const enhancer = applyMiddleware(
        epicMiddleware,
        reporter,
    );

    if (typeof window !== 'undefined') {
        const preloadedState = window.__PRELOADED_STATE__ || {};
        delete window.__PRELOADED_STATE__;


        return createStore(rootReducer, preloadedState, enhancer);
    }

    return createStore(rootReducer, {}, enhancer);
}

export function initializeDevelopment(epicMiddleware) {
    const isBrowserEnv = typeof window !== 'undefined';
    const hasExtension = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function';

    const composeEnhancers = isBrowserEnv && hasExtension ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(
            epicMiddleware,
        ),
    );

    const store = createStore(rootReducer, {}, enhancer);

    if (module.hot) {
        module.hot.accept('./app.reducer', () => {
            // eslint-disable-next-line global-require
            store.replaceReducer(require('./app.reducer').default);
        });
    }

    return store;
}

// ////////////////////////////////////////

export default (() => {
    const __DEV__ = process.env.NODE_ENV === 'development';
    const epicMiddleware = createEpicMiddleware(rootEpic);

    if (__DEV__) {
        return initializeDevelopment(epicMiddleware);
    }

    return initializeProduction(epicMiddleware);
})();
