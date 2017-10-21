import { createStore } from 'redux';

// Usefull for pre-hydrating redux store


export default function initialize() {
    if (__PRODUCTION__) {
        return
    }

    const preloadedState = window.__PRELOADED_STATE__ || {};
    delete window.__PRELOADED_STATE__;

    const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return store = createStore(state => state, preloadedState, enhancer);
}


export default function getStore() {
    return Promise.resolve(createStore(state => (state), {}));
}
