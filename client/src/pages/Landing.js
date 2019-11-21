/* eslint-disable no-console */
import React from 'react';

import FormSubmitButton from '../components/FormSubmitButton';

function LandingPage() {
  return (
    <div>
      <FormSubmitButton
        text="Add New Item"
        handleClick={() => console.log('New Item Added')}
      />
      <FormSubmitButton
        text="Create List"
        handleClick={() => console.log('New List Created')}
      />
      <FormSubmitButton
        text="Create Account"
        handleClick={() => console.log('New Account Created')}
      />
    </div>
  );
}

export default LandingPage;
