import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  input: {
    maxWidth: 260,
    backgroundColor: 'white',
    color: '#333',
    fontSize: theme.typography.fontSize * 1.5,
    padding: '12px 24px',
    borderRadius: '25px 0 0 25px',
    boxShadow: '0px 2px 6px #ccf',
  },
  root: {
    maxWidth: 100,
    backgroundColor: 'white',
    color: '#333',
    fontSize: theme.typography.fontSize * 1.5,
    padding: '12px 24px',
    borderRadius: '0 25px 25px 0',
    boxShadow: '0px 2px 6px #ccf',
  }
}));

export default function SearchBarprops() {
  const classes = useStyles();
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  return (
      <form className={classes.container}>
        <InputBase fullWidth className={classes.input}/>
        <Select
          class={classes.root}
        >
          <MenuItem value="">
            None
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </form>
  );
}
