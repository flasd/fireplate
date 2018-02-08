import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { replace } from '../../services/navigation';

export default function RedirectWithStatus({ from, to, status }) {
    return (
        <Route
            path={from}
            render={({ staticContext }) => {
                if (staticContext) {
                    /* eslint-disable no-param-reassign */
                    staticContext.status = status;
                    staticContext.url = to;
                }

                replace(to);
                return null;
            }}
        />
    );
}

RedirectWithStatus.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    status: PropTypes.number,
};

RedirectWithStatus.defaultProps = {
    status: 302,
};
