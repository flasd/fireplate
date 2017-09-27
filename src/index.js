import './services/analytics';
import './services/firebase';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import App from './app';
import history from './services/navigation';

const rootNode = document.getElementById('root');

export function Root() {
    return (
        <Router history={history} >
            <App />
        </Router>
    );
}

render(<Root />, rootNode);
