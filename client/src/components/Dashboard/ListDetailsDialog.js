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

function ListDetailsDialog(props) {
  const classes = useStyles(props);

  const { open, handleClose, handleOpenAddItem, list, isPublic } = props;

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
        {list && (
          <ListofProducts
            products={list.products}
            listId={list.id}
            isPublic={isPublic}
          />
        )}

        {isPublic ? null : (
          <ThemeButton
            text="add new item"
            padding="2rem 3rem"
            width="26rem"
            height="6.3rem"
            handleClick={handleOpenAddItem}
          />
        )}
      </Box>
    </Dialog>
  );
}

ListDetailsDialog.defaultProps = {
  list: null,
  handleOpenAddItem: null,
};

ListDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpenAddItem: PropTypes.func,
  list: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    coverUrl: PropTypes.string,
    creator: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }),
  isPublic: PropTypes.bool,
};

ListDetailsDialog.defaultProps = {
  isPublic: false,
};

export default ListDetailsDialog;
