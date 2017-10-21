const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// ////////////////////////////////////////

const manifestChunk = {
    name: 'manifest',
    minChunks: Infinity
};

const vendorChunk = {
    name: 'vendor',
    minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1
};

const extractConfig = {
    filename: 'assets/[name].[sha256:contenthash:base64:8].css',
    allChunks: true,
};

const htmlConfig = {
    filename: '../functions/app/index.html',
    publicPath: './',
    inject: true,
    minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
    },
    template: './internals/webpack/template.html',
};

const offlineConfig = {
    relativePaths: false,
    publicPath: '/',

    caches: {
        main: [':rest:'],
        additional: ['*/**/*.chunk.js'],
    },

    safeToUseOptionalCaches: true,
    AppCache: false,
};

const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin(manifestChunk),
    new webpack.optimize.CommonsChunkPlugin(vendorChunk),
    new ExtractTextPlugin(extractConfig),
    new HtmlWebpackPlugin(htmlConfig),
    new OfflinePlugin(offlineConfig),
    new MinifyPlugin(),
];

if (process.env.ANALYZE) {
    plugins.push(
        new BundleAnalyzerPlugin()
    );
}


module.exports = require('./webpack.base')({
    entry: './src/index',

    output: {
        filename: 'assets/[name].[chunkhash].js',
        publicPath: './',
        chunkFilename: 'assets/[name].[chunkhash].chunk.js',
    },

    module: {
        rules: require('./loaders')('production'),
    },

    plugins: plugins,

    devtool: 'source-map',
});
