/* eslint-disable no-underscore-dangle *//* eslint-env browser */
import promiseMiddleware from 'redux-promise-middleware';
import reduxCatch from 'redux-catch';
import { createStore, applyMiddleware, compose } from 'redux';
import { init as initAuthWatchdog } from 'redux-fire-auth';

import appReducer from './reducer';
import { auth } from '../firebase';
import { reportError } from '../reporter';

export default (() => {
    const middlewares = applyMiddleware(
        promiseMiddleware,
        reduxCatch(reportError),
    );

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const preloadedState = window.REDUX_PRELOADED_STATE || {};

        const enhancers = composeEnhancers(
            middlewares,
        );

        const store = createStore(appReducer, preloadedState, enhancers);

        if (module && module.hot) {
            module.hot.accept('./reducer.js', () => {
                const newReducer = require('./reducer.js').default;
                store.replaceReducer(newReducer);
            });
        }

        initAuthWatchdog(store, auth);

        return store;
    }

    return createStore(appReducer, preloadedState, middlewares);
})();