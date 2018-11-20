const cheerio = require('cheerio');
const fetch = require('node-fetch');

const arg = process.argv[2];

const scrapeOptions = {
  method: 'GET',
  headers: {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language':
      'sv-SE,sv;q=0.9,th-TH;q=0.8,th;q=0.7,en-US;q=0.6,en;q=0.5',
    'Cache-Control': 'no-cache',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
  }
};

const fetchCDON = async () => {
  const response = await fetch(arg, scrapeOptions);
  const html = await response.text();
  const $ = cheerio.load(html);
  const priceSelector = '#price-button-container > span';
  const price = $(priceSelector)
    .text()
    .trim();
  console.log(price);
};

fetchCDON();
