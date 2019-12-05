import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileMenu from './ProfileMenu';

import { updateProfileImage } from '../../../actions/users';
import { PUT_USER_PROFILE_IMAGE } from '../../../actions/types';

import { createLoadingSelector } from '../../../api/selectors';

const defaultProfileImage = `${process.env.PUBLIC_URL}/assets/default-profile.png`;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    marginRight: '2rem',
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

// eslint-disable-next-line no-shadow
function Profile({ user: { id, photoUrl }, loading, updateProfileImage }) {
  const classes = useStyles();

  const handleOnChange = event => {
    const file = event.target.files[0];
    updateProfileImage(id, file);
  };

  return (
    <Box className={classes.root}>
      {loading ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <label htmlFor="avatar-input">
          <input
            accept="image/*"
            id="avatar-input"
            hidden
            type="file"
            onChange={handleOnChange}
          />
          <Avatar
            src={!photoUrl ? defaultProfileImage : photoUrl}
            alt="Profile Image"
            className={classes.avatar}
          />
        </label>
      )}
      <ProfileMenu />
    </Box>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([PUT_USER_PROFILE_IMAGE]);

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  updateProfileImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
