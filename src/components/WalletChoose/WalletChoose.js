import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button/Button'
import WalletIcon from '../WalletDisplay/wallet-icon.svg'

import { wallets } from '../../utils/wallets'
import cryptoassets from '@liquality/cryptoassets'

import './WalletChoose.css'

const WalletChoose = (props) => {
  const currency = cryptoassets[props.currency]
  const term = props.receive ? 'Receive' : 'Send'
  return <div className='WalletChoose'>
    <img className='WalletDisplay_icon'
      src={wallets[props.type] ? wallets[props.type].icon : WalletIcon}
      alt={wallets[props.type] ? wallets[props.type].name : 'Wallet'} />
    <h1>Select Wallet to {term} {currency.name}</h1>
    <div className='WalletChoose_WalletsContainer'>
      {props.wallets.map((wallet) => (
        <div key={wallet} onClick={() => props.chooseWallet(wallet)}>
          <div className='WalletChoose_wallet'>
            <img src={wallets[wallet].icon} className='WalletChoose_wallet_image' alt={`${wallets[wallet].name} Icon`} />
            <h5>{wallets[wallet].name}</h5>
          </div>
        </div>
      ))}
    </div>
    <Button wide link onClick={props.onCancel}>Cancel</Button>
  </div>
}

WalletChoose.propTypes = {
  receive: PropTypes.bool,
  chooseWallet: PropTypes.func,
  onCancel: PropTypes.func,
  currency: PropTypes.string,
  wallets: PropTypes.array
}

export default WalletChoose
