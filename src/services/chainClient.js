/* global web3, localStorage */

import { Client, providers, networks } from '@liquality/chainabstractionlayer/dist/index.umd.js'

const ethClient = new Client()
ethClient.addProvider(new providers.ethereum.EthereumRPCProvider(
  localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || 'http://localhost:8545'
))
if (typeof web3 !== 'undefined') {
  ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider))
}
ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())

const btcClient = new Client()
btcClient.addProvider(new providers.bitcoin.BitcoinRPCProvider(
  localStorage.btcRpc || window.btcRpc || process.env.REACT_APP_BTC_RPC || 'http://localhost:18332',
  localStorage.btcRpcUser || window.btcRpcUser || process.env.REACT_APP_BTC_RPC_USER || 'bitcoin',
  localStorage.btcRpcPass || window.btcRpcPass || process.env.REACT_APP_BTC_RPC_PASS || 'local321'
))
btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks.bitcoin_testnet}))
btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks.bitcoin_testnet}))

const clients = {
  eth: ethClient,
  btc: btcClient
}

function getClient (code) {
  return clients[code]
}

export { getClient, ethClient, btcClient }
