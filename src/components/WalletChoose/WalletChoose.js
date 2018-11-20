import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button/Button'
import Typography from '@material-ui/core/Typography'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'

import './WalletChoose.css'

const WalletChoose = (props) => (
  <div className='WalletChoose'>
    <Typography variant='display1'>{props.title}</Typography>
    <Typography>{props.subTitle}</Typography>
    <h2>Pay with {props.currency.toUpperCase()}</h2>
    {props.wallets.map((wallet) => (
      <div>
        <div class="WalletChoose_wallet">
          <p><a href="#">Testnet only</a></p>
          <img src={wallets[wallet].icon} className='WalletPanel_walletImg' />
          <h5>{wallets[wallet].name}</h5>
          <p><a href="#">Trouble connecting?</a></p>
        </div>
        <Button wide primary onClick={() => props.chooseWallet(wallet)}>Connect</Button>
      </div>
    ))}
  </div>
)

WalletChoose.propTypes = {
  chooseWallet: PropTypes.func,
  currency: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wallets: PropTypes.array
}

export default WalletChoose
