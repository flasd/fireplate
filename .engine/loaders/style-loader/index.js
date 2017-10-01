const ExtractText = require('extract-text-webpack-plugin');

module.exports = function styleLoader(env) {
    const commomJsToDOM = {
        loader: 'style-loader',
        options: {
            emitFile: env !== 'node',
        }
    };

    const css2CommonJs = {
        loader: 'css-loader',
        options: {
            module: true,
            localIdentName: '[hash:base64:8]',
            minimize: env === 'production',
        }
    };

    const postcss = {
        loader: 'postcss-loader'
    };

    const sass = {
        loader: 'sass-loader'
    };

    if (env !== 'development') {
        return {
            test: /\.scss$/,
            use: ExtractText.extract([css2CommonJs, postcss, sass])
        };
    }

    return {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [commomJsToDOM, css2CommonJs, postcss, sass]
    };
};
