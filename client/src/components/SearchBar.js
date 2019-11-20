import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    color: '#333',
    margin: '50px 0',
    padding: 12,
    width: 300,
    borderRadius: '22px 0 0 22px',
  },
});

export default function SearchBarprops() {
  const classes = useStyles();

  return (
    <form>
      <Box className={classes.root}>
        <InputBase
          className={classes.input}
          id="searchbar-input-base"
          placeholder="Search Movie Title"
          value={'Search'}
          // onChange={handleChange}
        />
        <IconButton></IconButton>
      </Box>
    </form>
  );
}
