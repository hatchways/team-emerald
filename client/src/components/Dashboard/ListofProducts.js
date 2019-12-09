import React from 'react';
// import PropTypes from 'prop-types';
import {
  Paper,
  Box,
  // Typography,
} from '@material-ui/core';
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

const mockData = [
  {
    name: 'Scented candle',
    link: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    imgUrl:
      'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    currentPrice: 21,
    previousPrice: 23,
  },
  {
    name: 'DND Set',
    link: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    imgUrl:
      'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    currentPrice: 99,
    previousPrice: 115,
  },
  {
    name: 'Soccer Ball',
    link: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    imgUrl:
      'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    currentPrice: 33,
    previousPrice: 55,
  },
  {
    name: 'PlayStation',
    link: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    imgUrl:
      'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    currentPrice: 999999,
    previousPrice: 100000000,
  },
];

function mapProductsToList(data, classes) {
  return data.map(product => {
    const { name, link, imgUrl, currentPrice, previousPrice } = product;
    return (
      <Box className={classes.box}>
        <Product
          name={name}
          link={link}
          imgUrl={imgUrl}
          currentPrice={currentPrice}
          previousPrice={previousPrice}
        />
        <RemoveButton type="button" text="remove" width="10rem" height="4rem" />
      </Box>
    );
  });
}

function ListOfProducts(props) {
  const classes = useStyles(props);

  return (
    <Paper className={classes.paper}>
      {mapProductsToList(mockData, classes)}
    </Paper>
  );
}

ListOfProducts.propTypes = {};

export default ListOfProducts;
