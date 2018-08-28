import React from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'

import currencies from '../../utils/currencies'
import './AddressInput.css'

const AddressInput = (props) => {
  const valid = currencies[props.currency].isValidAddress(props.value)
  let helperMessage
  if (!valid) {
    helperMessage = <Typography color='secondary'>Invalid Address</Typography>
  }

  return <div>
    <Input
      className='AddressInput'
      error={!valid}
      value={props.value}
      onChange={e =>
        props.onChange(e.target.value, currencies[props.currency].isValidAddress(e.target.value))}
      startAdornment={
        <InputAdornment position='start'><img src={currencies[props.currency].icon} /></InputAdornment>
      }
      fullWidth
    />
    {helperMessage}
  </div>
}

AddressInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default AddressInput
