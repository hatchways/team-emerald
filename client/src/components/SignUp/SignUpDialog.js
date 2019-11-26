import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Typography,
  Link,
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

const linkToLogin = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const SignUpDialog = props => {
  const classes = useStyles(props);
  const history = useHistory();

  const handleClose = () => {
    history.push('/');
  };

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
            Sign Up
          </Typography>
        </DialogTitle>

        <SignUpForm className={classes.form} />

        <Divider className={classes.dividerRoot} />

        <Typography variant="h6" align="center">
          Already a member?&nbsp;
          <Link component={linkToLogin} to="/login">
            Sign In
          </Link>
        </Typography>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
