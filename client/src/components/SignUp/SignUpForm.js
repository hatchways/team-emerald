import React, { useState } from 'react';
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

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    /* TODO: SUBSCRIBE TO REDUX STORE AND PASS FORMDATA TO ACTION CREATORS */
    // eslint-disable-next-line no-console
    console.log(formData); // For debugging
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <InputLabel className={classes.label}>Your name:</InputLabel>
      <Input
        placeholder="Name"
        name="name"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        classes={{ input: classes.input }}
        disableUnderline
      />

      <InputLabel className={classes.label}>Your e-mail address:</InputLabel>
      <Input
        placeholder="E-mail"
        name="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        classes={{ input: classes.input }}
        fullWidth
        disableUnderline
      />

      <InputLabel className={classes.label}>Password:</InputLabel>
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={password}
        inputProps={{
          minLength: 6,
        }}
        onChange={e => setPassword(e.target.value)}
        classes={{ input: classes.input }}
        fullWidth
        disableUnderline
      />

      <ThemeButton
        text="Create Account"
        type="submit"
        padding="2rem 3rem"
        width="24rem"
        height="6.3rem"
        disabled={!(name && email && password.length >= 6)}
      />
    </form>
  );
}

export default SignUpForm;
