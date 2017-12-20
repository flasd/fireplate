const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const resolve = partial => path.resolve(process.cwd(), partial);
const base = require('./base.config');

const pkg = require('../package.json');

// //////////////////////////////
// Plugins

const dllPlugin = new webpack.DllPlugin({
    name: 'dll_assets',
    path: resolve('webpack/tmp/dll_assets.json'),
});

module.exports = merge(base, {
    entry: Object.keys(pkg.dependencies),

    output: {
        path: resolve('webpack/tmp/'),
        filename: 'dll_assets.js',
        library: 'dll_assets',
    },

    plugins: [
        dllPlugin,
    ],
});
