const SWPrecache = require('sw-precache-webpack-plugin');

module.exports = new SWPrecache({
    cacheId: 'fireplate',
    minify: true,
});
