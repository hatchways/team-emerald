import React, { useState, useEffect } from 'react';
import ToolBar from '@material-ui/core/ToolBar';
import SearchBar from '../components/SearchBar';
import ShoppingLists from '../components/ShoppingLists';

const dashboardStyle = {
  backgroundColor: '#fcfbff',
};

export default function Dashboard(props) {
  return (
    <div id="Dashboard" style={dashboardStyle}>
      <ToolBar />
      <SearchBar />
      <ShoppingLists />
    </div>
  );
}
