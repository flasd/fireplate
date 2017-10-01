module.exports = function rawLoader() {
    return ({
        test: /\.(txt|data|raw)$/,
        exclude: /node_modules/,
        use: 'raw-loader'
    });
};
