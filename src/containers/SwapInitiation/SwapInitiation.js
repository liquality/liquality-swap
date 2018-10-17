import React, { Component } from 'react'
import { Grid, Button, Paper, Typography } from '@material-ui/core'

import WalletPanel from '../WalletPanel'
import CurrencyInputs from '../CurrencyInputs'
import CounterPartyWallets from '../CounterPartyWallets'
import ExpirationDetails from '../../components/ExpirationDetails/ExpirationDetails'
import { generateSwapState } from '../../utils/app-links'



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
    return <Paper style={{padding: '1rem'}}>
      <Grid container spacing={0}>
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
