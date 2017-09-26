const utils = require('./.engine/utils');

if (utils.env === 'production') {
    module.exports = {
        parser: 'postcss-safe-parser',
        plugins: [
            utils.adapt(null, require('postcss-cssnext')(), null)
        ]
    };
} else {
    module.exports = {
        parser: 'postcss-safe-parser'
    };
}
