import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';
import { Box, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ThemeButton from '../ThemeButton';
import { login, clearLoginErrors } from '../../actions/auth';
import { getNotifications } from '../../actions/notifications';
import { POST_LOGIN } from '../../actions/types';

import { createLoadingSelector } from '../../reducers/loading';
import { createErrorMessageSelector } from '../../reducers/error';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    height: '70rem',
  },
  input: {
    textAlign: 'center',
    boxShadow: theme.boxShadowTheme,
  },
  label: {
    color: 'black',
  },
}));

function SignInForm({
  isAuthenticated,
  error,
  loginUser,
  loadNotifications,
  loading,
  clearErrors,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    clearErrors(); // Clear previous errors when the component mounts
  }, [clearErrors]);

  if (isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from.pathname} />;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };

    await loginUser(formData);
    await loadNotifications();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <InputLabel className={classes.label}>Your e-mail address:</InputLabel>
      <Input
        placeholder="E-mail"
        name="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        classes={{ input: classes.input }}
        fullWidth
        disableUnderline
      />

      <InputLabel className={classes.label}>Password:</InputLabel>
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={password}
        inputProps={{
          minLength: 6,
        }}
        onChange={e => setPassword(e.target.value)}
        classes={{ input: classes.input }}
        fullWidth
        disableUnderline
      />

      {error && <Box>{error}</Box>}

      <ThemeButton
        text="Log In"
        type="submit"
        padding="2rem 3rem"
        width="24rem"
        height="6.3rem"
        disabled={!(email && password.length >= 6) || loading}
        loading={loading}
      />
    </form>
  );
}

SignInForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
};

/* The errorSelector and loadingSelector are used to get the error and loading
 * states for the POST_LOGIN actions. Note that they are functions, and are
 * passed the state object in the mapStateToProps function to access the error
 * and loading states.
 */
const errorSelector = createErrorMessageSelector([POST_LOGIN]);
const loadingSelector = createLoadingSelector([POST_LOGIN]);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  loginUser: login,
  loadNotifications: getNotifications,
  clearErrors: clearLoginErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
