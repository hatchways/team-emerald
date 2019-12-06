import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: props => ({
    backgroundColor: '#FFFFFF',
    color: '#000000',
    display: 'block',
    margin: '1rem 1rem',
    alignSelf: 'center',
    padding: props.padding,
    width: props.width,
    height: props.height,
    border: '1px solid lightgrey',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#FFFFFF',
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

function RemoveButton(props) {
  const classes = useStyles(props);
  const { text, handleClick, disabled, padding, width, height, type } = props;

  return (
    <Button
      type={type}
      className={classes.root}
      onClick={handleClick}
      disabled={disabled}
      padding={padding}
      width={width}
      height={height}
    >
      <Typography variant="body2">{text}</Typography>
    </Button>
  );
}

RemoveButton.defaultProps = {
  disabled: false,
  handleClick: null,
  type: 'button',
};

RemoveButton.propTypes = {
  text: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  type: PropTypes.string,
};
export default RemoveButton;
