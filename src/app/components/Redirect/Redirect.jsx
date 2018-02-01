import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

export default function CustomRedirect({ from, to, status }) {
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

CustomRedirect.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    status: PropTypes.number,
};

CustomRedirect.defaultProps = {
    status: 302,
};
