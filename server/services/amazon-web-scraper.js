// A high-level API node library to control headless Chrome or Chromium
const puppeteer = require('puppeteer');
// Cheerio parses HTML markup and provides an API to traverse/manipualte
// the DOM on the server
const cheerio = require('cheerio');

let browser = null;
let page = null;

/* Constants */
const BASE_URL = 'https://amazon.com/';

const chromeOptions = {
  headless: true,
  defaultViewport: null, // viewport to fit windows
  slowMo: 10, // globally delays actions
};

/**
 * Starts up the browser and visits Amazon's base homepage
 */
async function initialize() {
  console.log('Starting the scraper...');
  browser = await puppeteer.launch(chromeOptions);
  page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  console.log('Initialization completed');
}

/**
 * Product
 * @typedef {Object} Product
 * @property {string} title - The product's title
 * @property {string} link - The product's URL
 * @property {string} imageUrl - The product image's URL
 * @property {string} currentPrice - The product's current price
 */

/**
 * Retrieves the product's details after scraping the link
 * @param {string} link - The URL to the product
 * @returns {Product|null} product - The Product object on success or null on failure
 */
async function getProductDetails(link) {
  console.log(`Going to the Product Page... ${link}`);

  let product = null;
  try {
    await page.goto(link, { waitUntil: 'networkidle2' });
    // Retrieve html from page
    const html = await page.content();

    // Enable JQuery for node
    const $ = await cheerio.load(html);

    // scrap product details
    const title = $('#productTitle')
      .text()
      .trim();
    const currentPrice = $('#price_inside_buybox')
      .text()
      .trim();
    const imageUrl = $('#landingImage').attr('src');

    product = {
      title,
      link,
      imageUrl,
      currentPrice,
    };
  } catch (error) {
    console.log(error);
  }

  return product;
}

/**
 * Closes the browser
 */
async function end() {
  console.log('Stopping the scraper...');

  await browser.close();
}

module.exports = {
  initialize,
  getProductDetails,
  end,
};
