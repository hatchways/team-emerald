import React from 'react';
import { ToolBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from '../components/Dashboard/AddItem';
import ShoppingLists from '../components/Dashboard/ShoppingLists';
import theme from '../themes/theme';

const useStyles = makeStyles({
  dashboard: {
    backgroundColor: theme.backgroundColor,
  },
});

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div id="Dashboard" className={classes.dashboard}>
      <ToolBar />
      <AddItem />
      <ShoppingLists />
    </div>
  );
}
