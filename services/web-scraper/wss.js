const Queue = require('bull');
const currency = require('currency.js');
const dotenv = require('dotenv');

const amazon = require('./amazon-web-scraper');
const List = require('../../models/List');
const Notification = require('../../models/Notification');
const Product = require('../../models/Product');
const { Admin } = require('../socket-service/socketService');

/* **************************************************************************************** */
// Connect to Database
const connectDB = require('../../utils/database');

// Load env vars
dotenv.config({
  path: './.env',
});

connectDB();
/* **************************************************************************************** */

// Socket that connects to the Server and sends notifications to clients
const adminSocket = Admin();

const webScrapeQueue = new Queue(process.env.WSS);

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

const repeat = { every: 30000 }; // Change to a longer duration later

// Used to webscrape existing products in database at a later time
const repeatJobOptions = {
  priority: 10,
  repeat,
};

/* A worker is a node program that defines a process function. This function is
 * called everytime the worker is idling and there are jobs to process on the
 * queue. The product's details is scraped from Amazon and the results are
 * returned for the listener.
 */
webScrapeQueue.process(async job => {
  // web-scrape link for product details
  const { id, link, listId, newProduct, userId } = job.data;
  const productDetails = await amazon.getProductDetails(link);

  productDetails.lists = [listId];

  const result = {
    id,
    productDetails,
    newProduct,
    userId,
  };

  return result;
});

/* A listener that listens for the completion of a job. The listener then runs
 * the defined function based on the job and result arguments. After the
 * product's details are scraped from Amazon, the product is either added to
 * the database or updated, a notification is conditionally created, and a
 * message is sent to the connected clients to retrieve notifications from the
 * server.
 */
webScrapeQueue.on('completed', async (job, result) => {
  const { productDetails } = result;

  // convert currency from string to number
  productDetails.currentPrice = currency(productDetails.currentPrice).value;
  productDetails.previousPrice = currency(productDetails.previousPrice).value;

  // if the product is new, save to database and add to queue
  const { id, newProduct, listId, userId } = job.data;
  if (newProduct) {
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

    await List.findByIdAndUpdate(listId, { $push: { products: product.id } });

    await webScrapeQueue.add(
      {
        id: product.id,
        link: product.link,
        currentPrice: product.currentPrice,
      },
      { ...repeatJobOptions, jobId: product.id },
    );

    await Notification.create({
      user: userId,
      product: product.id,
      currentPrice: product.currentPrice,
      previousPrice: product.previousPrice,
    });

    adminSocket.notifyUserById(userId);
  } else {
    try {
      const productInDb = await Product.findById(id);

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
          id,
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

        /* Get all the lists the product is part of, then send a notification
         * to each of the followers of those lists.
         */
        const getFollowers = savedProduct.lists.map(async lId => {
          const list = await List.findById(lId);
          return list.followers;
        });

        let followers = await Promise.all(getFollowers);

        // Each list has its own array of followers, so we flatten the array
        followers = followers.flat();

        // Convert each ObjectId to a string
        followers = followers.map(follower => follower.toString());

        // Remove duplicates
        followers = Array.from(new Set(followers));

        // Create notification for each follower
        await Promise.all(
          followers.map(async follower => {
            return Notification.create({
              user: follower,
              product: savedProduct.id,
              currentPrice: savedProduct.currentPrice,
              previousPrice: savedProduct.previousPrice,
            });
          }),
        );

        followers.forEach(follower => {
          // Emit message to connected followers to retrieve notifications
          adminSocket.notifyUserById(follower);
        });
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

// Start puppeteer
(async () => {
  await amazon.initialize();
})();
