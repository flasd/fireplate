const babelLoader = require('./babel-loader');
const fontsLoader = require('./fonts-loader');
const imageLoader = require('./image-loader');
const jsonLoader = require('./json-loader');
const rawLoader = require('./raw-loader');
const styleLoader = require('./style-loader');

module.exports = function loaders(env) {
    return ([
        babelLoader(env),
        fontsLoader(env),
        imageLoader(env),
        jsonLoader(env),
        rawLoader(env),
        styleLoader(env),
    ]);
};
