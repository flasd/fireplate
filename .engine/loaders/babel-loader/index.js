module.exports = function babelLoader() {
    return ({
        test: /\.(js|jsx|es6|babel)$/,
        use: [{
            loader: 'babel-loader'
        }]
    });
};
