import config from '../config'
import metamaskIcon from '../icons/wallets/metamask/icon.svg'
import ledgerIcon from '../icons/wallets/ledger/icon.svg'
import nodeIcon from '../icons/wallets/node/icon.svg'

const wallets = {
  'metamask': {
    icon: metamaskIcon,
    name: 'MetaMask',
    connection: {
      title: 'On MetaMask',
      description: 'Look for the MetaMask window in your browser (or a prompt to accept the MetaMask pop-up).'
    },
    troubleshootConnectionLink: 'https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask-Part-1-'
  },
  'bitcoin_ledger_legacy': {
    icon: ledgerIcon,
    name: 'Ledger (Legacy)',
    connection: {
      title: 'On Ledger',
      description: 'Navigate to your Bitcoin account on your Ledger device.'
    },
    troubleshootConnectionLink: 'https://support.ledger.com/hc/en-us/articles/115005195945'
  },
  'bitcoin_ledger_native_segwit': {
    icon: ledgerIcon,
    name: 'Ledger (Native Segwit)',
    connection: {
      title: 'On Ledger',
      description: 'Navigate to your Bitcoin account on your Ledger device.'
    },
    troubleshootConnectionLink: 'https://support.ledger.com/hc/en-us/articles/115005195945'
  },
  'bitcoin_node': {
    icon: nodeIcon,
    name: 'Node',
    connection: {
      title: 'On your node',
      description: 'Make sure your Bitcoin node is running and available.'
    },
    troubleshootConnectionLink: 'https://github.com/bitpay/bitcore'
  },
  'ethereum_node': {
    icon: nodeIcon,
    name: 'Node',
    connection: {
      title: 'On your node',
      description: 'Make sure your Ethereum node is running and available.'
    },
    troubleshootConnectionLink: 'https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html'
  },
  'ethereum_ledger': {
    icon: ledgerIcon,
    name: 'Ledger',
    connection: {
      title: 'On Ledger',
      description: 'Navigate to your Ethereum account on your Ledger device.'
    },
    troubleshootConnectionLink: 'https://support.ledger.com/hc/en-us/articles/115005195945'
  }
}

function getAvailableEthereumWallets (asset) {
  const wallets = ['metamask', 'ethereum_ledger']
  const assetConfig = config.assets[asset]
  if (assetConfig.rpc && assetConfig.rpc.wallet) {
    wallets.push('ethereum_node')
  }
  return wallets
}

function getAvailableBitcoinWallets () {
  const wallets = ['bitcoin_ledger_legacy', 'bitcoin_ledger_native_segwit']
  if (config.assets.btc.rpc && config.assets.btc.rpc.wallet) {
    wallets.push('bitcoin_node')
  }
  return wallets
}

const walletsByAsset = {
  eth: getAvailableEthereumWallets('eth'),
  btc: getAvailableBitcoinWallets()
}

function getAssetWallets (asset) {
  const assetConfig = config.assets[asset]
  if (assetConfig.type === 'erc20') {
    return getAvailableEthereumWallets(asset)
  }

  return walletsByAsset[asset]
}

export { wallets, getAssetWallets }
