// @flow
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyCMHNrUf2Jnj_ZRvITQxfDGGhmVjt-_nfs",
    authDomain: "remember-f485b.firebaseapp.com",
    databaseURL: "https://remember-f485b.firebaseio.com",
    projectId: "remember-f485b",
    storageBucket: "remember-f485b.appspot.com",
    messagingSenderId: "761384751493"
};

const app = firebase.initializeApp(config);
export default app;
export const auth = firebase.auth;
export const database = firebase.database;
export const deleteApp = app.delete;
export const messaging = firebase.messaging;
export const storage = firebase.storage;
