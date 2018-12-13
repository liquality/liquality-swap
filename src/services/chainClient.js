/* global web3, localStorage */

import { Client, providers, networks } from '@mattblackdesign/chainabstractionlayer/dist/index.umd.js'
import config from '../config'

const ethClient = new Client()
ethClient.addProvider(new providers.ethereum.EthereumRPCProvider(
  localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || config.eth.rpc.url
))
if (typeof web3 !== 'undefined') {
  ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, config.eth.network))
}
ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())

const btcClient = new Client()
btcClient.addProvider(new providers.bitcoin.BitcoreRPCProvider(
  localStorage.btcRpc || window.btcRpc || process.env.REACT_APP_BTC_RPC || config.btc.rpc.url,
  localStorage.btcRpcUser || window.btcRpcUser || process.env.REACT_APP_BTC_RPC_USER || config.btc.rpc.username,
  localStorage.btcRpcPass || window.btcRpcPass || process.env.REACT_APP_BTC_RPC_PASS || config.btc.rpc.password,
  config.feeNumberOfBlocks
))
btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks[config.btc.network]}))
btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks[config.btc.network]}))

const clients = {
  eth: ethClient,
  btc: btcClient
}

function getClient (code) {
  return clients[code]
}

export { getClient, ethClient, btcClient }
