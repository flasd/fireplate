const path = require('path');
const pkg = require('../../package.json');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const resolve = partial => path.resolve(process.cwd(), partial);

module.exports = new GeneratePackageJsonPlugin({
    name: 'fireplate-app-prodution-build',
    version: pkg.version,
    main: './index.js',
    dependencies: pkg.dependencies,
}, resolve('./package.json'));
