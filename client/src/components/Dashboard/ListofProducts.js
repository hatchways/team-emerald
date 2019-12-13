import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from '../Product';
import RemoveButton from './RemoveButton';
import { removeProductFromList } from '../../actions/products';

const useStyles = makeStyles(() => ({
  paper: {
    minHeight: '45rem',
    maxHeight: '45rem',
    minWidth: '68rem',
    maxWidth: '68rem',
    backgroundColor: '#F8F8F8',
    boxShadow: 'none',
    overflow: 'auto',
    marginBottom: '1rem',
  },
  box: {
    backgroundColor: '#FFFFFF',
    minHeight: '13rem',
    maxHeight: '13rem',
    minWidth: '68rem',
    maxWidth: '68rem',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 3rem 0',
  },
}));

function mapProductsToList(
  listId,
  products,
  handleRemove,
  classes,
  handleClickOpenProductDetails,
) {
  return products.map(product => {
    const { id, name, link, imageUrl, currentPrice, previousPrice } = product;

    return (
      <Box
        className={classes.box}
        key={id}
        onClick={() => handleClickOpenProductDetails(product)}
      >
        <Product
          name={name}
          link={link}
          imgUrl={imageUrl}
          currentPrice={currentPrice}
          previousPrice={previousPrice}
        />
        <RemoveButton
          text="remove"
          width="10rem"
          height="4rem"
          handleClick={() => handleRemove(listId, id)}
        />
      </Box>
    );
  });
}

function ListOfProducts(props) {
  const classes = useStyles(props);

  const {
    listId,
    products,
    handleRemove,
    handleClickOpenProductDetails,
  } = props;

  return (
    <Paper className={classes.paper}>
      {mapProductsToList(
        listId,
        products,
        handleRemove,
        classes,
        handleClickOpenProductDetails,
      )}
    </Paper>
  );
}

ListOfProducts.propTypes = {
  listId: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleClickOpenProductDetails: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleRemove: removeProductFromList,
};

export default connect(null, mapDispatchToProps)(ListOfProducts);
