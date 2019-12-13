import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const backgroundImage = `${process.env.PUBLIC_URL}/assets/photo-1516274626895-055a99214f08.jpeg`;

const useStyles = makeStyles(() => ({
  root: {
    /* Set rules to fill background */
    minHeight: '100%',
    minWidth: '102.4rem',

    /* Set up proportionate scaling */
    width: '100%',
    height: 'auto',

    /* Set up positioning */
    position: 'fixed',
    top: 0,
    left: 0,
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <img src={backgroundImage} alt="landing page" className={classes.root} />
    </div>
  );
}

export default LandingPage;
