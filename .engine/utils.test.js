/* eslint-env node, mocha */

import { expect } from 'chai';

import utils from './utils';

describe('Utillity functions', () => {
    before(() => {
        utils.__Rewire__('path', {
            resolve: (x, y) => y,
        });
    });

    it('should adapt to env changes', () => {
        utils.__Rewire__('env', 'development');

        expect(utils).to.be.an('object');
        expect(utils).to.have.property('resolve').which.is.a('function');
        expect(utils).to.have.property('env').which.is.a('function');

        expect(utils.env()).to.equal('development');

        utils.__ResetDependency__('env');
        utils.__Rewire__('env', 'production');

        expect(utils.env()).to.equal('production');

        utils.__ResetDependency__('env');
        utils.__Rewire__('env', 'production');
        utils.__Rewire__('target', 'node');

        expect(utils.env()).to.equal('node');

        utils.__ResetDependency__('env');
        utils.__ResetDependency__('target');
    });

    it('should resolve paths correctly', () => {
        expect(utils.resolve('hello')).to.equal('hello');
    });

    after(() => {
        utils.__ResetDependency__('path');
    });
});