const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config');
const faviconsPlugin = require('./plugins/favicons.plugin');
const hashedModuleIdsPlugin = require('./plugins/hashed-modules-ids.plugin');
const manifestChunkPlugin = require('./plugins/manifest-chunk.plugin');
const offlinePlugin = require('./plugins/offline.plugin');
const resourceHintsPlugin = require('./plugins/resource-hints.plugin');
const pwaManifestPlugin = require('./plugins/pwa-manifest.plugin');
const styleExtHtmlPlugin = require('./plugins/style-ext-html.plugin');
const uglifyPlugin = require('./plugins/uglify.plugin');
const vendorChunkPlugin = require('./plugins/vendor-chunk.plugin');


const resolve = partial => path.resolve(process.cwd(), partial);


module.exports = merge(base, {
    entry: './src/app/index.jsx',

    output: {
        path: resolve('functions/public'),
        publicPath: './',
        filename: '[name]-[hash:8].js',
        chunkFilename: 'chunk/[name]-[chunkhash].js',
    },

    plugins: [
        faviconsPlugin,
        hashedModuleIdsPlugin,
        manifestChunkPlugin,
        offlinePlugin,
        resourceHintsPlugin,
        pwaManifestPlugin,
        styleExtHtmlPlugin,
        uglifyPlugin,
        vendorChunkPlugin,
    ],
});
