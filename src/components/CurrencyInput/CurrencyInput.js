import React from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

import currencies from '../../utils/currencies'
import './CurrencyInput.css'

const CurrencyInput = (props) => (
  <div className='CurrencyInput'>
    <div className='CurrencyInput_icon'>
      <img src={currencies[props.currency].icon} />
    </div>
    <Input
      value={props.value}
      type='number'
      onChange={e => props.onChange(e.target.value)}
      endAdornment={<InputAdornment position='end'>{currencies[props.currency].code}</InputAdornment>}
      fullWidth
    />
  </div>
)

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

CurrencyInput.defaultProps = {
  value: 0
}

export default CurrencyInput
