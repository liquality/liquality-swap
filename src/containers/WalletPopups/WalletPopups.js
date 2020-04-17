import React, { Component } from 'react'
import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'
import WalletActionPopup from '../../components/WalletActionPopup/WalletActionPopup'

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
        walletConnecting={walletA.connecting}
        walletConnectingError={walletA.connectingError}
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
        walletConnecting={walletB.connecting}
        walletConnectingError={walletB.connectingError}
        handleClose={() => this.props.onToggleWalletConnect('b')}
      />
      {this.props.wallets.popup.steps && this.props.wallets.popup.step && <WalletActionPopup steps={this.props.wallets.popup.steps} activeStep={this.props.wallets.popup.step} open={this.props.wallets.popup.open} />}
    </div>
  }
}

export default WalletPanel
