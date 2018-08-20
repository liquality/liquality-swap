import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import liqualityUI from 'liquality-ui'

import { getClient } from '../../services/chainClient'

import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'

const { WalletDisplay } = liqualityUI

class WalletPanel extends Component {
  constructor (props) {
    super(props)
    this.chooseWallet = this.chooseWallet.bind(this)
  }

  async chooseWallet (party, currency, wallet) {
    this.props.onChooseWallet(party, wallet)
    this.checkWalletConnected(party)
  }

  async checkWalletConnected (party) {
    const currency = this.props.assets[party].currency
    getClient(currency).getAddresses().then((addresses) => {
      if (addresses.length > 0) {
        this.props.onWalletConnected(party, addresses)
      } else {
        if (this.props.wallets[party].chosen) {
          setTimeout(this.checkWalletConnected(party), 1000)
        }
      }
    })
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const { a: walletA, b: walletB } = this.props.wallets

    return <Grid container>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.props.onToggleWalletConnect('a', e.currentTarget)}>
          <WalletDisplay
            currency={assetA.currency}
            type={walletA.type}
            balance={walletA.balance}
            title={walletA.connected ? walletA.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.props.onToggleWalletConnect('b', e.currentTarget)}>
          <WalletDisplay
            currency={assetB.currency}
            type={walletB.type}
            balance={walletB.balance}
            title={walletB.connected ? walletB.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <WalletConnectPopup
        open={walletA.connectOpen}
        currency={assetA.currency}
        id='a'
        walletChosen={walletA.chosen}
        wallet={walletA.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletA.anchorEl}
        addresses={walletA.addresses}
        walletConnected={walletA.connected}
      />

      <WalletConnectPopup
        open={walletB.connectOpen}
        currency={assetB.currency}
        id='b'
        walletChosen={walletB.chosen}
        wallet={walletB.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletB.anchorEl}
        addresses={walletB.addresses}
        walletConnected={walletB.connected}
      />
    </Grid>
  }
}

export default WalletPanel
