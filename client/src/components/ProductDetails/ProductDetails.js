/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: 'white',
    minHeight: '13rem',
    maxHeight: '13rem',
    minWidth: '55rem',
    maxWidth: '55rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  image: {
    minHeight: '20rem',
    maxHeight: '20rem',
    minWidth: '20rem',
    maxWidth: '20rem',
    margin: '3rem',
    objectFit: 'contain',
  },
  info: {
    marginBottom: '3rem',
  },
  link: {
    color: 'grey',
    marginBottom: '1rem',
  },
  previousPrice: {
    textDecoration: 'line-through',
    letterSpacing: '0.1rem',
    fontSize: '5rem',
  },
  currentPrice: {
    color: 'red',
    fontSize: '4.6rem',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function ProductDetails(props) {
  const classes = useStyles(props);
  const {
    product: { name, link, imageUrl, currentPrice, previousPrice },
  } = props;
  const abbreviatedName = `${name.slice(0, 78)}...`;
  const abbreviatedLink = `${link.slice(0, 48)}...`;

  return (
    <Box className={classes.box}>
      <Box>
        <img src={imageUrl} alt="ProductImage" className={classes.image} />
      </Box>
      <Box>
        <Typography variant="h4" className={classes.info}>
          {name.length > 78 ? abbreviatedName : name}
        </Typography>
        <Typography className={classes.link} variant="h6">
          <Link href={link} target="_blank" rel="noreferrer">
            {link.length > 48 ? abbreviatedLink : link}
          </Link>
        </Typography>
        <Box>
          {previousPrice ? (
            <Typography display="inline">
              <Box component="span" className={classes.previousPrice}>
                {currency(previousPrice, { formatWithSymbol: true }).format()}
              </Box>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          ) : (
            ''
          )}
          <Typography display="inline" className={classes.currentPrice}>
            {currency(currentPrice, { formatWithSymbol: true }).format()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

ProductDetails.defaultProps = {
  product: {
    previousPrice: 0,
  },
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    previousPrice: PropTypes.number,
  }),
};

const mapStateToProps = state => ({
  product: state.productDetails.product,
});

export default connect(mapStateToProps)(ProductDetails);
