const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config');
const pkg = require('../package.json');
const dllPlugin = require('./plugins/dll.plugin');


const resolve = partial => path.resolve(process.cwd(), partial);

const exclude = [
    'body-parser',
    'express-session',
    'express-validation',
    'express',
    'firebase-admin',
    'firebase-functions',
    'helmet',
    'joi',
    'morgan',
    'mz',
    'normalize-scss',
];

const entries = Object.keys(pkg.dependencies)
    .filter(dependency => exclude.indexOf(dependency) === -1);


module.exports = merge(base, {
    entry: entries,

    output: {
        path: resolve('webpack/tmp/'),
        filename: 'prebuiltDll.js',
        library: 'prebuiltDll',
    },

    plugins: [
        dllPlugin,
    ],
});
