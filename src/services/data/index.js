import store, { updateState, populateState } from './state';
import database from '../firebase';

const ref = database().ref('pages');

ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
        populateState(snapshot.val());
    }
});

ref.on('child_change', (snapshot) => {
    if (snapshot.exists()) {
        updateState(snapshot.val(), snapshot.ref);
    }
});

export default store.subscribe;
export const getState = store.getState;
