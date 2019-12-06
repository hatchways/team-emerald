import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DropZone from '../CreateList/DropZone';
import ThemeButton from '../ThemeButton';

import { createLoadingSelector } from '../../reducers/loading';
import { updateProfileImage } from '../../actions/users';
import { PUT_USER_PROFILE_IMAGE } from '../../actions/types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    height: '70rem',
  },
}));

// eslint-disable-next-line no-shadow
function ProfileImageForm({ id, loading, updateProfileImage, handleClose }) {
  const dropZoneFilesRef = useRef(null);
  const dropZoneSetFilesRef = useRef(null);

  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();

    const file = dropZoneFilesRef.current[0];

    if (file) {
      await updateProfileImage(id, file);

      // Clear Data
      dropZoneSetFilesRef.current([]);
      handleClose();
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant="body1">Size limit: 1 MB</Typography>

      <DropZone filesRef={dropZoneFilesRef} setFilesRef={dropZoneSetFilesRef} />

      <ThemeButton
        text="Upload Image"
        type="submit"
        padding="2rem 3rem"
        width="26rem"
        height="6.3rem"
        disabled={loading}
        loading={loading}
      />
    </form>
  );
}

ProfileImageForm.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([PUT_USER_PROFILE_IMAGE]);

const mapStateToProps = state => ({
  id: state.auth.user.id,
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  updateProfileImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageForm);
