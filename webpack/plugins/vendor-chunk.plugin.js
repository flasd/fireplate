const webpack = require('webpack');

module.exports = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
            return false;
        }

        return module.context && module.context.includes('node_modules')
    },
});
