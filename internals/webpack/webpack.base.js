const webpack = require('webpack');

module.exports = (options) => ({
    entry: options.entry,

    output: Object.assign({}, {
        path: require('../utils').resolve('public'),
    }, options.output),

    module: {
        rules: [].concat(options.module ? options.module.rules : []),
    },

    plugins: options.plugins.concat([
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.NamedModulesPlugin(),
    ]),

    resolve: {
        modules: ['app', 'node_modules'],
    },

    devtool: options.devtool,

    target: options.target || 'web',

    node: options.node || {},

    performance: options.performance || {},

    devServer: options.devServer || {},
});
