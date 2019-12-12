import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createFollow, deleteFollow } from '../actions/follows';

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
function FollowButton(props) {
  const classes = useStyles();

  // eslint-disable-next-line no-shadow
  const { userId, discover, createFollow, deleteFollow } = props;

  const clickToFollow = () => createFollow(userId);
  const clickToUnfollow = () => deleteFollow(userId);

  return discover[userId] && discover[userId].isFollowed ? (
    <Button
      disableRipple
      size="large"
      variant="contained"
      color="primary"
      disabled={discover[userId] === undefined}
      classes={classes}
      onClick={clickToUnfollow}
    >
      Following
    </Button>
  ) : (
    <Button
      disableRipple
      size="large"
      variant="outlined"
      color="default"
      disabled={discover[userId] === undefined}
      classes={classes}
      onClick={clickToFollow}
    >
      Follow
    </Button>
  );
}

FollowButton.propTypes = {
  userId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  discover: PropTypes.object.isRequired,
  createFollow: PropTypes.func.isRequired,
  deleteFollow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  discover: state.discover,
});

const mapDispatchToProps = {
  createFollow,
  deleteFollow,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
