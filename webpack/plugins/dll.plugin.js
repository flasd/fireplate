const path = require('path');
const webpack = require('webpack');

const resolve = partial => path.resolve(process.cwd(), partial);

module.exports = new webpack.DllPlugin({
    name: 'prebuiltDll',
    path: resolve('webpack/tmp/prebuiltDll.json'),
});
