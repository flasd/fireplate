/* eslint-env node, mocha */

import { expect } from 'chai';

import devConfig from './development';

describe('Webpack Dev Config Object', () => {
    before(() => {
        const replacement = env => ([env]);

        devConfig.__Rewire__('plugins', replacement);
        devConfig.__Rewire__('loaders', replacement);
        devConfig.__Rewire__('path', {
            resolve: (x, y) => (y),
        });
    });

    it('should export a valid object', () => {
        const configObject = devConfig();
        
        expect(configObject).to.be.an('object');

        expect(configObject).to.have.property('context');
        expect(configObject.context).to.be.a('string');

        expect(configObject).to.have.property('devtool');
        expect(configObject.devtool).to.equal('source-map');

        expect(configObject).to.have.property('entry');
        expect(configObject.entry).to.equal('./src/index');

        expect(configObject).to.have.property('target');
        expect(configObject.target).to.equal('web');

        expect(configObject).to.have.property('output');
        expect(configObject.output).to.have.property('path');
        expect(configObject.output).to.have.property('filename', 'bundle.js');

        expect(configObject).to.have.property('module');
        expect(configObject.module).to.have.property('rules').which.is.an('array');

        expect(configObject).to.have.property('plugins').which.is.an('array');

        expect(configObject).to.have.property('devServer');
        expect(configObject.devServer).to.have.property('contentBase');
        expect(configObject.devServer).to.have.property('historyApiFallback', true);
        expect(configObject.devServer).to.have.property('hot', true);
        expect(configObject.devServer).to.have.property('port', 8080);
    });

    after(() => {
        devConfig.__ResetDependency__('plugins');
        devConfig.__ResetDependency__('loaders');
        devConfig.__ResetDependency__('path');
    });
});