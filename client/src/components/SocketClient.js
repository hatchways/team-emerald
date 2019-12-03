import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

// Change this in production
const SOCKETSERVER_ENDPOINT = 'http://localhost:3001/';

function SocketClient({ user }) {
  useEffect(() => {
    if (!user) return;

    const { email } = user;
    if (!email) return;

    const socket = socketIOClient(SOCKETSERVER_ENDPOINT);
    socket.emit('authenticate', { email });
    // eslint-disable-next-line no-alert
    socket.on('notification', ({ notification }) => alert(notification));
  }, [user]);

  return null;
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SocketClient);
