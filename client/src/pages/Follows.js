/* eslint-disable no-unused-vars */
import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FolloweesList from '../components/Follows/FolloweesList';

const useStyles = makeStyles(theme => ({
  followsContainer: {
    backgroundColor: theme.backgroundColor,
    paddingBottom: theme.spacing(5),
  },
}));

function Follows() {
  const classes = useStyles();

  return (
    <div id="Follow" className={classes.followsContainer}>
      <Toolbar />
      <Typography align="center" variant="h5" gutterBottom>
        Follows
      </Typography>
      <FolloweesList />
    </div>
  );
}

export default Follows;
