module.exports = {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: process.env.BUILD_TARGET !== 'node' ? undefined : {
            babelrc: false,

            presets: [
                'react', ['env', {
                    targets: {
                        node: '6',
                    },
                    exclude: [
                        'transform-regenerator',
                    ],
                }],
                'react-optimize',
            ],

            plugins: [
                'fast-async',
                'syntax-dynamic-import',
                'dynamic-import-node',
            ],
        },
    },
};
