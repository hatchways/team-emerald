import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FollowButton from './FollowButton';

const defaultImage = `${process.env.PUBLIC_URL}/assets/image-upload-icon.png`;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '17rem',
    height: '17rem',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

function TopPanel({ people, userId }) {
  const classes = useStyles();
  const profile = people[userId];

  return (
    <div className={classes.container}>
      <Avatar
        src={profile.photoUrl ? profile.photoUrl : defaultImage}
        alt="Profile Image"
        className={classes.avatar}
      />
      <span>
        <FollowButton userId={userId} />
        {/* Followers and Followings */}
      </span>
    </div>
  );
}

TopPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  people: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  people: state.people,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);
