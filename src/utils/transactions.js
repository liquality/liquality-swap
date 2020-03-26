import config from '../config/config'

function shortenTransactionHash (hash) {
  return `${hash.substring(0, 4)}...${hash.substring(hash.length - 4)}`
}

function getExplorerLink (tx, asset) {
  const assetConfig = config.assets[asset]
  return `${assetConfig.explorerPath}${tx.hash}`
}

export { shortenTransactionHash, getExplorerLink }
