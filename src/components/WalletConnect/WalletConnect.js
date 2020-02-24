import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button/Button'

import { wallets } from '../../utils/wallets'
import cryptoassets from '@liquality/cryptoassets'
import { getNetworkByCurrency } from '../../utils/networks'

import './WalletConnect.css'

const WalletConnect = (props) => {
  const currency = cryptoassets[props.currency]
  const network = getNetworkByCurrency(props.currency)
  const term = props.receive ? 'Receive' : 'Send'
  return <div className='WalletConnect'>
    {props.subTitle && <p>{props.subTitle}</p>}
    <h2>{term} {currency.name}</h2>
    <div className='WalletConnect_wallet'>
      {network && network.isTestnet && <p>Testnet only</p>}
      <img src={wallets[props.wallet].icon} className='WalletPanel_walletImg' alt={`${wallets[props.wallet].name} Icon`} />
      <h5>{wallets[props.wallet].name}</h5>
      <p><a href={wallets[props.wallet].troubleshootConnectionLink} target='blank'>Trouble connecting?</a></p>
    </div>
    <Button wide primary onClick={() => props.connectWallet(props.wallet)}>Connect</Button>
    <Button wide link onClick={props.onCancel}>Cancel</Button>
  </div>
}

WalletConnect.propTypes = {
  receive: PropTypes.bool,
  connectWallet: PropTypes.func,
  onCancel: PropTypes.func,
  currency: PropTypes.string,
  subTitle: PropTypes.string,
  wallet: PropTypes.string
}

export default WalletConnect
