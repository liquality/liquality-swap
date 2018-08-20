import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'

import { getClient } from '../../services/chainClient'

import WalletPanel from '../WalletPanel'

import './SwapInitiation.css'

const SWAP_EXPIRATION = 12
const SECRET = 'this is a secret'
const SECRET_HASH = 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'

const { CurrencyInput, AddressInput } = liqualityUI

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
    const { a: assetA, b: assetB } = this.props.assets
    const counterParty = this.props.counterParty
    return <Grid container spacing={0}>
      <WalletPanel />
      <Grid container className='main'>
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
        <Grid container xs={12} className='counterparty'>
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
      </Grid>
      <Grid container xs={12} justify='center'>
        <Button variant='contained' color='primary' onClick={this.initiateSwap}>Initiate Swap</Button>
      </Grid>
    </Grid>
  }
}

export default SwapInitiation
