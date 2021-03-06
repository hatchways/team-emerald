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
import PublicProfile from './pages/PublicProfile';

import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/routing/PrivateRoute';
import SignUpDialog from './components/SignUp/SignUpDialog';
import SignInDialog from './components/SignIn/SignInDialog';
import ProductDetailsDialog from './components/ProductDetails/ProductDetailsDialog';

import SocketClient from './components/SocketClient';

import { authenticateUser } from './actions/auth';
import { getNotifications } from './actions/notifications';
import { POST_AUTH } from './actions/types';

import { createLoadingSelector } from './reducers/loading';

const styles = () => ({
  '@global': {
    // MUI typography elements use REMs, so you can scale the global
    // font size by setting the font-size on the <html> element.
    html: {
      fontSize: 10,
    },
  },
});

function App({ loadUser, loadNotifications, loading }) {
  useEffect(() => {
    async function load() {
      await loadUser();
      await loadNotifications();
    }

    load();
  }, [loadUser, loadNotifications]);

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
            <PrivateRoute
              path="/public/:userId"
              component={PublicProfile}
              exact
            />
            <Route
              path="/login"
              render={() => (
                <>
                  <LandingPage />
                  <SignInDialog />
                </>
              )}
              exact
            />
            <Route
              path="/register"
              render={() => (
                <>
                  <LandingPage />
                  <SignUpDialog />
                </>
              )}
              exact
            />
          </Switch>
        )}
        <ProductDetailsDialog />
      </BrowserRouter>
      <SocketClient />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const loadingSelector = createLoadingSelector([POST_AUTH]);

const mapStateToProps = state => ({
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  loadUser: authenticateUser,
  loadNotifications: getNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
