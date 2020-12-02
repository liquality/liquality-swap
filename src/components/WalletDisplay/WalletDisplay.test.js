/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import WalletDisplay from './WalletDisplay'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    title: 'Bitcoin Wallet',
    type: 'ledger',
    balance: '3.141592653589793238',
    currency: 'BTC'
  }
  ReactDOM.render(<WalletDisplay {...props} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
