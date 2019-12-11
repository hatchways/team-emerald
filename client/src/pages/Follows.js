/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Toolbar } from '@material-ui/core';

import FolloweesList from '../components/Follows/FolloweesList';

function Follows() {
  return (
    <div id="Follows">
      <Toolbar />
      <FolloweesList />
    </div>
  );
}

export default Follows;
