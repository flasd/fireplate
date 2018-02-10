const clear = require('clear-console');
const deepMerge = require('deepmerge');
const ora = require('ora');
const { existsSync } = require('fs');

const helpers = require('./helpers');

// ////////////////////////////////////////
// Build Steps

const pkgPath = helpers.resolve('./package.json');
const fireJsonPath = helpers.resolve('./firebase.json');
const bkpPath = helpers.resolve('./setup/backup.json');

const spinner = ora('Initializing setup');

/**
 * @description Creates ./setup/backup.json in case op fails
 * and package json ends up corrupted.
 * @returns {object} Original Package.json
 */
function doBackup() {
    const pkg = helpers.readFile(pkgPath, 'json', spinner);
    const fireJson = helpers.readFile(fireJsonPath, 'json', spinner);

    const backup = {
        package: {
            scripts: pkg.scripts,
            nyc: pkg.nyc,
            browserslist: pkg.browserslist,
            devDependencies: pkg.devDependencies,
            dependencies: pkg.dependencies,
        },
        firebase: fireJson,
    };

    helpers.writeFile(bkpPath, JSON.stringify(backup, null, 4), spinner);

    return backup;
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

/**
 * @description Initializes new git repository
 */
function initializeGit() {
    helpers.spawn('git', ['init'], {}, spinner);
}

/**
 * @description Initializes new npm repository
 */
function initializeNPM() {
    console.log('\n\n');

    helpers.spawn('npm', ['init'], { detached: true, stdio: 'inherit' }, spinner);
    const userPkg = helpers.readFile(pkgPath, 'json', spinner);

    clear();
    return userPkg;
}

/**
 * @description Initializes new firebase project
 */
function initializeFirebase() {
    console.log('\n\n');

    helpers.spawn('firebase', ['init'], { detached: true, stdio: 'inherit' }, spinner);
    clear();
}

/**
 * @description Patch package.json to add scripts and dependencies
 */
function patchFiles(backup, userPkg) {
    const finalPkg = deepMerge(userPkg, backup.package);
    helpers.writeFile(pkgPath, JSON.stringify(finalPkg, null, 4), spinner);
    helpers.writeFile(fireJsonPath, JSON.stringify(backup.firebase, null, 4), spinner);
}

/**
 * @description Clear git work tree
 */
function makeFirstCommit() {
    helpers.spawn('git', ['add', '.'], {}, spinner);
    helpers.spawn('git', ['commit', '-m', '"This is where it all started."'], {}, spinner);
}

/**
 * @description Remove setup files
 */
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
    const backup = checkForBackup();

    // Remove .git folder and a few files
    spinner.text = 'Removing Git Links with oficial repo';
    removeRepositoryFiles();

    // Initializes git repository
    spinner.text = 'Initializing new Git repo';
    initializeGit();

    // Intializes npm project
    spinner.text = 'Initializing new NPM project';
    const userPkg = initializeNPM();

    // Intializes firebase project
    spinner.text = 'Initializing new firebase project';
    initializeFirebase();

    // Patch Package.json scripts and dependencies
    spinner.text = 'Patching package.json scripts && firebase files';
    patchFiles(backup, userPkg);

    // Remove the setup folder to prevent re-setuping
    spinner.text = 'Finishing up';
    removeSetupFiles();

    // Make the first commit to clear git working tree
    makeFirstCommit();

    spinner.text = 'Success baby.';
    spinner.succeed();
})();
