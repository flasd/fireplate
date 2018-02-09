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
import store from './services/state';

export default async function renderApp(request, response) {
    try {
        const { url } = request;

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

        await asyncBootstrapper(Root);
        const appMarkup = renderToString(Root);

        if (routerContext.url) {
            return response.redirect(routerContext.status, routerContext.url);
        }

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
        console.error('Error while rendering the app', error);
        return response.status(500).end();
    }
}
