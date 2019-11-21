import moment from 'moment'
import _ from 'lodash'
import config from '../config'
import cryptoassets from '@liquality/cryptoassets'
import { generateSwapState } from './app-links'
import { getClaimExpiration } from './expiration'

function getCurrencyInputErrors (assets, agent) {
  const errors = {}
  const { a: assetA, b: assetB, rate: assetRate } = assets
  console.log(assets)
  if (!(assetA.value > 0)) errors.assetA = 'Amount not set'
  if (!(assetB.value > 0)) errors.assetB = 'Amount not set'
  if (!(assetRate > 0)) errors.rate = 'Please select the conversion rate'
  if (agent && agent.market && !_.isEmpty(assetA.value) && (assetA.value > agent.market.max)) errors.assetA = 'Amount over max'
  if (agent && agent.market && !_.isEmpty(assetA.value) && (assetA.value < agent.market.min)) errors.assetA = 'Amount under min'
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
  const { a: counterPartyA, b: counterPartyB } = counterParty
  const { a: assetA, b: assetB } = assets
  if (!cryptoassets[assetA.currency].isValidAddress(counterPartyA.address)) errors.counterPartyA = 'Address incomplete'
  if (!cryptoassets[assetB.currency].isValidAddress(counterPartyB.address)) errors.counterPartyB = 'Address incomplete'
  return errors
}

function getInitiationErrors (transactions, expiration, isVerified, isPartyB) {
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
  }
  return errors
}

function getClaimErrors (expiration, isPartyB) {
  const errors = {}
  if (!isPartyB) {
    const safeClaimTime = getClaimExpiration(expiration, 'a').time
    if (moment().isAfter(safeClaimTime)) {
      errors.claim = 'Offer expired. Wait for refund.'
    }
  }
  return errors
}

function isInitiateValid (swap) {
  let errors = [
    getCurrencyInputErrors(swap.assets),
    getWalletErrors(swap.wallets, swap.isPartyB),
    getCounterPartyErrors(swap.assets, swap.counterParty),
    getInitiationErrors(swap.transactions, swap.expiration, swap.isVerified, swap.isPartyB)
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
