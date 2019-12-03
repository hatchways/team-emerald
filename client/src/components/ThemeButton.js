import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Typography } from '@material-ui/core';
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
  circularProgress: {
    color: '#FFF',
  },
}));

/**
 * Custom button component styled with the themes
 * This button can be used for forms (set type="submit")
 * or as a regular button (default, but must pass a function to the
 * handleClick prop)
 */
function ThemeButton(props) {
  const classes = useStyles(props);
  const {
    text,
    handleClick,
    disabled,
    padding,
    width,
    height,
    type,
    loading,
  } = props;

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
      {loading ? (
        <CircularProgress
          classes={{ colorPrimary: classes.circularProgress }}
        />
      ) : (
        <Typography variant="button">{text}</Typography>
      )}
    </Button>
  );
}

ThemeButton.defaultProps = {
  disabled: false,
  handleClick: null,
  type: 'button',
  loading: false,
};

ThemeButton.propTypes = {
  text: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default ThemeButton;
