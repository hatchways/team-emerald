import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
  img: {
    width: 190,
    marginLeft: 20
  },
  link: {
    fontWeight: 'inherit',
  }
}));

const activeStyle = {
  fontWeight: 'bold',
  // textDecoration: 'none',
  // color: 'inherit'
};

export default function TopNavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={logo} className={classes.img} />
          <Breadcrumbs separator=' '>
            <NavLink to="/shoppinglists" activeStyle={activeStyle}>
              <Typography variant='body1' class={classes.link}>
                Shopping Lists
              </Typography>
            </NavLink>
            <NavLink to="/friends" activeStyle={activeStyle}>
              <Typography variant='body1' class={classes.link}>
                Friends
              </Typography>
            </NavLink>
            <Typography variant='body1'>
              Notifications
            </Typography>
          </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}
