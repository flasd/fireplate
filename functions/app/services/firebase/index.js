"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCMHNrUf2Jnj_ZRvITQxfDGGhmVjt-_nfs",
    authDomain: "remember-f485b.firebaseapp.com",
    databaseURL: "https://remember-f485b.firebaseio.com",
    projectId: "remember-f485b",
    storageBucket: "remember-f485b.appspot.com",
    messagingSenderId: "761384751493"
};

var app = firebase.initializeApp(config);
exports.default = app;
var auth = exports.auth = firebase.auth;
var database = exports.database = firebase.database;
var deleteApp = exports.deleteApp = app.delete;
var messaging = exports.messaging = firebase.messaging;
var storage = exports.storage = firebase.storage;