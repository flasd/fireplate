import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import request from 'supertest';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { stub, spy } from 'sinon';

chai.use(sinonChai);

const mockMiddleware = (rq, rs, nx) => nx();
const mockOwnMiddleware = { default: mockMiddleware, };

const strictProxyquire = proxyquire.noCallThru().noPreserveCache();

const server = strictProxyquire.load('./index.js', {
    'connect-session-firebase': () => function Constructor() { },
    'express-session': () => mockMiddleware,
    'firebase-admin': { initializeApp: () => ({ database: () => { } }) },
    'firebase-functions': { config: () => ({ firebase: '' }), https: { onRequest: () => {} } },
    './app/server': mockOwnMiddleware,
    './middleware/load-template': mockOwnMiddleware,
    './middleware/reject-file': mockOwnMiddleware,
    './middleware/app-shell': mockOwnMiddleware,
});

describe('Server', () => {
    it('should work without exploding', (done) => {
        request(server)
            .get('/')
            .expect(404, done);
    });

    it('should fix null path exception', (done) => {
        expect(server.fixNullPathException).to.be.a('function');
        expect(server.fixNullPathException(() => {})).to.be.a('function');

        const appStub = stub();
        const fixedApp = server.fixNullPathException(appStub);
        
        const request = mockReq({
            path: null,
            url: '',
        });

        const response = mockRes();

        fixedApp(request, response)
        expect(request.url).to.equal('/');

        done();
    });

    it('should do nothing to the url when it exits', (done) => {
        expect(server.fixNullPathException).to.be.a('function');
        expect(server.fixNullPathException(() => { })).to.be.a('function');

        const appStub = stub();
        const fixedApp = server.fixNullPathException(appStub);

        const request = mockReq({
            path: 'hello',
            url: '/hello',
        });

        const response = mockRes();

        fixedApp(request, response)
        expect(request.url).to.equal('/hello');

        done();
    })

    it('should export the correct app', () => {
        // process.env.NODE_ENV = 'production';

        // expect(exported).to.have.property('app').which.is.a('function');
    });
});
