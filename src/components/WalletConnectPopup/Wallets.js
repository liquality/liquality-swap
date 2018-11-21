const wallets = {
  btc: {
    ledger: {
      multiAddress: true,
      connectTitle: 'Plug in and enter',
      connectSubtitle: ''
    }
  },
  eth: {
    metamask: {
      multiAddress: false,
      connectTitle: 'Login to MetaMask',
      connectSubtitle: ''
    },
    ledger: {
      multiAddress: true,
      connectTitle: 'Plug in and enter',
      connectSubtitle: 'Choose ethereum application and enable smart contract support'
    }
  }
}

export default wallets
