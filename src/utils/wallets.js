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
  'ledger': {
    icon: ledger,
    name: 'Ledger',
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
  }
}

const walletsByAsset = {
  eth: ['metamask', 'ledger', 'ethereum_node'],
  btc: ['ledger', 'bitcoin_node'],
  erc20: ['metamask', 'ledger', 'ethereum_node']
}

function getAssetWallets (asset) {
  const assetConfig = config.assets[asset]
  return walletsByAsset[asset] || walletsByAsset[assetConfig.type]
}

export { wallets, getAssetWallets }
