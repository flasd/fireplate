module.exports = function babelLoader(env) {
    return ({
        test: /\.(js|jsx|es6|babel)$/,
        use: [{
            loader: 'babel-loader'
        }]
    });
}
