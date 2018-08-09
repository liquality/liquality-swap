import { Client, providers, networks } from 'chainabstractionlayer'

const { BitcoinRPCProvider, BitcoinLedgerProvider } = providers.bitcoin
const { EthereumRPCProvider, EthereumLedgerProvider, EthereumMetamaskProvider } = providers.ethereum

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
      async initialize () {
        const cal = new Client()
        cal.addProvider(new BitcoinRPCProvider(rpc.bitcoin.url, rpc.bitcoin.user, rpc.bitcoin.pass))
        cal.addProvider(new BitcoinLedgerProvider({ network: networks.bitcoin }))
        return cal
      },
    }
  },
  eth: {
    metamask: {
      multiAddress: false,
      initialize () {
        const cal = new Client()
        cal.addProvider(new EthereumMetamaskProvider(web3.currentProvider))
        return cal
      }
    },
    ledger: {
      multiAddress: true,
      initialize () {
        const cal = new Client()
        cal.addProvider(new EthereumRPCProvider(rpc.ethereum.url, rpc.ethereum.user, rpc.ethereum.pass))
        cal.addProvider(new EthereumLedgerProvider({ network: networks.ethereum }))
        return cal
      }
    }
  }
}

export default wallets

