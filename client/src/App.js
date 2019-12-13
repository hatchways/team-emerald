import React, { useEffect, useState } from 'react';
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
import PrivateRoute from './components/routing/PrivateRoute';
import SignUpDialog from './components/SignUp/SignUpDialog';
import SignInDialog from './components/SignIn/SignInDialog';
import SocketClient from './components/SocketClient';

import { authenticateUser } from './actions/auth';

import { createLoadingSelector } from './reducers/loading';

import { POST_AUTH } from './actions/types';
import ProductDetailsDialog from './components/ProductDetails/ProductDetailsDialog';

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
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [product, setProduct] = useState(null);

  const handleClickOpenProductDetails = productDetails => {
    setOpenProductDetails(true);
    setProduct(productDetails);
  };

  const handleCloseProductDetails = () => {
    setOpenProductDetails(false);
  };

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
            <PrivateRoute
              path="/shoppinglists"
              component={Dashboard}
              handleClickOpenProductDetails={handleClickOpenProductDetails}
              exact
            />
            <PrivateRoute path="/follows" component={Follows} exact />
            <Route path="/login" component={SignInDialog} exact />
            <Route path="/register" component={SignUpDialog} exact />
          </Switch>
        )}
        {/* {console.log(product)} */}
        {product && (
          <ProductDetailsDialog
            open={openProductDetails}
            handleClose={handleCloseProductDetails}
            product={product}
          />
        )}
      </BrowserRouter>
      <SocketClient />
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
