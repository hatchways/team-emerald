import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4rem',
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.typography.fontSize * 1.6,
    color: '#FFF',
    padding: '2rem 10rem',
    display: 'block',
    margin: '1rem 1rem',
    textAlign: 'center',
    width: '34rem',
    fontWeight: theme.typography.fontWeightMedium,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 5px 10px rgba(0,0,0,0.4)',
      transform: 'translateY(-3px)',
    },
    '&:active': {
      top: '3px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
      transform: 'translateY(0)',
    },
  },
}));

function DialogButton(props) {
  const classes = useStyles(props);
  const { text, handleClick, disabled } = props;

  return (
    <Button className={classes.root} onClick={handleClick} disabled={disabled}>
      {text}
    </Button>
  );
}

DialogButton.defaultProps = {
  disabled: false,
};

DialogButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default DialogButton;
