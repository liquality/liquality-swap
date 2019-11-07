export default {
  assets: {
    eth: {
      rpc: {
        url: 'http://localhost:7545'
      }
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
  }
}
