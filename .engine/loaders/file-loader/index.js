module.exports = function fileLoader(env) {
    const name = env === 'development' ? '[name].[ext]' : '[name]-[hash].[ext]';
    const emitFile = env !== 'production:server';

    return ({
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
                name: name,
                emitFile: emitFile,
            }
        }]
    });
};
