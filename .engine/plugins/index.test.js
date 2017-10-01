/* eslint-env node, mocha */

import { expect } from 'chai';

import plugins from './index';

function Replacement(argument) {
    return argument;
}

const webpack = {
    HotModuleReplacementPlugin: Replacement,
    optimize: {
        CommonsChunkPlugin: Replacement
    },
};

describe('Plugin Spec', () => {
    before(() => {
        plugins.__Rewire__('webpack', webpack);
        plugins.__Rewire__('ExtractTextPlugin', Replacement);
        plugins.__Rewire__('HtmlWebpackPlugin', Replacement);
        plugins.__Rewire__('BundleAnalyzerPlugin', Replacement);
        plugins.__Rewire__('NpmInstallPlugin', Replacement);
        plugins.__Rewire__('OfflinePlugin', Replacement);
    });

    it('should export a valid function', () => {
        expect(plugins).to.be.a('function');
        expect(plugins()).to.be.an('array');
    });

    it('should return the correct plugins in dev env', () => {
        const devOutput = plugins('development');

        expect(devOutput).to.be.an('array').with.lengthOf(3);

        expect(devOutput[0]).to.be.an('object');
        expect(devOutput[0]).to.have.property('title');
        expect(devOutput[0]).to.have.property('minify')
            .which.has.property('collapseWhitespace', true);
        expect(devOutput[0]).to.have.property('template');

        expect(devOutput[1]).to.be.ok;
        expect(devOutput[2]).to.be.ok;
    });

    it('should return the correct plugins in prod env', () => {

        const prodOutput = plugins('production');

        expect(prodOutput).to.be.an('array').with.lengthOf(6);

        expect(prodOutput[0]).to.be.ok;
        expect(prodOutput[1]).to.be.ok;

        expect(prodOutput[2]).to.be.ok;
        expect(prodOutput[2]).to.have.property('title');
        expect(prodOutput[2]).to.have.property('minify')
            .which.has.property('collapseWhitespace', true);
        expect(prodOutput[2]).to.have.property('template');

        expect(prodOutput[3]).to.be.an('object');
        expect(prodOutput[3]).to.have.property('name', 'vendor.[hash].js');
        expect(prodOutput[3]).to.have.property('minChunks').which.is.a('function');
        expect(prodOutput[3].minChunks({ context: 'node_modules' })).to.be.true;

        expect(prodOutput[4]).to.be.an('object');
        expect(prodOutput[4]).to.have.property('name', 'manifest.[hash].js');
        expect(prodOutput[4]).to.have.property('minChunks', Infinity);

        expect(prodOutput[5]).to.be.ok;
    });

    it('should return the correct plugins in node env', () => { 
        const servOutput = plugins('node');

        expect(servOutput).to.be.an('array').with.lengthOf(1);

        expect(servOutput[0]).to.be.an('object');
        expect(servOutput[0]).to.have.property('title');
        expect(servOutput[0]).to.have.property('minify')
            .which.has.property('collapseWhitespace', true);
        expect(servOutput[0]).to.have.property('template');
    });

    after(() => {
        plugins.__ResetDependency__('webpack');
        plugins.__ResetDependency__('ExtractTextPlugin');
        plugins.__ResetDependency__('HtmlWebpackPlugin');
        plugins.__ResetDependency__('BundleAnalyzerPlugin');
        plugins.__ResetDependency__('NpmInstallPlugin');
        plugins.__ResetDependency__('OfflinePlugin');
    });
});
