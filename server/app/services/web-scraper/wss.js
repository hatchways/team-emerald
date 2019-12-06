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
      id: MONGODB_OBJECT_ID (String),
      link: LINK_TO_PRODUCT_PAGE,
      currentPrice: CURRENT_PRICE_OF_PRODUCT_IN_DB
    }
*/

// Used for when users add new products to database
const newProductJobOptions = {
  priority: 1,
};

const repeat = { every: 20000 }; // Change to a longer duration later

// Used to webscrape existing products in database at a later time
const repeatJobOptions = {
  priority: 10,
  repeat,
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
    console.log(
      `Creating new product in database for ${productDetails.name.substring(
        0,
        51,
      )}\n`,
    );
    // TEST - increased currentPrice by $10 so a later fetch will update the price in DB
    productDetails.currentPrice += 10.0;
    let product = await Product.create(productDetails);
    product = product.toJSON();

    await webScrapeQueue.add(
      {
        id: product.id,
        link: product.link,
        currentPrice: product.currentPrice,
      },
      { ...repeatJobOptions, jobId: product.id },
    );
  } else {
    try {
      const productInDb = await Product.findById(job.data.id);

      if (!productInDb) throw new Error('Product not found');

      // is fetched price is lower than the one in the database
      console.log(
        `New Price: ${productDetails.currentPrice}, Old Price: ${productInDb.currentPrice}\n`,
      );
      if (productDetails.currentPrice < productInDb.currentPrice) {
        console.log(
          `Lower price found for ${productDetails.name.substring(
            0,
            51,
          )} in database, Updating...\n`,
        );
        // Update the product's price in the database
        const savedProduct = await Product.findByIdAndUpdate(
          job.data.id,
          {
            currentPrice: productDetails.currentPrice,
            previousPrice: productInDb.currentPrice,
          },
          {
            new: true,
          },
        );

        // Update job in queue with lower price
        await job.update({ currentPrice: savedProduct.currentPrice });

        /*  TODO:
         *  1)  Create a Notification in database for the new product for each user subscribed
         *      to the list containing said product.
         *  2)  If user is connected to the server atm, send msg to user to fetch for notifications
         */
      } else {
        console.log(
          `Lower price NOT found for ${productDetails.name.substring(
            0,
            51,
          )} in database\n`,
        );
      }

      console.log(`Fetching product at a later time...\n`);
    } catch (error) {
      console.log(
        'Product was not found in the database, removing job from queue...\n',
      );
      await webScrapeQueue.removeRepeatable({
        jobId: job.opts.repeat.jobId,
        ...repeat,
      });
    }
  }
});

/* **************************************************************************************** */
/* TEST */
const test = () => {
  const urls = [
    'https://www.amazon.com/Acer-Lightweight-i7-8565U-Back-lit-Keyboard/dp/B07JLBJZD3?smid=ATVPDKIKX0DER&pf_rd_p=76f0bb6a-acae-4563-a011-9d48589bd6bb&pf_rd_r=9CZQNXVGAK73FVAM482P',
    'https://www.amazon.com/Legacy-Heating-CDFP-S-CB-M-Aluminum-Table/dp/B076GYTW6P?ref_=Oct_DLandingS_D_e7e1167a_63&smid=ATVPDKIKX0DER',
  ];

  urls.forEach(url => {
    webScrapeQueue.add(
      {
        link: url,
        newProduct: true,
      },
      newProductJobOptions,
    );
  });
};

// Start puppeteer
(async () => {
  await amazon.initialize();
  test();
})();
/* **************************************************************************************** */
