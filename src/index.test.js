/* eslint-disable */

import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import request from 'supertest';

const mockMiddleware = { default: (rq, rs, nx) => nx(), };

const server = proxyquire.noCallThru().noPreserveCache().load('./index.js', {
    './app/server': mockMiddleware,
    './middleware/load-template': mockMiddleware,
    './middleware/reject-file': mockMiddleware,
    './middleware/app-shell': mockMiddleware,
});

describe('Server', () => {
    it('should work without exploding', (done) => {
        request(server)
            .get('/')
            .expect(404, done);
    });
});
