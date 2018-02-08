import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy, stub } from 'sinon';

describe('App / Service / Redux', () => {
    it('should export a valid redux store', () => {
        const store = require('./index').default;
        expect(store).to.be.a('object');
        expect(store).to.have.property('dispatch').which.is.a('function');
        expect(store).to.have.property('subscribe').which.is.a('function');
        expect(store).to.have.property('getState').which.is.a('function');
        expect(store).to.have.property('replaceReducer').which.is.a('function');
    });

    it('should decorated the store when running on the browser', async () => {
        process.env.BUILD_TARGET = 'browser';
        
        global.window = {
            REDUX_PRELOADED_STATE: 'hello',
        };

        const promiseMiddlewareSpy = spy();
        const applyMiddlewareSpy = spy();
        const composeSpy = spy();
        const createStoreStub = stub().returns({});

        proxyquire.noCallThru().noPreserveCache().load('./index.js', {
            'redux-promise-middleware': promiseMiddlewareSpy,
            redux: {
                applyMiddleware: applyMiddlewareSpy,
                compose: composeSpy,
                createStore: createStoreStub,
            },
        });

        expect(promiseMiddlewareSpy.calledOnce).to.be.true;
        expect(applyMiddlewareSpy.calledWith(promiseMiddlewareSpy()));
        expect(composeSpy.called).to.be.false;
        expect(createStoreStub.calledOnce).to.be.true;

        delete global.window;
        process.env.BUILD_TARGET = 'node';
    });
});
