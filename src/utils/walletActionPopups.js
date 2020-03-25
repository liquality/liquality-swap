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

const ethereumMetamaskPopup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On MetaMask', label: 'Sign Message', description: 'View displayed hash, then sign', image: require('../icons/wallets/metamask/sign.png') },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On MetaMask', label: 'Confirm Transaction', description: 'Confirm the transaction.', image: require('../icons/wallets/metamask/confirm.png') }
  ]
}

const ERC20MetamaskPopup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On MetaMask', label: 'Sign Message', description: 'View displayed hash, then sign', image: require('../icons/wallets/metamask/sign.png') },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On MetaMask', label: 'Confirm Transactions', description: 'Sign 2 transactions to confirm. After the first confirmation there is a lag before the MetaMask popup displays again.', image: require('../icons/wallets/metamask/confirm.png') }
  ]
}

function toClaimPopup (popup) {
  return { steps: popup.steps.map(step => {
    return step.id === WALLET_ACTION_STEPS.CONFIRM ? {...step, description: 'Confirm to claim your assets.'} : step
  })}
}

function toRefundPopup (popup) {
  return { steps: popup.steps.map(step => {
    return step.id === WALLET_ACTION_STEPS.CONFIRM ? {...step, description: 'Confirm to refund your assets.'} : step
  })}
}

const initiatePopups = {
  ledger: {
    btc: bitcoinLedgerPopup,
    eth: ethereumLedgerPopup,
    erc20: ledgerERC20Popup
  },
  metamask: {
    eth: ethereumMetamaskPopup,
    erc20: ERC20MetamaskPopup
  }
}

const claimPopups = {
  ledger: {
    btc: toClaimPopup(bitcoinLedgerPopup),
    eth: toClaimPopup(ethereumLedgerPopup),
    erc20: toClaimPopup(ethereumLedgerPopup)
  },
  metamask: {
    eth: toClaimPopup(ethereumMetamaskPopup),
    erc20: toClaimPopup(ERC20MetamaskPopup)
  }
}

const refundPopups = {
  ledger: {
    btc: toRefundPopup(bitcoinLedgerPopup),
    eth: toRefundPopup(ethereumLedgerPopup),
    erc20: toRefundPopup(ethereumLedgerPopup)
  },
  metamask: {
    eth: toRefundPopup(ethereumMetamaskPopup),
    erc20: toRefundPopup(ERC20MetamaskPopup)
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
  } else if (wallet.includes('metamask')) {
    return popups[stage].metamask[assetConfig.type || asset]
  }
}

export { getActionPopups, WALLET_ACTION_STEPS, SWAP_STAGES }
