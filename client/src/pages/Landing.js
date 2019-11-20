/* eslint-disable no-console */
import React from 'react';

import DialogButton from '../components/DialogButton';

function LandingPage() {
  return (
    <div>
      <DialogButton
        text="Add New Item"
        handleClick={() => console.log('New Item Added')}
      />
      <DialogButton
        text="Create List"
        handleClick={() => console.log('New List Created')}
      />
    </div>
  );
}

export default LandingPage;
