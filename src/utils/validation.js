import moment from 'moment'
import config from '../config'
import cryptoassets from '@liquality/cryptoassets'
import { isETHNetwork } from './networks'
import { generateSwapState } from './app-links'
import { getClaimExpiration } from './expiration'
import { calculateLimits } from './agent'

function getCurrencyInputErrors (assets, agent) {
  const errors = {}
  const { a: assetA, b: assetB, rate: assetRate } = assets
  if (!(assetA.value.gt(0))) errors.assetA = 'Amount not set'
  if (agent && agent.markets.length) {
    const limits = calculateLimits(agent.markets, assetA.currency, assetB.currency)
    if (assetA.value.gt(0) && assetA.value.gt(limits.max)) errors.assetA = 'Decrease amount'
    if (assetA.value.gt(0) && assetA.value.lt(limits.min)) errors.assetA = 'Increase amount'
  } else {
    if (!(assetB.value.gt(0))) errors.assetB = 'Amount not set'
    if (!(assetRate.gt(0))) errors.rate = 'Please select the conversion rate'
  }
  return errors
}

function getWalletErrors (wallets, assets, isPartyB) {
  const errors = {}
  const { a: walletA, b: walletB } = wallets
  if (isPartyB) {
    const initialSwapState = generateSwapState(window.location)
    if (wallets.a.connected) {
      if (!wallets.a.addresses.includes(initialSwapState.wallets.a.addresses[0])) errors.walletAAddress = 'Address does not match swap'
    }
    if (wallets.b.connected) {
      if (!wallets.b.addresses.includes(initialSwapState.wallets.b.addresses[0])) errors.walletBAddress = 'Address does not match swap'
    }
  }

  if (wallets.a.connected && !errors.walletAAddress) {
    if (!errors.walletAAddress && wallets.a.balance.lt(assets.a.value)) errors.walletABalance = 'Insufficient. Add funds.'
  }
  if (wallets.b.connected && !errors.walletBAddress) {
    if (isETHNetwork(assets.b.currency) && !(wallets.b.networkBalance.gt(0))) errors.walletB = 'Insufficient. Add ETH for fee.'
  }

  if (!walletA.connected) errors.walletA = 'Please add your wallet'
  if (!walletB.connected) errors.walletB = 'Please add your wallet'
  return errors
}

function getCounterPartyErrors (assets, counterParty) {
  const errors = {}
  const { a: counterPartyA, b: counterPartyB } = counterParty
  const { a: assetA, b: assetB } = assets
  if (!cryptoassets[assetA.currency].isValidAddress(counterPartyA.address)) errors.counterPartyA = 'Address incomplete'
  if (!cryptoassets[assetB.currency].isValidAddress(counterPartyB.address)) errors.counterPartyB = 'Address incomplete'
  return errors
}

function getInitiationErrors (transactions, expiration, isVerified, isPartyB, quote) {
  const errors = {}
  if (isPartyB) {
    if (!(isVerified && transactions.b.fund.confirmations >= config.minConfirmations)) {
      errors.initiation = 'Counterparty has initiated, awaiting confirmations'
    }
    if (!(isVerified && transactions.b.fund.hash)) {
      errors.initiation = 'Counterparty hasn\'t initiated'
    }
    const safeConfirmTime = getClaimExpiration(expiration, isPartyB ? 'b' : 'a').time
    if (moment().isAfter(safeConfirmTime)) {
      errors.initiation = 'Offer expired.'
    }
  } else if (quote) {
    if (Date.now() > quote.expiresAt) {
      errors.initiation = 'Quote expired.'
    }
  }
  return errors
}

function getClaimErrors (transactions, isPartyB) {
  const errors = {}
  if (!isPartyB && transactions.b.refund.hash) {
    errors.claim = 'Offer expired. Wait for refund.'
  }
  return errors
}

function isInitiateValid (swap) {
  let errors = [
    getCurrencyInputErrors(swap.assets),
    getWalletErrors(swap.wallets, swap.assets, swap.isPartyB),
    getCounterPartyErrors(swap.assets, swap.counterParty),
    getInitiationErrors(swap.transactions, swap.expiration, swap.transactions.isVerified, swap.isPartyB, swap.agent.quote)
  ]

  const numErrors = errors.reduce((prev, next) => prev + Object.keys(next).length, 0)

  return numErrors === 0
}

function isAgentRequestValid (swap) {
  let errors = [
    getCurrencyInputErrors(swap.assets, swap.agent)
  ]

  const numErrors = errors.reduce((prev, next) => prev + Object.keys(next).length, 0)

  return numErrors === 0
}

export {
  getCurrencyInputErrors,
  getWalletErrors,
  getCounterPartyErrors,
  getInitiationErrors,
  getClaimErrors,
  isInitiateValid,
  isAgentRequestValid
}
