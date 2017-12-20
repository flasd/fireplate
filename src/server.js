import React from 'react';
import asyncBootstrapper from 'react-async-bootstrapper';
import reactHelmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import {
    AsyncComponentProvider,
    createAsyncContext,
} from 'react-async-component';

import App from './app';
import htmlCanvas from './index.html';
import store from './services/state';
import { reportError } from './services/reporter';

export default async function renderApp(request, response) {
    try {
        const { url } = request;

        if (url.indexOf('.') !== -1) {
            return response.status(404).end();
        }

        const asyncContext = createAsyncContext();
        const routerContext = {};

        const Root = (
            <AsyncComponentProvider asyncContext={asyncContext}>
                <Provider store={store}>
                    <StaticRouter location={url} context={routerContext}>
                        <App />
                    </StaticRouter>
                </Provider>
            </AsyncComponentProvider>
        );

        if (routerContext.redirectUrl) {
            return response.redirect(302, routerContext.redirectUrl);
        }

        await asyncBootstrapper(Root);
        const appMarkup = renderToString(Root);
        const reduxState = store.getState();
        const asyncState = asyncContext.getState();
        const helmetState = reactHelmet.renderStatic();

        const finalMarkup = htmlCanvas
            .replace('<title></title>', helmetState.title.toString())
            .replace('<!-- ::META:: -->', helmetState.meta.toString())
            .replace('<!-- ::APP:: -->', appMarkup)
            .replace('/* ::ASYNC_STATE:: */', serialize(asyncState))
            .replace('/* ::REDUX_STATE:: */', serialize(reduxState));

        return response.status(200).send(finalMarkup);
    } catch (error) {
        reportError(error, 'Error while trying to render the app.');
        return response.status(500).end();
    }
}
