const ora = require('ora');
const path = require('path');
const prettyError = new (require('pretty-error'))();

/**
 *
 * @param {string} partial Path to resolve from root /
 */
exports.resolve = function resolve(partial) {
    return path.resolve(process.cwd(), partial);
};

/**
 *
 * @param {Error} error Error object to be printed
 * @param {Spinner?} spinner The spinner to be failed.
 */
exports.terminate = function terminate(error, spinner) {
    if (spinner) {
        spinner.fail();
    }

    prettyError.render(error);
    return process.exit(1);
};

/**
 *
 * @param {string} message Message to be display together with the spinner
 */
exports.displaySpinner = function displaySpinner(message) {
    return ora({ spinner: 'dots10', text: message }).start();
};


/**
 *
 * @param {ChildProcess} result Result of a spawn operation
 */
exports.assertSuccess = function assertSuccess(result) {
    if (result.status !== 0 || result.error) {
        throw result.error;
    }
};
