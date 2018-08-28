import queryString from 'query-string'

const APP_BASE_URL = `${window.location.protocol}//${window.location.host}`

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
    ccy1Addr: counterparty ? swap.counterParty[assetA.currency] : walletA.addresses[0],
    ccy1CounterPartyAddr: counterparty ? walletA.addresses[0] : swap.counterParty[assetA.currency],

    ccy2: assetB.currency,
    ccy2v: assetB.value,
    ccy2Addr: counterparty ? swap.counterParty[assetB.currency] : walletB.addresses[0],
    ccy2CounterPartyAddr: counterparty ? walletB.addresses[0] : swap.counterParty[assetB.currency],

    aFundHash: transactionsA.fund.hash,
    bFundHash: transactionsB.fund.hash,

    secretHash: 'secrethash',
    isPartyB: counterparty === true
  }

  return `${APP_BASE_URL}/?${queryString.stringify(urlParams)}`
}

function generateSwapState (location) {
  if (!location.search) return undefined // no state
  const urlParams = queryString.parse(location.search)
  return {
    assets: {
      a: { currency: urlParams.ccy1, value: parseInt(urlParams.ccy1v) },
      b: { currency: urlParams.ccy2, value: parseInt(urlParams.ccy2v) }
    },
    wallets: {
      a: { addresses: [urlParams.ccy1Addr] },
      b: { addresses: [urlParams.ccy2Addr] }
    },
    counterParty: {
      [urlParams.ccy1]: urlParams.ccy1CounterPartyAddr,
      [urlParams.ccy2]: urlParams.ccy2CounterPartyAddr
    },
    transactions: {
      a: { fund: { hash: urlParams.aFundHash }, claim: {} },
      b: { fund: { hash: urlParams.bFundHash }, claim: {} }
    },
    isPartyB: urlParams.isPartyB === 'true'
  }
}

export { generateLink, generateSwapState }
