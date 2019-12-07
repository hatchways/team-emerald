/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const SocketIo = require('socket.io');
const SocketClient = require('socket.io-client');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const httpServer = require('http').createServer();
const User = require('../../models/User');

const ENDPOINT = process.env.SOCKET_CHANNEL_ENDPOINT || 'http://localhost';
const PORT = process.env.SOCKET_CHANNEL_PORT || 3002;

const io = SocketIo();
const socketServer = {};

/*
 *  List of connected clients
 *  {
 *    [userId]: SocketObject
 *  }
 */
socketServer.clients = {};

socketServer.start = server => {
  io.attach(server);
  io.on('connection', socket => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Socket: new connection from ${socket.id}`);
    }

    setTimeout(() => {
      if (!socket.authenticated) return socket.disconnect(true);
    }, 2000);

    // Use the token cookie to authenticate the client
    socket.on('authenticate', async () => {
      const { token } = cookie.parse(socket.handshake.headers.cookie);

      if (!token) {
        return socket.disconnect(true);
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        await User.findById(id);

        // eslint-disable-next-line no-param-reassign
        socket.authenticated = true;

        // Add current connection to list of connected clients
        socketServer.clients[id] = socket;

        if (process.env.NODE_ENV !== 'production') {
          console.log(Object.keys(socketServer.clients));
        }

        socket.on('disconnect', () => {
          delete socketServer.clients[id];
        });
      } catch (error) {
        console.log(error);
        return socket.disconnect(true);
      }
    });
  });

  // A separate endpoint for triggering the emittance of 'notification' event
  const messageChannel = SocketIo(
    httpServer.listen(PORT, err => {
      if (err) return console.log(err);
      console.log(`Socket channel on port ${PORT}`);
    }),
  );

  messageChannel.on('connection', socket => {
    console.log('admin');

    socket.on('send notification', ({ userId }) => {
      if (!userId) return;

      const clientConnection = socketServer.clients[userId];
      if (!clientConnection) return;

      try {
        clientConnection.emit('notification');
      } catch (err) {
        console.log(err);
      }
    });
  });

  return socketServer;
};

// An admin client for sending notification to user by userId
const Admin = function Admin() {
  const admin = SocketClient(`${ENDPOINT}:${PORT}`);
  admin.notifyUserById = userId => {
    admin.emit('send notification', { userId });
  };

  return admin;
};

module.exports = {
  socketServer,
  Admin,
};
