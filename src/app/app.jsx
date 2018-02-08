import React from 'react';
import { Switch, Route } from 'react-router';

import './styles/app.critical.scss';
import './services/analytics';
import './services/service-worker';
import Home from './views/home';
import NotFound from './views/not-found';
import Redirect from './components/Redirect';

export default function App() {
    return (
        <main>
            <Switch>
                <Route path="/" exact component={Home} />
                <Redirect from="/origin" to="/destiny" />
                <Route component={NotFound} />
            </Switch>
        </main>
    );
}
