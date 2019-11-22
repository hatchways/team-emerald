import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  label: {
    margin: 50
  },
  input: {
    width: 420,
    maxWidth: '100%',
    backgroundColor: 'white',
    color: '#333',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize * 1.5,
    padding: '15px 25px',
    border: 'none',
    borderRadius: '24px 0 0 24px',
    boxShadow: '0px 2px 6px #ccf',
    outline: 'none',
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: '0 24px 24px 0',
    boxShadow: '0px 2px 6px #ccf',
  },
  select: {
    width: 180,
    maxWidth: '100%',
    padding: 10,
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize * 1.5,
    color: '#333',
  },
  addButton: {
    fontSize: theme.typography.fontSize * 1.5,
    borderRadius: 24,
    width: 140,
    position: 'relative',
    left: '140'
  }
}));

export default function AddItem() {
  const classes = useStyles();
  const [input, set] = useState({ text: '', select: '' });
  const [options, setOptions] = useState([]);

  const handleInputChange = (e) => {
    set({ text: e.target.value });
  }

  const handleSelectChange = (e) => {
    set({ select: e.target.value });
  }

  useEffect(() => {
    setOptions(mockData);
  }, []);

  return (
    <div>
      <Typography
        variant='h4'
        align='center'
        className={classes.label}
      >Add new item:</Typography>
      <form className={classes.container}>
        <input
          className={classes.input}
          onChange={handleInputChange}
          value={input.text}
          placeholder='Paste your link here'
        />
        <span className={classes.selectContainer}>
          <select
            onChange={handleSelectChange}
            className={classes.select}
          >
            <option value='default'>Select list</option>
            {options.map(list => (
              <option value="list.title">{list.title}</option>
            ))}
          </select>
          <Button
            color='primary'
            variant='contained'
            className={classes.addButton}
          >Add</Button>
        </span>
      </form>
    </div>
  );
}


const mockData = [
  { title: 'Scented Candles' },
  { title: 'Towels' },
  { title: 'Kale' },
]