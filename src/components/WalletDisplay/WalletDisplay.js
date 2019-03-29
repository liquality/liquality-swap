import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../Button/Button'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'
import WalletIcon from './wallet-icon.svg'

import './WalletDisplay.css'

const WalletDisplay = (props) => {
  const currency = currencies[props.currency]
  const address = props.address && currency.formatAddress(props.address)
  return <div className={classNames('WalletDisplay', {error: props.error})}>
    <div className='WalletDisplay_wrapper'>
      <img className='WalletDisplay_icon'
        src={wallets[props.type] ? wallets[props.type].icon : WalletIcon}
        alt={wallets[props.type] ? wallets[props.type].name : 'Wallet'} />
      <p className='WalletDisplay_address'>{address}</p>
      { props.connected
        ? <Button tabIndex={-1} small secondary onClick={e => props.onButtonClick(e)}>Change wallet</Button>
        : <Button tabIndex={-1} small primary onClick={e => props.onButtonClick(e)}>Connect wallet</Button>
      }
      { props.balance &&
        <div>
          <p>Spendable</p>
          <p className='WalletDisplay_balance'>{props.balance} {currency.code}</p>
        </div>
      }
    </div>
    {props.error && <div className='WalletDisplay_errorMessage'>{props.error}</div>}
  </div>
}

WalletDisplay.propTypes = PropTypes.shape({
  balance: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  error: PropTypes.string
}).isRequired

export default WalletDisplay
