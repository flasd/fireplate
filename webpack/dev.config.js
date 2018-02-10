const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config');
const dllAssetsPlugin = require('./plugins/dll-assets.plugin');
const dllReferencePlugin = require('./plugins/dll-reference.plugin');
const namedModulesPlugin = require('./plugins/named-modules.plugin');


const resolve = partial => path.resolve(process.cwd(), partial);


module.exports = merge(base, {
    entry: './src/app/index.jsx',

    output: {
        path: resolve('functions/public'),
        filename: '[name]-[hash:8].js',
        chunkFilename: 'chunks/[name]-[chunkhash].js',
    },

    plugins: [
        dllReferencePlugin,
        dllAssetsPlugin,
        namedModulesPlugin,
    ],

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        port: 5000,

        overlay: {
            warnings: true,
            errors: true,
        },

        watchOptions: {
            aggregateTimeout: 350,
        },
    },
});
