import promiseMiddleware from 'redux-promise-middleware';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

import reducer from './reducer';

export default (() => {
    if (process.env.BUILD_TARGET !== 'node') {
        /* eslint-env browser */
        const middlewares = applyMiddleware(promiseMiddleware());
        const preloadedState = window.REDUX_PRELOADED_STATE || {};

        // eslint-disable-next-line no-underscore-dangle
        const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const enhancers = process.env.NODE_ENV === 'development' ? composeMiddleware(middlewares) : middlewares;

        const store = createStore(reducer, preloadedState, enhancers);

        if (process.env.NODE_ENV === 'development' && module && module.hot) {
            if (module && module.hot) {
                module.hot.accept('./reducer.js', () => {
                    // eslint-disable-next-line global-require
                    const newReducer = require('./reducer.js').default;
                    store.replaceReducer(newReducer);
                });
            }
        }

        return store;
    }

    return createStore(reducer);
})();
