const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
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
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
            }, {
                loader: 'sass-loader',
                options: {
                    includePaths: [
                        resolve('src/styles'),
                        require('bourbon').includePaths,
                        resolve('node_modules/normalize-scss/sass'),
                    ],
                },
            },
        ],
    }),
};

const imageLoader = {
    test: /\.(gif|png|jpe?g|svg|webp)$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                emitFile: false,
            },
        }, {
            loader: 'image-webpack-loader',
            options: {
                optimizationLevel: 7,
            },
        },
    ],
};

// //////////////////////////////
// Plugins

const vendorChunker = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: mod => mod.context && mod.context.includes('node_modules'),
});

const manifestChunker = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
});

const extractTextPlugin = new ExtractTextPlugin({
    filename: './assets/[name].[sha256:contenthash:base64:8].css',
    allChunks: true
});

const htmlPlugin = new HtmlWebpackPlugin({
    filename: '../functions/app/index.html',
    publicPath: './',
    inject: true,
    minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: false,
        minifyJS: false,
        removeComments: false,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
    },
    template: './src/index.html',
});

const offlinePlugin = new OfflinePlugin({
    responseStrategy: 'cache-first',
    autoUpdate: 12,
    output: 'service-worker.js',
    AppCache: false,
    caches: {
        main: [':rest:'],
        additional: [/\.chunk.js$/],
    },
    excludes: ['/', '/../functions/app/'],
    safeToUseOptionalCaches: true,
});

// //////////////////////////////
// Configuration

module.exports = merge(base, {
    entry: './src/index.js',

    output: {
        path: resolve('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[chunkhash].chunk.js',
    },

    module: {
        rules: [
            babelLoader,
            styleLoader,
            imageLoader,
        ],
    },

    plugins: [
        vendorChunker,
        manifestChunker,
        extractTextPlugin,
        htmlPlugin,
        offlinePlugin, 
        new UglifyJsPlugin(),
        new BundleAnalyzerPlugin(),
    ],
});
