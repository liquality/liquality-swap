import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'

import wallets from '../../utils/wallets'

import './WalletConnecting.css'

const WalletConnecting = (props) => {
  const wallet = wallets[props.wallet]
  return <div className='WalletConnecting'>
    <h2>{wallet.connection.title}</h2>
    {wallet.connection.description && <p>{wallet.connection.description}</p>}
    <div className='WalletConnecting_wallet'>
      <img src={wallet.icon} className='WalletPanel_walletImg' alt={`${wallet.name} Icon`} />
      <h5>{wallet.name}</h5>
    </div>
    <Button wide primary onClick={props.cancelWallet}>{props.cancelText}</Button>
  </div>
}

WalletConnecting.propTypes = {
  cancelText: PropTypes.string,
  cancelWallet: PropTypes.func,
  currency: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wallet: PropTypes.string
}

export default WalletConnecting
