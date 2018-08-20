import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'

const { CurrencyInput } = liqualityUI

class CurrencyInputs extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    return <Grid container>
      <Grid container xs={12} sm={5} justify='flex-end'>
        <div className='placeholder walletContainer'>
          <Typography variant='display1' gutterBottom>HAVE</Typography>
          <CurrencyInput currency={assetA.currency}
            value={assetA.value}
            onChange={newValue => this.props.onAmountChange('a', newValue)} />
        </div>
      </Grid>
      <Grid container xs={12} sm={2} justify='space-around' alignItems='center'>
        <SwapIcon onClick={() => this.props.onSwitchSides()} color='primary' style={{ fontSize: 50 }} />
      </Grid>
      <Grid container xs={12} sm={5} justify='flex-start'>
        <div className='placeholder walletContainer'>
          <Typography variant='display1' gutterBottom>WANT</Typography>
          <CurrencyInput currency={assetB.currency}
            value={assetB.value}
            onChange={newValue => this.props.onAmountChange('b', newValue)} />
        </div>
      </Grid>
    </Grid>
  }
}

export default CurrencyInputs
