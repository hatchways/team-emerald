import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileMenu from './ProfileMenu';

const defaultProfileImage = `${process.env.PUBLIC_URL}/assets/default-profile.png`;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '2rem',
    cursor: 'pointer',

    width: '6rem',
    height: '6rem',

    opacity: '1.0',
    '&:hover': {
      opacity: '0.5',
    },
  },
}));

function Profile(props) {
  const classes = useStyles();

  const { photoUrl } = props;

  return (
    <Box className={classes.root}>
      <label htmlFor="avatar-input">
        <input accept="image/*" id="avatar-input" hidden type="file" />
        <Avatar
          src={!photoUrl ? defaultProfileImage : photoUrl}
          alt="Profile Image"
          className={classes.avatar}
        />
      </label>
      <ProfileMenu />
    </Box>
  );
}

Profile.propTypes = {
  photoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  photoUrl: state.auth.user.photoUrl,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
