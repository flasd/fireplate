const path = require('path');

const babelLoader = require('./loaders/babel.loader');
const fontsLoader = require('./loaders/fonts.loader');
const imagesLoader = require('./loaders/image.loader');
const scssLoader = require('./loaders/scss.loader');

const baseHrefPlugin = require('./plugins/base-href.plugin');
const circularDependenciePlugin = require('./plugins/circular-dependency.plugin');
const environmentPlugin = require('./plugins/environment.plugin');
const extractTextPlugin = require('./plugins/extract-text.plugin');
const htmlPlugin = require('./plugins/html.plugin');
const noEmitOnErrorPlugin = require('./plugins/no-emit-on-error.plugin');


const resolve = partial => path.resolve(process.cwd(), partial);


module.exports = {
    module: {
        rules: [
            babelLoader,
            fontsLoader,
            imagesLoader,
            scssLoader,
        ],
    },

    plugins: [
        baseHrefPlugin,
        circularDependenciePlugin,
        environmentPlugin,
        extractTextPlugin,
        htmlPlugin,
        noEmitOnErrorPlugin,
    ],

    resolve: {
        alias: {
            app: resolve('src/app'),
            services: resolve('src/app/services'),
            styles: resolve('src/app/styles'),
        },

        extensions: ['.js', '.jsx', '.json'],
    },
};
