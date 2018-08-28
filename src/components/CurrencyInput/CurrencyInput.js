import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputAdornment, Typography } from '@material-ui/core'

import currencies from '../../utils/currencies'
import './CurrencyInput.css'

const CurrencyInput = (props) => (
  <div className='CurrencyInput'>
    <div className='CurrencyInput_icon'>
      <img src={currencies[props.currency].icon} />
    </div>
    {props.disabled
      ? <Typography variant='title'>{props.value} {currencies[props.currency].code}</Typography>
      : <Input
        value={props.value}
        type='number'
        onChange={e => props.onChange(e.target.value)}
        endAdornment={<InputAdornment position='end'>{currencies[props.currency].code}</InputAdornment>}
        fullWidth
      />}

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
