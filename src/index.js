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

const firebase = admin.initializeApp(functions.config().firebase);
const FirebaseSessionStore = firebaseStore(session);
const storeInstance = new FirebaseSessionStore({ database: firebase.database() });

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
    store: storeInstance,
};

/**
 * @description Since firebase calls Express App with a request object that can have
 * the req.path = null. Express is not made to handle null path or empty routes, so
 * we need to manually fix. And since the Express throws an error before running
 * middlewares, we need to fix it before calling the app.
 * @param {Express.App} server Express app
 */
function fixNullPathException(server) {
    return (request, response) => {
        if (!request.path) {
            request.url = `/${request.url}`;
        }

        return server(request, response);
    };
}

// ////////////////////////////////////////

app.use(helmet());
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/app-shell.html', serveAppShell);
app.use(rejectFileRequest);
app.get('*', loadTemplate, renderApp);

// ////////////////////////////////////////

/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
    module.exports = app;
    module.exports.fixNullPathException = fixNullPathException;
}

module.exports.app = functions.https.onRequest(fixNullPathException(app));
