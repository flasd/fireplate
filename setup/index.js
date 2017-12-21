const childProcess = require('child_process');
const fs = require('fs');

const packages = require('./packages.json');
const firebaseConfig = require('./firebase.json');

const expressApp = fs.readFileSync('./express-app');

/**
 *
 * @param {string} path the path of the file/directory to be removed.
 */
function rm(path) {
    if (fs.existsSync(path)) {
        if (fs.lstatSync(path).isDirectory()) {
            fs.readdirSync(path).forEach((file) => {
                const realPath = `${path}/${file}`;

                if (fs.lstatSync(realPath).isDirectory()) {
                    rm(realPath);
                } else {
                    fs.unlinkSync(realPath);
                }
            });

            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
}

/**
 *
 * @param {string} path Path to the initialized package.json
 * @param {object} initialData Data to merge to the existing package.json
 */
function initPkg(path, initialData) {
    const pkg = JSON.parse(fs.readFileSync(path));
    fs.unlinkSync(path);
    const newAppPkg = Object.assign({}, pkg, initialData);
    fs.writeFileSync(path, JSON.stringify(newAppPkg, null, 4));
    childProcess.spawnSync('npm', ['install'], { stdio: 'inherit', detached: true });
}

// Removes old files
rm('./.git');
rm('./package.json');
rm('./package-lock.json');
rm('./functions/index.js');
rm('./functions/package.json');
rm('./functions/package-lock.json');
rm('./README.md');
rm('./LICENSE');

// Create new README
fs.writeFileSync('./README.md', '# your_app\n Here goes your app description!\n\0', 'utf8');

// Init new git repository
childProcess.spawnSync('git', ['init'], { stdio: 'inherit' });
process.stdout.write('\n');

// Init new npm repository
childProcess.spawnSync('npm', ['init'], { stdio: 'inherit', detached: true });
process.stdout.write('\n');

// Init new firebase project
childProcess.spawnSync('firebase', ['init'], { stdio: 'inherit', detached: true });
process.stdout.write('\n');

// Write firebase configuration
fs.unlinkSync('../firebase.json');
fs.writeFileSync('../firebase.json', JSON.stringify(firebaseConfig, null, 4));

// Write Cloud Functions Express App
fs.unlinkSync('../functions/index.js');
fs.writeFileSync('../functions/index.js', expressApp);

// Update scripts
initPkg('./package.json', packages.app);
initPkg('./functions/package.json', packages.server);

// Unlink setup script
rm('./setup');

// Commit the initial repository state
childProcess.spawnSync('git', ['add', '.'], { stdio: 'inherit' });
childProcess.spawnSync('git', ['commit', '-m', '"This is where it all begins..."'], { stdio: 'inherit' });
