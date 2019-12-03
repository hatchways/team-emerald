import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navLink: {
    textDecoration: 'none',
  },
  linkText: {
    fontWeight: 'inherit',
  },
}));

const activeStyle = {
  fontWeight: 'bold',
};

function LoginRegister() {
  const classes = useStyles();

  return (
    <Box className={classes.boxRoot}>
      <Breadcrumbs separator="|">
        <NavLink
          to="/login"
          className={classes.navLink}
          activeStyle={activeStyle}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            className={classes.linkText}
          >
            Login
          </Typography>
        </NavLink>
        <NavLink
          to="/register"
          className={classes.navLink}
          activeStyle={activeStyle}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            className={classes.linkText}
          >
            Register
          </Typography>
        </NavLink>
      </Breadcrumbs>
    </Box>
  );
}

export default LoginRegister;
