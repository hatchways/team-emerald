import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#F7F7F7',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'red',
  },
  textfield: {
    backgroundColor: 'white',
  },
}));

function Redirect() {
  return <h1>Dashboard</h1>;
}

function Loading() {
  return <p>Loading...</p>;
}

function registerReducer(state, action) {
  if (action.type === 'login') {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }
  if (action.type === 'success') {
    return {
      ...state,
      loading: false,
      error: '',
      registered: true,
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }
  if (action.type === 'input') {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  throw new Error(`That action doesn't exist`);
}

const SignUp = () => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(registerReducer, {
    name: '',
    email: '',
    password: '',
    loading: false,
    error: '',
    registered: false,
  });

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   dispatch({ type: 'login' });

  //   newUser({
  //     email: state.email,
  //     password: state.password,
  //   })
  //     .then(() => dispatch({ type: 'success' }))
  //     .catch(error =>
  //       dispatch({
  //         type: 'error',
  //         error,
  //       }),
  //     );
  // };

  if (state.registered === true) {
    return <Redirect to="/dashboard" />;
  }

  if (state.loading === true) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.error && <p>{state.error}</p>}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <InputLabel>Your name:</InputLabel>
          <TextField
            className={classes.textfield}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={
              e =>
                dispatch({
                  type: 'input',
                  name: 'name',
                  value: e.target.value,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            value={state.name}
          />
          <InputLabel>Your e-mail address:</InputLabel>
          <TextField
            className={classes.textfield}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            // autoFocus
            onChange={
              e =>
                dispatch({
                  type: 'input',
                  name: 'email',
                  value: e.target.value,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            value={state.email}
          />
          <InputLabel>Password:</InputLabel>
          <TextField
            className={classes.textfield}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            // label="Password"
            placeholder="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
          <Grid container>
            <Grid item xs>
              Don&apos;t have an account?
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
              {/* {'Create an Account'} */}
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
