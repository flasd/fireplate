const devConfig = require('./.engine/development');
const prodConfig = require('./.engine/production');

if (process.env.NODE_ENV === 'production') {
    module.exports = prodConfig();
} else {
    module.exports = devConfig();
}
