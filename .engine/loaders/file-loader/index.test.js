/* eslint-env node, mocha */

import { expect } from 'chai';
import fileLoader from './index';

describe('File Loader Spec', () => {
    it('should export a function', () => {
        expect(fileLoader).to.be.a('function');
    });

    it('should return a valid object', () => {
        const output = fileLoader('development');
        const extensions = ['.png', '.jpg', '.jpeg',' .gif'];

        expect(output).to.have.property('test');
        extensions.forEach((ext) => {
            expect(output.test.test(ext)).to.be.true;
        });

        expect(output).to.have.property('use').which.is.an('array').of.length(1);
        expect(output.use[0]).to.be.an('object');
        expect(output.use[0]).to.have.property('loader', 'file-loader');
        expect(output.use[0]).to.have.property('options').which.is.an('object');
        expect(output.use[0].options).to.have.property('name').which.is.a('string');
        expect(output.use[0].options).to.have.property('emitFile').which.is.a('boolean');
    });

    it('should adapt to env changes', () => {
        const devOutput = fileLoader('development');
        const prodOutput = fileLoader('production');
        const serverOutput = fileLoader('node');
        const bogusOutput = fileLoader('bogus');

        expect(devOutput).to.be.an('object');
        expect(devOutput.use[0].options).to.have.property('name', '[name].[ext]');
        expect(devOutput.use[0].options).to.have.property('emitFile', true);

        expect(prodOutput).to.be.an('object');
        expect(prodOutput.use[0].options).to.have.property('name', '[name]-[hash].[ext]');
        expect(prodOutput.use[0].options).to.have.property('emitFile', true);

        expect(serverOutput).to.be.an('object');
        expect(serverOutput.use[0].options).to.have.property('name', '[name]-[hash].[ext]');
        expect(serverOutput.use[0].options).to.have.property('emitFile', false);

        expect(bogusOutput).to.be.an('object');
        expect(bogusOutput.use[0].options).to.have.property('name', '[name]-[hash].[ext]');
        expect(bogusOutput.use[0].options).to.have.property('emitFile', true);
    });
});