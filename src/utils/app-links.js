import queryString from 'qs'
import moment from 'moment'
import BigNumber from 'bignumber.js'

const APP_BASE_URL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`

function generateLink (swap, counterparty = false) {
  let assetA, assetB, walletA, walletB, transactionsA, transactionsB, counterPartyA, counterPartyB
  if (counterparty) { // Switch around sides as this will be the state of the counter party
    ({ a: assetB, b: assetA } = swap.assets)
    ;({ a: walletB, b: walletA } = swap.wallets)
    ;({ a: transactionsB, b: transactionsA } = swap.transactions)
    ;({ a: counterPartyB, b: counterPartyA } = swap.counterParty)
  } else {
    ({ a: assetA, b: assetB } = swap.assets)
    ;({ a: walletA, b: walletB } = swap.wallets)
    ;({ a: transactionsA, b: transactionsB } = swap.transactions)
    ;({ a: counterPartyA, b: counterPartyB } = swap.counterParty)
  }

  const isPartyB = swap.isPartyB ? true : counterparty

  const urlParams = {
    ccy1: assetA.currency,
    ccy1v: assetA.value.toFixed(),
    ccy1Addr: counterparty ? counterPartyA.address : walletA.addresses[0],
    ccy1CounterPartyAddr: counterparty ? walletA.addresses[0] : counterPartyA.address,

    ccy2: assetB.currency,
    ccy2v: assetB.value.toFixed(),
    ccy2Addr: counterparty ? counterPartyB.address : walletB.addresses[0],
    ccy2CounterPartyAddr: counterparty ? walletB.addresses[0] : counterPartyB.address,

    aInitiationHash: transactionsA.initiation.hash,
    aFundHash: transactionsA.fund ? transactionsA.fund.hash : undefined,
    bInitiationHash: transactionsB.initiation.hash,
    bFundHash: transactionsB.fund ? transactionsB.fund.hash : undefined,

    aStartBlock: transactionsA.startBlock,
    bStartBlock: transactionsB.startBlock,

    secretHash: swap.secretParams.secretHash,

    expiration: swap.expiration.unix(),

    isPartyB
  }
  return `${APP_BASE_URL}#${queryString.stringify(urlParams)}`
}

function generateSwapState (location) {
  if (!location.hash || !location.hash.includes('ccy1')) return undefined // no state
  const urlParams = queryString.parse(location.hash.replace('#', ''))

  return {
    assets: {
      a: { currency: urlParams.ccy1, value: BigNumber(urlParams.ccy1v) },
      b: { currency: urlParams.ccy2, value: BigNumber(urlParams.ccy2v) },
      rate: urlParams.rate ? urlParams.rate : undefined
    },
    wallets: {
      a: { addresses: [urlParams.ccy1Addr] },
      b: { addresses: [urlParams.ccy2Addr] },
      popup: {}
    },
    counterParty: {
      a: { address: urlParams.ccy1CounterPartyAddr },
      b: { address: urlParams.ccy2CounterPartyAddr }
    },
    transactions: {
      a: { initiation: { hash: urlParams.aInitiationHash }, fund: { hash: urlParams.aFundHash }, claim: {}, refund: {}, startBlock: parseInt(urlParams.aStartBlock) },
      b: { initiation: { hash: urlParams.bInitiationHash }, fund: { hash: urlParams.bFundHash }, claim: {}, refund: {}, startBlock: parseInt(urlParams.bStartBlock) }
    },
    secretParams: {
      secretHash: urlParams.secretHash
    },
    expiration: moment.unix(urlParams.expiration),
    isPartyB: urlParams.isPartyB === 'true',
    link: location.href
  }
}

export { APP_BASE_URL, generateLink, generateSwapState }
