require('colors');
const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 */
const connectDB = async () => {
  let uri;
  if (process.env.NODE_ENV === 'test') {
    uri = process.env.MONGODB_URI_TEST;
  } else {
    uri = process.env.MONGODB_URI;
  }

  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
    );
  }
};

module.exports = connectDB;
