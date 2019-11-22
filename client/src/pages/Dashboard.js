import React, { useState, useEffect } from 'react';
import ToolBar from '@material-ui/core/ToolBar';
import AddItem from '../components/AddItem';
import ShoppingLists from '../components/ShoppingLists';

const dashboardStyle = {
  backgroundColor: '#fdfdff',
};

export default function Dashboard(props) {
  return (
    <div id="Dashboard" style={dashboardStyle}>
      <ToolBar />
      <AddItem />
      <ShoppingLists />
    </div>
  );
}
