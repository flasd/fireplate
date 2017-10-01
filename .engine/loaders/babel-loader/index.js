module.exports = function babelLoader() {
    return ({
        test: /\.(js|jsx|es6|babel)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader'
        }]
    });
};
