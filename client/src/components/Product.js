/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: 'white',
    minHeight: '13rem',
    maxHeight: '13rem',
    minWidth: '55rem',
    maxWidth: '55rem',
    display: 'flex',
  },
  image: {
    minHeight: '11rem',
    maxHeight: '11rem',
    minWidth: '11rem',
    maxWidth: '11rem',
    margin: '10px',
  },
  // name: {
  //   fontFamily: 'Helvetica',
  //   fontSize: '2rem',
  // },
  info: {
    alignSelf: 'center',
  },
  link: {
    color: 'grey',
  },
  prices: {
    flexDirection: 'row',
  },
  previousPrice: {
    textDecoration: 'line-through',
    letterSpacing: '0.1rem',
  },
  currentPrice: {
    color: 'red',
    letterSpacing: 0,
    fontSize: '1.8rem',
  },
}));

function Product(props) {
  const classes = useStyles(props);
  const { name, link, imgUrl, currentPrice, previousPrice } = props;
  const abbreviatedLink = `${link.slice(0, 48)}...`;
  return (
    <Box className={classes.box}>
      <Box>
        <img src={imgUrl} alt="hello" className={classes.image} />
      </Box>
      <Box className={classes.info}>
        <Typography variant="h6">{name}</Typography>
        <Typography className={classes.link} variant="body2">
          {link.length > 48 ? abbreviatedLink : link}
        </Typography>
        <Box className={classes.prices}>
          <Typography display="inline" className={classes.previousPrice}>
            ${previousPrice}
          </Typography>
          <Typography display="inline" className={classes.currentPrice}>
            &nbsp;&nbsp;$
            {currentPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  previousPrice: PropTypes.number.isRequired,
};

export default Product;
