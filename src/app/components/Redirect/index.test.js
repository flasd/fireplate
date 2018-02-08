import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Container from './index';
import Redirect from './Redirect';

describe('App / Components / Redirect', () => {
    it('should render without exploding', () => {
        expect(shallow(<Container />)).to.be.ok;
    });

    it('should export the Redirect component', () => {
        const wrapper = shallow(<Container />);
        expect(<Container />).to.deep.equal(<Redirect />);
    });
});
