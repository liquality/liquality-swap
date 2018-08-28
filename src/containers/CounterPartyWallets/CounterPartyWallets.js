import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddressInput from '../../components/AddressInput/AddressInput'

import './CounterPartyWallets.css'

class CounterPartyWallets extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const counterParty = this.props.counterParty

    return <Grid container xs={12} className='counterparty'>
      <Typography variant='title' gutterBottom>COUNTER PARTY WALLETS</Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='title' gutterBottom>Receive From</Typography>
        </Grid>
        <Grid item xs={12}>
          <div className='placeholder'>
            <AddressInput
              currency={assetB.currency}
              value={counterParty[assetB.currency]}
              onChange={newValue => this.props.onCounterPartyAddressChange(assetB.currency, newValue)}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='title' gutterBottom>Send To</Typography>
        </Grid>
        <Grid item xs={12}>
          <div className='placeholder'>
            <AddressInput
              currency={assetA.currency}
              value={counterParty[assetA.currency]}
              onChange={newValue => this.props.onCounterPartyAddressChange(assetA.currency, newValue)}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  }
}

export default CounterPartyWallets
