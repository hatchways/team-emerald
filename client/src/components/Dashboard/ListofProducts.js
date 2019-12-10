import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../Product';
import RemoveButton from './RemoveButton';

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

function ListOfProducts(props) {
  const classes = useStyles(props);

  const { products, isPublic } = props;

  // eslint-disable-next-line no-shadow
  function mapProductsToList(products, classes) {
    return products.map(product => {
      const { id, name, link, imageUrl, currentPrice, previousPrice } = product;
      return (
        <Box className={classes.box} key={id}>
          <Product
            name={name}
            link={link}
            imgUrl={imageUrl}
            currentPrice={currentPrice}
            previousPrice={previousPrice}
          />
          {isPublic ? null : (
            <RemoveButton text="remove" width="10rem" height="4rem" />
          )}
        </Box>
      );
    });
  }

  return (
    <Paper className={classes.paper}>
      {mapProductsToList(products, classes)}
    </Paper>
  );
}

ListOfProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPublic: PropTypes.bool,
};

ListOfProducts.defaultProps = {
  isPublic: false,
};

export default ListOfProducts;
