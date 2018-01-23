const OfflinePlugin = require('offline-plugin');

module.exports = new OfflinePlugin({
    appShell: '/',
    autoUpdate: 1000 * 60 * 60 * 24,

    ServiceWorker: {
        output: 'service-worker.js',
        minify: true,
    },

    AppCache: false, // Its deprecated!
});
