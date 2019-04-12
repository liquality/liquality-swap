export default {
  assets: {
    eth: {
      rpc: {
        url: 'https://rinkeby.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      network: 'rinkeby'
    },
    midman: {
      type: 'erc20',
      rpc: {
        url: 'https://rinkeby.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      contractAddress: '0x422950598Eb23877deAfF346dA0550Aa53482156', // Local ERC20 contract (18 decimals)
      network: 'rinkeby'
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
