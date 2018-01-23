const webpack = require('webpack');

module.exports = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
});
