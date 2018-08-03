import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import './SwapInitiation.css'

const SwapInitiation = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} sm={6}>
      <div className='placeholder'>Wallet 1</div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div className='placeholder'>Wallet 2</div>
    </Grid>
    <Grid container className='main'>
      <Grid container xs={12} sm={6} justify='space-evenly'>
        <div className='placeholder walletContainer'>BTC</div>
      </Grid>
      <Grid container xs={12} sm={6} justify='space-evenly'>
        <div className='placeholder walletContainer'>ETH</div>
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
)

export default SwapInitiation
