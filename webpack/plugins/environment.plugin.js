const webpack = require('webpack');

module.exports = new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
    BUILD_TARGET: 'browser',
    ANALYTICS_ID: 'UA-00000000-0',
});
