import React from 'react';
import ReactHelmet from 'react-helmet';
import asyncBootstrapper from 'react-async-bootstrapper';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import { readFileSync } from 'fs';
import { renderToString } from 'react-dom/server';
import { resolve } from 'path';
import { pipeAsync } from './services/reporter';

import App from './app';
import getStore from './services/state';

const templatePath = resolve(__dirname, './index.html');
const template = readFileSync(templatePath).toString();


/**
 * Renders the app and ships it to the user
 *
 * @param      {express.Request}  request   The request,
 * @param      {express.Response}  response  The response,
 */
export default function renderingMiddleware(request, response) {
    pipeAsync(getStore)
        .then((store) => {
            const asyncContext = createAsyncContext();
            const routerContext = {};

            const app = (
                <AsyncComponentProvider asyncContext={asyncContext}>
                    <Provider store={store}>
                        <StaticRouter location={request.url} context={routerContext}>
                            <App />
                        </StaticRouter>
                    </Provider>
                </AsyncComponentProvider>
            );

            if (routerContext.url) {
                return response.redirect(302, routerContext.url);
            }

            return asyncBootstrapper(app)
                .then(() => {
                    const appMarkup = renderToString(app);
                    const reduxState = store.getState();
                    const asyncState = asyncContext.getState();

                    const helmetData = ReactHelmet.renderStatic();

                    const html = template
                        .replace('<title></title>', helmetData.title.toString())
                        .replace('<!-- ::META:: -->', helmetData.meta.toString())
                        .replace('<!-- ::APP:: -->', appMarkup)
                        .replace('/* ::REDUX__STATE:: */', serialize(reduxState))
                        .replace('/* ::ASYNC__STATE:: */', serialize(asyncState));

                    response.status(200).send(html);
                });
        })
        .catch(() => {
            response.status(500).send('The server encountered an unexpected condition which prevented it from fulfilling the request.');
        });
}
