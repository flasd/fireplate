const babelLoader = require('./babel-loader');
const fileLoader = require('./file-loader');
const rawLoader = require('./raw-loader');
const styleLoader = require('./style-loader')

module.exports = function loaders(env) {
    return ([
        babelLoader(env),
        fileLoader(env),
        rawLoader(env),
        styleLoader(env)
    ]);
}
