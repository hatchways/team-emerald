import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Badge,
  Breadcrumbs,
  // Button,
  Toolbar,
  Typography,
} from '@material-ui/core';

import logo from '../images/logo.png';
import SignIn from './SignInSignUp/CreateDialog';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: theme.boxShadowTheme,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: 190,
    marginLeft: 20,
  },
  navLink: {
    textDecoration: 'none',
  },
  linkText: {
    fontWeight: 'inherit',
    fontSize: theme.typography.fontSize * 1.1,
  },
  profileButton: {
    height: 58,
    padding: '0 8px',
    marginLeft: 20,
    borderRadius: 29,
  },
  profileButtonText: {
    fontSize: theme.typography.fontSize * 1.1,
    textTransform: 'none',
    fontWeight: 'normal',
    margin: '0 5px 0 15px',
  },
  avatar: {
    width: 48,
    height: 48,
    objectFit: 'cover',
    borderRadius: 24,
  },
}));

const activeStyle = {
  fontWeight: 'bold',
};

export default function TopNavBar() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [badge, setBadge] = useState(false);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={logo} className={classes.logo} alt="Deals Mate logo" />
        <Breadcrumbs separator=" ">
          <NavLink
            to="/shoppinglists"
            activeStyle={activeStyle}
            className={classes.navLink}
          >
            <Typography color="textPrimary" className={classes.linkText}>
              Shopping Lists
            </Typography>
          </NavLink>
          <NavLink
            to="/friends"
            activeStyle={activeStyle}
            className={classes.navLink}
          >
            <Typography color="textPrimary" className={classes.linkText}>
              Friends
            </Typography>
          </NavLink>
          <Badge variant="dot" color="secondary" invisible={badge}>
            <Typography color="textPrimary" className={classes.linkText}>
              Notifications
            </Typography>
          </Badge>
          {/* <Button
            variant="text"
            size="small"
            className={classes.profileButton}
            onClick={}
          >
            <img
              src="https://c-sf.smule.com/sf/s80/arr/09/74/eab20ae2-2357-4623-a703-f0f8a6ac6fbd.jpg"
              className={classes.avatar}
              alt="user avatar"
            />
            <span className={classes.profileButtonText}>Profile</span>
          </Button> */}
          <SignIn />
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}
