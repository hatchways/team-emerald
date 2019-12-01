import React from 'react';
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

  return <img src={logo} alt="Deals Mate logo" className={classes.root} />;
}

export default SiteLogo;
