import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CloseIconButton from '../CloseIconButton';
import ListofProducts from './ListofProducts';
import ThemeButton from '../ThemeButton';

const useStyles = makeStyles(() => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  dialogPaper: {
    minHeight: '74rem',
    maxHeight: '74rem',
    minWidth: '72rem',
    maxWidth: '72rem',
    backgroundColor: '#F8F8F8',
  },
  numberOfItems: {
    color: 'grey',
    textAlign: 'center',
  },
}));

function CreateListDetailsDialog(props) {
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
        <CloseIconButton
          className={classes.closeButton}
          handleClose={handleClose}
        />
      </DialogActions>
      <DialogTitle className={classes.alignCenter}>
        <Typography variant="h5" component="div">
          Name of the List
        </Typography>
        <Typography className={classes.numberOfItems}>
          Number of items
        </Typography>
      </DialogTitle>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ListofProducts />
        <ThemeButton
          text="add new item"
          padding="2rem 3rem"
          width="26rem"
          height="6.3rem"
        />
      </Box>
    </Dialog>
  );
}

CreateListDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateListDetailsDialog;
