import promiseMiddleware from 'redux-promise-middleware';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

import reducer from './reducer';

export default (() => {
    if (process.env.BUILD_TARGET !== 'node') {
        /* eslint-env browser */ /* eslint-disable no-underscore-dangle */
        const middlewares = applyMiddleware(promiseMiddleware());
        /* istanbul ignore next */
        const preloadedState = window.REDUX_PRELOADED_STATE || {};

        /* istanbul ignore next */
        const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        /* istanbul ignore next */
        const enhancers = process.env.NODE_ENV === 'development' ? composeMiddleware(middlewares) : middlewares;

        const store = createStore(reducer, preloadedState, enhancers);

        /* istanbul ignore next */
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
