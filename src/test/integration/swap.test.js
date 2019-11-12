/* eslint-env jest */
import puppeteer from 'puppeteer'

let partyA = {}

jest.setTimeout(300000);

beforeEach(async () => {
  partyA.browser = await puppeteer.launch({ignoreHTTPSErrors: true})
  partyA.page = await partyA.browser.newPage()
  await partyA.page.goto('https://localhost:3000')
})

afterEach(async () => {
  await partyA.browser.close()
})

it('swap', async () => {
  // TODO: split into specific functions
  await partyA.page.click('.AssetSelection_bottom button')
  await partyA.page.click('.WalletChoose_WalletsContainer div:nth-child(3)')
  await partyA.page.click('.btn-primary')
  await partyA.page.waitForSelector('.WalletConnected', { timeout: 20000 })
  await partyA.page.click('.btn-primary')

  

  await partyA.page.click('.WalletChoose_WalletsContainer div:nth-child(3)')
  await partyA.page.click('.btn-primary')
  await partyA.page.waitForSelector('.WalletConnected')
  await partyA.page.click('.btn-primary')
  
  await partyA.page.type('.CurrencyInputs_left .CurrencyInput_input', '0.01')
  await partyA.page.type('.Rate_input', '1')
  const element = await partyA.page.$('.CurrencyInputs_right .CurrencyInput .CurrencyInput_input')
  const wantAmount = await partyA.page.evaluate(el => el.value, element)
  expect(wantAmount).toBe('0.01')

  const haveAddressElement = await partyA.page.$('.WalletPanel_left .WalletDisplay_address')
  const haveAddress = await partyA.page.evaluate(el => el.textContent, haveAddressElement)

  const wantAddressElement = await partyA.page.$('.WalletPanel_right .WalletDisplay_address')
  const wantAddress = await partyA.page.evaluate(el => el.textContent, wantAddressElement)

  await partyA.page.type('.CounterPartyWallet_send .AddressInput_input', haveAddress.replace('0x', '')) // TODO: fix this?
  await partyA.page.type('.CounterPartyWallet_receive .AddressInput_input', wantAddress)

  // Initiate
  await partyA.page.click('.btn-primary')
  
  await partyA.page.waitForSelector('.BackupLinkCard')
  await partyA.page.click('.btn-primary')

  await partyA.page.waitForSelector('.CounterPartyLinkCard')
  await partyA.page.click('.btn-primary')

  await partyA.page.waitForSelector('.Waiting')
})
