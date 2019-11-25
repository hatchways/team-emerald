import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function SignInButton(props) {
  const classes = useStyles(props);

  const { handleClickOpen } = props;

  return (
    <Button onClick={handleClickOpen} classname={classes.button}>
      <Typography variant="body2">Sign In</Typography>
    </Button>
  );
}

SignInButton.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default SignInButton;
