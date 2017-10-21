const devConfig = './internals/webpack/webpack.dev';
const prodConfig = './internals/webpack/webpack.prod';
const servConfig = './internals/webpack/webpack.ssr';
const dllConfig = './internals/webpack/webpack.dll';

const env = process.env.NODE_ENV;
const target = process.env.TARGET;

if (env === 'production') {
    module.exports = target === 'server' ? require(servConfig) : require(prodConfig);
} else {
    module.exports = target === 'dll' ? require(dllConfig) : require(devConfig);
}
