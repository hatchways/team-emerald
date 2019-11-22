import React, { useState, useRef } from 'react';
import {
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import DropZone from './DropZone';
import FormSubmitButton from '../FormSubmitButton';
import CloseIconButton from '../CloseIconButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),

    height: '70rem',
  },
  dialogPaper: {
    minHeight: '74rem',
    maxHeight: '74rem',
    minWidth: '32rem',
    maxWidth: '72rem',
  },
}));

function CreateList() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const dropZoneFilesRef = useRef(null);
  const dropZoneSetFilesRef = useRef(null);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const formData = {
      name,
      cover: dropZoneFilesRef.current[0],
    };
    /* TODO: SUBSCRIBE TO REDUX STORE AND PASS FORMDATA TO ACTION CREATORS */
    setName('');
    dropZoneSetFilesRef.current([]);
  };

  return (
    /* TODO: NEED TO FIX THE ADDICON BUTTON BELOW TO BE DISPLAYED AS A CARD */
    <div>
      <IconButton onClick={handleClickOpen} color="primary">
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.dialogPaper }}
        disableBackdropClick
        fullWidth
        onEscapeKeyDown={handleClose}
      >
        <DialogActions>
          <CloseIconButton handleClose={handleClose} />
        </DialogActions>

        <Container className={classes.root}>
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5" component="div">
              Create new list
            </Typography>
          </DialogTitle>

          <div style={{ display: 'flex' }}>
            <Typography variant="body1">Add a title &nbsp;</Typography>
            <Typography variant="body1" color="primary">
              *
            </Typography>
          </div>

          <InputBase
            placeholder="Enter Name"
            name="name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            classes={{ input: classes.input }}
          />

          <Typography variant="body1">Add a cover</Typography>

          <DropZone
            filesRef={dropZoneFilesRef}
            setFilesRef={dropZoneSetFilesRef}
          />

          <FormSubmitButton
            text="Create List"
            padding="2rem 3rem"
            width="26rem"
            height="6.3rem"
            handleClick={handleSubmit}
            disabled={!name}
          />
        </Container>
      </Dialog>
    </div>
  );
}

export default CreateList;
