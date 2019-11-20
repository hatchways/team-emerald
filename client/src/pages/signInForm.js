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
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <h1> Sign In </h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your email address:
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="E-mail"
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              value={this.state.password}
              placeholder="Password"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignInForm;
