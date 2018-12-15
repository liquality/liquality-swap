export default {
  eth: {
    rpc: {
      url: 'http://localhost:8545'
    }
  },
  btc: {
    rpc: {
      username: 'bitcoin',
      password: 'local321',
      url: 'http://localhost:8000'
    },
    network: 'bitcoin_testnet',
    feeNumberOfBlocks: 2
  },
  debug: true,
  injectFooter: `<p style="text-align: center;"><a href="https://github.com/liquality/chainabstractionlayer" target="_blank">Powered by ChainAbstractionLayer</a></p>`
}
