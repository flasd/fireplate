const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
        options: {
            babelrc: false,

            presets: [
                'react',
                ['env', {
                    targets: {
                        node: '6',
                    },
                }],
                'react-optimize',
            ],

            plugins: [
                'fast-async',
                'transform-runtime',
                'syntax-dynamic-import',
                'babel-plugin-dynamic-import-node',
                'groundskeeper-willie',
            ],
        },
    },
};

const styleLoader = {
    test: /\.scss$/,
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
                    includePaths: [resolve('src/_variables.scss')],
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
                optimizationLevel: 0,
            },
        },
    ],
};

const htmlLoader = {
    test: /\.html$/,
    exclude: /(node_modules|bower_components)/,
    use: 'html-loader',
};

// //////////////////////////////
// Plugins

const extractTextPlugin = new ExtractTextPlugin({
    filename: './assets/[name].[sha256:contenthash:base64:8].css',
    allChunks: true,
});

// //////////////////////////////
// Configuration

module.exports = merge(base, {
    entry: './src/server.js',

    output: {
        path: resolve('functions/app/'),
        filename: '[name].[hash].js',
        chunkFilename: '[chunkhash].chunk.js',
        libraryTarget: 'commonjs2',
    },

    module: {
        rules: [
            babelLoader,
            styleLoader,
            imageLoader,
            htmlLoader,
        ],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        extractTextPlugin,
        new UglifyJsPlugin(),
    ],

    node: {
        __filename: false,
        __dirname: false,
    },
});
