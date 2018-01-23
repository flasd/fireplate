const childProcess = require('child_process');

// 1 - Install needed dependecies
(() => {
    const installResult = childProcess.spawnSync('npm', [
        'install',
        '--save-dev',
        'chalk',
        'deepmerge',
        'inquirer',
        'ora',
        'pretty-error',
        'rimraf',
    ]);

    if (installResult.status !== 0) {
        console.error(installResult.error);
        process.exit(1);
    }
})();

// 2 Import everything we need

const chalk = require('chalk');
const deepMerge = require('deepmerge');
const inquirer = require('inquirer');
const ora = require('ora');
const prettyError = new (require('pretty-error'))();
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} partial Path to resolve from root /
 */
function resolve(partial) {
    return path.resolve(process.cwd(), partial);
}

/**
 *
 * @param {string} message Message to show on the screen.
 * @param {Function} fn Job to execute.
 */
function job(message, fn) {
    const spinner = ora({
        spinner: 'dots10',
        text: message,
    });

    try {
        fn();
        spinner.succeed();
    } catch (err) {
        spinner.fail();
        prettyError.render(err);
        process.exit();
    }
}

/**
 *
 * @param {ChildProcess} opResult
 */
function assertSuccess(opResult) {
    if (opResult.status !== 0 && opResult.error) {
        throw opResult.error;
    }
}

const oldPkgJson = JSON.parse(fs.readFileSync(resolve('package.json')).toString());
const firebaseConf = JSON.parse(fs.readFileSync(resolve('firebase.json')).toString());

job('Removing old files.', () => {
    // Removing old files
    rimraf.sync('../.git');
    rimraf.sync('../.firebaserc');
    rimraf.sync('../firebase.json');
    rimraf.sync('../LICENCE.md');
    rimraf.sync('../package.json');
    rimraf.sync('../package-lock.json');
    rimraf.sync('../README.md');
});

job('Initializing Firebase Project', () => {
    const loginResult = childProcess.spawnSync('firebase', ['login', '--reauth'], { stdio: 'inherit' });
    assertSuccess(loginResult);

    const initResult = childProcess.spawnSync('firebase', ['init'], { stdio: 'inherit' });
    assertSuccess(initResult);

    fs.writeFileSync(resolve('firebase.json'), JSON.stringify(firebaseConf, null, 4));
});

job('Initializing new NPM repository', () => {
    const initResult = childProcess.spawnSync('npm', ['init'], { stdio: 'inherit', detached: true });
    assertSuccess(initResult);

    const newPkg = JSON.parse(fs.readFileSync(resolve('package.json')).toString());
    const completePkg = deepMerge(oldPkgJson, newPkg);

    fs.writeFileSync(resolve('package.json'), JSON.stringify(completePkg, null, 4));

    const installResult = childProcess.spawnSync('npm', ['install'], { detached: true });
    assertSuccess(installResult);
});

job('Initializing Git', () => {
    const initResult = childProcess.spawnSync('git', ['init']);
    assertSuccess(initResult);

    const addResult = childProcess.spawnSync('git', ['add', '.']);
    assertSuccess(addResult);

    const commitResult = childProcess.spawnSync('git', ['commit', '-m', '"This is where it all started."']);
    assertSuccess(commitResult);
});

job('Removing setup files', () => {
    rimraf.sync('../setup');
});

ora('Success baby.').succeed();
