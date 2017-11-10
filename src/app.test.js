/* eslint-env node, mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import reactRouter from 'react-router';

import App from './app';

describe('<App />', () => {
    it('Should render <Route exact path="/" component={HomeView} />', () => {
        const stubbedRouter = sinon.stub(reactRouter, 'Route');
        stubbedRouter.returns(<div>Sup</div>);

        const app = shallow(<App />);

        console.log(app);
    });
});
