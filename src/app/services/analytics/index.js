/* eslint-disable */
import { listen } from '../navigation';

/* istanbul ignore next */
(() => {
    if (process.env.NODE_ENV === 'production' && process.env.BUILD_TARGET !== 'node') {
        if (process.env.ANALYTICS_ID && process.env.ANALYTICS_ID === 'UA-00000000-0') {
            throw new ReferenceError('Undefined Google Analytics Tracking Code\nPlease update your code in the build script inside package.json');
        }

        ((i, s, o, g, r, a, m) => {
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
