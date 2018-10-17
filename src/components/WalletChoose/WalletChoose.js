import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'



const WalletChoose = (props) => (
  <div className='WalletChoose'>
    <Typography variant='display1'>{props.title}</Typography>
    <Typography>{props.subTitle}</Typography>
    <Button className='WalletCurrency' size='small' disabled>
      <img src={currencies[props.currency].icon} />
      Connect your {props.currency.toUpperCase()} wallet
    </Button>
    {props.wallets.map((wallet) => (
      <div>
        <Button
          onClick={() => props.chooseWallet(wallet)}
          fullWidth
          className='WalletButton'
        >
          <img src={wallets[wallet].icon} />
          {wallet}
        </Button>
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
