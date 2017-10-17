const ExtractText = require('extract-text-webpack-plugin');

module.exports = function styleLoader(env) {
    const toFile = {
        loader: 'style-loader',
        options: {
            emitFile: env !== 'production:server',
        }
    };

    const toCommonJs = {
        loader: 'css-loader',
        options: {
            module: true,
            localIdentName: '[hash:base64:8]',
            minimize: env === 'production',
        }
    };

    const postProcess = {
        loader: 'postcss-loader'
    };

    const sass = {
        loader: 'sass-loader'
    };

    if (env !== 'development') {
        return {
            test: /\.scss$/,
            use: ExtractText.extract([toFile, toCommonJs, postProcess, sass])
        };
    }

    return {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [toCommonJs, postProcess, sass]
    };
};
