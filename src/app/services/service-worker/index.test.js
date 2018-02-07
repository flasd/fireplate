import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy } from 'sinon';


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

describe('App / Service / Service Worker', () => {
    it('should do nothing in node env', async () => {
        const resetEnv = await setEnv({ BUILD_TARGET: 'node' });

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;

        await resetEnv();
    });

    it('should do nothing in developer env', async () => {
        const resetEnv = await setEnv({ NODE_ENV: 'development'});

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;

        await resetEnv();
    });

    it('should install the service worker when running on production in the browser', async () => {
        const resetEnv = await setEnv({ NODE_ENV: 'production', BUILD_TARGET: 'browser' });

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.calledOnce).to.be.true;

        await resetEnv();
    });
});
