import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';

import Redirect from './Redirect';

describe('Component / Redirect / Redirect', () => {
    it('should render without exploding', () => {
        expect(shallow(<Redirect from="/" to="/" />)).to.be.ok;
    });

    it('should update context status and url', () => {
        const routerContext = {};
        expect(render(
            <StaticRouter location="/" context={routerContext}>
                <Redirect from="/" to="/dest" />
            </StaticRouter>
        ));

        expect(routerContext).to.have.property('status', 302);
        expect(routerContext).to.have.property('url', '/dest');
    });

    it('should allow custom redirect statuses', () => {
        const routerContext = {};
        expect(render(
            <StaticRouter location="/" context={routerContext}>
                <Redirect from="/" to="/dest" status={500} />
            </StaticRouter>
        ));

        expect(routerContext).to.have.property('status', 500);
        expect(routerContext).to.have.property('url', '/dest');
    });

    it('should render normally in a browser env', () => {
        const wrapper = render(
            <Router history={createMemoryHistory()}>
                <Redirect from="/" to="/dest" status={500} />
            </Router>
        );

        expect(wrapper.text()).to.equal('')
    });
});
