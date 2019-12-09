import React, { useState } from 'react';
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
  const [openProduct, setOpen] = useState(false);

  const classes = useStyles(props);

  const { open, handleClose, list } = props;

  const handleClickDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

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
          {list && list.name}
        </Typography>
        <Typography variant="body2" className={classes.numberOfItems}>
          {list &&
            `${list.products.length} item${
              list.products.length > 1 ? 's' : ''
            }`}
        </Typography>
      </DialogTitle>
      <Box display="flex" flexDirection="column" alignItems="center">
        {list && <ListofProducts products={list.products} />}
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

CreateListDetailsDialog.defaultProps = {
  list: null,
};

CreateListDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  list: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    coverUrl: PropTypes.string,
    creator: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default CreateListDetailsDialog;