const puppeteer = require('puppeteer');
const APP = `http://localhost:8080/`;

describe('Login Page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('.btn-primary');
      const title = await page.$eval('.btn-primary', el => el.innerHTML);
      expect(title).toBe('Sign in');
    });
  });
});
