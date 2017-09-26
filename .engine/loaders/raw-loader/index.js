module.exports = function rawLoader() {
    return ({
        test: /\.(txt|data|raw)$/,
        use: 'raw-loader'
    });
};
