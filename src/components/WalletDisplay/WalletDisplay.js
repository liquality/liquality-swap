import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'
import WalletIcon from './wallet-icon.svg'

import './WalletDisplay.css'

const WalletBalance = (props) => (
  <div class='WalletDisplay'>
    <img class='WalletDisplay_icon' src={wallets[props.type] ? wallets[props.type].icon : WalletIcon} />
    <p class='WalletDisplay_address'>{ props.address && props.address }</p>
    { props.connected
      ? <Button tabindex={-1} small secondary class='WalletDisplay_message' onClick={e => props.onButtonClick(e)}>Change wallet</Button>
      : <Button tabindex={-1} small primary class='WalletDisplay_message error' onClick={e => props.onButtonClick(e)}>Connect wallet</Button>
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
  address: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired
}).isRequired

export default WalletBalance
