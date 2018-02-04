/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Container from './index';
import NotFound from './NotFound';

describe('App / Views / NotFound', () => {
    it('should render without exploding', () => {
        expect(shallow(<Container />)).to.be.ok;
    });

    it('should export the NotFound component', () => {
        const wrapper = shallow(<Container />);
        expect(<Container />).to.deep.equal(<NotFound />);
    });
});
