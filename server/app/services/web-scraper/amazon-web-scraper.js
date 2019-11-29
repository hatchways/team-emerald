/* eslint-disable no-undef */
// A high-level API node library to control headless Chrome or Chromium
const puppeteer = require('puppeteer');

const { preparePage } = require('./chrome-headless-config');

let browser = null;
let page = null;

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

  // Set up headless chrome to be undetected
  await preparePage(page);

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
  console.log(`Going to the Product Page... ${link.substring(0, 51)}\n`);

  let productDetails = null;
  try {
    await page.goto(link, { waitUntil: 'networkidle2' });

    productDetails = await page.evaluate(() => {
      const currentPriceSelectors = [
        '#price_inside_buybox',
        '#priceblock_dealprice',
      ];
      const previousPriceSelectors = [
        '.priceBlockStrikePriceString',
        '#priceblock_ourprice',
      ];

      const name = document.querySelector('#productTitle').textContent.trim();
      const imageUrl = document.querySelector('#landingImage').src || '';

      let currentPrice;
      for (const selector of currentPriceSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          currentPrice = element.textContent.trim();
          break;
        }
      }

      let previousPrice;
      for (const selector of previousPriceSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          previousPrice = element.textContent.trim();
          break;
        }
      }

      return { name, imageUrl, currentPrice, previousPrice };
    });

    productDetails.link = link;
  } catch (error) {
    console.log(error);
  }

  return productDetails;
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
