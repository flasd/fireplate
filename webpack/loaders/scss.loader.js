const path = require('path');
const onDevelopment = process.env.NODE_ENV !== 'production';
const extractExternalCss = require('../plugins/extract-text.plugin');

const resolve = partial => path.resolve(process.cwd(), partial);

const asyncCssLoader = [{
    loader: 'style-loader/url',
}, {
    loader: 'file-loader',
    options: {
        name: 'stylesheets/[hash].css',
    },
}, {
    loader: 'extract-loader',
}];

const styleLoader = [{
    loader: 'style-loader',
}];

const isomorphicStyleLoader = [{
    loader: 'isomorphic-style-loader',
}];

const loaderChain = [{
    loader: 'css-loader',
    options: {
        sourceMap: onDevelopment,
        modules: true,
        localIdentName: '[hash:base64:5]',
        importLoaders: 3,
    },
}, {
    loader: 'postcss-loader',
    options: {
        sourceMap: onDevelopment,
    },
}, {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: onDevelopment,
        attempts: 1,
        fail: true,
    }
}, {
    loader: 'sass-loader',
    options: {
        includePaths: [
            resolve('src/app/styles'),
            require('bourbon').includePaths,
            resolve('node_modules/normalize-scss/sass'),
        ],
        sourceMap: true,
    },
}];

function getLoader() {
    if (process.env.BUILD_TARGET === 'node') {
        return isomorphicStyleLoader.concat(loaderChain);
    }

    return styleLoader.concat(loaderChain);
}

module.exports = {
    test: /^((?!critical|async).)*\.scss$/,
    exclude: /(node_modules|bower_components)/,
    use: getLoader(),
};
