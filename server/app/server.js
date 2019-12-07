require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './.env',
});

const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

const { socketServer } = require('./services/socket-service/socketService');

socketServer.start(server);

// Handle unhandled promise rejections
/* eslint-disable-next-line no-unused-vars */
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close server & exist process
  server.close(() => {
    process.exit(1);
  });
});
