const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const resolve = partial => path.resolve(process.cwd(), partial);
const base = require('./base.config');

// //////////////////////////////
// Loaders

const babelLoader = {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
    },
};

const styleLoader = {
    test: /\.s?css$/,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
            },
        }, {
            loader: 'sass-loader',
            options: {
                includePaths: [
                    resolve('src/styles'),
                    require('bourbon').includePaths,
                    resolve('node_modules/normalize-scss/sass'),
                ],
                sourceMap: true,
            },
        },
    ],
};

const imageLoader = {
    test: /\.(gif|png|jpe?g|svg|webp)$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        }, {
            loader: 'image-webpack-loader',
            options: {
                optimizationLevel: 0,
            },
        },
    ],
};

// //////////////////////////////
// Plugins

const dontEmitOnErrorPlugin = new webpack.NoEmitOnErrorsPlugin();

const dllReferencePlugin = new webpack.DllReferencePlugin({
    context: process.cwd(),
    // eslint-disable-next-line import/no-unresolved
    manifest: require('./tmp/dll_assets.json'),
});

const dllAssetsPlugin = new AddAssetHtmlPlugin({
    filepath: require.resolve('./tmp/dll_assets.js'),
    includeSourcemap: false,
});

const htmlPlugin = new HtmlWebpackPlugin({
    inject: true,
    template: 'src/index.html',
});

const circularDependencyPlugin = new CircularDependencyPlugin({
    exclude: /(node_modules|bower_components)/,
    failOnError: false,
});

// //////////////////////////////
// Configuration

module.exports = merge(base, {
    entry: './src/index.js',

    output: {
        path: resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    module: {
        rules: [
            babelLoader,
            styleLoader,
            imageLoader,
        ],
    },

    plugins: [
        dontEmitOnErrorPlugin,
        dllReferencePlugin,
        dllAssetsPlugin,
        htmlPlugin,
        circularDependencyPlugin,
    ],

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        port: 5000,

        overlay: {
            warnings: true,
            errors: true,
        },

        watchOptions: {
            aggregateTimeout: 300,
        },
    },
});
