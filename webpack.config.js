const devConfig = require('./.engine/development');
const prodConfig = require('./.engine/production');
const servConfig = require('./.engine/server');

if (process.env.NODE_ENV === 'production') {
    module.exports = [prodConfig(), servConfig()];
} else {
    module.exports = devConfig();
}
