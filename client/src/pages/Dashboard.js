import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddItemForm from '../components/Dashboard/AddItemForm';
import ShoppingLists from '../components/Dashboard/ShoppingLists';
import theme from '../themes/theme';

const useStyles = makeStyles({
  dashboard: {
    backgroundColor: theme.backgroundColor,
    paddingBottom: theme.spacing(5),
  },
});

export default function Dashboard(props) {
  const classes = useStyles();
  const { handleClickOpenProductDetails } = props;
  return (
    <div id="Dashboard" className={classes.dashboard}>
      <Toolbar />
      <AddItemForm />
      <ShoppingLists
        handleClickOpenProductDetails={handleClickOpenProductDetails}
      />
    </div>
  );
}

Dashboard.propTypes = {
  handleClickOpenProductDetails: PropTypes.func.isRequired,
};
