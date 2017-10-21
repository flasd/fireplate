module.exports = function imageLoader(env) {
    const name = env === 'development' ? '[name].[ext]' : '[name]-[hash].[ext]';
    const __ON_CLIENT__ = env !== 'production:server';

    return ({
        test: /\.(jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
                name: name,
                emitFile: __ON_CLIENT__,
            }
        }, {
            loader: 'image-webpack-loader',
            options: {
                interlaced: false,
                optimizationLevel: 7,
                pngquant: {
                    quality: '65-90',
                    speed: 4,
                },
                progressive: true,
            },
        }]
    });
};
