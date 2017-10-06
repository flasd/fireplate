const functions = require('firebase-functions');
const app = require('./src/server');

exports.app = functions.https.onRequest(app);
