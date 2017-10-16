import { createStore } from 'redux';

// Usefull for pre-hydrating redux store

export default function getStore() {
    return Promise.resolve(createStore(state => (state), {}));
}
