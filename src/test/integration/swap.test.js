/* eslint-env jest */
import puppeteer from 'puppeteer'

let browser
let partyA = {}
let partyB = {}

jest.setTimeout(300000)

beforeEach(async () => {
  browser = await puppeteer.launch({ignoreHTTPSErrors: true, defaultViewport: { width: 1100, height: 1000 }})
  partyA.page = await browser.newPage()

  // allow clipboard read
  const context = browser.defaultBrowserContext()
  context.clearPermissionOverrides()
  context.overridePermissions('https://localhost:3000', ['clipboard-read'])
  await partyA.page.goto('https://localhost:3000')
})

afterEach(async () => {
  await browser.close()
})

async function connectNodeWallet (page) {
  await page.click('.WalletChoose_WalletsContainer div:nth-child(3)')
  await page.click('.WalletConnectPopup .btn-primary')
  await page.waitForSelector('.WalletConnected', { timeout: 10000 })
  await page.click('.WalletConnectPopup .btn-primary')
}

async function claim (page) {
  await page.waitForSelector('.SwapRedemption', { timeout: 20000 })
  await page.click('.btn-primary')
  await page.waitForSelector('.SwapCompleted')
}

async function partyAPath () {
  await partyA.page.click('.btn-primary')
  await partyA.page.waitForSelector('.Waiting')
  await claim(partyA.page)
}

async function partyBPath (counterPartyLink) {
  partyB.page = await browser.newPage()
  await partyB.page.goto(counterPartyLink)
  await partyB.page.click('.WalletPanel_left .btn-primary')
  await connectNodeWallet(partyB.page)
  await partyB.page.click('.WalletPanel_right .btn-primary')
  await connectNodeWallet(partyB.page)

  // Confirm
  await partyB.page.click('.btn-primary')
  await partyB.page.screenshot({path: 'screenshot.png'})
  await partyB.page.waitForSelector('.BackupLinkCard')
  await partyB.page.click('.btn-primary')
  await partyB.page.waitForSelector('.Waiting')

  await claim(partyB.page)
}

it('swap', async () => {
  // TODO: split into specific functions
  await partyA.page.click('.AssetSelection_bottom button')
  await connectNodeWallet(partyA.page)
  await connectNodeWallet(partyA.page)

  await partyA.page.type('.CurrencyInputs_left .CurrencyInput_input', '0.01')
  await partyA.page.type('.Rate_input', '1')
  const element = await partyA.page.$('.CurrencyInputs_right .CurrencyInput .CurrencyInput_input')
  const wantAmount = await partyA.page.evaluate(el => el.value, element)
  expect(wantAmount).toBe('0.01')

  const haveAddressElement = await partyA.page.$('.WalletPanel_left .WalletDisplay_address')
  const haveAddress = await partyA.page.evaluate(el => el.textContent, haveAddressElement)

  const wantAddressElement = await partyA.page.$('.WalletPanel_right .WalletDisplay_address')
  const wantAddress = await partyA.page.evaluate(el => el.textContent, wantAddressElement)

  await partyA.page.type('.CounterPartyWallet_send .AddressInput_input', haveAddress)
  await partyA.page.type('.CounterPartyWallet_receive .AddressInput_input', wantAddress)

  // Initiate
  await partyA.page.click('.btn-primary')

  await partyA.page.waitForSelector('.BackupLinkCard')
  await partyA.page.click('.btn-primary')

  await partyA.page.waitForSelector('.CounterPartyLinkCard')
  await partyA.page.click('.btn-secondary')
  const counterPartyLink = await partyA.page.evaluate(() => navigator.clipboard.readText())
  await Promise.all([partyAPath(), partyBPath(counterPartyLink)])
})
