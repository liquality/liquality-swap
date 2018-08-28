/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import AddressInput from './AddressInput'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    currency: 'btc',
    value: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  }
  ReactDOM.render(<AddressInput {...props} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
