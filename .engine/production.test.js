/* eslint-env node, mocha */

import { expect } from 'chai';

import prodConfig from './production';

describe('Webpack Prod Config Object', () => {
    before(() => {
        const replacement = env => ([env]);

        prodConfig.__Rewire__('plugins', replacement);
        prodConfig.__Rewire__('loaders', replacement);
        prodConfig.__Rewire__('path', {
            resolve: (x, y) => (y),
        });
    });

    it('should export a valid object', () => {
        const configObject = prodConfig();
        
        expect(configObject).to.be.an('object');

        expect(configObject).to.have.property('context');
        expect(configObject.context).to.be.a('string');

        expect(configObject).to.have.property('devtool');
        expect(configObject.devtool).to.equal('source-map');

        expect(configObject).to.have.property('entry');
        expect(configObject.entry).to.equal('./src/index');

        expect(configObject).to.have.property('stats');
        expect(configObject.stats).to.equal('minimal');

        expect(configObject).to.have.property('target');
        expect(configObject.target).to.equal('web');

        expect(configObject).to.have.property('output');
        expect(configObject.output).to.have.property('path');
        expect(configObject.output).to.have.property('filename', '[name].[hash].js');

        expect(configObject).to.have.property('module');
        expect(configObject.module).to.have.property('rules').which.is.an('array');

        expect(configObject).to.have.property('plugins').which.is.an('array');
    });

    after(() => {
        prodConfig.__ResetDependency__('plugins');
        prodConfig.__ResetDependency__('loaders');
        prodConfig.__ResetDependency__('path');
    });
});