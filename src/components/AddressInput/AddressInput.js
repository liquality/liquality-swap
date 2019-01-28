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

  return <div className='AddressInput'>
    <div className='AddressInput_wrapper'>
      <div className={'AddressInput_box ' + cls}>
        <img className='AddressInput_icon' src={currencies[props.currency].icon} alt={currencies[props.currency].name} />
        <input className='AddressInput_input'
          tabIndex={props.tabIndex}
          value={props.value}
          onChange={e => props.onChange(e.target.value, currencies[props.currency].isValidAddress(e.target.value))}
        />
      </div>
      <img className='AddressInput_status' src={valid ? TickIcon : ErrorIcon} alt={valid ? 'Valid' : 'Invalid'} />
    </div>
    <div className='AddressInput_message'>{helperMessage}</div>
  </div>
}

AddressInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number
}

AddressInput.defaultProps = {
  tabIndex: -1
}

export default AddressInput
