import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import currencies from '../../utils/currencies'
import './AddressInput.css'
import TickIcon from './tick.svg'
import ErrorIcon from './error.svg'

const AddressInput = (props) => {
  const valid = currencies[props.currency].isValidAddress(props.value)
  return <div className={classNames('AddressInput', { error: props.error })}>
    <div className='AddressInput_wrapper'>
      <div className='AddressInput_box'>
        <img className='AddressInput_icon' src={currencies[props.currency].icon} alt={currencies[props.currency].name} />
        <input className='AddressInput_input'
          tabIndex={props.tabIndex}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
      { valid && <img className='AddressInput_status' src={TickIcon} alt='Valid' /> }
      { props.error && <img className='AddressInput_status' src={ErrorIcon} alt='Invalid' />}
    </div>
    <div className='AddressInput_errorMessage'>{props.error && props.error}</div>
  </div>
}

AddressInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string
}

AddressInput.defaultProps = {
  tabIndex: -1
}

export default AddressInput
