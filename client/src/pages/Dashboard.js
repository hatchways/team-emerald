import React from 'react';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddItemForm from '../components/Dashboard/AddItemForm';
import ShoppingLists from '../components/Dashboard/ShoppingLists';
import theme from '../themes/theme';

const useStyles = makeStyles({
  dashboard: {
    backgroundColor: theme.backgroundColor,
    paddingBottom: theme.spacing(5),
  },
});

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div id="Dashboard" className={classes.dashboard}>
      <Toolbar />
      <AddItemForm />
      <ShoppingLists />
    </div>
  );
}
