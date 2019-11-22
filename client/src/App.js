import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import theme from './themes/theme';
// import SignInForm from './pages/signInForm';
// import SignUpForm from './pages/signUpForm';
// import SignUpForm from './components/SignUpForm';
// import Landing from './components/Landing';
import SignInForm from './components/SignInForm';

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
        <Route path="/" component={SignInForm} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
