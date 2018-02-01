const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const firebaseStore = require('connect-session-firebase');
const functions = require('firebase-functions');
const helmet = require('helmet');
const session = require('express-session');

const renderApp = require('./app/server').default;
const serveAppShell = require('./middleware/app-shell').default;
const loadTemplate = require('./middleware/load-template').default;
const rejectFileRequest = require('./middleware/reject-file').default;

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
    store: (() => {
        if (process.env.NODE_ENV === 'test') {
            return undefined;
        }

        const firebase = admin.initializeApp(functions.config().firebase);
        const FirebaseSessionStore = firebaseStore(session);

        return new FirebaseSessionStore({
            database: firebase.database(),
        });
    })(),
};

app.use(helmet());
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/app-shell.html', serveAppShell);
app.use(rejectFileRequest);
app.get('*', loadTemplate, renderApp);

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    module.exports.app = functions.https.onRequest((request, response) => {
        if (!request.path) {
            request.url = `/${request.url}`;
        }

        return app(request, response);
    });
}
