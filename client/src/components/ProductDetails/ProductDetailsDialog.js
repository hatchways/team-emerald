import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  // DialogTitle,
  // Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CloseIconButton from '../CloseIconButton';
import ProductDetails from './ProductDetails';

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
  dividerRoot: {
    marginBottom: theme.spacing(4),
  },
}));

const ProductDetailsDialog = props => {
  const classes = useStyles(props);

  const { open, handleClose, product } = props;
  const { name, link, imageUrl, currentPrice, previousPrice } = product;
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
        {product && (
          <ProductDetails
            name={name}
            link={link}
            imgUrl={imageUrl}
            currentPrice={currentPrice}
            previousPrice={previousPrice}
            className={classes.alignCenter}
          />
        )}
      </Box>
    </Dialog>
  );
};

ProductDetailsDialog.defaultProps = {
  product: null,
};

ProductDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    imageUrl: PropTypes.string,
    currentPrice: PropTypes.number,
    previousPrice: PropTypes.number,
  }),
};

export default ProductDetailsDialog;
