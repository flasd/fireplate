const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config');
const generatePackagePlugin = require('./plugins/generate-package-json.plugin');
const disableHtmlPlugin = require('./plugins/html-webpack-disable.plugin');

const resolve = partial => path.resolve(process.cwd(), partial);


module.exports = merge(base, {
    entry: './src/index.js',

    target: 'node',

    output: {
        path: resolve('functions/'),
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },

    plugins: [
        generatePackagePlugin,
        disableHtmlPlugin,
    ],

    node: {
        __filename: false,
        __dirname: false,
    },

    externals: [
        nodeExternals(),
    ],
});
