import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import TopNavBar from './components/TopNavBar';

import theme from './themes/theme';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <TopNavBar />
        <Route path="/" component={LandingPage} exact />
        <Route path="/shoppinglists" component={Dashboard} exact />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
