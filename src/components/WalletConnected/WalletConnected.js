import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

import { shortenAddress } from '../../utils/address'
import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'



const WalletConnected = (props) => (
  <div className='WalletConnected'>
    <Button className='WalletCurrency' size='small' disabled>
      <img src={currencies[props.currency].icon} />
      Connect your {props.currency.toUpperCase()} wallet
    </Button>
    <div><img src={wallets[props.wallet].icon} /></div>
    <Typography variant='title'>{_.capitalize(props.wallet)} Connected</Typography>
    <Typography>{shortenAddress(props.addresses[0])}</Typography>
    <Button onClick={props.disconnectWallet}>{props.disconnectText}</Button>
  </div>
)

WalletConnected.propTypes = {
  addresses: PropTypes.array,
  currency: PropTypes.string,
  disconnectText: PropTypes.string,
  disconnectWallet: PropTypes.func,
  wallet: PropTypes.string
}

export default WalletConnected
