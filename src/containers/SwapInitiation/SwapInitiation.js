import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { getClient } from '../../services/chainClient'

import WalletPanel from '../WalletPanel'
import CurrencyInputs from '../CurrencyInputs'
import CounterPartyWallets from '../CounterPartyWallets'

import './SwapInitiation.css'
import { Paper } from '../../../node_modules/@material-ui/core';

const SWAP_EXPIRATION = 12
const SECRET = 'this is a secret'
const SECRET_HASH = 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'

class SwapInitiation extends Component {
  constructor (props) {
    super(props)
    this.initiateSwap = this.initiateSwap.bind(this)
  }

  initiateSwap () {
    const {
      assets: { a: { currency, value } },
      wallets: { a: { addresses } },
      counterParty
    } = this.props

    getClient(currency).generateSwap(
      counterParty[currency],
      addresses[0],
      SECRET_HASH,
      SWAP_EXPIRATION
    ).then(bytecode => {
      console.log(bytecode)

      // TODO: this should be based on which asset is asset A
      getClient(currency).sendTransaction(addresses[0], null, String(value), bytecode).then(console.log)
    })
  }

  render () {
    return <Paper style={{padding: '1rem'}}>
      <Grid container spacing={0}>
        <WalletPanel />
        <Grid container className='main'>
          <CurrencyInputs />
          <CounterPartyWallets />
        </Grid>
        <Grid container xs={12} justify='center'>
          <Button variant='contained' color='primary' onClick={this.initiateSwap}>Initiate Swap</Button>
        </Grid>
      </Grid>
    </Paper>
  }
}

export default SwapInitiation
