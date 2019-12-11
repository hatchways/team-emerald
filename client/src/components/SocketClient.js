import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import { getNotifications } from '../actions/notifications';

const SOCKETSERVER_DEV_ENDPOINT = 'http://localhost:3001/';

// eslint-disable-next-line no-shadow
function SocketClient({ isAuthenticated, getNotifications }) {
  useEffect(() => {
    if (!isAuthenticated) return;

    // socket will default to host url in production
    const socket =
      process.env.NODE_ENV === 'production'
        ? socketIOClient()
        : socketIOClient(SOCKETSERVER_DEV_ENDPOINT);

    socket.emit('authenticate');

    socket.on('notification', () => {
      getNotifications();
    });
  }, [isAuthenticated, getNotifications]);

  return null;
}

SocketClient.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  getNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketClient);
