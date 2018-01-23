const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path');

const resolve = partial => path.resolve(process.cwd(), partial);

module.exports = new WebpackPwaManifest({
    name: 'Fireplate App',
    short_name: 'FPApp',
    description: 'PWAs are awesome man.',
    background_color: '#ffffff',
    icons: [{
        src: resolve('src/app/assets/icons/ios-icon.png'),
        sizes: [120, 152, 167, 180, 1024],
        destination: 'icons/ios',
        ios: true
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
