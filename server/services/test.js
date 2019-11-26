/* eslint-disable no-undef */
/**
 * The purpose of this module is to test whether the
 * headless chrome settings bypass detection
 */
// We'll use Puppeteer is our browser automation framework.
const puppeteer = require('puppeteer');
const { preparePage } = require('./chrome-headless-config');

(async () => {
  // Launch the browser in headless mode and set up a page.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  });
  const page = await browser.newPage();

  // Prepare for the tests.
  await preparePage(page);

  // Navigate to the page that will perform the tests.
  const testUrl =
    'https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html';
  await page.goto(testUrl);

  // Save a screenshot of the results.
  await page.screenshot({ path: './headless-test-result.png' });

  const results = await page.evaluate(() => {
    const userAgent = document.querySelector('#user-agent-result').innerHTML;
    const webdriver = document.querySelector('#webdriver-result').innerHTML;
    const chrome = document.querySelector('#chrome-result').innerHTML;
    const permissions = document.querySelector('#permissions-result').innerHTML;
    const pluginsLength = document.querySelector('#plugins-length-result')
      .innerHTML;
    const languages = document.querySelector('#languages-result').innerHTML;

    return {
      userAgent,
      webdriver,
      chrome,
      permissions,
      pluginsLength,
      languages,
    };
  });

  console.log(results);

  // Clean up.
  await browser.close();
})();
