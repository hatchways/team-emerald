import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  Input,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import ThemeButton from '../ThemeButton';

import { ADD_PRODUCT } from '../../actions/types';
import { addProductToList } from '../../actions/products';

import { createLoadingSelector } from '../../reducers/loading';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  label: {
    margin: '5rem',
  },
  input: {
    height: '3rem',
    maxWidth: '40rem',
    paddingLeft: theme.spacing(5),
    fontSize: '1.6rem',
  },
  styledBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '88rem',
    maxWidth: '88rem',
    backgroundColor: 'white',
    borderRadius: 40,
    boxShadow: theme.boxShadowTheme,
  },
  select: {
    width: '18rem',
    maxWidth: '100%',
    padding: '1rem',
    '&:focus': {
      backgroundColor: 'white',
    },
  },
  placeholderFontColor: {
    color: theme.palette.grey[500],
  },
}));

function mapListsToMenuItems(shoppingLists) {
  return shoppingLists.map(sl => (
    <MenuItem key={sl.id} value={sl.id}>
      {sl.name}
    </MenuItem>
  ));
}

function AddItemForm(props) {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const classes = useStyles();

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
      <Typography variant="h5" align="center" className={classes.label}>
        Add new item:
      </Typography>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Box className={classes.styledBox}>
          <Input
            classes={{ input: classes.input }}
            onChange={handleInputChange}
            value={link}
            placeholder="Paste your link here"
            disableUnderline
          />

          <Divider orientation="vertical" />

          <Select
            value={list}
            classes={{ root: classes.select }}
            onChange={handleSelectChange}
            autoWidth
            displayEmpty
            disableUnderline
          >
            <MenuItem value="" disabled>
              <Typography
                variant="body2"
                className={classes.placeholderFontColor}
              >
                Select List
              </Typography>
            </MenuItem>
            {mapListsToMenuItems(lists)}
          </Select>

          <ThemeButton
            text="add"
            type="submit"
            padding="0rem 0rem"
            width="14.2rem"
            height="4.8rem"
            disabled={!(link && list)}
            loading={loading}
          />
        </Box>
      </form>
    </>
  );
}

AddItemForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);
