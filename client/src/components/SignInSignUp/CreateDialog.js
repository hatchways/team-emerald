import React, { useState } from 'react';
import CreateSignInDialog from './CreateSignInDialog';
// import SignInDialog from '../SignIn/SignInDialog';
import SignUpDialog from '../SignUp/SignUpDialog';

function CreateDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateSignInDialog handleClickOpen={handleClickOpen} />
      {/* <SignInDialog open={open} handleClose={handleClose} /> */}
      <SignUpDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default CreateDialog;
