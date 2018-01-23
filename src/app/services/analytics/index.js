import { listen } from '../navigation';

// eslint-disable-next-line consistent-return
(() => {
    if (process.env.NODE_ENV === 'production' && process.env.BUILD_TARGET !== 'node') {
        if (process.env.ANALYTICS_ID === '00000000-0') {
            return console.warn('Please update your Analytics ID in the "build" script in package.json');
        }

        ((i, s, o, g, r, a, m) => {
            /* eslint-disable */
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        ga('create', process.env.ANALYTICS_ID, 'auto');
        ga('send', 'pageview');

        listen(location => ga('send', 'pageview', location.pathname));
    }
})();
