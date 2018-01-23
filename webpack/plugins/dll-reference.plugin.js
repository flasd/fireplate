const webpack = require('webpack');

module.exports = new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require('../tmp/prebuiltDll.json'),
});
