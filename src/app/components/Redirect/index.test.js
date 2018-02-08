import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Container from './index';
import Redirect from './Redirect';

describe('App / Components / Redirect', () => {
    it('should render without exploding', () => {
        expect(shallow(<Container from="/" to="/" />)).to.be.ok;
    });

    it('should export the Redirect component', () => {
        const wrapper = shallow(<Container />);
        expect(<Container from="/" to="/" />).to.deep.equal(<Redirect from="/" to="/" />);
    });
});
