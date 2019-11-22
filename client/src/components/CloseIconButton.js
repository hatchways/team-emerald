import React from 'react';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { IconButton } from '@material-ui/core';

function CloseIconButton(props) {
  const { handleClose } = props;
  return (
    <IconButton onClick={handleClose}>
      <CloseRoundedIcon />
    </IconButton>
  );
}

CloseIconButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CloseIconButton;
