import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import Button from '../Button/Button'

import cryptoassets from '@liquality/cryptoassets'
import { wallets } from '../../utils/wallets'
import WalletIcon from './wallet-icon.svg'

import './WalletDisplay.css'

const WalletDisplay = (props) => {
  const currency = cryptoassets[props.currency]
  const address = props.address && currency.formatAddress(props.address)
  const error = props.addressError || props.balanceError || props.error
  return <div className={classNames('WalletDisplay', {error: props.error})}>
    <div className='WalletDisplay_wrapper'>
      <img className='WalletDisplay_icon'
        src={wallets[props.type] ? wallets[props.type].icon : WalletIcon}
        alt={wallets[props.type] ? wallets[props.type].name : 'Wallet'} />
      <p className={classNames('WalletDisplay_address', {error: props.addressError})}>{address}</p>
      { props.connected
        ? <Button tabIndex={-1} small secondary onClick={e => props.onButtonClick(e)}>Change wallet</Button>
        : <Button tabIndex={-1} small primary onClick={e => props.onButtonClick(e)}>Connect wallet</Button>
      }
      { props.balance &&
        <div>
          <p>{props.spendable ? 'Spendable' : 'Balance'}</p>
          <p className={classNames('WalletDisplay_balance', {error: props.balanceError})}>{props.balance.toFixed(6)} {currency.code}</p>
        </div>
      }
    </div>
    {error && <div className='WalletDisplay_errorMessage'>{error}</div>}
  </div>
}

WalletDisplay.propTypes = PropTypes.shape({
  balance: PropTypes.instanceOf(BigNumber),
  balanceError: PropTypes.string,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string,
  addressError: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  error: PropTypes.string
}).isRequired

export default WalletDisplay
