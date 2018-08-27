/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import CurrencyInput from './CurrencyInput'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    currency: 'btc',
    value: 50
  }
  ReactDOM.render(<CurrencyInput {...props} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
