import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'

import wallets from '../../utils/wallets'

import './WalletConnecting.css'

const WalletConnecting = (props) => (
  <div className='WalletConnecting'>
    <h2>{props.currency === 'eth' ? 'Login to MetaMask' : 'To confirm'}</h2>
    {props.currency === 'btc' && <p>Navigate to your Bitcoin account</p>}
    <div className='WalletConnecting_wallet'>
      <img src={wallets[props.wallet].icon} className='WalletPanel_walletImg' alt={`${wallets[props.wallet].name} Icon`} />
      <h5>{wallets[props.wallet].name}</h5>
    </div>
    {props.wallet === 'ledger' && (
      <div className='WalletConnecting_ledger'>
        <img src={wallets[props.wallet + '_purple'].icon} alt='Ledger Icon' />
        <div className='WalletConnecting_ledgerPin'>
          <p>Insert Ledger Pin</p>
        </div>
      </div>
    )}
    <Button wide primary onClick={props.cancelWallet}>{props.cancelText}</Button>
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
