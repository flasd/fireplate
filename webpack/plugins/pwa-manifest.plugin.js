const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path');

const resolve = partial => path.resolve(process.cwd(), partial);

module.exports = new WebpackPwaManifest({
    background_color: '#341539',
    description: 'PWAs are awesome son.',
    developerName: 'Marcel O. Coelho',
    developerURL: 'https://github.com/flasd',
    display: 'standalone',
    name: 'Fireplate',
    orientation: 'portrait',
    short_name: 'Fireplate',
    start_url: '/?homescreen=1',
    theme_color: '#341539',

    inject: true,
    ios: true,
    icons: [{
        src: resolve('src/app/assets/icons/ios-icon.png'),
        sizes: [120, 152, 167, 180, 1024],
        destination: 'icons/ios',
        ios: true,
    }, {
        src: resolve('src/app/assets/icons/ios-icon.png'),
        size: 1024,
        destination: 'icons/ios',
        ios: 'startup',
    }, {
        src: resolve('src/app/assets/icons/android-icon.png'),
        sizes: [36, 48, 72, 96, 144, 192, 512],
        destination: 'icons/android',
    }],
});
