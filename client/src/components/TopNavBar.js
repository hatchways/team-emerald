import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../images/logo.png';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: '0px 2px 6px #ccf',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: 190,
    marginLeft: 20
  },
  navLink: {
    textDecoration: 'none'
  },
  linkText: {
    fontWeight: 'inherit',
    fontSize: theme.typography.fontSize * 1.4
  },
  profileButton: {
    height: 58,
    padding: '0 8px',
    marginLeft: 20,
    borderRadius: 29
  },
  profileButtonText: {
    fontSize: theme.typography.fontSize * 1.4,
    textTransform: 'none',
    fontWeight: 'normal',
    margin: '0 5px 0 15px'
  },
  avatar: {
    width: 48,
    height: 48,
    objectFit: 'cover',
    borderRadius: 24
  }
}));

const activeStyle = {
  fontWeight: 'bold',
};

export default function TopNavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={logo} className={classes.logo} />
          <Breadcrumbs separator=' '>
            <NavLink 
              to="/shoppinglists" 
              activeStyle={activeStyle} 
              className={classes.navLink}
            >
              <Typography color='textPrimary' className={classes.linkText}>
                Shopping Lists
              </Typography>
            </NavLink>
            <NavLink 
              to="/friends" 
              activeStyle={activeStyle} 
              className={classes.navLink}
            >
              <Typography color='textPrimary' className={classes.linkText}>
                Friends
              </Typography>
            </NavLink>
            <Typography color='textPrimary' className={classes.linkText}>
              Notifications
            </Typography>
            <Button 
              variant='text'
              size='small'
              className={classes.profileButton}
            >
              <img 
                src='https://c-sf.smule.com/sf/s80/arr/09/74/eab20ae2-2357-4623-a703-f0f8a6ac6fbd.jpg'
                className={classes.avatar}
              />
              <span className={classes.profileButtonText}>Profile</span>
            </Button>
          </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}
