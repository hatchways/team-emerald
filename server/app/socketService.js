/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const SocketIo = require('socket.io');
const SocketClient = require('socket.io-client');
const httpServer = require('http').createServer();
const User = require('./models/User');

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

    // Use user email to determin the identity of client
    socket.on('authenticate', ({ email }) => {
      if (!email) return socket.disconnect(true);

      User.findOne({ email }, (err, user) => {
        if (err) {
          console.log(err);
          return socket.disconnect(true);
        }

        if (!user) return socket.disconnect(true);

        // eslint-disable-next-line no-param-reassign
        socket.authenticated = true;

        socket.on('disconnect', () => {
          delete socketServer.clients[user._id];
        });

        // Add current connection to list of connected clients
        socketServer.clients[user._id] = socket;

        if (process.env.NODE_ENV !== 'production') {
          console.log(Object.keys(socketServer.clients));
        }
      });
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
