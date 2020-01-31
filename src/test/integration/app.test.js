/* eslint-env jest */
import puppeteer from 'puppeteer'

let page, browser

beforeEach(async () => {
  browser = await puppeteer.launch({ignoreHTTPSErrors: true})
  page = await browser.newPage()
  await page.goto('https://localhost:3000')
})

afterEach(async () => {
  await browser.close()
})

it('app loads', async () => {
  const appRoot = await page.waitForSelector('.LiqualitySwap')
  expect(appRoot).toBeDefined()
})
