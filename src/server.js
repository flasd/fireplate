import express from 'express';
import expressHelmet from 'helmet';
import React from 'react';
import ReactHelmet from 'react-helmet';
import session from 'express-session';
import { Provider } from 'react-redux';
import { readFileSync } from 'fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './app';
import { getStore } from './services/state';

// ////////////////////////////////////////
//

const template = readFileSync('./public/index.html');

/**
 * Render's the root component for the app.
 *
 * @param      {Object}  store   The redux store,
 * @param      {string}  url     The request url,
 * @return     {Object}  Containing the rendered app or the redirec url.
 */
function renderComponent(appStore, requestUrl) {
    const context = {};

    const app = renderToString(
        <Provider store={appStore}>
            <StaticRouter location={requestUrl} context={context}>
                <App />
            </StaticRouter>
        </Provider>,
    );

    return {
        data: context.url ? null : app,
        url: context.url,
    };
}

/**
 * Renders the app full html page.
 *
 * @param      {string}  rawTemplate   The raw template,
 * @param      {Object}  helmetData    The helmet metadata,
 * @param      {string}  appComponent  The application root component,
 * @param      {Object}  appState      The application state,
 * @return     {string}  Rendered html page.
 */
function renderHtml(rawTemplate, helmetData, appComponent, appState) {
    return rawTemplate
        .replace('<title></title>', helmetData.title.toString())
        .replace('<!-- ::META:: -->', helmetData.meta.toString())
        .replace('<!-- ::APP:: -->', appComponent)
        .replace('/* ::STATE:: */', JSON.stringify(appState));
}

/**
 * Handle requests
 *
 * @param      {Request}   request   The request,
 * @param      {Response}  response  The response,
 * @return     {Response}  the response yo
 */
function requestHandler(request, response) {
    getStore()
        .then((store) => {
            const app = renderComponent(store, request.url);

            if (app.data) {
                const helmetData = ReactHelmet.renderStatic();
                const appState = store.getState();

                const html = renderHtml(template, helmetData, app, appState);

                response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
                return response.status(200).send(html);
            }

            return response.redirect(302, app.url);
        });
}


// ////////////////////////////////////////
//

const app = express();
const cookieSecrets = ['jJ6#@3A5xL', '9cMb*l2U1P', 'a2n$oJ15X6'];
const cookieConfig = { cookie: { secure: true }, secret: cookieSecrets };

app.use(expressHelmet());
app.use(session(cookieConfig));
app.get('**', requestHandler);

export default app;
