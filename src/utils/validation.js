import moment from 'moment'
import { assets as cryptoassets, chains, unitToCurrency } from '@liquality/cryptoassets'
import config from '../config'
import { isEthereumAsset } from './networks'
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
    if (isEthereumAsset(assets.b.currency) && !(wallets.b.networkBalance.gt(0))) errors.walletB = 'Insufficient. Add ETH for fee.'
  }

  if (!walletA.connected) errors.walletA = 'Please add your wallet'
  if (!walletB.connected) errors.walletB = 'Please add your wallet'
  return errors
}

function getCounterPartyErrors (assets, counterParty) {
  const errors = {}
  const { a: counterPartyA, b: counterPartyB } = counterParty
  const { a: assetA, b: assetB } = assets
  if (!chains[cryptoassets[assetA.currency].chain].isValidAddress(counterPartyA.address)) errors.counterPartyA = 'Address incomplete'
  if (!chains[cryptoassets[assetB.currency].chain].isValidAddress(counterPartyB.address)) errors.counterPartyB = 'Address incomplete'
  return errors
}

function getInitiationErrors (assets, transactions, expiration, isVerified, isPartyB, quote) {
  const errors = {}
  if (isPartyB) {
    if (!(isVerified && transactions.b.initiation.hash)) {
      errors.initiation = 'Counterparty hasn\'t initiated'
    }
    const minConfirmations = chains[cryptoassets[assets.b.currency].chain].safeConfirmations
    if (!(isVerified && transactions.b.initiation.confirmations >= minConfirmations)) {
      errors.initiation = `Counterparty has initiated, awaiting minimum confirmations (${minConfirmations})`
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

function getQuoteErrors (swap) {
  const errors = {}
  const { a: assetA, b: assetB } = swap.assets
  const { a: counterPartyA, b: counterPartyB } = swap.counterParty
  if (!swap.agent.quote) {
    errors.quote = 'Quote missing.'
  } else {
    if (!unitToCurrency(cryptoassets[assetA.currency], swap.agent.quote.fromAmount).eq(assetA.value)) {
      errors.quote = 'Quote fromAmount does not match.'
    }
    if (!unitToCurrency(cryptoassets[assetB.currency], swap.agent.quote.toAmount).eq(assetB.value)) {
      errors.quote = 'Quote toAmount does not match.'
    }
    if (counterPartyA.address !== swap.agent.quote.fromCounterPartyAddress) {
      errors.quote = 'Quote fromCounterPartyAddress does not match.'
    }
    if (counterPartyB.address !== swap.agent.quote.toCounterPartyAddress) {
      errors.quote = 'Quote toCounterPartyAddress does not match.'
    }
  }
  if (errors.quote) {
    console.error(`Quote encountered an error: ${errors.quote}`)
  }
  return errors
}

function isInitiateValid (swap) {
  let errors = [
    getCurrencyInputErrors(swap.assets, swap.agent),
    getWalletErrors(swap.wallets, swap.assets, swap.isPartyB),
    getCounterPartyErrors(swap.assets, swap.counterParty),
    getInitiationErrors(swap.assets, swap.transactions, swap.expiration, swap.transactions.isVerified, swap.isPartyB, swap.agent.quote)
  ]

  const agentEnabled = config.agents && config.agents.length
  if (agentEnabled) {
    errors = [
      ...errors,
      getQuoteErrors(swap)
    ]
  }

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
