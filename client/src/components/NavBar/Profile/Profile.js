import React from 'react';
import { Box } from '@material-ui/core';

import ProfileImage from './ProfileImage';
import ProfileMenu from './ProfileMenu';

function Profile() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <ProfileImage />
      <ProfileMenu />
    </Box>
  );
}

export default Profile;
