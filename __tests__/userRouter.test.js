// Testing for Database connection and transactions
const { json } = require('body-parser');
const fetch = require('node-fetch');

// Database 
describe('Router and Database Unit Test', () => {
  let data;
  let result;

  beforeAll(async () => {
    data = await fetch('http://localhost:3000/spot/viewAllSpots');
    result = await data.json();

    // browser = await puppeteer.launch({
    //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });
    // page = await browser.newPage();
  });

  // Make a GET request to retrieve the profile page:
  describe('Returns ', () => {
    it('Make a GET request to retrieve the parking spots', () => {
        const length = result.length;
        console.log('Data : line 15' , result.length)
        expect(length).toEqual(1)
    });
  });
});
