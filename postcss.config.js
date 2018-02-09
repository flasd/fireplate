const cssNano = require('cssnano');
const cssNext = require('postcss-cssnext');

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        parser: 'postcss-safe-parser',
        plugins: [
            cssNext({ warnForDuplicates: false }),
            cssNano(),
        ],
    };
} else {
    module.exports = {
        parser: 'postcss-safe-parser',
    };
}
