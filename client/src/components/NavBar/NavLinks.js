import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Notifications from './Notifications';

const useStyles = makeStyles(() => ({
  boxRoot: {
    marginRight: '15rem',
  },
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

function NavLinks() {
  const classes = useStyles();

  return (
    <Box className={classes.boxRoot}>
      <Breadcrumbs separator="">
        <NavLink
          to="/shoppinglists"
          className={classes.navLink}
          activeStyle={activeStyle}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            className={classes.linkText}
          >
            Shopping Lists
          </Typography>
        </NavLink>
        <NavLink
          to="/follows"
          className={classes.navLink}
          activeStyle={activeStyle}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            className={classes.linkText}
          >
            Follows
          </Typography>
        </NavLink>
        <Notifications />
      </Breadcrumbs>
    </Box>
  );
}

export default NavLinks;
