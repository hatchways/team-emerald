const Queue = require('bull');
const currency = require('currency.js');

const amazon = require('./amazon-web-scraper');
const Product = require('../../models/Product');

/* **************************************************************************************** */
// For testing purposes: REMOVE LATER when putting this file inside the products controller
// eslint-disable-next-line import/order
const dotenv = require('dotenv');

const connectDB = require('../../utils/database');

// Load env vars
dotenv.config({
  path: './.env',
});

connectDB();
/* **************************************************************************************** */

const webScrapeQueue = new Queue('web-scrape-service');

/*  FOR JOBS RECEIVED ON THE WEB SCRAPE SERVICE QUEUE
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

// Used for when users add new products to database
const newProductOptions = {
  priority: 1,
};

// Used to webscrape existing products in database at a later time
const delayOptions = {
  priority: 10,
  delay: 20000, // Change to a longer duration later
};

webScrapeQueue.process(async job => {
  // web-scrape link for product details
  const productDetails = await amazon.getProductDetails(job.data.link);

  const result = {
    id: job.data.id,
    productDetails,
    newProduct: job.data.newProduct,
  };

  return result;
});

webScrapeQueue.on('completed', async (job, result) => {
  const { productDetails } = result;

  // convert currency from string to number
  productDetails.currentPrice = currency(productDetails.currentPrice).value;
  productDetails.previousPrice = currency(productDetails.previousPrice).value;

  // if the product is new, save to database and add to queue
  if (job.data.newProduct) {
    console.log(`Creating new product in database for ${productDetails.name}`);
    // ADDED TEST LINE TO SHOW UPDATING WORKS
    productDetails.currentPrice += 10.0;
    let product = await Product.create(productDetails);
    product = product.toJSON();

    webScrapeQueue.add(
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
      webScrapeQueue.add(
        {
          id: job.data.id,
          link: savedProduct ? savedProduct.link : productInDb.link,
          currentPrice: savedProduct
            ? savedProduct.currentPrice
            : productInDb.currentPrice,
        },
        delayOptions,
      );
    } catch (error) {
      console.log(error);
      console.log('Product was not found in the database, not added to queue');
    }
  }
});

/* **************************************************************************************** */
/* TEST */
const test = () => {
  const urls = [
    'https://www.amazon.com/Acer-Lightweight-i7-8565U-Back-lit-Keyboard/dp/B07JLBJZD3?smid=ATVPDKIKX0DER&pf_rd_p=76f0bb6a-acae-4563-a011-9d48589bd6bb&pf_rd_r=9CZQNXVGAK73FVAM482P',
    // 'https://www.amazon.com/Legacy-Heating-CDFP-S-CB-M-Aluminum-Table/dp/B076GYTW6P?ref_=Oct_DLandingS_D_e7e1167a_63&smid=ATVPDKIKX0DER',
  ];

  urls.forEach(url => {
    webScrapeQueue.add(
      {
        link: url,
        newProduct: true,
      },
      newProductOptions,
    );
  });
};

// Start puppeteer
(async () => {
  await amazon.initialize();
  test();
})();
/* **************************************************************************************** */
