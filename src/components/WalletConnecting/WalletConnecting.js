import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import WarningIcon from '../../icons/warning.png'

import { wallets } from '../../utils/wallets'

import './WalletConnecting.css'

const WalletConnecting = (props) => {
  console.log(props)
  const wallet = wallets[props.wallet]
  return <div className='WalletConnecting'>
    <h2>{wallet.connection.title}</h2>
    {wallet.connection.description && <p>{wallet.connection.description}</p>}
    <div className='WalletConnecting_wallet'>
      {props.failed && <div className='WalletConnecting_failed'><img src={WarningIcon} /> Connection Failed: {props.error && props.error.message}</div>}
      <img src={wallet.icon} className='WalletConnecting_walletImg' alt={`${wallet.name} Icon`} />
      <h5>{wallet.name}</h5>
    </div>
    {props.failed && <Button wide primary onClick={props.onRetryClick}>Retry</Button>}
    <Button wide link onClick={props.cancelWallet}>{props.cancelText}</Button>
  </div>
}

WalletConnecting.propTypes = {
  cancelText: PropTypes.string,
  cancelWallet: PropTypes.func,
  failed: PropTypes.bool,
  error: PropTypes.any,
  onRetryClick: PropTypes.func,
  currency: PropTypes.string,
  wallet: PropTypes.string
}

export default WalletConnecting
