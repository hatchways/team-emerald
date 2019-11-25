// import React, { useState, useRef } from 'react';
import React from 'react';
import { Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ThemeButton from '../ThemeButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    height: '70rem',
  },
  input: {
    textAlign: 'center',
    boxShadow: theme.boxShadowTheme,
  },
  label: {
    color: 'black',
  },
}));

function CreateSignInForm() {
  // const [email, setEmail] = useState('');

  const classes = useStyles();

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   // eslint-disable-next-line no-unused-vars
  //   const formData = {
  //     email,
  //   };
  //   /* TODO: SUBSCRIBE TO REDUX STORE AND PASS FORMDATA TO ACTION CREATORS */

  //   // Clear Data
  //   setEmail('');
  // };

  return (
    // onSubmit={handleSubmit}
    <form className={classes.root}>
      <InputLabel className={classes.label}>Your e-mail address:</InputLabel>
      <Input
        placeholder="E-mail"
        name="email"
        fullWidth
        // value={email}
        // onChange={e => setEmail(e.target.value)}
        classes={{ input: classes.input }}
        disableUnderline
      />
      <InputLabel className={classes.label}>Password:</InputLabel>
      <Input
        placeholder="Password"
        name="password"
        fullWidth
        // value={password}
        // onChange={e => setPassword(e.target.value)}
        classes={{ input: classes.input }}
        disableUnderline
      />

      <ThemeButton
        text="Sign In"
        type="submit"
        padding="2rem 3rem"
        width="26rem"
        height="6.3rem"
        // disabled={!name}
      />
    </form>
  );
}

export default CreateSignInForm;
