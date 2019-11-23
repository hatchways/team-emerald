import React, { useState } from 'react';
import CreateListCard from './CreateListCard';
import CreateListDialog from './CreateListDialog';

function CreateList() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateListCard handleClickOpen={handleClickOpen} />
      <CreateListDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default CreateList;
