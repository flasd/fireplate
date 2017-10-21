const defaults = require('lodash/defaultsDeep');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const { join } = require('path');
const { resolve, getPkg } = require('../utils');

const pkg = getPkg();
const dllPlugin = {
    defaults: {

        exclude: [
            'express',
            'express-session',
            'helmet',
        ],

        include: [
            'ansi-html',
            'babel-polyfill',
            'core-js',
            'events',
            'eventsource-polyfill',
            'history',
            'html-entities',
            'json3',
            'lodash',
            'loglevel',
            'punycode',
            'react-helmet',
            'sockjs-client',
            'url',
            'url-parse',
        ],

        path: resolve('internals'),
    },

    getDependencies: (pkg) => {
        if (!pkg.dllPlugin) {
            pkg.dllPlugin = {};
        }

        const pkgDependencies = Object.keys(pkg.dependencies);
        const exclude = pkg.dllPlugin.exclude || dllPlugin.defaults.exclude;
        const include = pkg.dllPlugin.include || dllPlugin.defaults.include;
        const includedDeps = uniq(pkgDependencies.concat(include));

        return pullAll(includedDeps, exclude);
    },
};

const dllConfig = defaults(pkg.dllPlugin, dllPlugin.defaults);
const outputPath = resolve(dllConfig.path);
exports.dllConfig = dllConfig;
exports.outputPath = outputPath;

module.exports = require('./webpack.base')({
    entry: dllConfig.dlls || dllPlugin.getDependencies(pkg),

    devtool: 'eval',

    output: {
        filename: 'webpack_vendor.dll.js',
        path: outputPath,
        library: 'webpack_vendor',
    },

    plugins: [
        new webpack.DllPlugin({
            name: 'webpack_vendor',
            path: join(outputPath, 'webpack_vendor.json')
        }),
    ],

    performance: {
        hints: false,
    },
});
