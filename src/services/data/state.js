import { createStore, bindActionCreators } from 'redux';

export function rawUpdate(data, key) {
    return ({
        type: 'UPDATE',
        payload: {
            timestamp: Date.now(),
            data,
            key,
        }
    });
}

export function rawPopulate(data) {
    return ({
        type: 'POPULATE',
        payload: {
            timestamp: Date.now(),
            data,
        }
    });
}

const initialState = {
    loaded: false,
    data: {},
};

export function reducer(state = initialState, action) {
    if (action.type === 'UPDATE') {
        const newState = {};
        newState[action.payload.key] = action.payload.data;

        return Object.assign({}, state, newState);
    }

    if (action.type === 'POPULATE') {
        return Object.assign({}, state, {
            loaded: true,
            data: action.payload.data,
        });
    }

    return state;
}

const store = createStore(reducer);
export default store;
export const updateState = bindActionCreators(rawUpdate, store.dispatch);
export const populateState = bindActionCreators(rawPopulate, store.dispatch);
