/* eslint-disable */
import React from 'react';
import asyncBootstrapper from 'react-async-bootstrapper';
import cheerio from 'cheerio';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import { expect } from 'chai';
import { renderToStaticMarkup } from 'react-dom/server';
import { shallow } from 'enzyme';


import Container from './index';
import Home from './Home';

describe('App / Views / Home ', () => {
    it('should render without exploding', () => {
        expect(shallow(<Container />)).to.be.ok;
    });

    it('should resolve the Home component on the server', (done) => {
        const asyncContext = createAsyncContext();

        const component = (
            <AsyncComponentProvider asyncContext={asyncContext}>
                <Container />
            </AsyncComponentProvider>
        );

        asyncBootstrapper(component)
            .then(() => {
                const html = renderToStaticMarkup(component);
                const $ = cheerio.load(html);

                expect($('div').children().length).to.equal(1);
                expect($('p').text()).to.equal('Here lies the future.');

                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
