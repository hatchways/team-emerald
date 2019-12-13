/* eslint-disable no-console */
import React from 'react';
import { Route } from 'react-router-dom';

import SignUpDialog from '../components/SignUp/SignUpDialog';
import SignInDialog from '../components/SignIn/SignInDialog';

function LandingPage({ match }) {
  const backgroundImage = `${process.env.PUBLIC_URL}/assets/photo-1516274626895-055a99214f08.jpeg`;
  console.log(match);
  return (
    <>
      <img src={backgroundImage} alt="landingImage" className="landingImg" />
      <Route path="/login" component={SignInDialog} exact />
      <Route path="/register" component={SignUpDialog} exact />
    </>
  );
}

export default LandingPage;
