const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OfflinePlugin = require('offline-plugin');

const vendorChunk = {
    name: 'vendor',
    minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1
};

const manifestChunk = {
    name: 'manifest',
    minChunks: Infinity
};

const uglifyConfig = {
    compress: {
        warnings: false,
    },
};

const offlineConfig = {
    publicPath: './',
};

module.exports = function plugins(env) {

    const htmlConfig = {
        title: 'My React App',
        /* this gets replaced during ssr */
        minify: { collapseWhitespace: true },
        template: './.engine/plugins/template.html',
        filename: env === 'production' ? '../functions/app/index.html' : 'index.html'
    };

    const environment = {
        'process.env': {
            'NODE_ENV': JSON.stringify(env),
        }
    };

    const extractConfig = {
        filename: './assets/[name].[sha256:contenthash:base64:8].css',
        disable: env === 'development',
        allChunks: true,
    };

    if (env === 'development') {
        return [
            new ExtractTextPlugin(extractConfig),
            new NpmInstallPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin(htmlConfig),
        ];
    } else if (env === 'production') {
        return [
            new ExtractTextPlugin(extractConfig),
            new OfflinePlugin(offlineConfig),
            new webpack.DefinePlugin(environment),
            new webpack.optimize.CommonsChunkPlugin(manifestChunk),
            new webpack.optimize.CommonsChunkPlugin(vendorChunk),
            new webpack.optimize.UglifyJsPlugin(uglifyConfig),
            new HtmlWebpackPlugin(htmlConfig),
            // new BundleAnalyzerPlugin(),
        ];
    }

    return [
        new ExtractTextPlugin(extractConfig),
        new webpack.DefinePlugin(environment),
    ];
};
