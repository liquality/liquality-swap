export default {
  eth: {
    rpc: {
      url: 'http://localhost:8545'
    }
  },
  dai: {
    rpc: {
      url: 'http://localhost:8545'
    },
    contractAddress: '0x481a3A7c25ab07cC5faddf930B39a9e7f8ed1838' // Local ERC20 contract (18 decimals)
  },
  btc: {
    rpc: {
      username: 'bitcoin',
      password: 'local321',
      url: 'http://localhost:18332'
    },
    network: 'bitcoin_testnet',
    feeNumberOfBlocks: 2
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
