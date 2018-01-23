const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const onDevelopment = process.env.NODE_ENV === 'development';


const resolve = partial => path.resolve(process.cwd(), partial);

const styleLoader = [{
    loader: 'isomorphic-style-loader',
}];

const loaderChain = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: onDevelopment,
            modules: true,
            localIdentName: '[hash:base64:5]',
            importLoaders: 3,
        },
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: onDevelopment,
        },
    }, {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: onDevelopment,
            attempts: 1,
            fail: true,
        }
    }, {
        loader: 'sass-loader',
        options: {
            includePaths: [
                resolve('src/app/styles'),
                require('bourbon').includePaths,
                resolve('node_modules/normalize-scss/sass'),
            ],
            sourceMap: true,
        },
    }
]

module.exports = {
    test: /\.scss$/,
    exclude: /(node_modules|bower_components)/,
    use: onDevelopment ? styleLoader.concat(loaderChain) : ExtractTextPlugin.extract({
        use: loaderChain,
        fallback: styleLoader,
    }),
};
