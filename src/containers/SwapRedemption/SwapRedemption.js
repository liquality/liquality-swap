import React, { Component } from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import './SwapRedemption.css'

class SwapRedemption extends Component {
  render () {
    return <Paper className='SwapRedemption'>
      <Typography component='p' gutterBottom>Thanks to the Atomic Swap you don't need to trust the counterparty and avoid the middleman</Typography>
      <Typography variant='headline' component='h3' gutterBottom>Get {this.props.assets.b.value} {this.props.assets.b.currency} for {this.props.assets.a.value} {this.props.assets.a.currency}</Typography>
      <Button variant="contained" color="primary" onClick={this.props.redeemSwap}>
        Claim your funds
      </Button>
    </Paper>
  }
}

export default SwapRedemption
