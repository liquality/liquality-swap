export default {
  assets: {
    eth: {
      rpc: {
        url: 'http://localhost:8545'
      }
    },
    midman: {
      type: 'erc20',
      rpc: {
        url: 'http://localhost:8545'
      },
      contractAddress: '0x422950598Eb23877deAfF346dA0550Aa53482156' // Local ERC20 contract (18 decimals)
    },
    btc: {
      rpc: {
        username: 'bitcoin',
        password: 'local321',
        url: 'http://localhost:18332'
      },
      network: 'bitcoin_testnet',
      feeNumberOfBlocks: 2
    }
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}