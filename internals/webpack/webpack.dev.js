const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

// ////////////////////////////////////////

const dllConfig = {
    context: process.cwd(),
    manifest: require('../webpack_vendor.json'),
};

const circularDepsConfig = {
    exclude: /node_modules/,
    failOnError: false,
};

const extractConfig = {
    allChunks: true,
    disable: true,
    filename: './assets/style.css',
};

const htmlConfig = {
    filename: 'index.html',
    inject: true,
    template: './internals/webpack/template.html',
};

const assetConfig = {
    filepath: require.resolve('../webpack_vendor.dll.js'),
    includeSourcemap: false,
};

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin(dllConfig),
    new ExtractTextPlugin(extractConfig),
    new AddAssetHtmlPlugin(assetConfig),
    new HtmlWebpackPlugin(htmlConfig),
    new CircularDependencyPlugin(circularDepsConfig),
];

// ////////////////////////////////////////

module.exports = require('./webpack.base')({
    entry: './src/index',

    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    module: {
        rules: require('./loaders')('development'),
    },

    plugins: plugins,

    devtool: 'eval-source-map',

    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 5000,

        stats: {
            cached: false,
            chunkOrigins: false,
        },

        overlay: {
            warnings: true,
            errors: true
        }
    },

    performance: {
        hints: false,
    },
});
