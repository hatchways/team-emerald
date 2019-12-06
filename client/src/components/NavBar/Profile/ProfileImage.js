import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileImageDialog from '../../ProfileImage/ProfileImageDialog';

const defaultProfileImage = `${process.env.PUBLIC_URL}/assets/default-profile.png`;

const useStyles = makeStyles(() => ({
  loading: {
    marginRight: '2rem',
  },
  avatar: {
    cursor: 'pointer',

    width: '6rem',
    height: '6rem',

    opacity: '1.0',
    '&:hover': {
      opacity: '0.5',
    },
  },
}));

function ProfileImage({ photoUrl }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {open && <ProfileImageDialog handleClose={handleClose} />}
      <Avatar
        src={!photoUrl ? defaultProfileImage : photoUrl}
        alt="Profile Image"
        className={classes.avatar}
        onClick={() => setOpen(true)}
      />
    </Box>
  );
}

ProfileImage.propTypes = {
  photoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  photoUrl: state.auth.user.photoUrl,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
