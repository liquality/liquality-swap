import React, { Component } from 'react'

import WalletPanel from '../WalletPanel'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import CurrencyInputs from '../CurrencyInputs'
import CounterPartyWallets from '../CounterPartyWallets'
import InitiatorExpirationInfo from '../InitiatorExpirationInfo'
import Button from '../../components/Button/Button'
import ExpirationDetails from '../../components/ExpirationDetails'
import { generateSwapState } from '../../utils/app-links'

import HandshakeIcon from '../../icons/handshake.png'
import SwapIcon from '../../icons/switch.svg'
import './SwapInitiation.css'

class SwapInitiation extends Component {
  walletsValid () {
    const initialSwapState = generateSwapState(window.location)
    return this.props.wallets.a.addresses.includes(initialSwapState.wallets.a.addresses[0]) &&
    this.props.wallets.b.addresses.includes(initialSwapState.wallets.b.addresses[0])
  }

  walletsConnected () {
    return this.props.wallets.a.connected && this.props.wallets.b.connected
  }

  counterPartyAddressesValid () {
    return this.props.counterParty[this.props.assets.a.currency].valid &&
      this.props.counterParty[this.props.assets.b.currency].valid
  }

  initiationConfirmed () {
    return this.props.isVerified && this.props.transactions.b.fund.confirmations > 0
  }

  nextEnabled () {
    return this.getErrors().length === 0
  }

  getErrors () {
    const errors = []
    if (!this.walletsConnected()) {
      errors.push('Wallets are not connected')
    }
    if (this.props.isPartyB && !this.walletsValid()) {
      errors.push('The connected wallets must match the wallets supplied for the swap')
    }
    if (!this.props.isPartyB && !this.counterPartyAddressesValid()) {
      errors.push('Invalid counter party addresses')
    }
    if (this.props.isPartyB && !this.initiationConfirmed()) {
      errors.push('Counter party yet to lock funds')
    }
    return errors
  }

  render () {
    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={this.props.isPartyB || SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div class='SwapInitiation_top'>
        <CurrencyInputs disabled={this.props.isPartyB}/>
      </div>
      <WalletPanel />
      <div class='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span class='SwapInitiation_handshake'><img src={HandshakeIcon} /></span>
          : <h5 class='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.isPartyB || <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!this.props.isPartyB && <Button wide primary disabled={!this.nextEnabled()} onClick={this.props.initiateSwap}>Next</Button>}
        {this.props.isPartyB && <Button wide primary disabled={!this.nextEnabled()} onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        <div class='SwapInitiation_errors'>
          {this.getErrors().map(error => <p>{error}</p>)}
        </div>
      </div>
    </div>
  }
}

export default SwapInitiation
