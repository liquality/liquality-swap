import queryString from 'query-string'

const APP_BASE_URL = 'https://localhost:3000' // TODO: derive this based on host

function generateCounterPartyLink (swap) {
  // Switch around sides as this will be the state of the counter party
  const { a: assetB, b: assetA } = swap.assets
  const { a: walletB, b: walletA } = swap.wallets
  const urlParams = {
    ccy1: assetA.currency,
    ccy1v: assetA.value,
    ccy1Addr: swap.counterParty[assetA.currency],
    ccy1CounterPartyAddr: walletA.addresses[0],

    ccy2: assetB.currency,
    ccy2v: assetB.value,
    ccy2Addr: swap.counterParty[assetB.currency],
    ccy2CounterPartyAddr: walletB.addresses[0],

    fundTxHash: swap.transactions.ours.fund.hash,
    secretHash: 'secrethash'
  }
  return `${APP_BASE_URL}/${queryString.stringify(urlParams)}`
}

export { generateCounterPartyLink }
