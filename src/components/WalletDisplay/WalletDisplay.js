import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'
import WalletIcon from './wallet-icon.svg'

import './WalletDisplay.css'

const WalletBalance = (props) => (
  <div class='WalletDisplay'>
    <img class='WalletDisplay_icon' src={wallets[props.type] ? wallets[props.type].icon : WalletIcon} />
    <p class='WalletDisplay_address'>{ props.address && props.address }</p>
    { props.connected
      ? <p class='WalletDisplay_message'>Change wallet</p>
      : <p class='WalletDisplay_message error'>Connect wallet</p>
    }
    { props.balance &&
      <div>
        <p>Spendable</p>
        <p class='WalletDisplay_balance'>{props.balance} {currencies[props.currency].code}</p>
      </div>
    }
  </div>
)

WalletBalance.propTypes = PropTypes.shape({
  balance: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string
}).isRequired

export default WalletBalance
