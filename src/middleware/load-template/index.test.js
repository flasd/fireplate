import sinon from 'sinon';
import proxyquirer from 'proxyquire';
import { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';

function getMiddleware(shouldThrow) {
    return proxyquirer.noCallThru().noPreserveCache().load('./index.js', {
        'mz/fs': {
            readFile: () => {
                if (shouldThrow) {
                    throw new Error('');
                }

                return Promise.resolve(new Buffer('hello'));
            },
        },
        'path': {
            resolve: () => undefined,
        },
    }).default;
}

describe('Server / loadTemplateMiddleware', () => {
    let originalConsoleError;

    before(() => {
        originalConsoleError = console.error;
        console.error = sinon.spy();
    });

    it('should load html shell', async () => {
        const loadTemplateMiddleware = getMiddleware(false);

        const request = mockReq();
        const response = mockRes();
        const next = sinon.spy();

        await loadTemplateMiddleware(request, response, next);
        expect(response.locals.htmlCanvas).to.be.a('string');
        expect(next.called).to.be.true;
    });

    it('should return a 500 error if trying to read the template fails', async () => {
        const loadTemplateMiddleware = getMiddleware(true);

        const request = mockReq();
        const response = mockRes();
        const next = sinon.spy();

        await loadTemplateMiddleware(request, response, next);
        expect(response.status.calledOnce).to.be.true;
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.end.calledOnce).to.be.true;
        expect(console.error.calledOnce).to.be.true;
    });

    after(() => {
        console.error = originalConsoleError;
    });
})