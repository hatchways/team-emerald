/* eslint-disable no-unused-vars */
import React from 'react';
import { Toolbar } from '@material-ui/core';

import DiscoveredUsersList from '../components/Discover/DiscoveredUsersList';

function Follows() {
  return (
    <div id="Follows">
      <Toolbar />
      <DiscoveredUsersList />
    </div>
  );
}

export default Follows;
