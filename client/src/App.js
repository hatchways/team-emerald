import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import theme from './themes/theme';

import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';

import TopNavBar from './components/TopNavBar';
import SignUpDialog from './components/SignUp/SignUpDialog';
import SignInDialog from './components/SignIn/SignInDialog';
import SocketClient from './components/SocketClient';

import { authenticateUser } from './actions/auth';

const styles = () => ({
  '@global': {
    // MUI typography elements use REMs, so you can scale the global
    // font size by setting the font-size on the <html> element.
    html: {
      fontSize: 10,
    },
  },
});

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <TopNavBar />
        <Route path="/" component={LandingPage} exact />
        <Route path="/shoppinglists" component={Dashboard} exact />
        <Route path="/login" component={SignInDialog} exact />
        <Route path="/register" component={SignUpDialog} exact />
      </BrowserRouter>
      <SocketClient />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  loadUser: authenticateUser,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));
