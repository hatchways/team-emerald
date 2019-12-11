import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Badge, Box, Button, Popper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from '../Product';

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
    padding: theme.spacing(3),
    width: '60rem',
    backgroundColor: theme.palette.background.paper,
  },
  newPrice: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: '1.8rem',
    textTransform: 'capitalize',
    color: 'black',
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

function mapNotificationsToItems(notifications) {
  return notifications.map(notification => {
    const {
      id,
      product: { imageUrl, name, link },
      currentPrice,
      previousPrice,
    } = notification;
    return (
      <Box key={id}>
        <Product
          name={name}
          link={link}
          imgUrl={imageUrl}
          currentPrice={currentPrice}
          previousPrice={previousPrice}
        />
      </Box>
    );
  });
}

function Notifications(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [arrowRef, setArrowRef] = useState(null);

  const history = useHistory();

  const { notifications } = props;

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
    <Badge badgeContent={notifications.length} color="secondary" variant="dot">
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
          // onMouseOut={() => setAnchorEl(null)}
          // onBlur={() => setAnchorEl(null)}
        >
          <Typography className={classes.newPrice}>new price!</Typography>
          {mapNotificationsToItems(notifications)}
        </Box>
      </Popper>
    </Badge>
  );
}

Notifications.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps)(Notifications);
