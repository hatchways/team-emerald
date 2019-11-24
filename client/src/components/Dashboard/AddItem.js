import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const addItemTheme = createMuiTheme({
  palette: {
    primary: { main: '#DF1B1B' },
  },
});

const mockData = [
  { title: 'Scented Candles' },
  { title: 'Towels' },
  { title: 'Kale' },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  label: {
    margin: 50,
  },
  input: {
    width: 400,
    height: 30,
    maxWidth: '100%',
    backgroundColor: 'white',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.6rem',
    padding: '15px 25px',
    borderRadius: '28px 0 0 28px',
    boxShadow: theme.boxShadowTheme,
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: '0 28px 28px 0',
    boxShadow: theme.boxShadowTheme,
  },
  select: {
    width: 180,
    maxWidth: '100%',
    padding: 10,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.6rem',
  },
  addButton: {
    fontSize: '1.6rem',
    borderRadius: 24,
    width: 140,
    position: 'relative',
    left: '140',
  },
  menuItem: {
    fontSize: '1.6rem',
  },
}));

export default function AddItem() {
  const classes = useStyles();
  const [input, set] = useState({ text: '', select: '' });
  const [options, setOptions] = useState([]);

  const handleInputChange = e => {
    set({ text: e.target.value });
  };

  const handleSelectChange = e => {
    set({ select: e.target.value });
  };

  const renderSelectValue = value => (input.select ? value : 'Select list');

  useEffect(() => {
    setOptions(mockData);
  }, []);

  return (
    <MuiThemeProvider theme={addItemTheme}>
      <Typography variant="h3" align="center" className={classes.label}>
        Add new item:
      </Typography>
      <form className={classes.container}>
        <Input
          classes={{ input: classes.input }}
          onChange={handleInputChange}
          value={input.text}
          placeholder="Paste your link here"
          disableUnderline
        />
        <span className={classes.selectContainer}>
          <Select
            onChange={handleSelectChange}
            classes={{ root: classes.select }}
            displayEmpty
            renderValue={renderSelectValue}
            disableUnderline
          >
            {options.map(list => (
              <MenuItem
                key={list.title}
                value={list.title}
                classes={{ root: classes.menuItem }}
              >
                {list.title}
              </MenuItem>
            ))}
          </Select>
          <Button
            color="primary"
            variant="contained"
            className={classes.addButton}
          >
            Add
          </Button>
        </span>
      </form>
    </MuiThemeProvider>
  );
}
