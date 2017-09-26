const ExtractText = require('extract-text-webpack-plugin');

module.exports = function styleLoader(env) {
    const commonJs2File = {
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
    }

    const postcss = {
        loader: 'postcss-loader'
    };

    const sass = {
        loader: 'sass-loader'
    }

    if (env !== 'development') {
        return {
            test: /\.scss$/,
            use: ExtractText.extract([css2CommonJs, postcss, sass])
        };
    }

    return {
        test: /\.scss$/,
        use: [commonJs2File, css2CommonJs, postcss, sass]
    };
}
