/* eslint-disable */
import sinon from 'sinon';
import { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import rejectFileRequestMiddleware from './index';

describe('Server / rejectFileRequestMiddleware', () => {
    it('should block file requests', () => {
        const request = mockReq({
            url: '.'
        });
        const response = mockRes();
        const next = sinon.spy();

        rejectFileRequestMiddleware(request, response, next);

        expect(response.status.calledOnce).to.be.true;
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.end.calledOnce).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should defer control to next middleware on non-file requests', () => {
        const request = mockReq({
            url: 'no-dot'
        });
        const response = mockRes();
        const next = sinon.spy();

        rejectFileRequestMiddleware(request, response, next);

        expect(response.status.called).to.be.false;
        expect(response.end.called).to.be.false;
        expect(next.calledOnce).to.be.true;
    });
})