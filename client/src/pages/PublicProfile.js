import React from 'react';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingListsPublic from '../components/Dashboard/ShoppingListsPublic';
import theme from '../themes/theme';

const useStyles = makeStyles({
  dashboard: {
    backgroundColor: theme.backgroundColor,
    paddingBottom: theme.spacing(5),
  },
});

export default function PublicProfile() {
  const classes = useStyles();

  return (
    <div id="Dashboard" className={classes.dashboard}>
      <Toolbar />
      <ShoppingListsPublic />
    </div>
  );
}
