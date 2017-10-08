const path = require('path');

const cwd = process.cwd();
const loaders = require('./loaders');
const plugins = require('./plugins');

function resolve(filepath) {
    return path.resolve(cwd, filepath);
}

module.exports = function prodConf() {
    return ({
        context: resolve('.'),
        devtool: 'source-map',
        entry: './src/index',
        stats: 'minimal',
        target: 'web',

        output: {
            path: resolve('dist/assets'),
            publicPath: './assets/',
            filename: '[name].[hash].js',
        },

        module: {
            rules: loaders('production')
        },

        plugins: plugins('production'),
    });
};
