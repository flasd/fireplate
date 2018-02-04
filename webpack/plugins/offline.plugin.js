const OfflinePlugin = require('offline-plugin');
const pkg = require('../../package.json');

module.exports = new OfflinePlugin({
    appShell: './app-shell.html',
    autoUpdate: 1000 * 60 * 60 * 24,
    excludes: ['stylesheets/critical.css', '../template.html'],

    ServiceWorker: {
        output: 'service-worker.js',
        minify: true,
    },

    AppCache: false, // Its deprecated!
});
