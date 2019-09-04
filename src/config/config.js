export default {
  assets: {
    eth: {
      rpc: {
        url: 'http://localhost:7545'
      }
    },
    midman: {
      type: 'erc20',
      rpc: {
        url: 'http://localhost:7545'
      },
      contractAddress: '0x422950598Eb23877deAfF346dA0550Aa53482156'
    },
    btc: {
      rpc: {
        username: 'bitcoin',
        password: 'local321',
        url: 'http://localhost:17772'
      },
      api: {
        url: 'https://blockstream.info/testnet/api'
      },
      network: 'bitcoin_regtest',
      feeNumberOfBlocks: 9
    }
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
