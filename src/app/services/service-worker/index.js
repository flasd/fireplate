(() => {
    if (process.env.BUILD_TARGET !== 'node' && process.env.NODE_ENV === 'production') {
        /* eslint-env browser */
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js');
            }
            // eslint-disable-next-line no-empty
        } catch (x) {}
    }
})();
