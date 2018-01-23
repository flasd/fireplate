import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

export default function NotFound({ staticContext }) {
    if (staticContext) {
        /* eslint-disable no-param-reassign */
        staticContext.status = 404;
    }

    return (
        <div className={styles.container}>
            <Helmet>
                <title>404 Route @ Fireplate App</title>
            </Helmet>
            <p className={styles.message}>
                You must create it.
            </p>
        </div>
    );
}

NotFound.propTypes = {
    staticContext: PropTypes.objectOf(PropTypes.any),
};

NotFound.defaultProps = {
    staticContext: false,
};
