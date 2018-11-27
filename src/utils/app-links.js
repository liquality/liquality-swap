import queryString from 'qs'
import moment from 'moment'

const SUB_PATH = window.appSubPath || process.env.REACT_APP_BASE_PATH || '/'
const APP_BASE_URL = `${window.location.protocol}//${window.location.host}${SUB_PATH}`

function generateLink (swap, counterparty = false) {
  let assetA, assetB, walletA, walletB, transactionsA, transactionsB

  if (counterparty) { // Switch around sides as this will be the state of the counter party
    ({ a: assetB, b: assetA } = swap.assets)
    ;({ a: walletB, b: walletA } = swap.wallets)
    ;({ a: transactionsB, b: transactionsA } = swap.transactions)
  } else {
    ({ a: assetA, b: assetB } = swap.assets)
    ;({ a: walletA, b: walletB } = swap.wallets)
    ;({ a: transactionsA, b: transactionsB } = swap.transactions)
  }

  const urlParams = {
    ccy1: assetA.currency,
    ccy1v: assetA.value,
    ccy1Addr: counterparty ? swap.counterParty[assetA.currency].address : walletA.addresses[0],
    ccy1CounterPartyAddr: counterparty ? walletA.addresses[0] : swap.counterParty[assetA.currency].address,

    ccy2: assetB.currency,
    ccy2v: assetB.value,
    ccy2Addr: counterparty ? swap.counterParty[assetB.currency].address : walletB.addresses[0],
    ccy2CounterPartyAddr: counterparty ? walletB.addresses[0] : swap.counterParty[assetB.currency].address,

    aFundHash: transactionsA.fund.hash,
    bFundHash: transactionsB.fund.hash,

    aFundBlock: transactionsA.fund.block,
    bFundBlock: transactionsB.fund.block,

    secretHash: swap.secretParams.secretHash,

    expiration: swap.expiration.unix(),

    isPartyB: counterparty === true
  }

  return `${APP_BASE_URL}#${queryString.stringify(urlParams)}`
}

function generateSwapState (location) {
  if (!location.hash) return undefined // no state
  const urlParams = queryString.parse(location.hash.replace('#', ''))

  return {
    assets: {
      a: { currency: urlParams.ccy1, value: parseFloat(urlParams.ccy1v) },
      b: { currency: urlParams.ccy2, value: parseFloat(urlParams.ccy2v) }
    },
    wallets: {
      a: { addresses: [urlParams.ccy1Addr] },
      b: { addresses: [urlParams.ccy2Addr] }
    },
    counterParty: {
      [urlParams.ccy1]: { address: urlParams.ccy1CounterPartyAddr },
      [urlParams.ccy2]: { address: urlParams.ccy2CounterPartyAddr }
    },
    transactions: {
      a: { fund: { hash: urlParams.aFundHash, block: urlParams.aFundBlock }, claim: {} },
      b: { fund: { hash: urlParams.bFundHash, block: urlParams.bFundBlock }, claim: {} }
    },
    secretParams: {
      secretHash: urlParams.secretHash
    },
    expiration: moment.unix(urlParams.expiration),
    isPartyB: urlParams.isPartyB === 'true',
    link: location.href
  }
}

export { generateLink, generateSwapState }
