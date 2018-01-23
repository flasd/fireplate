import React from 'react';
import asyncBootstrapper from 'react-async-bootstrapper';
import reactHelmet from 'react-helmet';
import serialize from 'serialize-javascript';
import fs from 'mz/fs';
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import {
    AsyncComponentProvider,
    createAsyncContext,
} from 'react-async-component';

import App from './app';
import store from './services/state';

const resolve = partial => path.resolve(process.cwd(), partial);

export async function loadTemplate(request, response, next) {
    try {
        const htmlCanvas = await fs.readFile(resolve('./public/template.html'));
        response.locals.htmlCanvas = htmlCanvas.toString();
        next();
    } catch (error) {
        console.error('Error while trying to get HTML template', error.message);
        response.status(500).end();
    }
}


export async function renderApp(request, response) {
    try {
        const { url } = request;

        if (url.indexOf('.') !== -1) {
            // If there's a '.' inside the url string, it means that the firebase
            // static files didn't found any matches and delegate the request to
            // the https function. Since we don't serve static files from the express
            // app, we return a 404 here.
            return response.status(404).end();
        }

        const asyncContext = createAsyncContext();
        const routerContext = {
            status: 200,
        };

        const Root = (
            <AsyncComponentProvider asyncContext={asyncContext}>
                <Provider store={store}>
                    <StaticRouter location={url} context={routerContext}>
                        <App />
                    </StaticRouter>
                </Provider>
            </AsyncComponentProvider>
        );

        if (routerContext.url) {
            return response.redirect(routerContext.status, routerContext.url);
        }

        await asyncBootstrapper(Root);
        const appMarkup = renderToString(Root);
        const reduxState = store.getState();
        const asyncState = asyncContext.getState();
        const helmetState = reactHelmet.renderStatic();

        const finalMarkup = response.locals.htmlCanvas
            .replace('<title></title>', helmetState.title.toString())
            .replace('<!-- ::META:: -->', helmetState.meta.toString())
            .replace('<!-- ::APP:: -->', appMarkup)
            .replace('/* ::ASYNC_STATE:: */', serialize(asyncState))
            .replace('/* ::REDUX_STATE:: */', serialize(reduxState));

        return response.status(routerContext.status).send(finalMarkup);
    } catch (error) {
        console.error('Error while rendering the app', error.message);
        return response.status(500).end();
    }
}
