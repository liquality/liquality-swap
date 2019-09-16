export default {
  assets: {
    eth: {
      rpc: {
        url: 'http://localhost:8545'
      },
      network: 'rinkeby'
    },
    midman: {
      type: 'erc20',
      rpc: {
        url: 'http://localhost:8545'
      },
      contractAddress: '0x422950598Eb23877deAfF346dA0550Aa53482156', // Local ERC20 contract (18 decimals),
      network: 'rinkeby'
    },
    btc: {
      rpc: {
        username: 'bitcoin',
        password: 'local321',
        url: 'http://localhost:18332'
      },
      network: 'bitcoin_regtest',
      addressType: 'bech32',
      swapMode: 'p2wsh',
      feeNumberOfBlocks: 2
    }
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
