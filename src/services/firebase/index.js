import firebase from 'firebase';
import 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
    console.warn('Remember to update your firebase info on src/services/firebase');
}

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const app = firebase.initializeApp(config);

export default app;
export const deleteApp = app.delete;

export const { EmailAuthProvider } = app.auth;
export const { GoogleAuthProvider } = app.auth;
export const { FacebookAuthProvider } = app.auth;
export const { TwitterAuthProvider } = app.auth;
export const { GithubAuthProvider } = app.auth;

export const auth = app.auth();
export const database = app.database();
export const messaging = app.messaging();
export const storage = app.storage();
export const firestore = app.firebase();

export const ERRORS_REFERENCE = database.ref('errors');
export const LOGS_REFERENCE = database.ref('logs');
