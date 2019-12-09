import React from 'react';
import {
  // Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AddItemDialogForm from './AddItemDialogForm';
import CloseIconButton from '../CloseIconButton';

const useStyles = makeStyles(theme => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  dialogPaper: {
    minHeight: '74rem',
    maxHeight: '74rem',
    minWidth: '72rem',
    maxWidth: '72rem',
    paddingBottom: theme.spacing(4),
  },
  dividerRoot: {
    marginBottom: theme.spacing(4),
  },
}));

const AddItemDialog = props => {
  const classes = useStyles(props);

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
          Add new item:
        </Typography>
      </DialogTitle>

      <AddItemDialogForm />
    </Dialog>
  );
};

AddItemDialog.propTypes = {
  open: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddItemDialog;
