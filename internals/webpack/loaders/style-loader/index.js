const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('../../../utils');

module.exports = function styleLoader(env) {
    const __PRODUCTION__ = env === 'production';

    const cssConfig = {
        loader: 'css-loader',
        options: {
            module: true,
            localIdentName: '[hash:base64:8]',
            minimize: __PRODUCTION__,
            sourceMap: __PRODUCTION__,
        }
    };

    const postcssConfig = {
        loader: 'postcss-loader',
        options: {
            parser: 'postcss-safe-parser',
            plugins: [
                autoprefixer()
            ],
            sourceMap: __PRODUCTION__,
        }
    };

    const sassConfig = {
        loader: 'sass-loader',
        options: {
            includePaths: [
                resolve('./node_modules/bourbon/app/assets/stylesheets/_bourbon.scss')
            ],
            sourceMap: __PRODUCTION__,
        }
    };

    return {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [cssConfig, postcssConfig, sassConfig],
            fallback: 'style-loader',
        }),
    };
};
