const { spawnSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
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
 * @param {ChildProcess} result Result of a spawn operation
 */
exports.assertSuccess = function assertSuccess(result) {
    if (result.status !== 0 || result.error) {
        throw result.error;
    }
};

/**
 *
 * @param {string} filePath Path to the file.
 * @param {string | undefined} encoding Encoding in which to return the file contents.
 * @param {Ora.Spinner} spinner Spinner indicating progress.
 */
exports.readFile = function readFile(filePath, encoding, spinner) {
    try {
        const fileBuffer = readFileSync(filePath);

        if (encoding && encoding === 'json') {
            return JSON.parse(fileBuffer.toString());
        }

        return fileBuffer.toString();
    } catch (readErr) {
        return exports.terminate(readErr, spinner);
    }
};

/**
 *
 * @param {string} filePath Path to the file.
 * @param {string} fileContent Content of the file.
 * @param {Ora.Spinner} spinner Spinner indicatiog progress.
 */
exports.writeFile = function writeFile(filePath, fileContent, spinner) {
    try {
        writeFileSync(filePath, fileContent);
    } catch (writeErr) {
        exports.terminate(writeErr, spinner);
    }
};

/**
 * 
 * @param {string} program Script name.
 * @param {Array<strings>} args Arguments.
 * @param {Object} options Options
 * @param {Ora.Spinner} spinner Progress indicator
 */
exports.spawn = function spawn(program, args, options, spinner) {
    try {
        const result = spawnSync(program, args, options);
        exports.assertSuccess(result);
    } catch (spawnErr) {
        exports.terminate(spawnErr, spinner);
    }
};
