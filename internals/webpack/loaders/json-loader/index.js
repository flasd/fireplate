module.exports = function jsonLoader() {
    return ({
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
    });
};
