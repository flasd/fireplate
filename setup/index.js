const clear = require('clear-console');
const deepMerge = require('deepmerge');
const ora = require('ora');
const { existsSync } = require('fs');

const helpers = require('./helpers');

// ////////////////////////////////////////
// Build Steps

const pkgPath = helpers.resolve('./package.json');
const bkpPath = helpers.resolve('./setup/backup.json');

const spinner = ora('Initializing setup');

/**
 * @description Creates ./setup/backup.json in case op fails
 * and package json ends up corrupted.
 * @returns {object} Original Package.json
 */
function doBackup() {
    const pkg = helpers.readFile(pkgPath, 'string', spinner);
    helpers.writeFile(bkpPath, pkg, spinner);

    return JSON.parse(pkg);
}

/**
 * @description Checks if ./setup/backup.json exits
 * @returns {object} Original Package.json
 */
function checkForBackup() {
    const hasBackup = existsSync(bkpPath);


    if (hasBackup) {
        return helpers.readFile(bkpPath, 'json', spinner);
    }

    return doBackup();
}

/**
 * @description Remove unneeded files
 */
function removeRepositoryFiles() {
    const files = [
        './.git',
        './LICENCE',
        './package-lock.json',
        './package.json',
        './README.md',
    ];

    helpers.spawn('rimraf', files, {}, spinner);
}

function initializeGit() {
    helpers.spawn('git', ['init'], {}, spinner);
}

function initializeNPM() {
    console.log('\n\n');

    helpers.spawn('npm', ['init'], { detached: true, stdio: 'inherit' }, spinner);
    const userPkg = helpers.readFile(pkgPath, 'json', spinner);

    clear();
    return userPkg;
}

function patchFiles(templatePkg, userPkg) {
    const finalPkg = deepMerge(templatePkg, userPkg);
    helpers.writeFile(pkgPath, JSON.stringify(finalPkg, null, 4), spinner);
}

function makeFirstCommit() {
    helpers.spawn('git', ['add', '.'], {}, spinner);
    helpers.spawn('git', ['commit', '-m', '"This is where it all started."'], {}, spinner);
}

function removeSetupFiles() {
    helpers.spawn('rimraf', ['./setup/'], {}, spinner);
}

// //////////////////////////////

(() => {
    // Clears terminal/cmd window
    clear();

    console.log('\n\n');

    spinner.start();

    // Create a package.json backup
    const templatePkg = checkForBackup();

    // Remove .git folder and a few files
    spinner.text = 'Removing Git Links with oficial repo';
    removeRepositoryFiles();

    // Initializes git repository
    spinner.text = 'Itilializing new Git repo';
    initializeGit();

    // Intializes npm project
    spinner.text = 'Itilializing new NPM project';
    const userPkg = initializeNPM();

    // Patch Package.json scripts and dependencies
    spinner.text = 'Patching package.json scripts';
    patchFiles(templatePkg, userPkg);

    // Remove the setup folder to prevent re-setuping
    spinner.text = 'Finishing up';
    removeSetupFiles();

    // Make the first commit to clear git working tree
    makeFirstCommit();
    spinner.succeed();
})();
