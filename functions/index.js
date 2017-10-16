const express = require('express');
const functions = require('firebase-functions');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const requestHandler = require('./app/server').default;

// ////////////////////////////////////////

const app = express();

const cookieSecrets = [
    'jJ6#@3A5xL',
    '9cMb*l2U1P',
    'a2n$oJ15X6',
];

const cookieConfig = {
    cookie: { secure: true },
    resave: false,
    saveUninitialized: false,
    secret: cookieSecrets,
};

app.use(helmet());
app.use(morgan('tiny'));
app.use(session(cookieConfig));
app.get('**', requestHandler);

exports.app = functions.https.onRequest(app);
