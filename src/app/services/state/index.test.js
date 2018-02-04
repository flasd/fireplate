/* eslint-env node, es6, mocha */

import { expect } from 'chai';

import store from './index';

describe('Redux Service', () => {
    it('should apply store enhancers when running on the browser in prod env');
    it('should export a valid redux store', () => {
        expect(store).to.be.a('object');
        expect(store).to.have.property('dispatch').which.is.a('function');
        expect(store).to.have.property('subscribe').which.is.a('function');
        expect(store).to.have.property('getState').which.is.a('function');
        expect(store).to.have.property('replaceReducer').which.is.a('function');
    });
});
