const path = require('path');
const express = require('express');
const morgan = require('morgan');

const connectDB = require('./utils/database');
const errorHandler = require('./middleware/error');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/* eslint-disable-next-line no-unused-vars */
app.get('/', (req, res, next) => {
  res.status(200).json({ success: true });
});

app.use(errorHandler);

module.exports = app;
