import React, { Component } from 'react'
import { Grid, Button, Paper } from '@material-ui/core'

import WalletPanel from '../WalletPanel'
import CurrencyInputs from '../CurrencyInputs'
import CounterPartyWallets from '../CounterPartyWallets'

import './SwapInitiation.css'

class SwapInitiation extends Component {
  render () {
    return <Paper style={{padding: '1rem'}}>
      <Grid container spacing={0}>
        <WalletPanel />
        <Grid container className='main'>
          <CurrencyInputs />
          <CounterPartyWallets />
        </Grid>
        <Grid container xs={12} justify='center'>
          <Button variant='contained' color='primary' onClick={this.props.initiateSwap}>Initiate Swap</Button>
        </Grid>
      </Grid>
    </Paper>
  }
}

export default SwapInitiation
