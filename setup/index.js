/* eslint-disable */
const chalk = require('chalk');
const childProcess = require('child_process');
const deepMerge = require('deepmerge');
const fs = require('fs');
const inquirer = require('inquirer');
const prettyError = new (require('pretty-error'))();
const rimraf = require('rimraf');

const helpers = require('./helpers');

function checkForBackup() {
    const spinner = helpers.displaySpinner('Starting setup process.');

    if (fs.existsSync(helpers.resolve('./setup/backup.json'))) {
        try {
            const backup = fs.readFileSync(helpers.resolve('./setup/backup.json')).toJson();

            spinner.succeed();
            return backup;
        } catch (readError) {
            return helpers.terminate(readError, spinner);
        }
    }

    return false;
}

function doBackup() {
    const spinner = helpers.displaySpinner('Backing up files in case operation fails.');

    try {
        const pkg = fs.readFileSync(helpers.resolve('./package.json')).toString();
        const fireConf = fs.readFileSync(helpers.resolve('./firebase.json')).toString();
    } catch (readError) {
        return helpers.terminate(readError, spinner);
    }

    const backup = {
        package: pkg,
        firebase: fireConf,
    };

    try {
        fs.writeFileSync(helpers.resolve('/setup/backup.json'), JSON.stringify(backup));
    } catch (writeError) {
        return helpers.terminate(writeError, spinner);
    }

    spinner.succeed()
    return backup;
}

function removeRepositoryFiles() {
    const spinner = helpers.displaySpinner('Removing .git/');

    const files = [
        '../.git',
        '../LICENCE.md',
        '../package-lock.json',
        '../package.json',
        '../README.md',
    ];

    try {
        const result = childProcess.spawnSync('rimraf', files);
        helpers.assertSuccess(result);
    } catch (removeError) {
        return helpers.terminate(removeError, spinner);
    }

    spinner.succeed();
}

function initializeFirebase() {
    const spinner = helpers.displaySpinner('Initializing firebase project.');

    try {
        const loginResult = childProcess.spawnSync('firebase', ['login', '--reauth'], { stdio: 'inherit' });
        helpers.assertSuccess(loginResult);
    } catch (firebaseLoginError) {
        return helpers.terminate(firebaseLoginError, spinner);
    }

    try {
        const initResult = childProcess.spawnSync('firebase', ['init'], { stdio: 'inherit' });
        helpers.assertSuccess(initResult);
    } catch (firebaseInitError) {
        return helpers.terminate(firebaseInitError, spinner);
    }

    spinner.succeed();
}

function initializeGit() {
    const spinner = helpers.displaySpinner('Initializing new Git repository.');

    try {
        const result = childProcess.spawnSync('git', ['init']);
        helpers.assertSuccess(result);
    } catch (gitInitError) {
        return helpers.terminate(gitInitError, spinner);
    }

    spinner.succeed();
}

function patchFiles(backup) {
    const spinner = helpers.displaySpinner('Patching configuration files.');

    try {
        fs.writeFileSync(helpers.resolve('./firebase.json'), JSON.stringify(backup.firebase, null, 4));
    } catch (writeError) {
        return helpers.terminate(writeError, spinner);
    }

    try {
        const userPkg = fs.readFileSync(helpers.resolve('./package.json')).toJSON();
        const mergedPkg = deepMerge(backup.package, userPkg);

        fs.writeFileSync(helpers.resolve('./package.json'), JSON.stringify(mergedPkg, null, 4));
    } catch (readOrWriteError) {
        return helpers.terminate(readOrWriteError, spinner);
    }

    spinner.succeed();
}

function makeFirstCommit() {
    const spinner = helpers.displaySpinner('Staging and Commiting initial project state.');

    try {
        const result = childProcess.spawnSync('git', ['add', '.']);
        helpers.assertSuccess(result);
    } catch (spawnError) {
        return helpers.terminate(spawnError, spinner);
    }

    try {
        const result = childProcess.spawnSync('git', ['commit', '-m', '"This is where it all started."']);
        helpers.assertSuccess(result);
    } catch (spawnError) {
        return helpers.terminate(spawnError, spinner);
    }

    spinner.succeed();
}

function removeSetupFiles() {
    const spinner = helpers.displaySpinner('Removing setup files.');

    try {
        const result = childProcess.spawnSync('rimraf', ['./setup/']);
        helpers.assertSuccess(result);
    } catch (rimrafError) {
        return helpers.terminate(rimrafError, spinner);
    }

    spinner.succeed();
}

function done() {
    helpers.displaySpinner('Done!').succeed();
}

(function () {
    try {
        let backup = checkForBackup();

        if (!backup) {
            backup = doBackup();
        }

        removeRepositoryFiles();
        initializeFirebase();
        initializeGit();
        patchFiles(backup);
        makeFirstCommit();
        removeSetupFiles();
        done();
    } catch (uncaughtException) {
        helpers.terminate(uncaughtException, helpers.displaySpinner('Something when really wrong.'));
    }
})();
