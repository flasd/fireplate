const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new ExtractTextPlugin({
    filename: process.env.NODE_ENV === 'development' ? '[name].css' : 'stylesheets/[contenthash:8].css',
    allChunks: true,
    disable: process.env.BUILD_TARGET === 'node',
});
