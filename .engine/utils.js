const path = require('path');

const cwd = process.cwd();

const env = process.env.NODE_ENV;
const target = process.env.TARGET;

function resolve(filepath) {
    return path.resolve(cwd, filepath);
}

function sortEnv() {
    if (env !== 'production') {
        return 'development';
    }

    return target === 'node' ? 'node' : 'production';
}

module.exports = {
    resolve: resolve,
    env: sortEnv(),
};
