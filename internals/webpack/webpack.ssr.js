const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractConfig = {
    filename: './assets/[name].[sha256:contenthash:base64:8].css',
    allChunks: true,
};

module.exports = require('./webpack.base')({
    entry: './src/server',

    output: {
        path: require('../utils').resolve('functions/app'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },

    module: {
        rules: require('./loaders')('production:server'),
    },

    plugins: [
        new ExtractTextPlugin(extractConfig),
    ],

    target: 'node',

    node: {
        __filename: false,
        __dirname: false,
    },
});
