import React, { Component } from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import currencies from '../../utils/currencies'
import './SwapRefund.css'

class SwapRedemption extends Component {
  render () {
    return <Paper className='SwapRefund'>
      <img src={currencies[this.props.assets.a.currency].icon} />
      <Typography variant='headline' component='h3' gutterBottom>{this.props.assets.a.value} {currencies[this.props.assets.a.currency].code}</Typography>
      <Typography variant='headline' component='h3' gutterBottom>Your funds are ready for a refund</Typography>
      <Button variant='contained' color='primary' onClick={this.props.refundSwap}>
        Get Refund
      </Button>
    </Paper>
  }
}

export default SwapRedemption
