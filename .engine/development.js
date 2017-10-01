const plugins = require('./plugins');
const loaders = require('./loaders');
const utils = require('./utils');

module.exports = function devConf() {
    return ({
        context: utils.resolve('.'),
        devtool: 'source-map',
        entry: './src/index',
        target: 'web',

        output: {
            path: utils.resolve('dist'),
            filename: 'bundle.js',
        },

        module: {
            rules: loaders(utils.env())
        },

        plugins: plugins(utils.env()),

        devServer: {
            contentBase: utils.resolve('dist'),
            historyApiFallback: true,
            hot: true,
            port: 8080
        }
    });
};
