const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const cssNext = require('postcss-cssnext');
const oldCss = require('oldie');

const autoprefixerConfig = {
    browsers: '> 1%, last 2 versions, ie 8',
};

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        parser: 'postcss-safe-parser',
        plugins: [
            autoprefixer(autoprefixerConfig),
            cssNext(),
            oldCss(),
            cssNano(),
        ],
    };
} else {
    module.exports = {
        parser: 'postcss-safe-parser',
    };
}
