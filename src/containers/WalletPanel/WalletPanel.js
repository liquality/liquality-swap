import React, { Component } from 'react'
import WalletDisplay from '../../components/WalletDisplay/WalletDisplay'
import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'

import './WalletPanel.css'

class WalletPanel extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const { a: walletA, b: walletB } = this.props.wallets

    return <div className='WalletPanel'>
      <div className='row justify-content-between no-gutters'>
        <div className='col WalletPanel_left'>
          <WalletDisplay
            currency={assetA.currency}
            type={walletA.type}
            balance={walletA.balance}
            address={walletA.addresses[0]}
            connected={walletA.connected}
            onButtonClick={() => this.props.onToggleWalletConnect('a')} />
        </div>
        <div className='col WalletPanel_right'>
          <WalletDisplay
            currency={assetB.currency}
            type={walletB.type}
            balance={walletB.balance}
            address={walletB.addresses[0]}
            connected={walletB.connected}
            onButtonClick={() => this.props.onToggleWalletConnect('b')} />
        </div>
      </div>
      <WalletConnectPopup
        open={walletA.connectOpen}
        currency={assetA.currency}
        id='a'
        walletChosen={walletA.chosen}
        wallet={walletA.type}
        chooseWallet={this.props.waitForWallet}
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletA.anchorEl}
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
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletB.anchorEl}
        addresses={walletB.addresses}
        walletConnected={walletB.connected}
        handleClose={() => this.props.onToggleWalletConnect('b')}
      />
    </div>
  }
}

export default WalletPanel
