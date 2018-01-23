module.exports = {
    test: /\.(png|jpe?g|gif)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'url-loader',
        options: {
            name: process.env.NODE_ENV === 'development' ? '[name].ext' : 'images/[name].[hash].[ext]',
            emitFile: process.env.BUILD_TARGET !== 'node',
            limit: 8192,
        }
    }
};
