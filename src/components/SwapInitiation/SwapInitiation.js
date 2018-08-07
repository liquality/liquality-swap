import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import liqUI from 'liquality-ui'

import './SwapInitiation.css'

const { WalletDisplay } = liqUI

class SwapInitiation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetA: {
        amount: 30,
        type: 'ethereum'
      },
      assetB: {
        amount: 2.2,
        type: 'bitcoin'
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

  render (props) {
    return <Grid container spacing={0}>
      <Grid item xs={12} container className='header'>
        <Grid item xs={12} sm={6} className='leftBalance'>
          <WalletDisplay
            title='Wallet 1'
            type='disconnected'
            description='Connect your wallet'
          />
        </Grid>
        <Grid item xs={12} sm={6} className='rightBalance'>
          <WalletDisplay
            title='Wallet 2'
            type='Ledger'
            description='BALANCE'
            amount='4203.141592653589793238'
            currency='XRP'
          />
        </Grid>
      </Grid>
      <Grid container className='main'>
        <Grid container xs={12} sm={6} justify='space-evenly'>
          <div className='placeholder walletContainer'>ETH</div>
        </Grid>
        <Grid container xs={12} sm={6} justify='space-evenly'>
          <div className='placeholder walletContainer'>BTC</div>
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
