import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NotFound from './NotFound';

describe('App / Views / NotFound / NotFound', () => {
    it('should render without exploding', () => {
        expect(shallow(<NotFound />)).to.be.ok;
    });

    it('should render the proper child components', () => {
        const wrapper = shallow(<NotFound />);

        expect(wrapper.childAt(0).name()).to.equal('HelmetWrapper');
        expect(wrapper.childAt(1).name()).to.equal('p');
        expect(wrapper.children()).to.have.length(2);
    });

    it('should render child components with proper content', () => {
        const wrapper = shallow(<NotFound />);

        expect(wrapper.childAt(0).childAt(0).text()).to.equal('404 Route @ Fireplate App');
        expect(wrapper.childAt(0).children()).to.have.length(1);

        expect(wrapper.childAt(1).childAt(0).text()).to.equal('You must create it.');
        expect(wrapper.childAt(1).children()).to.have.length(1);
    });

    it('should mark the static context as a 404 on the server', () => {
        const staticContext = { status: 200 };
        const wrapper = shallow(<NotFound staticContext={staticContext} />);

        expect(staticContext).to.have.property('status', 404);
    });
});
