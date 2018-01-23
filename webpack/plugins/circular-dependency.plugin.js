const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = new CircularDependencyPlugin({
    exclude: /(node_modules|bower_components)/,
    failOnError: true,
});
