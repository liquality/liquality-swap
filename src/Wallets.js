import { Client, providers, networks } from 'chainabstractionlayer'

const { BitcoinRPCProvider, BitcoinLedgerProvider } = providers.bitcoin
const { EthereumRPCProvider, EthereumLedgerProvider, EthereumMetaMaskProvider } = providers.ethereum
const rpc = {
  bitcoin: {
    url: 'http://localhost:8000',
    user: 'bitcoin',
    pass: 'local321'
  },
  ethereum: {
    url: 'http://localhost:8545',
    user: 'ethereum',
    pass: 'local321'
  }
}

const web3  = window.web3
const wallets = {
  btc: {
    ledger: {
      multiAddress: true,
      connectTitle: 'Plug in and enter',
      connectSubtitle: ''
    }
  },
  eth: {
    metamask: {
      multiAddress: false,
      connectTitle: 'Login to MetaMask',
      connectSubtitle: ''
    },
    ledger: {
      multiAddress: true,
      connectTitle: 'Plug in and enter',
      connectSubtitle: 'Choose ethereum application and enable smart contract support'
    }
  }
}

export default wallets
