import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'

import './WalletDisplay.css'

const WalletBalance = (props) => (
  <Grid container spacing={8} justify='center' alignItems='stretch' className='WalletDisplay'>
    <Grid item xs={3} container justify='flex-end'>
      <div>
        <img className='WalletIcon' src={wallets[props.type] ? wallets[props.type].icon : ''} />
      </div>
    </Grid>
    <Grid item xs={9} container direction='column' spacing={0} className='WalletInfo'>
      <Grid item xs>
        <Typography>{ props.address && props.address }</Typography>
        <Typography color='secondary'>{props.connected || 'Connect Your Wallet'}</Typography>
      </Grid>
      { props.balance && <Grid item xs>
        <Typography noWrap className='WalletBalance'>BALANCE <span>{props.balance}</span> {currencies[props.currency].code}</Typography>
      </Grid> }
    </Grid>
  </Grid>
)

WalletBalance.propTypes = PropTypes.shape({
  balance: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string
}).isRequired

export default WalletBalance
