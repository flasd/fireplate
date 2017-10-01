/* eslint-env node, mocha */

import { expect } from 'chai';

import loaders from './index';

describe('Loaders Module Spec', () => {
    before(() => {
        const replacement = env => env === 'myEnv';

        loaders.__Rewire__('babelLoader', replacement);
        loaders.__Rewire__('fileLoader', replacement);
        loaders.__Rewire__('rawLoader', replacement);
        loaders.__Rewire__('styleLoader', replacement);
    });

    it('should export a function', () => {
        expect(loaders).to.be.a('function');
    });

    it('should call loaders with correct env', () => {
        const output = loaders('myEnv');
        const expectedOutput = [true, true, true, true];

        expect(output).to.be.an('array').with.lengthOf(4);
        expect(output).to.deep.equal(expectedOutput);
    });

    after(() => {
        loaders.__ResetDependency__('babelLoader');
        loaders.__ResetDependency__('fileLoader');
        loaders.__ResetDependency__('rawLoader');
        loaders.__ResetDependency__('styleLoader');
    });
});
