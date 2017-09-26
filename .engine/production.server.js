const plugins = require('./plugins');
const loaders = require('./loaders');
const utils = require('./utils');

module.exports = {
    context: utils.resolve('.'),
    devtool: 'source-map',
    entry: './src/server',
    stats: 'minimal',
    target: 'node',

    output: {
        path: utils.resolve('functions/public'),
        publicPath: 'https://www.yourapp.com/',
        filename: 'release.js',
    },

    module: {
        rules: loaders(utils.env)
    },
    
    plugins: plugins(utils.env),
};
