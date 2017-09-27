// @flow
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCQ4-q45KI2DqOmg7W2tNwhSdDGNVuSHtQ',
    authDomain: 'flasd-19a5a.firebaseapp.com',
    databaseURL: 'https://flasd-19a5a.firebaseio.com',
    projectId: 'flasd-19a5a',
    storageBucket: 'flasd-19a5a.appspot.com',
    messagingSenderId: '623648578921'
};

const app = firebase.initializeApp(config);
export default app;
export const auth = app.auth;
export const database = app.database;
export const deleteApp = app.delete;
export const messaging = app.messaging;
export const storage = app.storage;
