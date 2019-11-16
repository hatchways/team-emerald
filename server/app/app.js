const path = require('path');
const express = require('express');
const morgan = require('morgan');

const connectDB = require('./utils/database');
const errorHandler = require('./middleware/error');

const indexRouter = require('./routes/index');

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

// API routes
app.use('/', indexRouter);

// Error handler
app.use(errorHandler);

module.exports = app;
