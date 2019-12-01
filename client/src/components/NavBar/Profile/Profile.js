import React from 'react';
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
    opacity: '1.0',
    '&:hover': {
      opacity: '0.5',
    },
  },
}));

function Profile() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <label htmlFor="avatar-input">
        <input accept="image/*" id="avatar-input" hidden type="file" />
        <Avatar
          src={defaultProfileImage}
          alt="Profile Image"
          className={classes.avatar}
        />
      </label>
      <ProfileMenu />
    </Box>
  );
}

export default Profile;
