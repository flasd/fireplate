/* eslint-env node, mocha */

import { expect } from 'chai';

import rawLoader from './index';

describe('Raw Loader Spec', () => {
    it('should export a function', () => {
        expect(rawLoader).to.be.a('function');
    });
    it('should return a valid object', () => {
        const output = rawLoader();

        expect(output).to.be.an('object');
        expect(output).to.have.property('test');
        expect(output).to.have.property('use').which.is.a('string').to.equal('raw-loader');

        const extesions = ['.txt', '.data', '.raw'];

        extesions.forEach(ext => {
            expect(output.test.test(ext)).to.be.true;
        });
    });
});
/* eslint-env node, mocha */