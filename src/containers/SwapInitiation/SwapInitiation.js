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

  initiationExists () {
    return this.props.isVerified && this.props.transactions.b.fund.hash
  }

  initiationConfirmed () {
    return this.props.isVerified && this.props.transactions.b.fund.confirmations >= 0
  }

  nextEnabled () {
    return this.getErrors().length === 0
  }

  amountsValid () {
    return (parseInt(this.props.assets.a.value) > 0 && (parseInt(this.props.assets.a.value) <= parseInt(this.props.wallets.a.balance))) && (parseInt(this.props.assets.b.value) > 0 && (parseInt(this.props.assets.b.value) <= parseInt(this.props.wallets.b.balance)))
  }

  getErrors () {
    const errors = []

    if (!this.amountsValid()) {
      errors.push('Amounts are incorrect')
    }

    if (!this.walletsConnected()) {
      errors.push('Wallets are not connected')
    }

    if (this.props.isPartyB) {
      if (!this.walletsValid()) {
        errors.push('The connected wallets must match the wallets supplied for the swap')
      }
      if (!this.initiationExists()) {
        errors.push('Counterparty hasn\'t initiated')
      }
      if (!this.initiationConfirmed()) {
        errors.push('Counterparty has initiated, awaiting confirmations')
      }
    } else {
      if (!this.counterPartyAddressesValid()) {
        errors.push('Invalid counterparty addresses')
      }
    }
    return errors
  }

  render () {
    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={this.props.isPartyB ? undefined : SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapInitiation_top'>
        <CurrencyInputs disabled={this.props.isPartyB} showRate />
      </div>
      <WalletPanel />
      <div className='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span className='SwapInitiation_handshake'><img src={HandshakeIcon} alt='Agree' /></span>
          : <h5 className='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.isPartyB || <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!this.props.isPartyB && <Button wide primary disabled={!this.nextEnabled()} loadingAfterClick loadingAfterClickMessage='Check wallet for action' onClick={this.props.initiateSwap}>Next</Button>}
        {this.props.isPartyB && <Button wide primary disabled={!this.nextEnabled()} loadingAfterClick loadingAfterClickMessage='Check wallet for action' onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        <div className='SwapInitiation_errors'>
          {this.getErrors().map(error => <p key={error}>{error}</p>)}
        </div>
      </div>
    </div>
  }
}

export default SwapInitiation
