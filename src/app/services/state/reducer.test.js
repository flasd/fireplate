import { expect } from 'chai';

import reducer from './reducer';

describe('Redux rootReducer', () => {
    it('should reduce actions properly', () => {
        expect(reducer).to.be.a('function');
        expect(reducer()).to.equal('hello');
        expect(reducer('bye')).to.equal('bye');
    });
});
