import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createFollow, deleteFollow } from '../../actions/people';

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
  const { userId, people, createFollow, deleteFollow } = props;

  const clickToFollow = () => createFollow(userId);
  const clickToUnfollow = () => deleteFollow(userId);

  return people[userId] && people[userId].isFollowed ? (
    <Button
      disableRipple
      size="medium"
      variant="outlined"
      color="secondary"
      disabled={people[userId] === undefined}
      classes={classes}
      onClick={clickToUnfollow}
    >
      Following
    </Button>
  ) : (
    <Button
      disableRipple
      size="medium"
      variant="outlined"
      color="primary"
      disabled={people[userId] === undefined}
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
  people: PropTypes.object.isRequired,
  createFollow: PropTypes.func.isRequired,
  deleteFollow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  people: state.people,
});

const mapDispatchToProps = {
  createFollow,
  deleteFollow,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
