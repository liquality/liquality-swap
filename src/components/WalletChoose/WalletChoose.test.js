/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import WalletChoose from './WalletChoose'

function mockFn () {
  return ''
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    title: 'Liquality',
    subTitle: 'Subtitle',
    wallets: ['metamask'],
    chooseWallet: mockFn,
    currency: 'ETH'
  }
  ReactDOM.render(<WalletChoose {...props} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
