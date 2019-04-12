import React, { Component } from 'react'
import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'

class WalletPanel extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const { a: walletA, b: walletB } = this.props.wallets

    return <div>
      <WalletConnectPopup
        open={walletA.connectOpen}
        currency={assetA.currency}
        id='a'
        walletChosen={walletA.chosen}
        wallet={walletA.type}
        chooseWallet={this.props.waitForWallet}
        connectWallet={this.props.waitForWalletInitialization}
        disconnectWallet={this.props.onWalletDisconnected}
        addresses={walletA.addresses}
        walletConnected={walletA.connected}
        handleClose={() => this.props.onToggleWalletConnect('a')}
      />

      <WalletConnectPopup
        open={walletB.connectOpen}
        currency={assetB.currency}
        id='b'
        walletChosen={walletB.chosen}
        wallet={walletB.type}
        chooseWallet={this.props.waitForWallet}
        connectWallet={this.props.waitForWalletInitialization}
        disconnectWallet={this.props.onWalletDisconnected}
        addresses={walletB.addresses}
        walletConnected={walletB.connected}
        handleClose={() => this.props.onToggleWalletConnect('b')}
      />
    </div>
  }
}

export default WalletPanel
