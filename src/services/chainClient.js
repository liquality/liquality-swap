/* global web3, localStorage */

import { Client, providers } from '@liquality/chainabstractionlayer'
import config from '../config'

function createBtcClient (asset, wallet) {
  const networks = providers.bitcoin.networks
  const btcConfig = config.assets.btc
  const btcClient = new Client()
  btcClient.addProvider(new providers.bitcoin.BitcoreRPCProvider(
    localStorage.btcRpc || window.btcRpc || process.env.REACT_APP_BTC_RPC || btcConfig.rpc.url,
    localStorage.btcRpcUser || window.btcRpcUser || process.env.REACT_APP_BTC_RPC_USER || btcConfig.rpc.username,
    localStorage.btcRpcPass || window.btcRpcPass || process.env.REACT_APP_BTC_RPC_PASS || btcConfig.rpc.password,
    btcConfig.feeNumberOfBlocks
  ))
  if (wallet === 'ledger') {
    btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks[btcConfig.network]}))
    btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks[btcConfig.network]}))
  } else {
    btcClient.addProvider(new providers.bitcoin.BitcoinJsLibSwapProvider({network: networks[btcConfig.network]}))
  }
  return btcClient
}

function createEthClient (asset, wallet) {
  const networks = providers.ethereum.networks
  const ethConfig = config.assets.eth
  const ethClient = new Client()
  ethClient.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || ethConfig.rpc.url
  ))
  if (wallet === 'metamask') {
    ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[ethConfig.network]))
  } else if (wallet === 'ledger') {
    ethClient.addProvider(new providers.ethereum.EthereumLedgerProvider({network: networks[ethConfig.network]}))
  }
  ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())
  return ethClient
}

function createERC20Client (asset, wallet) {
  const networks = providers.ethereum.networks
  const assetConfig = config.assets[asset]
  const erc20Client = new Client()
  erc20Client.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || assetConfig.rpc.url
  ))
  if (wallet === 'metamask') {
    erc20Client.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[assetConfig.network]))
  } else if (wallet === 'ledger') {
    erc20Client.addProvider(new providers.ethereum.EthereumLedgerProvider({network: networks[assetConfig.network]}))
  }
  erc20Client.addProvider(new providers.ethereum.EthereumERC20Provider(assetConfig.contractAddress))
  erc20Client.addProvider(new providers.ethereum.EthereumERC20SwapProvider())
  return erc20Client
}

const clientCreators = {
  btc: createBtcClient,
  eth: createEthClient,
  erc20: createERC20Client
}

const clients = {}

function getClient (asset, wallet) {
  if (!(asset in clients)) {
    clients[asset] = {}
  }
  if (wallet in clients[asset]) return clients[asset][wallet]
  const assetConfig = config.assets[asset]
  const creator = clientCreators[asset] || clientCreators[assetConfig.type]
  const client = creator(asset, wallet)
  clients[asset][wallet] = client
  return client
}

export { getClient }
