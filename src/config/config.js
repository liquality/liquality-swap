export default {
  hostAgent: 'http://localhost:3030',
  assets: {
    eth: {
      rpc: {
        url: 'http://localhost:8545'
      }
    },
    dai: {
      type: 'erc20',
      rpc: {
        url: 'http://localhost:8545'
      },
      contractAddress: '0x422950598Eb23877deAfF346dA0550Aa53482156'
    },
    btc: {
      rpc: {
        username: 'bitcoin',
        password: 'local321',
        url: 'http://localhost:18443',
        addressType: 'bech32'
      },
      network: 'bitcoin_regtest',
      swapMode: 'p2wsh',
      feeNumberOfBlocks: 2
    }
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
