module.exports = function fileLoader(env) {
    const name = env === 'development' ? '[name].[ext]' : '[name]-[hash].[ext]';
    const emitFile = env !== 'node';

    return ({
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: name,
                emitFile: emitFile,
            }
        }]
    })
}
