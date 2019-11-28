const Queue = require('bull');
const currency = require('currency.js');

const Product = require('../../models/Product');

/* For testing purposes: REMOVE LATER when putting this file inside the products controller */
// eslint-disable-next-line import/order
const dotenv = require('dotenv');

const connectDB = require('../../utils/database');

// Load env vars
dotenv.config({
  path: './.env',
});

connectDB();
/* ***************************************************************************************** */

const sendQueue = new Queue('web-scrape-service');
const receiveQueue = new Queue('update-product');

// Used for when users add new product links to database
const newProductOptions = {
  priority: 1,
};

// Used to webscrape existing products in database at a later time
const delayOptions = {
  priority: 10,
  delay: 20000, // Change to a longer duration later
};

/*  FOR JOBS SENT ON THE WEB SCRAPE SERVICE QUEUE
    Data for new products:
    data: {
      link: LINK_TO_PRODUCT_PAGE,
      newProduct: true
    }

    Data for products already in database
    data: {
      id: MONGODB_OBJECT_ID,
      link: LINK_TO_PRODUCT_PAGE,
      currentPrice: CURRENT_PRICE_OF_PRODUCT_IN_DB
    }
*/

/* FOR JOBS RECEIVED ON THE UPDATE PRODUCT QUEUE
    data: {
      id: job.data.id || false,
      productDetails: {
        name:
        link:
        currentPrice:
        previousPrice:
        imageUrl:
      }
      newProduct: job.data.newProduct || false
    }
*/

receiveQueue.process(async job => {
  const { productDetails } = job.data;

  productDetails.currentPrice = currency(productDetails.currentPrice).value;
  productDetails.previousPrice = currency(productDetails.previousPrice).value;

  // if the product is new, save to database and add to queue
  if (job.data.newProduct) {
    console.log(`Creating new product in database for ${productDetails.name}`);
    // ADDED TEST LINE TO SHOW UPDATING WORKS
    productDetails.currentPrice += 10.0;
    let product = await Product.create(productDetails);
    product = product.toJSON();

    sendQueue.add(
      {
        id: product.id,
        link: product.link,
        currentPrice: product.currentPrice,
      },
      delayOptions,
    );
  } else {
    try {
      const productInDb = await Product.findById(job.data.id);

      let savedProduct = null;

      if (!productInDb) throw new Error('Product not found');

      // is fetched price is lower than the one in the database
      console.log(productDetails.currentPrice, productInDb.currentPrice);
      if (productDetails.currentPrice < productInDb.currentPrice) {
        console.log(
          `Lower price found for ${productDetails.name} in database, Updating...`,
        );
        // we update product in the database, and create a new Notification
        // and notify the user if the user is in the database
        savedProduct = await Product.findByIdAndUpdate(
          job.data.id,
          productDetails,
          {
            new: true,
          },
        );
      } else {
        console.log(
          `Lower price NOT found for ${productDetails.name} in database`,
        );
      }

      console.log(`Fetching product at a later time...`);
      sendQueue.add(
        {
          id: job.data.id,
          link: savedProduct.link,
          currentPrice: savedProduct.currentPrice,
        },
        delayOptions,
      );
    } catch (error) {
      console.log('Product was not found in the database, not added to queue');
    }
  }
});

const urls = [
  'https://www.amazon.com/Acer-Lightweight-i7-8565U-Back-lit-Keyboard/dp/B07JLBJZD3?smid=ATVPDKIKX0DER&pf_rd_p=76f0bb6a-acae-4563-a011-9d48589bd6bb&pf_rd_r=9CZQNXVGAK73FVAM482P',
  // 'https://www.amazon.com/Legacy-Heating-CDFP-S-CB-M-Aluminum-Table/dp/B076GYTW6P?ref_=Oct_DLandingS_D_e7e1167a_63&smid=ATVPDKIKX0DER',
];

urls.forEach(url => {
  sendQueue.add(
    {
      link: url,
      newProduct: true,
    },
    newProductOptions,
  );
});
