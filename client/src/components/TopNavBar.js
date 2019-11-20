import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
  img: {
    width: 200,
  },
}));

export default function TopNavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={logo} className={classes.img} />
        <Breadcrumbs separator="" aria-label="breadcrumb">
          <NavLink to="/shoppinglists" activeClassName="active-link">
            Shopping Lists
          </NavLink>
          <NavLink to="/friends" activeClassName="active-link">
            Friends
          </NavLink>
          <span>Notifications</span>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}
