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

import SignInForm from './SignInForm';
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

const linkToRegister = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const SignInDialog = props => {
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
            Sign In
          </Typography>
        </DialogTitle>

        <SignInForm className={classes.form} />

        <Divider className={classes.dividerRoot} />

        <Typography variant="h6" align="center">
          Don&apos;t have an account?&nbsp;
          <Link component={linkToRegister} to="/register">
            Create an Account
          </Link>
        </Typography>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
