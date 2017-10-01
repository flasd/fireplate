const utils = require('./.engine/utils');
const devConfig = require('./.engine/development');
const prodBrowserConfig = require('./.engine/production.browser');
const prodServerConfig = require('./.engine/production.server');

if (utils.env === 'production') {
    module.exports = [prodBrowserConfig(), prodServerConfig()];
} else {
    module.exports = devConfig();
}
