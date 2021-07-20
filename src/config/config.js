export default {
  hostName: 'Liquality',
  hostIcon: 'https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png',
  agents: ['https://liquality.io/swap-testnet/agent'],
  assets: {
    MATIC: {
      rpc: {
        url: 'https://rpc-mumbai.maticvigil.com/'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/polygon-testnet-api'
      },
      network: 'polygon_testnet',
      explorerPath: 'https://explorer-mumbai.maticvigil.com/tx/0x'
    },
    ETH: {
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    BTC: {
      api: {
        url: 'https://liquality.io/testnet/electrs'
      },
      batchApi: {
        url: 'https://liquality.io/electrs-testnet-batch'
      },
      feeNumberOfBlocks: 2,
      network: 'bitcoin_testnet',
      explorerPath: 'https://blockstream.info/testnet/tx/'
    },
    RBTC: {
      rpc: {
        url: 'https://public-node.testnet.rsk.co'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/rsk-testnet-api'
      },
      network: 'rsk_testnet',
      explorerPath: 'https://explorer.testnet.rsk.co/tx/0x'
    },
    DAI: {
      type: 'erc20',
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      contractAddress: '0xcE2748BE67fB4346654B4500c4BB0642536365FC',
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    USDC: {
      type: 'erc20',
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      contractAddress: '0xcE2748BE67fB4346654B4500c4BB0642536365FC',
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    NEAR: {
      explorerPath: 'https://explorer.testnet.near.org/transactions/'
    }
  },
  debug: true,
  defaultFee: 'average',
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}