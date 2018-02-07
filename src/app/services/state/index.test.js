import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy, stub } from 'sinon';

function setEnv(newProps) {
    const oldEnv = {};

    Object.keys(newProps).forEach(key => {
        oldEnv[key] = newProps[key];
        process.env[key] = newProps[key];
    });

    return Promise.resolve(() => {
        return Promise.resolve(() => {
            Object.keys(oldEnv).forEach(key => {
                process.env[key] = oldEnv[key];
            });
        });
    });
}

describe('App / Service / Redux', () => {
    before(() => {
        global.window = {};
    });

    it('should decorated the store when running on the browser', async () => {
        const resetEnv = await setEnv({ BUILD_TARGET: 'browser' });

        const promiseMiddlewareSpy = spy();
        const applyMiddlewareSpy = spy();
        const composeSpy = spy();
        const createStoreStub = stub().returns({});

        const store = proxyquire.noCallThru().noPreserveCache().load('./index.js', {
            'redux-promise-middleware': promiseMiddlewareSpy,
            'redux': {
                applyMiddleware: applyMiddlewareSpy,
                compose: composeSpy,
                createStore: createStoreStub,
            }
        });

        expect(promiseMiddlewareSpy.calledOnce).to.be.true;
        expect(applyMiddlewareSpy.calledWith(promiseMiddlewareSpy()));
        expect(composeSpy.called).to.be.false;
        expect(createStoreStub.calledOnce).to.be.true;

        await resetEnv();
    });

    it('should expose the store to the redux devtool during development');

    it('should export a valid redux store', () => {
        const store = require('./index').default;
        expect(store).to.be.a('object');
        expect(store).to.have.property('dispatch').which.is.a('function');
        expect(store).to.have.property('subscribe').which.is.a('function');
        expect(store).to.have.property('getState').which.is.a('function');
        expect(store).to.have.property('replaceReducer').which.is.a('function');
    });

    after(() => {
        delete global.window;
    });
});
