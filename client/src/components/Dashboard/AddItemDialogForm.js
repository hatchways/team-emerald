import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import ThemeButton from '../ThemeButton';

import { ADD_PRODUCT } from '../../actions/types';
import { addProductToList } from '../../actions/products';

import { createLoadingSelector } from '../../reducers/loading';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    height: '70rem',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '7rem',
    padding: '0 0',
    backgroundColor: 'white',
    boxShadow: theme.boxShadowTheme,
  },
  label: {
    color: 'black',
  },
  input: {
    textAlign: 'center',
    fontSize: '1.6rem',
    width: '55rem',
    height: '7rem',
    padding: '0 0',
    boxShadow: theme.boxShadowTheme,
  },
  select: {
    fontSize: '1.6rem',
    width: '52.5rem',
    textAlignLast: 'center',
    '&:focus': {
      backgroundColor: 'white',
    },
  },
  placeholderFontColor: {
    color: theme.palette.grey[500],
    fontSize: '1.6rem',
  },
}));

function mapListsToMenuItems(shoppingLists) {
  return shoppingLists.map(sl => (
    <MenuItem key={sl.id} value={sl.id}>
      {sl.name}
    </MenuItem>
  ));
}

function AddItemDialogForm(props) {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const classes = useStyles(props);

  const { lists, loading, addProduct } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addProduct(list, link);
    setLink('');
    setList('');
  };

  const handleInputChange = e => setLink(e.target.value);

  const handleSelectChange = e => setList(e.target.value);

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <InputLabel className={classes.label}>Paste link to item:</InputLabel>
        <Input
          classes={{ input: classes.input }}
          onChange={handleInputChange}
          value={link}
          placeholder="Paste your link here"
          disableUnderline
        />
        <InputLabel className={classes.label}>Select list:</InputLabel>
        <Box className={classes.box}>
          <Select
            value={list}
            classes={{ root: classes.select }}
            onChange={handleSelectChange}
            displayEmpty
            disableUnderline
          >
            <MenuItem value="" disabled>
              <Typography
                variant="body2"
                className={classes.placeholderFontColor}
              >
                Select
              </Typography>
            </MenuItem>
            {mapListsToMenuItems(lists)}
          </Select>
        </Box>

        <ThemeButton
          text="add item"
          type="submit"
          padding="0rem 0rem"
          width="24rem"
          height="7rem"
          disabled={!(link && list)}
          loading={loading}
        />
      </form>
    </>
  );
}

AddItemDialogForm.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  addProduct: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([ADD_PRODUCT]);

const mapStateToProps = state => ({
  lists: state.list.lists,
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  addProduct: addProductToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemDialogForm);
