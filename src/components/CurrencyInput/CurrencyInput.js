import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import './CurrencyInput.css'

const CurrencyInput = (props) => (
  <div className='CurrencyInput'>
    <h3 className='CurrencyInput_heading'>{currencies[props.currency].code}</h3>
    <input type='number' className='CurrencyInput_input' onChange={e => props.onChange(e.target.value)} />
  </div>
)

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

CurrencyInput.defaultProps = {
  value: 0
}

export default CurrencyInput
