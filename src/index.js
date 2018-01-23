const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const firebaseStore = require('connect-session-firebase');
const functions = require('firebase-functions');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const requestHandler = require('./app/server');

// ////////////////////////////////////////

const firebase = admin.initializeApp(functions.config().firebase);
const FirebaseSessionStore = firebaseStore(session);

// ////////////////////////////////////////

const app = express();

const cookieSecrets = [
    'jJ6#@3A5xL',
    '9cMb*l2U1P',
    'a2n$oJ15X6',
];

const sessionConfig = {
    cookie: { secure: true },
    resave: false,
    saveUninitialized: false,
    secret: cookieSecrets,
    store: new FirebaseSessionStore({ database: firebase.database() }),
};

app.use(morgan('tiny'));
app.use(helmet());
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', requestHandler.loadTemplate, requestHandler.renderApp);

exports.app = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`;
    }

    return app(request, response);
});
