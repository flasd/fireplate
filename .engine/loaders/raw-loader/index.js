module.exports = function rawLoader(env) {
    return ({
        test: /\.(txt|data|raw)$/,
        use: 'raw-loader'
    });
}
