import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CloseIconButton from '../CloseIconButton';
import CreateListForm from './CreateListForm';

const useStyles = makeStyles(() => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  dialogPaper: {
    minHeight: '74rem',
    maxHeight: '74rem',
    minWidth: '72rem',
    maxWidth: '72rem',
  },
}));

function CreateListDialog(props) {
  const classes = useStyles();

  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      classes={{ paper: classes.dialogPaper }}
      disableBackdropClick
      fullWidth
      onEscapeKeyDown={handleClose}
    >
      <DialogActions>
        <CloseIconButton handleClose={handleClose} />
      </DialogActions>

      <DialogTitle className={classes.alignCenter}>
        <Typography variant="h5" component="div">
          Create new list
        </Typography>
      </DialogTitle>

      <CreateListForm />
    </Dialog>
  );
}

CreateListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateListDialog;
