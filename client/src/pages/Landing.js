import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link } from 'react-router-dom';

import Ping from './Ping';

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2,
  },
});

class LandingPage extends Component {
  state = {
    welcomeMessage: 'Step 1: Run the server and refresh (not running)',
    step: 0,
  };

  componentDidMount() {
    fetch('/welcome')
      .then(res => {
        console.log(res); // eslint-disable-line no-console
        if (res.status === 200) return res.json();
        throw Error("Couldn't connect to the server");
      })
      .then(res => {
        this.setState({ welcomeMessage: res.welcomeMessage });
        this.incrementStep();
      })
      .catch(err => {
        console.log(err.message); // eslint-disable-line no-console
      });
  }

  incrementStep = () => {
    this.setState(({ step }) => ({ step: step + 1 }));
  };

  render() {
    const { classes } = this.props;
    const { step, welcomeMessage } = this.state;
    return (
      <div className={classes.landingContainer}>
        <Typography>{welcomeMessage}</Typography>
        {step >= 1 && (
          <>
            <Link to="/ping">Step 2: Click here </Link>
            <Route
              path="/ping"
              render={props => {
                return (
                  <Ping
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    incrementStep={this.incrementStep}
                    step={step}
                  />
                );
              }}
            />
          </>
        )}
        {step >= 3 && (
          <Typography>All done! Now go make a pull request!</Typography>
        )}
      </div>
    );
  }
}

LandingPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(landinPageStyle)(LandingPage);
