import React from 'react';
import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

chai.use(sinonChai);

describe('App', () => {
    before(() => {
        global.window = {};
        global.document = {
            getElementById: () => {},
        }
    });

    it('should render without exploding', () => {
        const App = proxyquire.noCallThru().noPreserveCache().load('./index.jsx', {
            'react-async-bootstrapper': () => ({ then: () => {} }),
        }).default;

        const Root = App(() => <div name="app" />);
        const wrapper = shallow(<Root />);

        expect(wrapper).to.be.ok;
        expect(wrapper.name()).to.equal('AsyncComponentProvider');
        expect(wrapper.childAt(0).name()).to.equal('Provider');
        expect(wrapper.childAt(0).childAt(0).name()).to.equal('Router');
        expect(wrapper.childAt(0).childAt(0).childAt(0).exists()).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(0).html()).to.equal('<div name="app"></div>');
    });

    it('should bootstrap properly', async () => {
        const renderStub = stub();

        const bootstrap = proxyquire.noCallThru().noPreserveCache().load('./index.jsx', {
            'react-dom': {
                render: renderStub
            }
        }).bootstrap;

        await bootstrap;

        expect(renderStub).to.have.been.calledOnce;
    });

    after(() => {
        delete global.window;
        delete global.document;
    });
});
