import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FormSubmitButton from './FormSubmitButton';

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
    boxShadow: '0px 2px 6px #ccf',
  },
});

export default function SearchBarprops() {
  const classes = useStyles();
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  return (
    <form>
      <Box className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={text}
          onChange={handleInputChange}
        />
      </Box>
    </form>
  );
}
