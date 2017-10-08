import { createStore } from 'redux';
import { database } from '../firebase';

const dataRef = database().ref('private/data');

let data = dataRef.once('value');

dataRef.on('child_change', () => {
    data = dataRef.once('value');
});

export function getStore() {
    return data
        .then(snap => snap.exits() ? snap.val() : {})
        .then(data => createStore(state => (state), data))
        .catch(err => console.log(err) && process.exit(1));
}
