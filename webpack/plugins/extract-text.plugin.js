const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new ExtractTextPlugin({
    filename: process.env.NODE_ENV === 'development' ? '[name].css' : 'stylesheets/critical.css',
    allChunks: true,
    disable: process.env.BUILD_TARGET === 'node',
});
