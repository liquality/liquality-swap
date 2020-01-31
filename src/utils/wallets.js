import config from '../config'
import metamask from '../icons/metamask.svg'
import ledger from '../icons/ledger.svg'
import node from '../icons/node.svg'

const wallets = {
  'metamask': {
    icon: metamask,
    name: 'MetaMask',
    connection: {
      title: 'Login to MetaMask'
    },
    troubleshootConnectionLink: 'https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask-Part-1-'
  },
  'bitcoin_ledger_legacy': {
    icon: ledger,
    name: 'Ledger (Legacy)',
    connection: {
      title: 'On your ledger',
      description: 'Navigate to your Bitcoin account. Follow Ledger instructions to connect Bitcoin wallet'
    },
    troubleshootConnectionLink: 'https://support.ledger.com/hc/en-us/articles/115005195945'
  },
  'bitcoin_ledger_native_segwit': {
    icon: ledger,
    name: 'Ledger (Native Segwit)',
    connection: {
      title: 'On your ledger',
      description: 'Navigate to your Bitcoin account. Follow Ledger instructions to connect Bitcoin wallet'
    },
    troubleshootConnectionLink: 'https://support.ledger.com/hc/en-us/articles/115005195945'
  },
  'bitcoin_node': {
    icon: node,
    name: 'Node',
    connection: {
      title: 'On your node',
      description: 'Make sure your Bitcoin node is running and available.'
    },
    troubleshootConnectionLink: 'https://github.com/bitpay/bitcore'
  },
  'ethereum_node': {
    icon: node,
    name: 'Node',
    connection: {
      title: 'On your node',
      description: 'Make sure your Ethereum node is running and available.'
    },
    troubleshootConnectionLink: 'https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html'
  },
  'ethereum_ledger': {
    icon: ledger,
    name: 'Ledger',
    connection: {
      title: 'On your ledger',
      description: 'Navigate to your Ethereum account. Follow Ledger instructions to connect Ethereum wallet'
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
