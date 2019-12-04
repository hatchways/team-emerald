import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    // prettier-ignore
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              // eslint-disable-next-line react/prop-types
              from: props.location,
            },
          }}
        />
      ) : (
        <Component {...props} />
      )}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
