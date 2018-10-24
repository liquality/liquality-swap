import React, { Component } from 'react'
import { Paper, Typography, Grid, Button } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './SwapCompleted.css'

import currencies from '../../utils/currencies'

class SwapCompleted extends Component {
  render () {
    return <Paper className='SwapRedemption'>
      <Typography variant='headline' component='h3'><CheckCircleIcon style={{color: '#7ed321', fontSize: 36}} /> Swap Completed</Typography>
      <Typography component='p' className='padding-bottom' gutterBottom>in 13 min</Typography>
      <Typography component='p'>Swap Link:</Typography>
      <Typography component='p'>Transaction Ref:</Typography>
      <Typography component='p'>Confirmations:</Typography>
      <Grid container className='CurrencyInputs'>
        <Grid item xs={12} sm={6} justify='flex-end'>
          <div>
            <Typography component='p' gutterBottom>Receive</Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} justify='flex-end'>
          <div>
            <Typography component='p' gutterBottom>Send</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} justify='flex-start' className='currency-box'>
          <div>
            <img className='WalletIcon' src={currencies[this.props.assets.b.currency] ? currencies[this.props.assets.b.currency].icon : ''} />
            <Typography component='p' gutterBottom>{this.props.assets.b.value} {this.props.assets.b.currency}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} justify='flex-start' className='currency-box'>
          <div>
            <img className='WalletIcon' src={currencies[this.props.assets.a.currency] ? currencies[this.props.assets.a.currency].icon : ''} />
            <Typography component='p' gutterBottom>{this.props.assets.a.value} {this.props.assets.a.currency}</Typography>
          </div>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary'>
        Start Another Swap
      </Button>
    </Paper>
  }
}

export default SwapCompleted
