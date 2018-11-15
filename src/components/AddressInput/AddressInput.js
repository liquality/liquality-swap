import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import './AddressInput.css'
import TickIcon from './tick.svg'
import ErrorIcon from './error.svg'

const AddressInput = (props) => {
  const valid = currencies[props.currency].isValidAddress(props.value)
  let helperMessage
  if (!valid) {
    helperMessage = 'Invalid Address'
  }

  return <div class='AddressInput'>
    <div class='AddressInput_wrapper'>
      <div className={'AddressInput_box ' + (valid ? 'AddressInput_box_valid' : 'AddressInput_box_invalid')}>
        <img class='AddressInput_icon' src={currencies[props.currency].icon} />
        <input class='AddressInput_input'
          value={props.value}
          onChange={e => props.onChange(e.target.value, currencies[props.currency].isValidAddress(e.target.value))}
        />
      </div>
      <img class='AddressInput_status' src={valid ? TickIcon : ErrorIcon} />
    </div>
    <div class='AddressInput_message'>{helperMessage}</div>
  </div>
}

AddressInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default AddressInput
