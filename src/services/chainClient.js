/* global web3, localStorage */

import Client from '@liquality/client'
import BitcoinBitcoreRpcProvider from '@liquality/bitcoin-bitcore-rpc-provider'
import BitcoinRpcProvider from '@liquality/bitcoin-rpc-provider'
import BitcoinLedgerProvider from '@liquality/bitcoin-ledger-provider'
import BitcoinSwapProvider from '@liquality/bitcoin-swap-provider'
import BitcoinJsLibSwapProvider from '@liquality/bitcoin-bitcoinjs-lib-swap-provider'
import BitcoinNetworks from '@liquality/bitcoin-networks'

import EthereumRpcProvider from '@liquality/ethereum-rpc-provider'
import EthereumLedgerProvider from '@liquality/ethereum-ledger-provider'
import EthereumNetworks from '@liquality/ethereum-networks'
import EthereumSwapProvider from '@liquality/ethereum-swap-provider'
import EthereumErc20Provider from '@liquality/ethereum-erc20-provider'
import EthereumErc20SwapProvider from '@liquality/ethereum-erc20-swap-provider'
import EthereumMetaMaskProvider from '@liquality/ethereum-metamask-provider'

import config from '../config'

function createBtcClient (asset, wallet) {
  const btcConfig = config.assets.btc
  const btcClient = new Client()
  if (wallet === 'bitcoin_ledger') {
    const ledger = new BitcoinLedgerProvider({network: BitcoinNetworks[btcConfig.network]})

    if (window.useWebBle || localStorage.useWebBle) {
      ledger.useWebBle()
    }

    btcClient.addProvider(new BitcoinBitcoreRpcProvider(btcConfig.rpc.url, btcConfig.rpc.username, btcConfig.rpc.password, btcConfig.feeNumberOfBlocks))
    btcClient.addProvider(ledger)
    btcClient.addProvider(new BitcoinSwapProvider({network: BitcoinNetworks[btcConfig.network]}))
  } else if (wallet === 'bitcoin_node') {
    btcClient.addProvider(new BitcoinRpcProvider(btcConfig.rpc.url, btcConfig.rpc.username, btcConfig.rpc.password, btcConfig.feeNumberOfBlocks))
    btcClient.addProvider(new BitcoinJsLibSwapProvider({network: BitcoinNetworks[btcConfig.network]}))
  } else {
    // Verify functions required when wallet not connected
    btcClient.addProvider(new BitcoinRpcProvider(btcConfig.rpc.url, btcConfig.rpc.username, btcConfig.rpc.password, btcConfig.feeNumberOfBlocks))
    btcClient.addProvider(new BitcoinJsLibSwapProvider({network: BitcoinNetworks[btcConfig.network]}))
  }
  return btcClient
}

function createEthClient (asset, wallet) {
  const ethConfig = config.assets.eth
  const ethClient = new Client()
  ethClient.addProvider(new EthereumRpcProvider(
    ethConfig.rpc.url
  ))
  if (wallet === 'metamask') {
    ethClient.addProvider(new EthereumMetaMaskProvider(web3.currentProvider, EthereumNetworks[ethConfig.network]))
  } else if (wallet === 'ethereum_ledger') {
    ethClient.addProvider(new EthereumLedgerProvider({network: EthereumNetworks[ethConfig.network]}))
  }
  ethClient.addProvider(new EthereumSwapProvider())
  return ethClient
}

function createERC20Client (asset, wallet) {
  const assetConfig = config.assets[asset]
  const erc20Client = new Client()
  erc20Client.addProvider(new EthereumRpcProvider(
    assetConfig.rpc.url
  ))
  if (wallet === 'metamask') {
    erc20Client.addProvider(new EthereumMetaMaskProvider(web3.currentProvider, EthereumNetworks[assetConfig.network]))
  } else if (wallet === 'ethereum_ledger') {
    erc20Client.addProvider(new EthereumLedgerProvider({network: EthereumNetworks[assetConfig.network]}))
  }
  erc20Client.addProvider(new EthereumErc20Provider(assetConfig.contractAddress))
  erc20Client.addProvider(new EthereumErc20SwapProvider())
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
