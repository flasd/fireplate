const path = require('path');

const cwd = process.cwd();
const loaders = require('./loaders');
const plugins = require('./plugins');

function resolve(filepath) {
    return path.resolve(cwd, filepath);
}

module.exports = function servConf() {
    return ({
        context: resolve('.'),
        entry: './src/server',
        stats: 'minimal',
        target: 'node',

        node: {
            __filename: false,
            __dirname: false,
        },

        output: {
            path: resolve('functions/app'),
            filename: 'index.js',
            libraryTarget: 'commonjs2',
        },

        module: {
            rules: loaders('production:server')
        },

        plugins: plugins('production:server'),
    });
};
