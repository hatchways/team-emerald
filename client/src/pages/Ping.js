import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField, Button, Typography } from '@material-ui/core';

function Ping(props) {
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState('');

  const { incrementStep } = props;
  useEffect(() => {
    incrementStep();
  }, [incrementStep]);

  const submitAnswer = () => {
    let status;
    fetch('/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName: answer }),
    })
      .then(res => {
        status = res.status;
        if (status < 500) return res.json();
        throw Error('Server error');
      })
      .then(res => {
        setResult(res.response);
        if (status === 200) props.incrementStep();
      })
      .catch(err => {
        console.log(err.message); // eslint-disable-line no-console
      });
  };

  return (
    <div>
      <Typography>
        Step 3: Add your first name to server/.env, refresh and test the result
        below
      </Typography>
      <Typography>{result}</Typography>

      <FormControl>
        <TextField
          label="first name"
          onChange={e => setAnswer(e.target.value)}
        />
      </FormControl>
      <Button onClick={submitAnswer}>Submit</Button>
    </div>
  );
}

Ping.propTypes = {
  incrementStep: PropTypes.func.isRequired,
};

export default Ping;
