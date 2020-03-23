import config from '../config/config'

const WALLET_ACTION_STEPS = Object.freeze({
  SIGN: 'sign',
  CONFIRM: 'confirm'
})

const SWAP_STAGES = {
  INITIATE: 'initiate',
  CLAIM: 'claim',
  REFUND: 'refund'
}

// TODO: Deduplicate somehow
const bitcoinLedgerPopup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On your Ledger', type: 'Bitcoin', label: 'Sign Message', description: 'View displayed hash, then sign', image: require('../icons/wallets/ledger/device.svg') },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On your Ledger', type: 'Bitcoin', label: 'Confirm Transaction', description: 'Once you accept the amount, confirm the transaction. There might be a lag.', image: require('../icons/wallets/ledger/device.svg') }
  ]
}

const ethereumLedgerPopup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On your Ledger', type: 'Ethereum', label: 'Sign Message', description: 'View displayed hash, then sign', image: require('../icons/wallets/ledger/device.svg') },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On your Ledger', type: 'Ethereum', label: 'Confirm Transaction', description: 'Once you accept the amount, confirm the transaction. There might be a lag.', image: require('../icons/wallets/ledger/device.svg') }
  ]
}

const ledgerERC20Popup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On your Ledger', type: 'Ethereum', label: 'Sign Message', description: 'View displayed hash, then sign', image: require('../icons/wallets/ledger/device.svg') },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On your Ledger', type: 'Ethereum', label: 'Confirm Transactions', description: 'Sign 2 transactions to confirm. Expect a lag in between them.', image: require('../icons/wallets/ledger/device.svg') }
  ]
}

function toClaimPopup (popup) {
  return { steps: popup.steps.map(step => ({...step, description: 'Confirm to claim your assets.'})) }
}

function toRefundPopup (popup) {
  return { steps: popup.steps.map(step => ({...step, description: 'Confirm to refund your assets.'})) }
}

const initiatePopups = {
  ledger: {
    btc: bitcoinLedgerPopup,
    eth: ethereumLedgerPopup,
    erc20: ledgerERC20Popup
  }
}

const claimPopups = {
  ledger: {
    btc: toClaimPopup(bitcoinLedgerPopup),
    eth: toClaimPopup(ethereumLedgerPopup),
    erc20: toClaimPopup(ethereumLedgerPopup)
  }
}

const refundPopups = {
  ledger: {
    btc: toRefundPopup(bitcoinLedgerPopup),
    eth: toRefundPopup(ethereumLedgerPopup),
    erc20: toRefundPopup(ethereumLedgerPopup)
  }
}

const popups = {
  initiate: initiatePopups,
  claim: claimPopups,
  refund: refundPopups
}

// TODO: make more generic to cover all wallet types
function getActionPopups (stage, asset, wallet) {
  const assetConfig = config.assets[asset]
  if (wallet.includes('ledger')) {
    return popups[stage].ledger[assetConfig.type || asset]
  }
}

export { getActionPopups, WALLET_ACTION_STEPS, SWAP_STAGES }
