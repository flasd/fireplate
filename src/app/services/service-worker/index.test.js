import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy } from 'sinon';


describe('App / Service / Service Worker', () => {
    it('should do nothing in node env', async () => {
        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;
    });

    it('should do nothing in developer env', async () => {
        process.env.NODE_ENV = 'development';

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;

        process.env.NODE_ENV = 'test';
    });

    it('should install the service worker when running on production in the browser', async () => {
        process.env.NODE_ENV = 'production';
        process.env.BUILD_TARGET = 'browser';

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.calledOnce).to.be.true;

        process.env.NODE_ENV = 'test';
        process.env.BUILD_TARGET = 'node';
    });
});
