import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button/Button'

import { wallets } from '../../utils/wallets'
import cryptoassets from '@liquality/cryptoassets'
import { getNetworkByCurrency } from '../../utils/networks'

import './WalletChoose.css'

const WalletChoose = (props) => {
  const currency = cryptoassets[props.currency]
  const network = getNetworkByCurrency(props.currency)
  return <div className='WalletChoose'>
    <h1>Select {currency.code} Wallet</h1>
    <div className="WalletsContainer">
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
  chooseWallet: PropTypes.func,
  onCancel: PropTypes.func,
  currency: PropTypes.string,
  wallets: PropTypes.array
}

export default WalletChoose
