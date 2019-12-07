import { useEffect } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

const SOCKETSERVER_DEV_ENDPOINT = 'http://localhost:3001/';

function SocketClient({ isAuthenticated }) {
  useEffect(() => {
    if (!isAuthenticated) return;

    // socket will default to host url in production
    const socket =
      process.env.NODE_ENV === 'production'
        ? socketIOClient()
        : socketIOClient(SOCKETSERVER_DEV_ENDPOINT);

    socket.emit('authenticate');

    socket.on('notification', () => {
      /* Fetch notifications through http API */
      console.log('Received Notification');
    });
  }, [isAuthenticated]);

  return null;
}

SocketClient.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SocketClient);
