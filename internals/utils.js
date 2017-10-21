const path = require('path');

module.exports = {
    resolve: (filepath) => path.resolve(process.cwd(), filepath),
    
    // eslint-disable-next-line import/no-dynamic-require
    getPkg: () => require(path.join(process.cwd(), 'package.json')),
};
