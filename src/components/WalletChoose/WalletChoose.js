import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button/Button'

import wallets from '../../utils/wallets'
import { getNetworkByCurrency } from '../../utils/networks'

import './WalletChoose.css'

const WalletChoose = (props) => {
  const network = getNetworkByCurrency(props.currency)
  return <div className='WalletChoose'>
    <h1>{props.title}</h1>
    {props.subTitle && <p>{props.subTitle}</p>}
    <h2>Pay with {props.currency.toUpperCase()}</h2>
    {props.wallets.map((wallet) => (
      <div key={wallet}>
        <div className='WalletChoose_wallet'>
          {network && network.isTestnet && <p>Testnet only</p>}
          <img src={wallets[wallet].icon} className='WalletPanel_walletImg' alt={`${wallets[wallet].name} Icon`} />
          <h5>{wallets[wallet].name}</h5>
          <p><a href={wallets[wallet].troubleshootConnectionLink} target="blank">Trouble connecting?</a></p>
        </div>
        <Button wide primary onClick={() => props.chooseWallet(wallet)}>Connect</Button>
        <Button wide link onClick={props.onCancel}>Cancel</Button>
      </div>
    ))}
  </div>
}

WalletChoose.propTypes = {
  chooseWallet: PropTypes.func,
  onCancel: PropTypes.func,
  currency: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wallets: PropTypes.array
}

export default WalletChoose
