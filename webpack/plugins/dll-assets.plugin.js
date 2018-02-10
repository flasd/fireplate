const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = new AddAssetHtmlPlugin({
    filepath: require.resolve('../tmp/prebuiltDll.js'),
    includeSourcemap: false,
});