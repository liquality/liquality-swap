import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import './CurrencyInput.css'

const CurrencyInput = (props) => (
  <div className='CurrencyInput'>
    <h3 className='CurrencyInput_heading'>{currencies[props.currency].code}</h3>
    <input type='number' readOnly={props.disabled} value={props.value} className='CurrencyInput_input' placeholder='0.00' onChange={e => props.onChange(e.target.value)} tabIndex={props.tabIndex} />
  </div>
)

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number
}

CurrencyInput.defaultProps = {
  tabIndex: -1
}

export default CurrencyInput
