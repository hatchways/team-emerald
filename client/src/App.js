import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import TopNavBar from './components/TopNavBar';

import theme from './themes/theme';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';

const styles = () => ({
  '@global': {
    // MUI typography elements use REMs, so you can scale the global
    // font size by setting the font-size on the <html> element.
    html: {
      fontSize: 10,
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <TopNavBar />
        <Route path="/" component={LandingPage} exact />
        <Route path="/shoppinglists" component={Dashboard} exact />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
