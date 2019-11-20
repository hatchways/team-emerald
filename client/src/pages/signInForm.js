import React from 'react';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1> Sign In </h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Your email address:
            <input
              type="text"
              name="email"
              value={email}
              placeholder="E-mail"
              id="email"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              value={password}
              placeholder="Password"
              id="password"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignInForm;
