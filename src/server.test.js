/* eslint-env node, mocha */
import React from 'react';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app, {
    renderComponent,
    renderHtml,
    requestHandler,
} from './server';

const should = chai.should();

chai.use(chaiHttp);

describe('Server File', () => {
    describe('Render Component', () => {
        before(() => {
            app.__Rewire__('renderToString');
            app.__Rewire__('Provider');
            app.__Rewire__('StaticRouter');
            app.__Rewire__('App')
        });
    });
});
