(() => {
    if (process.env.BUILD_TARGET !== 'node' && process.env.NODE_ENV === 'production') {
        /* eslint-disable global-require, import/no-extraneous-dependencies */
        require('offline-plugin/runtime').install();
    }
})();
