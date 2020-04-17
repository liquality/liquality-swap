import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import ErrorIcon from '../../icons/error.svg'

import { wallets } from '../../utils/wallets'
import { mapErrorMessage } from '../../utils/errors'

import './WalletConnecting.css'

const WalletConnecting = (props) => {
  const wallet = wallets[props.wallet]
  return <div className='WalletConnecting'>
    <div className='WalletConnecting_wallet'>
      <div className='WalletConnecting_header'>
        <div className='WalletConnecting_imgContainer'><img src={wallet.icon} alt={`${wallet.name} Icon`} /></div>
        <h3>{wallet.name}</h3>
      </div>
      {props.error && <div className='WalletConnecting_error'>
        <div className='WalletConnecting_imgContainer'><img src={ErrorIcon} alt='Error' /></div>
        <p className='WalletConnecting_error_message'>{mapErrorMessage(props.error.message) || props.error.message}</p>
      </div>}
    </div>
    <h2>{wallet.connection.title}</h2>
    {wallet.connection.description && <p>{wallet.connection.description}</p>}
    <div className='WalletConnecting_buttons'>
      {props.error && <Button wide primary onClick={props.onRetryClick}>Try Again</Button>}
      <Button wide link onClick={props.cancelWallet}>{props.cancelText}</Button>
    </div>
  </div>
}

WalletConnecting.propTypes = {
  cancelText: PropTypes.string,
  cancelWallet: PropTypes.func,
  error: PropTypes.any,
  onRetryClick: PropTypes.func,
  currency: PropTypes.string,
  wallet: PropTypes.string
}

export default WalletConnecting
