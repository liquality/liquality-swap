export default {
  hostName: 'Liquality',
  hostIcon: 'https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png',
  agents: ['https://liquality.io/swap-testnet/agent'],
  assets: {
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
    }
  },
  debug: true,
  defaultFee: 'average',
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
