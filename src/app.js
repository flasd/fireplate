import React from 'react';
import { Route } from 'react-router';

import { HomeView } from './views';

export default function App() {
    return (
        <div>
            <div>Think of this as the headers</div>
            <Route exact path="/" component={HomeView} />
        </div>
    );
}
