import React, { Component } from 'react'
import { Grid, Button, Paper, Typography } from '@material-ui/core'

import WalletPanel from '../WalletPanel'
import CurrencyInputs from '../CurrencyInputs'
import CounterPartyWallets from '../CounterPartyWallets'
import ExpirationDetails from '../../components/ExpirationDetails/ExpirationDetails'
import { generateSwapState } from '../../utils/app-links'
import SwapSVG from './swap.svg'
import SwapSwapSVG from './swap-swap.svg'
import WalletSVG from './wallet.svg'
import BitcoinSVG from '../../icons/btc.svg'

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
    return this.props.transactions.b.fund.confirmations > 0
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
    return <Paper className='liquality-wrapper'>
      <div className='liq-banner'>
        <div className='swap-svg-container'>
          <img src={BitcoinSVG} className='asset-left' />
          <img src={BitcoinSVG} className='asset-right' />
          <img src={SwapSVG} className='swap-svg' />
        </div>
        <div className='have-want'>
          <div className='want'>
            <div>WANT</div>
          </div>
          <div className='have'>
            <div>HAVE</div>
          </div>
        </div>
      </div>
      <Grid container spacing={0} className='liq-container'>
        <div className='white-band'>
          <img src={SwapSwapSVG} className='swap-swap-svg' />
        </div>
        <div className='rate-input'>
          <div className='asset-right'>
            BTC
            <input />
          </div>
          <div className='asset-left'>
            BTC
            <input />
          </div>
        </div>
        <div className='rate-card'>
          <div className='rate-title'>Rate</div>
          <div className='asset-1-rate'>1ETH</div>
          <div className='rate-eq-sign'>=</div>
          <div className='asset-2-rate'>0.00BTC</div>
          <div className='fiat-rate'>100.00USD</div>
        </div>
        <div className='wallet-display'>
          <div className='wallet-right'>
            <img src={WalletSVG} />
            <div className='wallet-address'>
              0x0
            </div>
            <div className='change-wallet'>
              Change wallet
            </div>
            <div className='wallet-spendable'>
              Spendable
            </div>
            <div className='wallet-balance'>
              0.001BTC
            </div>
          </div>
          <div className='wallet-left'>
            <img src={WalletSVG} />
            <div className='wallet-address'>
              0x0
            </div>
            <div className='change-wallet'>
              Change wallet
            </div>
            <div className='wallet-spendable'>
              Spendable
            </div>
            <div className='wallet-balance'>
              0.001BTC
            </div>
          </div>
        </div>
        <div className='counterparty-wallet-card'>
          <div className='title'>Counter party wallets</div><br />

          <div className='cp-wallet cp-wallet-right'>
            0x0
          </div>
          <div className='cp-wallet cp-wallet-left'>
            0x0
          </div>

          <button>Next</button>
        </div>
        <WalletPanel />
        <Grid container className='main'>
          <CurrencyInputs />
          <ExpirationDetails expiration={this.props.expiration} isPartyB={this.props.isPartyB} />
          { this.props.isPartyB || <CounterPartyWallets /> }
        </Grid>
        <Grid container xs={12} justify='center'>
          {this.getErrors().map(error =>
            <Grid item xs={12}><Typography color='secondary' align='center' gutterBottom>
              {error}
            </Typography></Grid>
          )}
          <Button disabled={!this.nextEnabled()} variant='contained' color='primary' onClick={this.props.isPartyB ? this.props.confirmSwap : this.props.initiateSwap}>Next</Button>
        </Grid>
      </Grid>
    </Paper>
  }
}

export default SwapInitiation
