import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

const SOCKETSERVER_DEV_ENDPOINT = 'http://localhost:3001/';

function SocketClient({ user }) {
  useEffect(() => {
    if (!user) return;

    const { email } = user;
    if (!email) return;

    // socket will default to host url in production
    const socket =
      process.env.NODE_ENV === 'production'
        ? socketIOClient()
        : socketIOClient(SOCKETSERVER_DEV_ENDPOINT);

    socket.emit('authenticate', { email });
    // eslint-disable-next-line no-alert
    socket.on('notification', () => {
      /* Fetch notifications through http API */
    });
  }, [user]);

  return null;
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SocketClient);
