import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'
import './SwapInitiation.css'

const { CurrencyInput } = liqualityUI

class SwapInitiation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetA: {
        amount: 30,
        currency: 'eth'
      },
      assetB: {
        amount: 2.2,
        currency: 'btc'
      },
      walletA: {
        balance: 100,
        type: 'metamask'
      },
      walletB: {
        balance: 2,
        type: 'ledger'
      },
      counterPartyWalletA: '6d486d8a3e880c6b8a9478b3c78d68e731b87156',
      counterPartyWalletB: '1BFFoqyFUdAsCFQsgCHvzkPbbKBvUUMfj6',
      expiration: 12, // hours
      secret: 'this is a secret',
      secretHash: 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'
    }
  }

  handleAmountChange (party, newValue) {
    this.setState(prevState => ({
      ['asset' + party]: {
        ...prevState['asset' + party],
        amount: newValue
      }
    }))
  }

  switchSide () {
    this.setState(prevState => ({
      assetA: {
        ...prevState.assetA,
        currency: this.state.assetA.currency === 'btc' ? 'eth' : 'btc'
      },
      assetB: {
        ...prevState.assetB,
        currency: this.state.assetB.currency === 'btc' ? 'eth' : 'btc'
      }
    }))
  }

  render (props) {
    return <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <div className='placeholder'>Wallet 1</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder'>Wallet 2</div>
      </Grid>
      <Grid container className='main'>
        <Grid container xs={12} sm={5} justify='flex-end'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>HAVE</Typography>
            <CurrencyInput currency={this.state.assetA.currency}
              value={this.state.assetA.amount}
              onChange={(newValue) => this.handleAmountChange('A', newValue)} />
          </div>
        </Grid>
        <Grid container xs={12} sm={2} justify='space-around' alignItems='center'>
          <SwapIcon onClick={() => this.switchSide()} color='primary' style={{ fontSize: 50 }} />
        </Grid>
        <Grid container xs={12} sm={5} justify='flex-start'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>WANT</Typography>
            <CurrencyInput currency={this.state.assetB.currency}
              value={this.state.assetB.amount}
              onChange={(newValue) => this.handleAmountChange('B', newValue)} />
          </div>
        </Grid>
        <Grid container xs={12} className='counterparty'>
          <Typography variant='title' gutterBottom>COUNTER PARTY WALLETS</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Receive From</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>Address 1</div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Send To</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>Address 2</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} justify='center'>
        <Button variant='contained' color='primary'>Initiate Swap</Button>
      </Grid>
    </Grid>
  }
}

export default SwapInitiation
