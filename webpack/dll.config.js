const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const resolve = partial => path.resolve(process.cwd(), partial);
const base = require('./base.config');

const pkg = require('../package.json');

const exclude = [];

const entries = Object.keys(pkg.dependencies)
    .filter(dependencie => exclude.indexOf(dependencie) === -1);

// //////////////////////////////
// Loader

const styleLoader = {
    test: /\.scss$/,
    use: [
        {
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[hash:base64:8]',
            },
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
            },
        }, {
            loader: 'sass-loader',
            options: {
                includePaths: [
                    resolve('src/styles'),
                    require('bourbon').includePaths,
                    resolve('node_modules/normalize-scss/sass'),
                ],
                sourceMap: true,
            },
        },
    ],
};

// //////////////////////////////
// Plugins

const dllPlugin = new webpack.DllPlugin({
    name: 'dll_assets',
    path: resolve('webpack/tmp/dll_assets.json'),
});

module.exports = merge(base, {
    entry: entries,

    output: {
        path: resolve('webpack/tmp/'),
        filename: 'dll_assets.js',
        library: 'dll_assets',
    },

    module: {
        rules: [
            styleLoader,
        ],
    },

    plugins: [
        dllPlugin,
    ],
});
