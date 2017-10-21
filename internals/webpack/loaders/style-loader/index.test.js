/* eslint-env node, mocha */

import { expect } from 'chai';

import styleLoader from './index';

describe('Style Loader Spec', () => {
    before(() => {
        styleLoader.__Rewire__('ExtractText', {
            extract: arr => arr
        });
    });

    it('should export a function', () => {
        expect(styleLoader).to.be.a('function');
    });

    it('should return a valid object', () => {
        const output = styleLoader('development');

        expect(output).to.be.an('object');
        expect(output).to.have.property('test');
        expect(output).to.have.property('use').which.is.an('array').with.lengthOf(5);

        expect(output.test.test('.scss')).to.be.true;
        expect(output.test.test('.css')).to.be.false;
    });

    it('should adapt to env changes', () => {
        const devOutput = styleLoader('development');
        const prodOutput = styleLoader('production');
        const servOutput = styleLoader('node');

        // ///// DEVELOPMENT
        // 
        expect(devOutput.use[0]).to.have.property('loader', 'style-loader');
        expect(devOutput.use[0]).to.have.property('options').to.have.property('emitFile', true);

        expect(devOutput.use[1]).to.have.property('loader', 'css-loader');
        expect(devOutput.use[1]).to.have.property('options').to.have.property('module', true);
        expect(devOutput.use[1]).to.have.property('options').to.have.property('localIdentName', '[hash:base64:8]');
        expect(devOutput.use[1]).to.have.property('options').to.have.property('minimize', false);

        expect(devOutput.use[2]).to.have.property('loader', 'postcss-loader');
        expect(devOutput.use[3]).to.have.property('loader', 'sass-loader');

        // ///// PRODUCTION
        //
        expect(prodOutput.use[0]).to.have.property('loader', 'css-loader');
        expect(prodOutput.use[0]).to.have.property('options').to.have.property('module', true);
        expect(prodOutput.use[0]).to.have.property('options').to.have.property('localIdentName', '[hash:base64:8]');
        expect(prodOutput.use[0]).to.have.property('options').to.have.property('minimize', true);

        expect(prodOutput.use[1]).to.have.property('loader', 'postcss-loader');
        expect(prodOutput.use[2]).to.have.property('loader', 'sass-loader');

        expect(prodOutput).to.be.an('object');
        expect(prodOutput).to.have.property('test');
        expect(prodOutput).to.have.property('use').which.is.an('array').with.lengthOf(3);

        expect(prodOutput.test.test('.scss')).to.be.true;
        expect(prodOutput.test.test('.css')).to.be.false;

        // ///// SERVER
        //
        expect(servOutput.use[0]).to.have.property('loader', 'css-loader');
        expect(servOutput.use[0]).to.have.property('options').to.have.property('module', true);
        expect(servOutput.use[0]).to.have.property('options').to.have.property('localIdentName', '[hash:base64:8]');
        expect(servOutput.use[0]).to.have.property('options').to.have.property('minimize', false);

        expect(servOutput.use[1]).to.have.property('loader', 'postcss-loader');
        expect(servOutput.use[2]).to.have.property('loader', 'sass-loader');

        expect(servOutput).to.be.an('object');
        expect(servOutput).to.have.property('test');
        expect(servOutput).to.have.property('use').which.is.an('array').with.lengthOf(3);

        expect(servOutput.test.test('.scss')).to.be.true;
        expect(servOutput.test.test('.css')).to.be.false;

    });

    after(() => {
        styleLoader.__ResetDependency__('ExtractText');
    });
});
