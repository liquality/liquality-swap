import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import Typography from '@material-ui/core/Typography'
import { shortenAddress } from '../../utils/address'
import wallets from '../../utils/wallets'

import './WalletConnected.css'

const WalletConnected = (props) => (
  <div className='WalletConnected'>
    <h2>{wallets[props.wallet].name} Connected</h2>
    <div className='WalletConnected_wallet'>
      <img src={wallets[props.wallet].icon} className='WalletPanel_walletImg' />
      <h5>{wallets[props.wallet].name}</h5>
      <Typography>{shortenAddress(props.addresses[0])}</Typography>
    </div>
    <Button wide primary onClick={props.disconnectWallet}>{props.disconnectText}</Button>
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
