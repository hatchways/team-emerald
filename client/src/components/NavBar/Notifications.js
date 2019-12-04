import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Badge, Box, Button, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  notificationButton: {
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeightMedium,

    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  notificationContent: {
    borderTop: '.5rem solid black',
    padding: theme.spacing(1),
    width: '50rem',
    backgroundColor: theme.palette.background.paper,
  },
  arrow: {
    fontSize: '.5rem',
    width: '1rem',
    height: '1.2rem',
    margin: '0 auto',

    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      borderLeft: '.5rem solid transparent',
      borderRight: '.5rem solid transparent',
      borderBottom: '.6rem solid black',
    },
  },
}));

/* TODO: Connect Notifications component to redux to control when the dot appears, and retrieve price changes */
function Notifications(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [arrowRef, setArrowRef] = useState(null);

  const history = useHistory();

  const handleClick = event => {
    const { isAuthenticated } = props;
    if (isAuthenticated) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    } else {
      history.push('/login');
    }
  };

  const handleArrowRef = node => {
    setArrowRef(node);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Badge badgeContent={4} color="secondary" variant="dot">
      <Button onClick={handleClick} className={classes.notificationButton}>
        Notifications
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'undefined',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        <Box className={classes.arrow} ref={handleArrowRef} />
        <Box
          className={classes.notificationContent}
          onMouseOut={() => setAnchorEl(null)}
          onBlur={() => setAnchorEl(null)}
        >
          {/* TODO: RENDER NOTIFICATION CARDS */}
          Content of Notifications
        </Box>
      </Popper>
    </Badge>
  );
}

Notifications.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Notifications);
