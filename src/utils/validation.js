import config from '../config'
import currencies from './currencies'
import { generateSwapState } from './app-links'

function getCurrencyInputErrors (assets) {
  const errors = {}
  const { a: assetA, b: assetB, rate: assetRate } = assets
  if (!(assetA.value > 0)) errors.assetA = 'Amount not set'
  if (!(assetB.value > 0)) errors.assetB = 'Amount not set'
  if (!(assetRate.value > 0)) errors.rate = 'Please select the conversion rate'
  return errors
}

function getWalletErrors (wallets, isPartyB) {
  const errors = {}
  const { a: walletA, b: walletB } = wallets
  if (isPartyB) {
    const initialSwapState = generateSwapState(window.location)
    if (!wallets.a.addresses.includes(initialSwapState.wallets.a.addresses[0])) errors.walletA = 'Address does not match swap'
    if (!wallets.b.addresses.includes(initialSwapState.wallets.b.addresses[0])) errors.walletB = 'Address does not match swap'
  }
  if (!walletA.connected) errors.walletA = 'Please add your wallet'
  if (!walletB.connected) errors.walletB = 'Please add your wallet'
  return errors
}

function getCounterPartyErrors (assets, counterParty) {
  const errors = {}
  const { a: assetA, b: assetB } = assets
  const counterPartyA = counterParty[assetA.currency]
  const counterPartyB = counterParty[assetB.currency]
  if (!currencies[assetA.currency].isValidAddress(counterPartyA.address)) errors.counterPartyA = 'Address incomplete'
  if (!currencies[assetB.currency].isValidAddress(counterPartyB.address)) errors.counterPartyB = 'Address incomplete'
  return errors
}

function getInitiationErrors (transactions, isVerified, isPartyB) {
  const errors = {}
  if (isPartyB) {
    if (!(isVerified && transactions.b.fund.confirmations >= config.minConfirmations)) {
      errors.initiation = 'Counterparty has initiated, awaiting confirmations'
    }
    if (!(isVerified && transactions.b.fund.hash)) {
      errors.initiation = 'Counterparty hasn\'t initiated'
    }
  }
  return errors
}

function isInitiateValid (swap) {
  let errors = [
    getCurrencyInputErrors(swap.assets),
    getWalletErrors(swap.wallets, swap.isPartyB),
    getCounterPartyErrors(swap.assets, swap.counterParty),
    getInitiationErrors(swap.transactions, swap.isVerified, swap.isPArtyB)
  ]

  const numErrors = errors.reduce((prev, next) => prev + Object.keys(next).length, 0)

  return numErrors === 0
}

export { getCurrencyInputErrors, getWalletErrors, getCounterPartyErrors, getInitiationErrors, isInitiateValid }
