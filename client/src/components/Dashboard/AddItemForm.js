import React, { useState } from 'react';
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

// mock data to test out the component's functionality
// the actual data will be passed as props from the redux store
const mockData = [
  { id: 1, title: 'The Best Scented Candles' },
  { id: 2, title: 'Towels' },
  { id: 3, title: 'Kale' },
];

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
    margin: 'auto',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 35,
  },
  select: {
    width: '18rem',
    maxWidth: '100%',
    padding: '1rem',
    fontSize: '1.4rem',
  },
  placeholderFontColor: {
    color: theme.palette.grey[500],
  },
}));

function mapListsToMenuItems(shoppingLists) {
  return shoppingLists.map(sl => (
    <MenuItem key={sl.id} value={sl.id}>
      {sl.title}
    </MenuItem>
  ));
}

function AddItemForm() {
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const classes = useStyles();

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

  return (
    <>
      <Typography variant="h5" align="center" className={classes.label}>
        Add new item:
      </Typography>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Box className={classes.styledBox}>
          <Input
            classes={{ input: classes.input }}
            onChange={e => setLink(e.target.value)}
            value={link}
            placeholder="Paste your link here"
            disableUnderline
          />

          <Divider orientation="vertical" />

          <Select
            value={list}
            classes={{ root: classes.select }}
            onChange={e => setList(e.target.value)}
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
            {/* rename mockData argument with something else when we 
                connect this component with the redux store */}
            {mapListsToMenuItems(mockData)}
          </Select>

          <ThemeButton
            text="add"
            type="submit"
            padding="0rem 0rem"
            width="14.2rem"
            height="5.6rem"
            disabled={!(link && list)}
          />
        </Box>
      </form>
    </>
  );
}

export default AddItemForm;
