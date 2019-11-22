import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    display: 'block',
    margin: '1rem 1rem',
    textAlign: 'center',
    padding: props.padding,
    width: props.width,
    height: props.height,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0px 5px 30px rgba(208,219,233,0.5)',
      transform: 'translateY(-3px)',
    },
    '&:active': {
      top: '3px',
      boxShadow: '0px 3px 30px rgba(208,219,233,0.5)',
      transform: 'translateY(0)',
    },
  }),
}));

function FormSubmitButton(props) {
  const classes = useStyles(props);
  const { text, handleClick, disabled, padding, width, height } = props;

  return (
    <Button
      className={classes.root}
      onClick={handleClick}
      disabled={disabled}
      padding={padding}
      width={width}
      height={height}
    >
      <Typography variant="button">{text}</Typography>
    </Button>
  );
}

FormSubmitButton.defaultProps = {
  disabled: false,
};

FormSubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  padding: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default FormSubmitButton;
