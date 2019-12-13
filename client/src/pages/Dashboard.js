import React, { useState } from 'react';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddItemForm from '../components/Dashboard/AddItemForm';
import ShoppingLists from '../components/Dashboard/ShoppingLists';
import ListDetailsDialog from '../components/Dashboard/ListDetailsDialog';
import AddItemDialog from '../components/Dashboard/AddItemDialog';
import theme from '../themes/theme';

const useStyles = makeStyles({
  dashboard: {
    backgroundColor: theme.backgroundColor,
    paddingBottom: theme.spacing(5),
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [openList, setOpenList] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [listToDisplay, setListToDisplay] = useState(null);

  const handleClickOpenList = list => {
    setOpenList(true);
    setListToDisplay(list);
  };

  const handleCloseList = () => {
    setOpenList(false);
  };

  const handleClickOpenAddItem = () => {
    setOpenAddItem(true);
  };

  const handleCloseAddItem = () => {
    setOpenAddItem(false);
  };

  return (
    <div id="Dashboard" className={classes.dashboard}>
      <Toolbar />
      <AddItemForm />
      <ShoppingLists
        handleClickOpenList={handleClickOpenList}
        listToDisplay={listToDisplay}
        setListToDisplay={setListToDisplay}
      />
      <ListDetailsDialog
        open={openList}
        handleClose={handleCloseList}
        handleOpenAddItem={handleClickOpenAddItem}
        list={listToDisplay}
      />
      <AddItemDialog open={openAddItem} handleClose={handleCloseAddItem} />
    </div>
  );
}
