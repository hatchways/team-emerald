import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    // prettier-ignore
    render={props =>
      !isAuthenticated ? (
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
        <Component {...props} {...rest} />
      )}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
