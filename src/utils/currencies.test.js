/* global it, expect */

import currencies from './currencies'

it('Bitcoin valid address', () => {
  expect(currencies.btc.isValidAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toBe(true)
  expect(currencies.btc.isValidAddress('3BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toBe(true)
  expect(currencies.btc.isValidAddress('mBvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toBe(true)
  expect(currencies.btc.isValidAddress('nBvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toBe(true)
})

it('Bitcoin invalid address', () => {
  expect(currencies.btc.isValidAddress('c8e39d748693d1accf52f5a1d8b0a8846057781af7c775ed2a53398e938d8a0f')).toBe(false)
})

it('Ethereum valid address', () => {
  expect(currencies.eth.isValidAddress('0xea674fdde714fd979de3edf0f56aa9716b898ec8')).toBe(true)
})

it('Ethereum invalid address', () => {
  expect(currencies.eth.isValidAddress('0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347')).toBe(false)
})
