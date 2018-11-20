const puppeteer = require('puppeteer');
const delay = require('delay');

const url = 'https://cdon.se';
const arg = process.argv[2];

const randomNum = (min, max) => Math.random() * (max - min) + min;

const humanDelay = async fixedDelay =>
  fixedDelay ? await delay(fixedDelay) : await delay(randomNum(500, 3000));

const autoWeb = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    width: 900,
    height: 600
  });
  const page = await browser.newPage();
  await humanDelay();
  await page.goto(url);

  const searchSelector = '#q';
  await humanDelay();
  await page.type(searchSelector, arg);

  const btnSelector = '#header-search > button';
  await humanDelay();
  await page.click(btnSelector);
  const itemSelector =
    '#ext-search > div.search-results > ul > li:nth-child(1)';
  await humanDelay();
  await page.click(itemSelector);
  const priceSelector = '#price-button-container > span';
  await humanDelay();

  const textContent = await page.evaluate(
    () => document.querySelector('#price-button-container > span').textContent
  );

  console.log(textContent);

  await humanDelay();
  browser.close();
};

autoWeb();
