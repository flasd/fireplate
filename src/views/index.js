import React from 'react';
import PropTypes from 'prop-types';
import { asyncComponent } from 'react-async-component';

import styles from './index.scss';

export function LoadingComponent() {
    return (
        <div className={styles.loadingContainer} >
            Loading...
        </div>
    );
}

export function ErrorComponent({ error }) {
    return (
        <div className={styles.errorContainer} >
            { error.message }
        </div>
    );
}

ErrorComponent.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
};

export function getAsyncComponent(options) {
    return asyncComponent(Object.assign({}, {
        LoadingComponent,
        ErrorComponent,
    }, options));
}

export const HomeView = getAsyncComponent({
    resolve: () => import('./home'),
});
