import React from 'react';
import { Route } from 'react-router';

import './styles/reset.scss';
import { HomeView } from './views';

export default function App() {
    return (
        <div>
            <div>Header</div>
            <Route exact path="/" component={HomeView} />
        </div>
    );
}
