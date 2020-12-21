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

const rskLedgerPopup = {
  ...ethereumLedgerPopup,
  steps: [
    ...ethereumLedgerPopup.steps.map(step => ({ ...step, type: 'RSK' }))
  ]
}

const ERC20LedgerPopup = {
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

const defaultPopup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On Your Wallet', label: 'Sign Message', description: 'View displayed hash, then sign' },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On Your Wallet', label: 'Confirm Transaction', description: 'Confirm the transaction.' }
  ]
}

const defaultERC20Popup = {
  steps: [
    { id: WALLET_ACTION_STEPS.SIGN, title: 'On Your Wallet', label: 'Sign Message', description: 'View displayed hash, then sign' },
    { id: WALLET_ACTION_STEPS.CONFIRM, title: 'On Your Wallet', label: 'Confirm Transactions', description: 'Sign 2 transactions to confirm. After the first confirmation there is a lag before the MetaMask popup displays again.' }
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

function toEthereumClaimPopup (popup) {
  return { steps: toClaimPopup(popup).steps.map(step => {
    return step.id === WALLET_ACTION_STEPS.CONFIRM ? {...step, info: 'The zero balance when signing refers to the contract. After claiming you will receive the correct amount.'} : step
  })}
}

const initiatePopups = {
  ledger: {
    BTC: bitcoinLedgerPopup,
    ETH: ethereumLedgerPopup,
    RBTC: rskLedgerPopup,
    erc20: ERC20LedgerPopup
  },
  metamask: {
    ETH: ethereumMetamaskPopup,
    RBTC: ethereumMetamaskPopup,
    erc20: ERC20MetamaskPopup
  },
  default: {
    BTC: defaultPopup,
    ETH: defaultPopup,
    RBTC: defaultPopup,
    erc20: defaultERC20Popup
  }
}

const claimPopups = {
  ledger: {
    BTC: toClaimPopup(bitcoinLedgerPopup),
    ETH: toEthereumClaimPopup(ethereumLedgerPopup),
    RBTC: toEthereumClaimPopup(rskLedgerPopup),
    erc20: toEthereumClaimPopup(ethereumLedgerPopup)
  },
  metamask: {
    ETH: toEthereumClaimPopup(ethereumMetamaskPopup),
    RBTC: toEthereumClaimPopup(ethereumMetamaskPopup),
    erc20: toEthereumClaimPopup(ERC20MetamaskPopup)
  },
  default: {
    BTC: toClaimPopup(defaultPopup),
    ETH: toEthereumClaimPopup(defaultPopup),
    RBTC: toEthereumClaimPopup(defaultPopup),
    erc20: toEthereumClaimPopup(defaultERC20Popup)
  }
}

const refundPopups = {
  ledger: {
    BTC: toRefundPopup(bitcoinLedgerPopup),
    ETH: toRefundPopup(ethereumLedgerPopup),
    RBTC: toRefundPopup(rskLedgerPopup),
    erc20: toRefundPopup(ethereumLedgerPopup)
  },
  metamask: {
    ETH: toRefundPopup(ethereumMetamaskPopup),
    RBTC: toRefundPopup(ethereumMetamaskPopup),
    erc20: toRefundPopup(ERC20MetamaskPopup)
  },
  default: {
    BTC: toRefundPopup(defaultPopup),
    ETH: toRefundPopup(defaultPopup),
    RBTC: toRefundPopup(defaultPopup),
    erc20: toRefundPopup(defaultERC20Popup)
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
  if (wallet) {
    if (wallet.includes('ledger')) {
      return popups[stage].ledger[assetConfig.type || asset]
    } else if (wallet.includes('metamask')) {
      return popups[stage].metamask[assetConfig.type || asset]
    }
  }
  return popups[stage].default[assetConfig.type || asset]
}

export { getActionPopups, WALLET_ACTION_STEPS, SWAP_STAGES }
