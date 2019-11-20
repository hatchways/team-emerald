import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import theme from './themes/theme';
// import SignInForm from './pages/signInForm';
import SignUpForm from './pages/signUpForm';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={SignUpForm} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
