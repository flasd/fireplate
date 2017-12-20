const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.NamedModulesPlugin(),
    ],
};
