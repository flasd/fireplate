import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

export default function RedirectWithStatus({ from, to, status }) {
    return (
        <Route
            render={({ staticContext }) => {
                if (staticContext) {
                    /* eslint-disable no-param-reassign */
                    staticContext.status = status;
                    staticContext.url = to;
                }

                return (
                    <Redirect from={from} to={to} />
                );
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
