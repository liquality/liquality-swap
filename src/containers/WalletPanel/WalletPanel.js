import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { getClient } from '../../services/chainClient'
import WalletDisplay from '../../components/WalletDisplay/WalletDisplay'
import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'

import currencies from '../../utils/currencies'
import './WalletPanel.css'

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
    const addresses = await getClient(currency).getAddresses()
    if (addresses.length > 0) {
      const unusedAddresses = await getClient(currency).getUnusedAddresses()
      const balance = await getClient(currency).getBalance(unusedAddresses)
      const formattedBalance = currencies[currency].unitToCurrency(balance).toFixed(3)
      this.props.onWalletConnected(party, addresses, formattedBalance)
    } else {
      if (this.props.wallets[party].chosen) {
        setTimeout(this.checkWalletConnected(party), 1000)
      }
    }
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const { a: walletA, b: walletB } = this.props.wallets

    return <Grid container>
      <Grid item xs={12} sm={6}>
        <div className='wallet' onClick={(e) => this.props.onToggleWalletConnect('a', e.currentTarget)}>
          <WalletDisplay
            currency={assetA.currency}
            type={walletA.type}
            balance={walletA.balance}
            address={walletA.addresses[0]}
            connected={walletA.connected} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='wallet' onClick={(e) => this.props.onToggleWalletConnect('b', e.currentTarget)}>
          <WalletDisplay
            currency={assetB.currency}
            type={walletB.type}
            balance={walletB.balance}
            address={walletB.addresses[0]}
            connected={walletB.connected} />
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
