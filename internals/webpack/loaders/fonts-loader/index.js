module.exports = function fontsLoader(env) {
    const name = env === 'development' ? '[name].[ext]' : '[name]-[hash].[ext]';
    const __ON_CLIENT__ = env !== 'production:server';

    return ({
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
                name: name,
                emitFile: __ON_CLIENT__,
            }
        }]
    });
};
