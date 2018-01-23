const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config');
const hashedModuleIdsPlugin = require('./plugins/hashed-modules-ids.plugin');
const manifestChunkPlugin = require('./plugins/manifest-chunk.plugin');
const offlinePlugin = require('./plugins/offline.plugin');
const pwaManifestPlugin = require('./plugins/pwa-manifest.plugin');
const uglifyPlugin = require('./plugins/uglify.plugin');
const vendorChunkPlugin = require('./plugins/vendor-chunk.plugin');


const resolve = partial => path.resolve(process.cwd(), partial);


module.exports = merge(base, {
    entry: './src/app/index.jsx',

    output: {
        path: resolve('functions/public'),
        filename: '[name]-[hash:8].js',
        chunkFilename: 'chunk/[name]-[chunkhash].js',
    },

    plugins: [
        hashedModuleIdsPlugin,
        manifestChunkPlugin,
        offlinePlugin,
        pwaManifestPlugin,
        uglifyPlugin,
        vendorChunkPlugin,
    ],
});
