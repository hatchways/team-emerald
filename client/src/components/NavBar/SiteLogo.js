import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const logo = `${process.env.PUBLIC_URL}/assets/logo.png`;

const useStyles = makeStyles(() => ({
  root: {
    // Use either maxWidth or maxHeight to maintain aspect ratio
    maxHeight: '4rem',
  },
}));

function SiteLogo() {
  const classes = useStyles();

  return (
    <NavLink to="/">
      <img src={logo} alt="Deals Mate logo" className={classes.root} />
    </NavLink>
  );
}

export default SiteLogo;
