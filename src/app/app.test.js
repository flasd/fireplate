import React from 'react';
import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

chai.use(sinonChai);

describe('App / App', () => {
    it('should render without exploding', () => {
        const App = proxyquire.noCallThru().noPreserveCache().load('./app.jsx', {
            './services/analytics': {},
            './services/service-worker': {},
        }).default;

        const container = shallow(<App />);
        expect(container).to.be.ok;
        expect(container.name()).to.equal('main');
        expect(container.childAt(0).children()).to.have.lengthOf(3);
    });
});
