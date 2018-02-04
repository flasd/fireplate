/* eslint-disable */

import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { spy } from 'sinon';


function setEnv(newProps) {
    const oldEnv = Object.assign({}, process.env);
    process.env = Object.assign({}, process.env, newProps);

    return () => {
        process.env = oldEnv;
    };
}

describe('App / Service / Service Worker', () => {
    it('should do nothing in node env', () => {
        const resetEnv = setEnv({ BUILD_TARGET: 'node' });

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;

        resetEnv();
    });

    it('should do nothing in developer env', () => {
        const resetEnv = setEnv({ NODE_ENV: 'development'});

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.called).to.be.false;

        resetEnv();
    });

    it('should install the service worker when running on production in the browser', () => {
        const resetEnv = setEnv({ NODE_ENV: 'production', BUILD_TARGET: 'browser' });

        const installSpy = spy();
        const offlinePluginStub = { install: installSpy };

        proxyquire.noPreserveCache().noCallThru().load('./index.js', {
            'offline-plugin/runtime': offlinePluginStub,
        });

        expect(installSpy.calledOnce).to.be.true;

        resetEnv();
    });
});
