/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
require('colors');
const SocketIo = require('socket.io');
const SocketClient = require('socket.io-client');
const httpServer = require('http').createServer();
const User = require('./models/User');

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

        socketServer.clients[user._id] = socket;

        if (process.env.NODE_ENV !== 'production') {
          console.log(Object.keys(socketServer.clients));
        }
      });
    });
  });

  const messageChannel = SocketIo(
    httpServer.listen(PORT, err => {
      if (err) return console.log(err);
      console.log(`Socket channel on port ${PORT}`.yellow);
    }),
  );

  messageChannel.on('connection', socket => {
    console.log('admin');

    socket.on('notify user', ({ userId }) => {
      if (!userId) return;

      const clientConnection = socketServer.clients[userId];
      if (!clientConnection) return;

      try {
        clientConnection.emit('notification', { notification: 'TEST' });
      } catch (err) {
        console.log(err);
      }
    });
  });

  return socketServer;
};

const Admin = function Admin() {
  const admin = SocketClient(`http://127.0.0.1:${PORT}`);
  admin.notifyUserById = userId => {
    admin.emit('notify user', { userId });
  };
  return admin;
};

module.exports = {
  socketServer,
  Admin,
};
