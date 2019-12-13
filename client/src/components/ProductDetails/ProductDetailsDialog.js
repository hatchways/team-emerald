import React from 'react';
import { connect } from 'react-redux';
import { Box, Dialog, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CloseIconButton from '../CloseIconButton';
import ProductDetails from './ProductDetails';

import { closeProductDetailsDialog } from '../../actions/product-details';

const useStyles = makeStyles(theme => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  dialogPaper: {
    minHeight: '62.2rem',
    maxHeight: '62.2rem',
    minWidth: '72rem',
    maxWidth: '72rem',
    paddingBottom: theme.spacing(4),
  },
}));

const ProductDetailsDialog = props => {
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
      <Box className={classes.alignCenter}>
        <ProductDetails />
      </Box>
    </Dialog>
  );
};

ProductDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.productDetails.open,
});

const mapDispatchToProps = {
  handleClose: closeProductDetailsDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailsDialog);
