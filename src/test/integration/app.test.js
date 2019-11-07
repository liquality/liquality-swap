/* eslint-env jest */
import puppeteer from 'puppeteer'

it('app loads', async () => {
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true})
  const page = await browser.newPage()
  await page.goto('https://localhost:3000')
  const appRoot = await page.waitForSelector('.LiqualitySwap')
  expect(appRoot).toBeDefined()
  await browser.close()
})
