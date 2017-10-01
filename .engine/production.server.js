const plugins = require('./plugins');
const loaders = require('./loaders');
const utils = require('./utils');

module.exports = function nodeConf() {
    return ({
        context: utils.resolve('.'),
        devtool: 'source-map',
        entry: './src/server',
        stats: 'minimal',
        target: 'node',

        output: {
            path: utils.resolve('functions'),
            publicPath: 'https://www.yourapp.com/',
            filename: 'index.js',
        },

        module: {
            rules: loaders(utils.env())
        },

        plugins: plugins(utils.env()),
    });
};
