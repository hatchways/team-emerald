import React, { useState, useRef } from 'react';
import { Input, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DropZone from './DropZone';
import ThemeButton from '../ThemeButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    height: '70rem',
  },
  input: {
    textAlign: 'center',
    boxShadow: theme.boxShadowTheme,
  },
}));

function CreateListForm() {
  const [name, setName] = useState('');

  const dropZoneFilesRef = useRef(null);
  const dropZoneSetFilesRef = useRef(null);

  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const formData = {
      name,
      cover: dropZoneFilesRef.current[0],
    };
    /* TODO: SUBSCRIBE TO REDUX STORE AND PASS FORMDATA TO ACTION CREATORS */

    // Clear Data
    setName('');
    dropZoneSetFilesRef.current([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <Typography variant="body1">Add a title &nbsp;</Typography>
        <Typography variant="body1" color="primary">
          *
        </Typography>
      </div>

      <Input
        placeholder="Enter Name"
        name="name"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        classes={{ input: classes.input }}
        disableUnderline
      />

      <Typography variant="body1">Add a cover</Typography>

      <DropZone filesRef={dropZoneFilesRef} setFilesRef={dropZoneSetFilesRef} />

      <ThemeButton
        text="Create List"
        type="submit"
        padding="2rem 3rem"
        width="26rem"
        height="6.3rem"
        disabled={!name}
      />
    </form>
  );
}

export default CreateListForm;
