const __PRODUCTION__ = process.env.NODE_ENV === 'production';

if (__PRODUCTION__) {
    module.exports = {
        parser: 'postcss-safe-parser',
        plugins: [
            require('postcss-cssnext')(),
        ]
    };
} else {
    module.exports = {
        parser: 'postcss-safe-parser'
    };
}
