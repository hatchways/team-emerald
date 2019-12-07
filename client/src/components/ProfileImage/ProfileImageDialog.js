import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileImageForm from './ProfileImageForm';
import CloseIconButton from '../CloseIconButton';

const useStyles = makeStyles(theme => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  dialogPaper: {
    minHeight: '74rem',
    maxHeight: '74rem',
    minWidth: '72rem',
    maxWidth: '72rem',
    paddingBottom: theme.spacing(4),
  },
  dividerRoot: {
    marginBottom: theme.spacing(4),
  },
}));

const ProfileImageDialog = props => {
  const classes = useStyles(props);

  const { handleClose } = props;

  return (
    <div>
      <Dialog
        open
        classes={{ paper: classes.dialogPaper }}
        disableBackdropClick
        fullWidth
        onEscapeKeyDown={handleClose}
      >
        <DialogActions>
          <CloseIconButton handleClose={handleClose} />
        </DialogActions>

        <DialogTitle className={classes.alignCenter}>
          <Typography variant="h5" component="div">
            Upload Profile Image
          </Typography>
        </DialogTitle>

        <ProfileImageForm handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

ProfileImageDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ProfileImageDialog;
