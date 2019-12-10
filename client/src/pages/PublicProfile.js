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

// eslint-disable-next-line react/prop-types
export default function PublicProfile({ match }) {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { userId } = match.params;

  return (
    <div id="PublicProfile" className={classes.dashboard}>
      <Toolbar />
      <ShoppingListsPublic userId={userId} />
    </div>
  );
}
