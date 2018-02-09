const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

function resolve(partial) {
    return path.resolve(process.cwd(), partial);
}

module.exports = new FaviconsWebpackPlugin({
    logo: resolve('src/app/assets/icons/icon.png'),
    prefix: 'icons/[hash:8]-',
    title: 'Fireplate',
    icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false,
    },
});
