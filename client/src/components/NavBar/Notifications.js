import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Badge, Box, Button, Popper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from '../Product';
import CloseIconButton from '../CloseIconButton';

import { putNotifications } from '../../actions/notifications';
import {
  setProductDetails,
  openProductDetailsDialog,
} from '../../actions/product-details';

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
  box: {
    '&:hover': {
      opacity: '.75',
      cursor: 'pointer',
    },
  },
}));

function Notifications(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [arrowRef, setArrowRef] = useState(null);

  const history = useHistory();

  /* eslint-disable no-shadow */
  const {
    notifications,
    dismissNotification,
    setProductDetails,
    openProductDetailsDialog,
  } = props;

  const handleBoxClick = product => {
    openProductDetailsDialog();
    setProductDetails(product);
  };

  function mapNotificationsToItems() {
    return notifications.map(notification => {
      const {
        id,
        product: { imageUrl, name, link },
        currentPrice,
        previousPrice,
      } = notification;
      return (
        <Box key={id} display="flex">
          <Box
            className={classes.box}
            onClick={
              () =>
                handleBoxClick({
                  name,
                  imageUrl,
                  link,
                  currentPrice,
                  previousPrice,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <Product
              name={name}
              link={link}
              imgUrl={imageUrl}
              currentPrice={currentPrice}
              previousPrice={previousPrice}
            />
          </Box>
          <Box position="relative">
            <CloseIconButton handleClose={() => dismissNotification(id)} />
          </Box>
        </Box>
      );
    });
  }

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
          {!!notifications.length && (
            <Typography className={classes.newPrice}>new price!</Typography>
          )}
          {mapNotificationsToItems(notifications, dismissNotification)}
        </Box>
      </Popper>
    </Badge>
  );
}

Notifications.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  dismissNotification: PropTypes.func.isRequired,
  setProductDetails: PropTypes.func.isRequired,
  openProductDetailsDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  notifications: state.notification.notifications,
});

const mapDispatchToProps = {
  dismissNotification: putNotifications,
  setProductDetails,
  openProductDetailsDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
