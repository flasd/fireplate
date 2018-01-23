const HtmlWebpackPlugin = require('html-webpack-plugin');
const onDevelopment = process.env.NODE_ENV === 'development';

module.exports = new HtmlWebpackPlugin({
    title: '',
    filename: onDevelopment ? './index.html' : './template.html',
    template: './src/app/index.html',
    minify: onDevelopment ? false : {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
    }
});
