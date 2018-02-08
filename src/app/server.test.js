import proxyquirer from 'proxyquire';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { stub, spy } from 'sinon';

import renderAppMiddleware from './server';

chai.use(sinonChai);

describe('Server / renderAppMiddleware', () => {
    it('should run without exploding', async () => {
        const request = mockReq({
            url: '/',
        });

        const response = mockRes({
            locals: {
                htmlCanvas: '',
            }
        });

        await renderAppMiddleware(request, response);

        expect(response.send).to.have.been.called;
        expect(response.status).to.have.been.calledWith(200);
    });

    it('should render a notFound route with 404 status when req.url doesnt exists', async () => {
        const request = mockReq({
            url: '/bogus',
        });

        const response = mockRes({
            locals: {
                htmlCanvas: '',
            }
        });

        await renderAppMiddleware(request, response);

        expect(response.send).to.have.been.called;
        expect(response.status).to.have.been.calledWith(404);
    });

    it('should handle redirects properly', async () => {
        const request = mockReq({
            url: '/origin',
        });

        const response = mockRes({
            locals: {
                htmlCanvas: '',
            }
        });

        await renderAppMiddleware(request, response);

        expect(response.redirect).to.have.been.calledWith(302, '/destiny');
    });

    it('should handle rendering erros propertly', async () => {
        const renderAppMiddlewareMocked = proxyquirer.noPreserveCache().load('./server.jsx', {
            'react-async-component': {
                createAsyncContext: stub().throws(),
            }
        }).default;

        const request = mockReq({
            url: '/',
        });

        const response = mockRes();

        const originalErr = console.error;
        console.error = stub();

        await renderAppMiddlewareMocked(request, response);
        expect(console.error).to.have.been.called;
        expect(response.status).to.have.been.calledWith(500);
        expect(response.end).to.have.been.called;

        console.error = originalErr;
    });
});
