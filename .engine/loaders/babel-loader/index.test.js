/* eslint-env node, mocha */

import { expect } from 'chai';

import babelLoader from './index';

describe('Babel Loader Spec', () => {
    it('should export a function', () => {
        expect(babelLoader).to.be.a('function');
    });
    it('should return a valid object', () => {
        const output = babelLoader();

        expect(output).to.be.an('object');
        expect(output).to.have.property('test');
        expect(output).to.have.property('use').which.is.an('array');
        expect(output.use[0]).to.be.an('object').which.has.property('loader', 'babel-loader');

        const extesions = ['.js', '.jsx', '.es6', '.babel'];

        extesions.forEach(ext => {
            expect(output.test.test(ext)).to.be.true;
        });
    });
});
