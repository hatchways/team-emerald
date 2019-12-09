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

  const { lists } = props;

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      link,
      list,
    };

    /* TODO: Call redux action to add product link to list on the backend */

    // Console logging to test
    console.log(formData); // eslint-disable-line
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
            text="add item"
            type="submit"
            padding="0rem 0rem"
            width="14.2rem"
            height="4.8rem"
            disabled={!(link && list)}
          />
        </Box>
      </form>
    </>
  );
}

AddItemForm.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);
