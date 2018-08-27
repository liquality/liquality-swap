/* eslint-env jest */
import { generateCounterPartyLink } from './app-links'

it('produces correct counter party link', () => {
  const swapState = {
    assets: {
      a: { currency: 'eth', value: 50 },
      b: { currency: 'btc', value: 10 }
    },
    wallets: {
      a: { addresses: ['0xe66D664507EF1251fC6B8cCf1fD1684274A3e9e3'] },
      b: { addresses: ['12wghKSUJCEgwwQjAuLVHoHuqZ18pPCjUK'] }
    },
    counterParty: {
      eth: '0x3461e2e8a76a0554c8dC62cF42d8C75A333319EB',
      btc: '19xQT3DfkTzVp7w6hoHP2d2zhra8mGHzn3'
    },
    transactions: { ours: { fund: { hash: '0xd2e451e21d625564844d5aa74c9a0a4c9b5a607303ccd738e95dbea83cec9304' } } }
  }

  expect(generateCounterPartyLink(swapState)).toBe('https://localhost:3000/ccy1=btc&ccy1Addr=19xQT3DfkTzVp7w6hoHP2d2zhra8mGHzn3&ccy1CounterPartyAddr=12wghKSUJCEgwwQjAuLVHoHuqZ18pPCjUK&ccy1v=10&ccy2=eth&ccy2Addr=0x3461e2e8a76a0554c8dC62cF42d8C75A333319EB&ccy2CounterPartyAddr=0xe66D664507EF1251fC6B8cCf1fD1684274A3e9e3&ccy2v=50&fundTxHash=0xd2e451e21d625564844d5aa74c9a0a4c9b5a607303ccd738e95dbea83cec9304&secretHash=secrethash')
})
