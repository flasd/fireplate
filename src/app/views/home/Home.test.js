/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Home from './Home';

describe('App / Views / Home / Home', () => {
    it('should render without exploding', () => {
        expect(shallow(<Home />)).to.be.ok;
    });

    it('should render the proper child components', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper.childAt(0).name()).to.equal('HelmetWrapper');
        expect(wrapper.childAt(1).name()).to.equal('p');
        expect(wrapper.children()).to.have.length(2);
    });

    it('should render child components with proper content', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper.childAt(0).childAt(0).text()).to.equal('Home Route @ Fireplate App');
        expect(wrapper.childAt(0).children()).to.have.length(1);

        expect(wrapper.childAt(1).childAt(0).text()).to.equal('Here lies the future.');
        expect(wrapper.childAt(1).children()).to.have.length(1);
    });
});
