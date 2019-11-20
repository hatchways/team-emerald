// import React from 'react';

// import { Button,  } from '@material-ui/core';

// class SignInForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//   };

//   render() {
//     const { email, password } = this.state;
//     return (
//       <div>
//         <h1> Sign In </h1>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="email">
//             Your email address:
//             <input
//               type="text"
//               name="email"
//               value={email}
//               placeholder="E-mail"
//               id="email"
//             />
//           </label>
//           <label htmlFor="password">
//             Password:
//             <input
//               name="password"
//               value={password}
//               placeholder="Password"
//               id="password"
//             />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }
// }

// export default SignInForm;

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'red',
  },
  textfield: {
    backgroundColor: 'white',
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <InputLabel>Your e-mail address:</InputLabel>
          <TextField
            className={classes.textfield}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <InputLabel>Password:</InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
}
