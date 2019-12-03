import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import theme from './themes/theme';

import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Follows from './pages/Follows';

import NavBar from './components/NavBar/NavBar';
import SignUpDialog from './components/SignUp/SignUpDialog';
import SignInDialog from './components/SignIn/SignInDialog';
import PrivateRoute from './components/routing/PrivateRoute';

import { authenticateUser } from './actions/auth';

import { createLoadingSelector } from './api/selectors';

import { POST_AUTH } from './actions/types';

const styles = () => ({
  '@global': {
    // MUI typography elements use REMs, so you can scale the global
    // font size by setting the font-size on the <html> element.
    html: {
      fontSize: 10,
    },
  },
});

function App({ loadUser, loading }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <PrivateRoute path="/shoppinglists" component={Dashboard} exact />
            <PrivateRoute path="/follows" component={Follows} exact />
            <Route path="/login" component={SignInDialog} exact />
            <Route path="/register" component={SignUpDialog} exact />
          </Switch>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const loadingSelector = createLoadingSelector([POST_AUTH]);

const mapStateToProps = state => ({
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  loadUser: authenticateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
