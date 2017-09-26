const plugins = require('./plugins');
const loaders = require('./loaders');
const utils = require('./utils');

module.exports = {
    context: utils.resolve('.'),
    devtool: 'source-map',
    entry: './src/index',
    stats: 'minimal',
    target: 'web',

    output: {
        path: utils.resolve('dist'),
        publicPath: 'https://www.yourapp.com/',
        filename: '[name]-[hash].js',
    },

    module: {
        rules: loaders(utils.env)
    },
    
    plugins: plugins(utils.env),
};
