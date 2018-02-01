import React from 'react';
import { Switch, Route } from 'react-router';

import './styles/app.critical.scss';
import './services/analytics';
import './services/service-worker';
import Home from './views/home';
import NotFound from './views/not-found';

export default function App() {
    return (
        <main>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        </main>
    );
}
