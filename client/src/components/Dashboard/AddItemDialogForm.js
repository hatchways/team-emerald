import React, { useState } from 'react';
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

// mock data to test out the component's functionality
// the actual data will be passed as props from the redux store
const mockData = [
  { id: 1, title: 'The Best Scented Candles' },
  { id: 2, title: 'Towels' },
  { id: 3, title: 'Kale' },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    height: '70rem',
  },
  box: {
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
    height: '6rem',
    boxShadow: theme.boxShadowTheme,
  },
  select: {
    fontSize: '1.6rem',
    width: '52.5rem',
    height: '6rem',
    textAlignLast: 'center',
  },
  placeholderFontColor: {
    color: theme.palette.grey[500],
    fontSize: '1.6rem',
  },
}));

function mapListsToMenuItems(shoppingLists) {
  return shoppingLists.map(sl => (
    <MenuItem key={sl.id} value={sl.id}>
      {sl.title}
    </MenuItem>
  ));
}

function AddItemDialogForm(props) {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const classes = useStyles(props);

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
            {/* rename mockData argument with something else when we 
                connect this component with the redux store */}
            {mapListsToMenuItems(mockData)}
          </Select>
        </Box>

        <ThemeButton
          text="add item"
          type="submit"
          padding="0rem 0rem"
          width="24rem"
          height="7rem"
          disabled={!(link && list)}
        />
      </form>
    </>
  );
}

export default AddItemDialogForm;
