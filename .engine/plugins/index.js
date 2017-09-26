const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

// Remember to add the code commented to your entry file
// import * as offlineRuntime from 'offline-plugin/runtime';
// offlineRuntime.install();
const OfflinePlugin = require('offline-plugin');

const htmlConfig = {
    title: 'My React App',
    /* this gets replaced during ssr */
    minify: { collapseWhitespace: true },
};

const vendorChunk = {
    name: 'vendor.[hash].js',
    minChunks: m => m.context && m.context.indexOf('node_modules') !== -1
};

const manifestChunk = {
    name: 'manifest',
    minChunks: Infinity
};

module.exports = function plugins(env) {
    if (env === 'development') {
        return [
            new OfflinePlugin({ ServiceWorker: false, AppCache: false }),
            new HtmlWebpackPlugin(htmlConfig),
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin(),
            new DashboardPlugin({ port: 8080 })
        ];
    } else if (env === 'production') {
        return [
            new ExtractTextPlugin('stylesheets/[name]-[hash].css'),
            new OfflinePlugin(),
            new HtmlWebpackPlugin(htmlConfig),
            new webpack.optimize.CommonsChunkPlugin(vendorChunk),
            new webpack.optimize.CommonsChunkPlugin(manifestChunk),
            new BundleAnalyzerPlugin()
        ];
    }

    return [
        new HtmlWebpackPlugin(htmlConfig)
    ];
};
