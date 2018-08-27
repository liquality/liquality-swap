import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'

import './WalletConnecting.css'

const WalletConnecting = (props) => (
  <div className='WalletConnecting'>
    <Button className='WalletCurrency' size='small' disabled>
      <img src={currencies[props.currency].icon} />
      Connect your {props.currency.toUpperCase()} wallet
    </Button>
    <div><img src={wallets[props.wallet].icon} /></div>
    <Typography variant='title'>{props.title}</Typography>
    <Typography>{props.subTitle}</Typography>
    <Button onClick={props.cancelWallet}>{props.cancelText}</Button>
  </div>
)

WalletConnecting.propTypes = {
  cancelText: PropTypes.string,
  cancelWallet: PropTypes.func,
  currency: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wallet: PropTypes.string
}

export default WalletConnecting
