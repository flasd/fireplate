const path = require('path');
const webpack = require('webpack');

const resolve = partial => path.resolve(process.cwd(), partial);

module.exports = {
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.NamedModulesPlugin(),
    ],

    resolve: {
        alias: {
            services: resolve('src/services'),
            styles: resolve('src/styles'),
            views: resolve('src/views'),
        },
    },
};
