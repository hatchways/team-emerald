const Queue = require('bull');

const amazon = require('./amazon-web-scraper');

const sendQueue = new Queue('update-product');
const receiveQueue = new Queue('web-scrape-service');

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

/* FOR JOBS SENT TO THE UPDATE PRODUCT QUEUE
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

// Start puppeteer
(async () => {
  amazon.initialize();
})();

receiveQueue.process(async job => {
  // Web-scrape product details
  const productDetails = await amazon.getProductDetails(job.data.link);

  // Send updated info to sendQueue
  await sendQueue.add({
    id: job.data.id,
    productDetails,
    newProduct: job.data.newProduct,
  });
});
