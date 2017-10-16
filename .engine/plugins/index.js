const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NpmInstallPlugin = require('npm-install-webpack-plugin');

// Remember to add the code commented to your entry file
// import * as offlineRuntime from 'offline-plugin/runtime';
// offlineRuntime.install();
const OfflinePlugin = require('offline-plugin');

const vendorChunk = {
    name: 'vendor',
    minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1
};

const manifestChunk = {
    name: 'manifest',
    minChunks: Infinity
};

module.exports = function plugins(env) {

    const htmlConfig = {
        title: 'My React App',
        /* this gets replaced during ssr */
        minify: { collapseWhitespace: true },
        template: './.engine/plugins/template.html',
        filename: env === 'production' ? '../functions/app/index.html' : 'index.html'
    };

    if (env === 'development') {
        return [
            new HtmlWebpackPlugin(htmlConfig),
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin()
        ];
    } else if (env === 'production') {
        return [
            new ExtractTextPlugin('stylesheets/[name]-[hash].css'),
            new OfflinePlugin({
                publicPath: './',
            }),
            new HtmlWebpackPlugin(htmlConfig),
            new webpack.optimize.CommonsChunkPlugin(vendorChunk),
            new webpack.optimize.CommonsChunkPlugin(manifestChunk),
            // new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
            })
        ];
    }

    return [
        new HtmlWebpackPlugin(htmlConfig),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ];
};
