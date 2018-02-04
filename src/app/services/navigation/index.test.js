/* eslint-env node, es6, mocha */

import { expect } from 'chai';

import history from './index';

describe('App / Service / Navitarion', () => {
    it('should export the right properties', () => {
        expect(history).to.be.a('object');
        expect(history).to.have.property('listen').which.is.a('function');
        expect(history).to.have.property('push').which.is.a('function');
        expect(history).to.have.property('replace').which.is.a('function');
        expect(history).to.have.property('go').which.is.a('function');
        expect(history).to.have.property('goBack').which.is.a('function');
        expect(history).to.have.property('goForward').which.is.a('function');
        expect(history).to.have.property('canGo').which.is.a('function');
    });
});
