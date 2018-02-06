import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy, stub } from 'sinon';

function setEnv(newProps) {
    const oldEnv = Object.assign({}, process.env);
    process.env = Object.assign({}, process.env, newProps);

    return () => {
        process.env = oldEnv;
    };
}

describe('Redux Service', () => {
    it('should decorated the store when running on the browser', (done) => {
        const resetEnv = setEnv({ BUILD_TARGET: 'browser' });
        global.window = {};

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

        delete global.window;
        resetEnv();
        done();
    });

    it('should expose the store to the redux devtool during development');

    it('should export a valid redux store', (done) => {
        const store = require('./index').default;
        expect(store).to.be.a('object');
        expect(store).to.have.property('dispatch').which.is.a('function');
        expect(store).to.have.property('subscribe').which.is.a('function');
        expect(store).to.have.property('getState').which.is.a('function');
        expect(store).to.have.property('replaceReducer').which.is.a('function');
        done();
    });
});
