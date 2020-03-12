import React from 'react'
import PropTypes from 'prop-types'
import cryptoassets from '@liquality/cryptoassets'
import Button from '../../components/Button/Button'
import { shortenAddress } from '../../utils/address'
import { wallets } from '../../utils/wallets'
import TickIcon from '../../icons/tick.svg'

import './WalletConnected.css'

const WalletConnected = (props) => {
  const term = props.receive ? 'Receive' : 'Send'
  const currency = cryptoassets[props.currency]
  return <div className='WalletConnected'>
    <h2><img src={TickIcon} />&nbsp;Connected!<br />Ready to {term} {currency.name}</h2>
    <div className='WalletConnected_wallet'>
      <img src={wallets[props.wallet].icon} className='WalletPanel_walletImg' alt={`${wallets[props.wallet].name} Icon`} />
      <h5>{wallets[props.wallet].name}</h5>
      <p>{shortenAddress(props.addresses[0])}</p>
    </div>
    <Button wide primary onClick={props.onOk}>Continue</Button>
    <Button wide link onClick={props.disconnectWallet}>{props.disconnectText}</Button>
  </div>
}

WalletConnected.propTypes = {
  receive: PropTypes.bool,
  addresses: PropTypes.array,
  currency: PropTypes.string,
  disconnectText: PropTypes.string,
  disconnectWallet: PropTypes.func,
  onOk: PropTypes.func,
  wallet: PropTypes.string
}

export default WalletConnected
