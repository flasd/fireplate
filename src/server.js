import React from 'react';
import ReactHelmet from 'react-helmet';
import cheerio from 'cheerio';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import session from 'express-session';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './app';

const app = express();
const cookieSecrets = ['jJ6#@3A5xL', '9cMb*l2U1P', 'a2n$oJ15X6'];
const template = fs.readFileSync('./public/index.html');

function render(reactHelmet, reactApp) {
    const $ = cheerio.load(template);

    $('title').replaceWith(reactHelmet.title.toString());
    $('head').append(reactHelmet.meta.toString());
    $('#root').html(reactApp);

    return $.html();
}

app.use(helmet());
app.use(session({ cookie: { secure: true }, secret: cookieSecrets }));

app.get('*', (request, response) => {
    const context = {};

    const html = renderToString(
        <StaticRouter location={request.url} context={context}>
            <App />
        </StaticRouter>
    );

    const reactHelmet = ReactHelmet.renderStatic();

    if (context.url) {
        return response.redirect(302, context.url);
    }

    return response.status(200).send(render(reactHelmet, html));
});

exports.app = app;
