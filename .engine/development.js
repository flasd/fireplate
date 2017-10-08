const path = require('path');

const cwd = process.cwd();
const loaders = require('./loaders');
const plugins = require('./plugins');

function resolve(filepath) {
    return path.resolve(cwd, filepath);
}

module.exports = function devConf() {
    return ({
        context: resolve('.'),
        devtool: 'eval',
        entry: './src/index',
        target: 'web',

        output: {
            path: resolve('dist'),
            filename: 'bundle.js',
        },

        module: {
            rules: loaders('development')
        },

        plugins: plugins('development'),

        devServer: {
            contentBase: resolve('dist'),
            historyApiFallback: true,
            hot: true,
            port: 8080
        }
    });
};
