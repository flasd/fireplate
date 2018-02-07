import sinon from 'sinon';
import proxyquirer from 'proxyquire';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { stub, spy } from 'sinon';

import appShellMiddleware from './index';

chai.use(sinonChai);

describe('Server / appShellMiddleware', () => {
    it('should serve the app shell', async () => {
        const readFileStub = stub().returns(Promise.resolve(new Buffer('<Hello />')));
        const resolveStub = stub().returns('Resolved baby');
        const serializeStub = stub().returns('');

        const middleware = proxyquirer.noCallThru().noPreserveCache().load('./index.js', {
            'mz/fs': {
                readFile: readFileStub,
            },
            'path': {
                resolve: resolveStub,
            },
            'serialize-javascript': serializeStub,
        }).default;

        const request = mockReq();
        const response = mockRes();

        await middleware(request, response);

        expect(response.send).to.have.been.calledWith('<Hello />');
        expect(readFileStub).to.have.been.calledOnce;
        expect(resolveStub).to.have.been.calledOnce;
        expect(serializeStub).to.have.been.calledTwice;
    });

    it('should handle erros gracefully', async () => {
        const original = console.error;
        console.error = stub();

        const resolveStub = stub().throws('TypeError');

        const middleware = proxyquirer.noCallThru().noPreserveCache().load('./index.js', {
            'path': {
                resolve: resolveStub,
            }
        }).default;

        const request = mockReq();
        const response = mockRes();

        await middleware(request, response);

        expect(resolveStub).to.have.been.calledOnce;
        // expect(console.error).to.have.been.calledWith('Error while trying to get HTML template.\n');
        expect(response.status).to.have.been.calledWith(500);
        expect(response.end).to.have.been.called;

        console.error = original;
    });
});