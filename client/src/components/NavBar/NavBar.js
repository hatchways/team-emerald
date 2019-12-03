import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginRegister from './LoginRegister';
import NavLinks from './NavLinks';
import Profile from './Profile/Profile';
import SiteLogo from './SiteLogo';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: theme.boxShadowTheme,

    width: '100%',
    height: '10rem',

    padding: '2rem 6rem',
  },
}));

function NavBar(props) {
  const classes = useStyles(props);

  const { isAuthenticated } = props;

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar disableGutters>
        <Box style={{ marginRight: 'auto' }}>
          <SiteLogo />
        </Box>
        <Box>
          <NavLinks />
        </Box>
        <Box>{isAuthenticated ? <Profile /> : <LoginRegister />}</Box>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
