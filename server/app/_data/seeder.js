require('colors');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './.env',
});

// Load models
const List = require('../models/List');
const Product = require('../models/Product');
const User = require('../models/User');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const lists = JSON.parse(fs.readFileSync(`${__dirname}/lists.json`, 'utf-8'));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8'),
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import data into database
const importData = async () => {
  try {
    await List.create(lists);
    await Product.create(products);
    await User.create(users);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data from database
const deleteData = async () => {
  try {
    await List.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
