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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='title'>Receive From</Typography>
        </Grid>
        <Grid item xs={12}>
          <AddressInput
            currency={assetB.currency}
            value={counterParty[assetB.currency].address}
            onChange={(newValue, valid) => this.props.onCounterPartyAddressChange(assetB.currency, newValue, valid)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='title'>Send To</Typography>
        </Grid>
        <Grid item xs={12}>
          <AddressInput
            currency={assetA.currency}
            value={counterParty[assetA.currency].address}
            onChange={(newValue, valid) => this.props.onCounterPartyAddressChange(assetA.currency, newValue, valid)}
          />
        </Grid>
      </Grid>
    </Grid>
  }
}

export default CounterPartyWallets
