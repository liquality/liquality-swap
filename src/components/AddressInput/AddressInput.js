import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import './AddressInput.css'
import TickIcon from './tick.svg'
import ErrorIcon from './error.svg'

const AddressInput = (props) => {
  let helperMessage
  let cls = ''
  let valid = false
  if (props.value !== '') {
    valid = currencies[props.currency].isValidAddress(props.value)

    if (valid) {
      cls = 'AddressInput_box_valid'
    } else {
      helperMessage = 'Invalid Address'
      cls = 'AddressInput_box_invalid'
    }
  }

  return <div class='AddressInput'>
    <div class='AddressInput_wrapper'>
      <div className={'AddressInput_box ' + cls}>
        <img class='AddressInput_icon' src={currencies[props.currency].icon} />
        <input class='AddressInput_input'
          tabindex={props.tabindex}
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
  onChange: PropTypes.func,
  tabindex: PropTypes.number
}

AddressInput.defaultProps = {
  tabindex: -1
}

export default AddressInput
