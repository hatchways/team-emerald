import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '9rem',
    textTransform: 'none',
    boxShadow: 'none',
    fontSize: '1.4rem',
    margin: theme.spacing(1),
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));

// eslint-disable-next-line no-unused-vars
function FollowButton({ userId, following }) {
  const classes = useStyles();

  return following ? (
    <Button
      disableRipple
      size="medium"
      variant="contained"
      color="secondary"
      classes={classes}
    >
      Following
    </Button>
  ) : (
    <Button
      disableRipple
      size="medium"
      variant="outlined"
      color="secondary"
      classes={classes}
    >
      Follow
    </Button>
  );
}

FollowButton.propTypes = {
  userId: PropTypes.string.isRequired,
  following: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  following: state.publicProfile.user.following,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
