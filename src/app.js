import React from 'react';
import { Route } from 'react-router';

export default function App() {
    return (
        <div>
            <Route exact path="/" component={() => (<div>Hello</div>)} />
        </div>
    );
}