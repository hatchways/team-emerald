import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Typography,
  // Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignUpForm from './SignUpForm';
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

const SignUpDialog = props => {
  const classes = useStyles(props);

  const { open, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        classes={{ paper: classes.dialogPaper }}
        disableBAckdropClick
        fullWidth
        onEscapeKeyDown={handleClose}
      >
        <DialogActions>
          <CloseIconButton handleClose={handleClose} />
        </DialogActions>

        <DialogTitle className={classes.alignCenter}>
          <Typography variant="h5" component="div">
            Sign Up
          </Typography>
        </DialogTitle>

        <SignUpForm className={classes.form} />
        <Divider className={classes.dividerRoot} />
        <Typography variant="h6" align="center">
          Already a member?&nbsp;
          {/* <Link href="#"> Sign In</Link> */}
        </Typography>
      </Dialog>
    </div>
  );
};

SignUpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SignUpDialog;
